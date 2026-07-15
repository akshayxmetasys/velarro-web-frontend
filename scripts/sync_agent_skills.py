#!/usr/bin/env python3
"""Synchronize Cursor skills into repository-scoped Codex skills."""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CURSOR_SKILLS = ROOT / ".cursor" / "skills"
AGENT_SKILLS = ROOT / ".agents" / "skills"
MARKER_PREFIX = "<!-- codex-skill-mirror:"
MARKER_TEMPLATE = "<!-- codex-skill-mirror: generated-from=.cursor/skills/{name}/SKILL.md; do-not-edit -->"


def normalize(text: str) -> str:
    return text.replace("\r\n", "\n").replace("\r", "\n").rstrip() + "\n"


def frontmatter(text: str, path: Path) -> dict[str, str]:
    if not text.startswith("---\n"):
        raise ValueError(f"{path}: missing opening frontmatter marker")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError(f"{path}: missing closing frontmatter marker")
    values: dict[str, str] = {}
    current_key: str | None = None
    for raw in text[4:end].splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw.startswith((" ", "\t")) and current_key:
            values[current_key] = (values[current_key] + " " + raw.strip()).strip()
            continue
        if ":" not in raw:
            raise ValueError(f"{path}: invalid frontmatter line: {raw}")
        key, value = raw.split(":", 1)
        current_key = key.strip()
        values[current_key] = value.strip().strip("\"'")
    return values


def expected_mirror(name: str, source_text: str) -> str:
    source_text = normalize(source_text)
    end = source_text.find("\n---\n", 4)
    if end < 0:
        raise ValueError(f"skill {name}: missing closing frontmatter marker")
    insert_at = end + len("\n---\n")
    return source_text[:insert_at] + MARKER_TEMPLATE.format(name=name) + "\n\n" + source_text[insert_at:]


def canonical_skills() -> dict[str, str]:
    if not CURSOR_SKILLS.is_dir():
        raise ValueError(".cursor/skills is missing")
    skills: dict[str, str] = {}
    for skill_file in sorted(CURSOR_SKILLS.glob("*/SKILL.md")):
        text = normalize(skill_file.read_text(encoding="utf-8"))
        fm = frontmatter(text, skill_file)
        name = fm.get("name", "")
        if not re.fullmatch(r"[a-z0-9-]+", name):
            raise ValueError(f"{skill_file}: invalid or missing lowercase hyphenated name")
        if not fm.get("description"):
            raise ValueError(f"{skill_file}: missing description")
        if name != skill_file.parent.name:
            raise ValueError(f"{skill_file}: frontmatter name must match directory name")
        if name in skills:
            raise ValueError(f"duplicate skill name: {name}")
        skills[name] = text
    return skills


def is_generated_skill_dir(path: Path) -> bool:
    skill_file = path / "SKILL.md"
    if not skill_file.is_file():
        return False
    try:
        text = skill_file.read_text(encoding="utf-8")
    except OSError:
        return False
    return MARKER_PREFIX in text


def sync(check: bool) -> int:
    skills = canonical_skills()
    changed: list[str] = []
    AGENT_SKILLS.mkdir(parents=True, exist_ok=True)

    for name in sorted(skills):
        destination = AGENT_SKILLS / name / "SKILL.md"
        expected = expected_mirror(name, skills[name])
        current = normalize(destination.read_text(encoding="utf-8")) if destination.is_file() else None
        if current != expected:
            changed.append(str(destination.relative_to(ROOT)).replace("\\", "/"))
            if not check:
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_text(expected, encoding="utf-8", newline="\n")

    stale: list[Path] = []
    for path in sorted(AGENT_SKILLS.iterdir()) if AGENT_SKILLS.exists() else []:
        if path.is_dir() and path.name not in skills and is_generated_skill_dir(path):
            stale.append(path)
    for path in stale:
        changed.append(str(path.relative_to(ROOT)).replace("\\", "/") + "/")
        if not check:
            shutil.rmtree(path)

    if check and changed:
        print("Agent skill sync check FAILED")
        for item in changed:
            print(f"- drift: {item}")
        return 1

    action = "checked" if check else "synchronized"
    print(f"Agent skills {action}: {len(skills)} mirrored, {len(changed)} changes")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail on drift without modifying files")
    args = parser.parse_args()
    try:
        return sync(args.check)
    except ValueError as exc:
        print(f"Agent skill sync FAILED: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
