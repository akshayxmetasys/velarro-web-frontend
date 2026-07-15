#!/usr/bin/env python3
"""Validate the repository Cursor, Codex skill, and hook configuration."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_RULES = {
    "00-core-operating-contract.mdc",
    "10-architecture-boundaries.mdc",
    "20-types-contracts-determinism.mdc",
    "30-security-supply-chain.mdc",
    "40-performance-concurrency.mdc",
    "50-observability-reliability.mdc",
    "60-testing-quality-gates.mdc",
    "70-frontend-standards.mdc",
    "80-devops-delivery.mdc",
    "90-agent-execution-protocol.mdc",
    "95-documentation-governance.mdc",
}

REQUIRED_ENTERPRISE_SKILLS = {
    "architecture-conformance",
    "performance-engineering",
    "secure-change-review",
    "observability-instrumentation",
    "test-design-and-coverage",
    "production-readiness-review",
}

REQUIRED_ENTERPRISE_AGENTS = {
    "senior-performance-agent",
    "security-auditor-agent",
    "test-coverage-agent",
}

REQUIRED = [
    ROOT / ".cursorrules",
    ROOT / "AGENTS.md",
    ROOT / ".cursor" / "hooks.json",
    ROOT / ".cursor" / "hooks.windows.json",
    ROOT / ".cursor" / ".gitignore",
    ROOT / ".cursor" / "hooks" / "guard.py",
    ROOT / ".cursor" / "hooks" / "tests" / "test_guard.py",
    ROOT / "scripts" / "sync_agent_skills.py",
    ROOT / "docs" / "engineering" / "adr-template.md",
    ROOT / "docs" / "engineering" / "threat-model-template.md",
    ROOT / "docs" / "engineering" / "performance-budget-template.md",
    ROOT / "docs" / "engineering" / "observability-checklist.md",
    ROOT / "docs" / "engineering" / "cursor-agent-system.md",
]


def frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError("missing opening frontmatter marker")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError("missing closing frontmatter marker")
    values: dict[str, str] = {}
    current_key: str | None = None
    for raw in text[4:end].splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw.startswith((" ", "\t")) and current_key:
            values[current_key] = (values[current_key] + " " + raw.strip()).strip()
            continue
        if ":" not in raw:
            raise ValueError(f"invalid frontmatter line: {raw}")
        key, value = raw.split(":", 1)
        current_key = key.strip()
        values[current_key] = value.strip().strip("\"'")
    return values


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT)).replace("\\", "/")


def validate_hooks(errors: list[str]) -> None:
    for json_path in (ROOT / ".cursor" / "hooks.json", ROOT / ".cursor" / "hooks.windows.json"):
        try:
            json.loads(json_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            errors.append(f"invalid {rel(json_path)}: {exc}")
            return

    hooks = json.loads((ROOT / ".cursor" / "hooks.json").read_text(encoding="utf-8"))

    if hooks.get("version") != 1:
        errors.append(".cursor/hooks.json must use version 1")
    events = hooks.get("hooks")
    if not isinstance(events, dict):
        errors.append(".cursor/hooks.json hooks must be an object")
        return

    seen_commands: set[str] = set()
    for event in ("beforeShellExecution", "afterFileEdit", "stop"):
        entries = events.get(event)
        if not isinstance(entries, list) or not entries:
            errors.append(f"hooks.json missing {event}")
            continue
        for index, entry in enumerate(entries):
            if not isinstance(entry, dict):
                errors.append(f"hooks.json {event}[{index}] must be an object")
                continue
            command = entry.get("command")
            if not isinstance(command, str) or not command.strip():
                errors.append(f"hooks.json {event}[{index}] missing command")
                continue
            if command in seen_commands:
                errors.append(f"duplicate hook command: {command}")
            seen_commands.add(command)
            if "guard.py" in command and not (ROOT / ".cursor" / "hooks" / "guard.py").is_file():
                errors.append(f"hook command references missing guard.py: {command}")


def validate_rules(errors: list[str]) -> int:
    rules_dir = ROOT / ".cursor" / "rules"
    rule_files = sorted(rules_dir.glob("*.mdc"))
    existing = {path.name for path in rule_files}
    missing = sorted(REQUIRED_RULES - existing)
    for name in missing:
        errors.append(f"missing required rule: .cursor/rules/{name}")

    always_count = 0
    for path in rule_files:
        try:
            fm = frontmatter(path)
            if not fm.get("description"):
                errors.append(f"{rel(path)} missing description")
            value = fm.get("alwaysApply")
            if value not in {"true", "false"}:
                errors.append(f"{rel(path)} alwaysApply must be true or false")
            if value == "true":
                always_count += 1
        except ValueError as exc:
            errors.append(f"{rel(path)}: {exc}")

    if always_count != 1:
        errors.append(f"expected exactly one alwaysApply rule; found {always_count}")
    if len(rule_files) < 11:
        errors.append(f"expected at least 11 rules; found {len(rule_files)}")
    return len(rule_files)


def validate_agents(errors: list[str]) -> int:
    names: set[str] = set()
    for path in sorted((ROOT / ".cursor" / "agents").glob("*.md")):
        try:
            fm = frontmatter(path)
            for key in ("name", "description", "model"):
                if not fm.get(key):
                    errors.append(f"{rel(path)} missing {key}")
            name = fm.get("name", "")
            if name in names:
                errors.append(f"duplicate agent name: {name}")
            names.add(name)
        except ValueError as exc:
            errors.append(f"{rel(path)}: {exc}")
    for name in sorted(REQUIRED_ENTERPRISE_AGENTS - names):
        errors.append(f"missing required enterprise agent: {name}")
    return len(names)


def validate_skills(errors: list[str]) -> int:
    cursor_names: dict[str, Path] = {}
    for path in sorted((ROOT / ".cursor" / "skills").glob("*/SKILL.md")):
        try:
            fm = frontmatter(path)
            for key in ("name", "description"):
                if not fm.get(key):
                    errors.append(f"{rel(path)} missing {key}")
            name = fm.get("name", "")
            if not re.fullmatch(r"[a-z0-9-]+", name):
                errors.append(f"{rel(path)} has invalid skill name: {name}")
            if name != path.parent.name:
                errors.append(f"{rel(path)} name must match directory name")
            if name in cursor_names:
                errors.append(f"duplicate cursor skill name: {name}")
            cursor_names[name] = path
        except ValueError as exc:
            errors.append(f"{rel(path)}: {exc}")

    for name in sorted(REQUIRED_ENTERPRISE_SKILLS - set(cursor_names)):
        errors.append(f"missing required enterprise skill: {name}")

    agent_names: dict[str, Path] = {}
    for path in sorted((ROOT / ".agents" / "skills").glob("*/SKILL.md")):
        try:
            fm = frontmatter(path)
            name = fm.get("name", "")
            if name in agent_names:
                errors.append(f"duplicate mirrored skill name: {name}")
            agent_names[name] = path
            text = path.read_text(encoding="utf-8")
            expected_marker = f"generated-from=.cursor/skills/{name}/SKILL.md"
            if expected_marker not in text:
                errors.append(f"{rel(path)} missing generated mirror marker")
        except ValueError as exc:
            errors.append(f"{rel(path)}: {exc}")

    for name, cursor_path in sorted(cursor_names.items()):
        mirror_path = ROOT / ".agents" / "skills" / name / "SKILL.md"
        if name not in agent_names:
            errors.append(f"missing mirrored Codex skill: .agents/skills/{name}/SKILL.md")
            continue
        cursor_text = cursor_path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n").rstrip() + "\n"
        mirror_text = mirror_path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n").rstrip() + "\n"
        marker = f"<!-- codex-skill-mirror: generated-from=.cursor/skills/{name}/SKILL.md; do-not-edit -->\n\n"
        stripped = mirror_text.replace(marker, "", 1)
        if stripped != cursor_text:
            errors.append(f"mirrored skill drift: .agents/skills/{name}/SKILL.md")

    return len(cursor_names)


def validate_generated_hygiene(errors: list[str]) -> None:
    forbidden_dirs = {".cursor/.state"}
    for item in forbidden_dirs:
        if (ROOT / item).exists():
            errors.append(f"generated state must not exist in repository tree: {item}")


def main() -> int:
    errors: list[str] = []
    for path in REQUIRED:
        if not path.is_file():
            errors.append(f"missing required file: {rel(path)}")

    validate_hooks(errors)
    rule_count = validate_rules(errors)
    agent_count = validate_agents(errors)
    skill_count = validate_skills(errors)
    validate_generated_hygiene(errors)

    if errors:
        print("Cursor pack validation FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Cursor pack validation PASSED: {rule_count} rules, {agent_count} agents, {skill_count} skills")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
