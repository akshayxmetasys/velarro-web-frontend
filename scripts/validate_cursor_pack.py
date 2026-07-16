#!/usr/bin/env python3
"""Validate this Cursor configuration without third-party dependencies."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATED_MARKER = "<!-- GENERATED-BY: scripts/sync_agent_skills.py;"

REQUIRED_SKILLS = {
    "architecture-conformance",
    "performance-engineering",
    "secure-change-review",
    "observability-instrumentation",
    "test-design-and-coverage",
    "production-readiness-review",
}

REQUIRED_AGENTS = {
    "senior-performance-agent",
    "security-auditor-agent",
    "test-coverage-agent",
}

REQUIRED = [
    ROOT / ".cursorrules",
    ROOT / "AGENTS.md",
    ROOT / ".cursor" / "hooks.json",
    ROOT / ".cursor" / "hooks" / "guard.py",
    ROOT / ".cursor" / "rules" / "00-core-operating-contract.mdc",
    ROOT / ".cursor" / "agents" / "senior-performance-agent.md",
    ROOT / ".cursor" / "agents" / "security-auditor-agent.md",
    ROOT / ".cursor" / "agents" / "test-coverage-agent.md",
]


def frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    return frontmatter_from_text(text, path)


def frontmatter_from_text(text: str, path: Path) -> dict[str, str]:
    if not text.startswith("---\n"):
        raise ValueError("missing opening frontmatter marker")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError("missing closing frontmatter marker")
    values: dict[str, str] = {}
    for raw in text[4:end].splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw[:1].isspace():
            continue
        if ":" not in raw:
            raise ValueError(f"invalid frontmatter line: {raw}")
        key, value = raw.split(":", 1)
        values[key.strip()] = value.strip().strip('"\'')
    return values


def normalized(path: Path) -> str:
    return path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n").rstrip() + "\n"


def mirror_text(name: str, source_path: Path) -> str:
    source = source_path.relative_to(ROOT).as_posix()
    marker = f"{GENERATED_MARKER} SOURCE: {source}; NAME: {name} -->"
    return f"{marker}\n{normalized(source_path)}"


def main() -> int:
    errors: list[str] = []
    for path in REQUIRED:
        if not path.is_file():
            errors.append(f"missing required file: {path.relative_to(ROOT)}")

    hooks_path = ROOT / ".cursor" / "hooks.json"
    if hooks_path.is_file():
        try:
            hooks = json.loads(hooks_path.read_text(encoding="utf-8"))
            if hooks.get("version") != 1:
                errors.append(".cursor/hooks.json must use version 1")
            for event in ("beforeShellExecution", "afterFileEdit", "stop"):
                entries = hooks.get("hooks", {}).get(event)
                if not isinstance(entries, list) or not entries:
                    errors.append(f"hooks.json missing {event}")
            commands: set[str] = set()
            for event, entries in hooks.get("hooks", {}).items():
                if not isinstance(entries, list):
                    errors.append(f"hooks.json event {event} must be a list")
                    continue
                for entry in entries:
                    if not isinstance(entry, dict):
                        errors.append(f"hooks.json event {event} contains a non-object entry")
                        continue
                    command = entry.get("command")
                    if not isinstance(command, str) or not command.strip():
                        errors.append(f"hooks.json event {event} contains an entry without a command")
                        continue
                    key = f"{event}:{command}"
                    if key in commands:
                        errors.append(f"duplicate hook command for {event}: {command}")
                    commands.add(key)
        except json.JSONDecodeError as exc:
            errors.append(f"invalid hooks.json: {exc}")

    rule_files = sorted((ROOT / ".cursor" / "rules").glob("*.mdc"))
    if not rule_files:
        errors.append("no .cursor/rules/*.mdc files found")
    always_count = 0
    for path in rule_files:
        try:
            fm = frontmatter(path)
            if not fm.get("description"):
                errors.append(f"{path.relative_to(ROOT)} missing description")
            if fm.get("alwaysApply") == "true":
                always_count += 1
        except ValueError as exc:
            errors.append(f"{path.relative_to(ROOT)}: {exc}")
    if always_count != 1:
        errors.append(f"expected exactly one alwaysApply rule; found {always_count}")

    agent_names: set[str] = set()
    for path in sorted((ROOT / ".cursor" / "agents").glob("*.md")):
        try:
            fm = frontmatter(path)
            for key in ("name", "description", "model"):
                if not fm.get(key):
                    errors.append(f"{path.relative_to(ROOT)} missing {key}")
            name = fm.get("name", "")
            if name in agent_names:
                errors.append(f"duplicate agent name: {name}")
            agent_names.add(name)
        except ValueError as exc:
            errors.append(f"{path.relative_to(ROOT)}: {exc}")
    missing_agents = REQUIRED_AGENTS - agent_names
    if missing_agents:
        errors.append(f"missing required agents: {', '.join(sorted(missing_agents))}")

    skill_names: set[str] = set()
    skill_sources: dict[str, Path] = {}
    for path in sorted((ROOT / ".cursor" / "skills").glob("*/SKILL.md")):
        try:
            fm = frontmatter(path)
            for key in ("name", "description"):
                if not fm.get(key):
                    errors.append(f"{path.relative_to(ROOT)} missing {key}")
            name = fm.get("name", "")
            if not re.fullmatch(r"[a-z0-9-]+", name):
                errors.append(f"invalid skill name: {name}")
            if name in skill_names:
                errors.append(f"duplicate skill name: {name}")
            skill_names.add(name)
            skill_sources[name] = path
        except ValueError as exc:
            errors.append(f"{path.relative_to(ROOT)}: {exc}")

    missing_skills = REQUIRED_SKILLS - skill_names
    if missing_skills:
        errors.append(f"missing required skills: {', '.join(sorted(missing_skills))}")

    mirror_names: set[str] = set()
    for path in sorted((ROOT / ".agents" / "skills").glob("*/SKILL.md")):
        text = normalized(path)
        try:
            body = text
            if text.startswith(GENERATED_MARKER):
                body = text.split("\n", 1)[1]
            fm = frontmatter_from_text(body, path)
            name = fm.get("name", "")
            if name in mirror_names:
                errors.append(f"duplicate mirrored skill name: {name}")
            mirror_names.add(name)
        except ValueError as exc:
            errors.append(f"{path.relative_to(ROOT)}: {exc}")

    for name, source_path in sorted(skill_sources.items()):
        mirror = ROOT / ".agents" / "skills" / name / "SKILL.md"
        if not mirror.is_file():
            errors.append(f"missing mirrored Codex skill: {mirror.relative_to(ROOT)}")
            continue
        expected = mirror_text(name, source_path)
        actual = normalized(mirror)
        if actual != expected:
            errors.append(f"mirrored Codex skill is stale: {mirror.relative_to(ROOT)}")

    if errors:
        print("Cursor pack validation FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Cursor pack validation PASSED: {len(rule_files)} rules, {len(agent_names)} agents, {len(skill_names)} skills, {len(mirror_names)} mirrored skills")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
