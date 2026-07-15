#!/usr/bin/env python3
"""Synchronize canonical Cursor skills into repository-scoped Codex skills."""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CURSOR_SKILLS = ROOT / ".cursor" / "skills"
AGENT_SKILLS = ROOT / ".agents" / "skills"
MARKER_PREFIX = "<!-- GENERATED-BY: scripts/sync_agent_skills.py;"
NAME_RE = re.compile(r"^[a-z0-9-]+$")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")


def frontmatter(text: str, path: Path) -> dict[str, str]:
    if not text.startswith("---\n"):
        raise ValueError(f"{path}: missing opening frontmatter marker")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError(f"{path}: missing closing frontmatter marker")
    values: dict[str, str] = {}
    for raw in text[4:end].splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw[:1].isspace():
            continue
        if ":" not in raw:
            raise ValueError(f"{path}: invalid frontmatter line: {raw}")
        key, value = raw.split(":", 1)
        values[key.strip()] = value.strip().strip("\"'")
    return values


def canonical_skills() -> dict[str, tuple[Path, str]]:
    skills: dict[str, tuple[Path, str]] = {}
    for skill_path in sorted(CURSOR_SKILLS.glob("*/SKILL.md")):
        text = read_text(skill_path)
        fm = frontmatter(text, skill_path)
        name = fm.get("name", "")
        description = fm.get("description", "")
        if not NAME_RE.fullmatch(name):
            raise ValueError(f"{skill_path}: invalid skill name {name!r}")
        if not description:
            raise ValueError(f"{skill_path}: missing description")
        if name in skills:
            raise ValueError(f"duplicate Cursor skill name: {name}")
        skills[name] = (skill_path, text.rstrip() + "\n")
    return skills


def mirrored_text(name: str, source_path: Path, canonical_text: str) -> str:
    source = source_path.relative_to(ROOT).as_posix()
    marker = f"{MARKER_PREFIX} SOURCE: {source}; NAME: {name} -->"
    return f"{marker}\n{canonical_text}"


def is_generated_skill(path: Path) -> bool:
    skill = path / "SKILL.md"
    if not skill.is_file():
        return False
    return read_text(skill).startswith(MARKER_PREFIX)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail if mirrored skills are missing or stale")
    args = parser.parse_args()

    try:
        skills = canonical_skills()
    except ValueError as exc:
        print(f"agent skill sync failed: {exc}", file=sys.stderr)
        return 1

    changes: list[str] = []
    AGENT_SKILLS.mkdir(parents=True, exist_ok=True)

    for name, (source_path, canonical_text) in sorted(skills.items()):
        dest_dir = AGENT_SKILLS / name
        dest = dest_dir / "SKILL.md"
        expected = mirrored_text(name, source_path, canonical_text)
        current = read_text(dest) if dest.is_file() else None
        if current != expected:
            changes.append(f"update {dest.relative_to(ROOT).as_posix()}")
            if not args.check:
                dest_dir.mkdir(parents=True, exist_ok=True)
                dest.write_text(expected, encoding="utf-8", newline="\n")

    for child in sorted(AGENT_SKILLS.iterdir() if AGENT_SKILLS.exists() else []):
        if not child.is_dir() or child.name in skills:
            continue
        if is_generated_skill(child):
            changes.append(f"remove {child.relative_to(ROOT).as_posix()}")
            if not args.check:
                shutil.rmtree(child)

    if args.check and changes:
        print("agent skill sync check FAILED")
        for change in changes:
            print(f"- {change}")
        return 1

    if changes:
        print("agent skill sync updated:")
        for change in changes:
            print(f"- {change}")
    else:
        print(f"agent skill sync ok: {len(skills)} skills")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
