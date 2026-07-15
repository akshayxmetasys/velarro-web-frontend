#!/usr/bin/env python3
"""Local deterministic policy hooks for Cursor.

Input: one JSON object on stdin.
Output: one JSON object on stdout.
No network access and no third-party dependencies.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Iterable

MODE = os.getenv("CURSOR_GUARD_MODE", "strict").strip().lower()
if MODE not in {"strict", "balanced", "audit"}:
    MODE = "strict"

ROOT = Path.cwd()
STATE_DIR = Path(os.getenv("CURSOR_GUARD_STATE_DIR", ROOT / ".cursor" / ".state"))


@dataclass(frozen=True)
class Finding:
    severity: str
    rule: str
    message: str
    file_path: str | None = None
    evidence: str | None = None


def read_event() -> dict[str, Any]:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    try:
        value = json.loads(raw)
    except json.JSONDecodeError:
        return {"_invalid_json": True, "_raw_sha256": hashlib.sha256(raw.encode()).hexdigest()}
    return value if isinstance(value, dict) else {"_invalid_shape": True}


def emit(payload: dict[str, Any]) -> None:
    sys.stdout.write(json.dumps(payload, separators=(",", ":")))
    sys.stdout.flush()


def clean_evidence(text: str, limit: int = 140) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    # Never echo likely credential values.
    text = re.sub(r"(?i)(password|passwd|secret|token|api[_-]?key|authorization)\s*[:=]\s*[^\s,;]+", r"\1=<redacted>", text)
    return text[:limit]


def state_key(event: dict[str, Any]) -> str:
    raw = str(event.get("generation_id") or event.get("conversation_id") or "default")
    return re.sub(r"[^A-Za-z0-9._-]", "_", raw)[:120] or "default"


def record(event: dict[str, Any], findings: Iterable[Finding]) -> None:
    findings = list(findings)
    if not findings:
        return
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    path = STATE_DIR / f"{state_key(event)}.jsonl"
    with path.open("a", encoding="utf-8") as handle:
        for finding in findings:
            handle.write(json.dumps(asdict(finding), sort_keys=True) + "\n")


SECRET_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("private-key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----")),
    ("aws-access-key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("github-token", re.compile(r"\bgh[pousr]_[A-Za-z0-9_]{30,}\b")),
    ("openai-key", re.compile(r"\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b")),
    ("slack-token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{20,}\b")),
    ("generic-secret-assignment", re.compile(r"(?i)\b(password|passwd|secret|api[_-]?key|access[_-]?token|client[_-]?secret)\b\s*[:=]\s*[\"'][^\"'\n]{8,}[\"']")),
)


def secret_findings(text: str, file_path: str | None = None) -> list[Finding]:
    out: list[Finding] = []
    for rule, pattern in SECRET_PATTERNS:
        match = pattern.search(text)
        if match:
            out.append(Finding("critical", f"secret.{rule}", "Likely hardcoded credential or private key detected.", file_path, f"<redacted:{rule}>"))
    return out


CATASTROPHIC_COMMANDS: tuple[tuple[str, re.Pattern[str], str], ...] = (
    ("filesystem-root-delete", re.compile(r"(?i)(?:^|[;&|]\s*)rm\s+-[^\n]*r[^\n]*f[^\n]*\s+(?:/|~|\$HOME)(?:\s|$)"), "Recursive deletion of a root/home path is forbidden."),
    ("windows-root-delete", re.compile(r"(?i)\b(?:rmdir|rd)\s+/s\s+/q\s+[A-Z]:\\(?:\s|$)"), "Recursive deletion of a drive root is forbidden."),
    ("disk-overwrite", re.compile(r"(?i)\bdd\s+[^\n]*\bof=/dev/(?:sd|nvme|vd)"), "Direct block-device overwrite is forbidden."),
    ("git-destructive-reset", re.compile(r"(?i)\bgit\s+reset\s+--hard\b"), "Destructive Git reset is forbidden through the agent hook."),
    ("git-clean-all", re.compile(r"(?i)\bgit\s+clean\s+-[^\n]*[xX][^\n]*f"), "Destructive Git clean including ignored files is forbidden."),
    ("remote-pipe-shell", re.compile(r"(?i)\b(?:curl|wget)\b[^\n|]*\|\s*(?:sudo\s+)?(?:sh|bash|zsh|fish|pwsh|powershell)\b"), "Piping remote content directly into a shell is forbidden."),
)

RISKY_COMMANDS: tuple[tuple[str, re.Pattern[str], str], ...] = (
    ("force-push", re.compile(r"(?i)\bgit\s+push\b[^\n]*(?:--force(?:-with-lease)?|-f)\b"), "Force push requires explicit user approval."),
    ("bypass-hooks", re.compile(r"(?i)\bgit\s+(?:commit|push)\b[^\n]*--no-verify\b"), "Bypassing repository verification requires explicit approval."),
    ("permissive-mode", re.compile(r"(?i)\bchmod\s+(?:-R\s+)?777\b"), "World-writable permissions require explicit approval."),
    ("database-destroy", re.compile(r"(?i)\b(?:drop\s+(?:database|schema|table)|truncate\s+table)\b"), "Destructive database operation requires explicit approval and recovery evidence."),
    ("terraform-destroy", re.compile(r"(?i)\bterraform\s+destroy\b|\b(?:tofu|opentofu)\s+destroy\b"), "Infrastructure destruction requires explicit approval."),
    ("kubectl-delete-wide", re.compile(r"(?i)\bkubectl\s+delete\b[^\n]*(?:--all\b|namespace\b)"), "Wide Kubernetes deletion requires explicit approval."),
    ("print-environment", re.compile(r"(?i)(?:^|[;&|]\s*)(?:env|printenv|set)(?:\s|$)"), "Printing the complete environment may expose secrets."),
)

UNPINNED_INSTALL = re.compile(
    r"(?ix)\b(?:npm\s+(?:install|i|add)|yarn\s+add|pnpm\s+(?:add|install|i)|bun\s+(?:add|install|i)|pip(?:3)?\s+install|python\s+-m\s+pip\s+install|poetry\s+add|uv\s+(?:add|pip\s+install)|cargo\s+(?:add|install)|go\s+(?:get|install))\s+([@A-Za-z0-9_./-]+)(?![@=][A-Za-z0-9_.+-])"
)


def before_shell(event: dict[str, Any]) -> None:
    command_value = event.get("command")
    if event.get("_invalid_json") or event.get("_invalid_shape") or not isinstance(command_value, str) or not command_value.strip():
        finding = Finding("critical", "shell.malformed-event", "Malformed before-shell event; failing closed.")
        record(event, [finding])
        summary = finding.message
        emit({"permission": "deny", "user_message": summary, "agent_message": summary})
        return

    command = command_value
    findings = secret_findings(command)

    for rule, pattern, message in CATASTROPHIC_COMMANDS:
        if pattern.search(command):
            findings.append(Finding("critical", f"shell.{rule}", message, evidence=clean_evidence(command)))

    risky: list[Finding] = []
    for rule, pattern, message in RISKY_COMMANDS:
        if pattern.search(command):
            risky.append(Finding("high", f"shell.{rule}", message, evidence=clean_evidence(command)))

    if UNPINNED_INSTALL.search(command):
        risky.append(Finding("medium", "shell.unpinned-dependency", "Dependency addition appears unpinned. Use an exact reviewed version and update the lockfile.", evidence=clean_evidence(command)))

    record(event, findings + risky)

    if MODE == "audit":
        emit({"permission": "allow"})
        return
    if findings:
        summary = " ".join(sorted({f.message for f in findings}))
        emit({"permission": "deny", "user_message": summary, "agent_message": summary})
        return
    if risky and MODE == "strict":
        summary = " ".join(sorted({f.message for f in risky}))
        emit({"permission": "ask", "user_message": summary, "agent_message": summary})
        return
    emit({"permission": "allow"})


EDIT_PATTERNS: tuple[tuple[str, str, re.Pattern[str], str], ...] = (
    ("high", "code.dynamic-eval", re.compile(r"(?m)\b(?:eval|new\s+Function)\s*\("), "Dynamic code execution requires a documented trusted-input boundary."),
    ("high", "code.unsafe-process", re.compile(r"(?m)\b(?:exec|system|popen|Runtime\.getRuntime\(\)\.exec)\s*\("), "Process execution requires structured arguments, validation, and an explicit boundary."),
    ("medium", "typing.escape", re.compile(r"(?m)(?::\s*any\b|\bas\s+any\b|@ts-ignore\b|type:\s*ignore\b|noinspection\b)"), "Untyped or suppression escape detected; replace it with a validated contract or narrow documented exception."),
    ("medium", "debug.output", re.compile(r"(?m)\b(?:console\.(?:log|debug)|print\s*\(|fmt\.Print(?:f|ln)?\s*\(|System\.out\.print)"), "Debug-style output detected; use the approved structured logger or remove it."),
    ("medium", "security.dangerous-html", re.compile(r"\bdangerouslySetInnerHTML\b|\.innerHTML\s*="), "Raw HTML insertion requires sanitization, output-encoding analysis, and a security test."),
    ("low", "hygiene.todo", re.compile(r"(?m)\b(?:TODO|FIXME|HACK|XXX)\b"), "Placeholder marker introduced; complete it or create a tracked, owned, time-bounded follow-up."),
)

PRODUCTION_EXTENSIONS = {".py", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".go", ".rs", ".java", ".kt", ".kts", ".cs", ".cpp", ".cc", ".c", ".h", ".hpp", ".rb", ".php", ".swift"}
TEST_MARKERS = ("test", "spec", "__tests__", "tests/")


def new_text(event: dict[str, Any]) -> str:
    edits = event.get("edits")
    if isinstance(edits, list):
        parts = []
        for edit in edits:
            if isinstance(edit, dict):
                value = edit.get("new_string")
                if isinstance(value, str):
                    parts.append(value)
        return "\n".join(parts)
    value = event.get("new_string") or event.get("content")
    return value if isinstance(value, str) else ""


def after_edit(event: dict[str, Any]) -> None:
    path = str(event.get("file_path") or event.get("path") or "")
    text = new_text(event)
    findings = secret_findings(text, path)

    for severity, rule, pattern, message in EDIT_PATTERNS:
        match = pattern.search(text)
        if match:
            findings.append(Finding(severity, rule, message, path, clean_evidence(match.group(0))))

    lower_path = path.lower().replace("\\", "/")
    is_test = any(marker in lower_path for marker in TEST_MARKERS)
    if is_test and re.search(r"\b(?:Date\.now|Math\.random|time\.time|datetime\.now|random\.random|System\.currentTimeMillis)\s*\(", text):
        findings.append(Finding("medium", "test.nondeterminism", "Uncontrolled time or randomness detected in a test; inject/freeze it or use a fixed seed.", path))

    suffix = Path(path).suffix.lower()
    is_new_module = bool(text.strip()) and suffix in PRODUCTION_EXTENSIONS and not is_test
    if is_new_module:
        telemetry_signal = re.search(r"(?i)opentelemetry|tracer|span|metric|structured.?log|logger", text)
        test_signal = re.search(r"(?i)test|spec|doctest|example", text)
        if not telemetry_signal and len(text) > 500:
            findings.append(Finding("low", "observability.review", "New or substantial production code has no visible telemetry integration; verify whether an operation boundary requires tracing, metrics, or structured logging.", path))
        if not test_signal and len(text) > 500:
            findings.append(Finding("low", "testing.review", "New or substantial production code requires corresponding behavior tests; verify that tests were added in the repository's test location.", path))

    record(event, findings)
    emit({})


def stop(event: dict[str, Any]) -> None:
    key = state_key(event)
    candidates = [STATE_DIR / f"{key}.jsonl"]
    if key == "default" and STATE_DIR.exists():
        candidates = list(STATE_DIR.glob("*.jsonl"))

    findings: list[dict[str, Any]] = []
    for path in candidates:
        if not path.exists():
            continue
        try:
            for line in path.read_text(encoding="utf-8").splitlines():
                value = json.loads(line)
                if isinstance(value, dict):
                    findings.append(value)
        except (OSError, json.JSONDecodeError):
            pass
        try:
            path.unlink()
        except OSError:
            pass

    if not findings:
        emit({})
        return

    # De-duplicate without revealing secret values.
    unique: dict[tuple[str, str, str], dict[str, Any]] = {}
    for f in findings:
        key_tuple = (str(f.get("severity")), str(f.get("rule")), str(f.get("file_path")))
        unique[key_tuple] = f

    order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    ranked = sorted(unique.values(), key=lambda f: (order.get(str(f.get("severity")), 9), str(f.get("rule"))))
    lines = ["Cursor guard recorded policy findings. Before finalizing, resolve each item or provide a precise, evidence-based justification:"]
    for f in ranked[:25]:
        location = f" [{f.get('file_path')}]" if f.get("file_path") else ""
        lines.append(f"- {str(f.get('severity', 'unknown')).upper()} {f.get('rule')}{location}: {f.get('message')}")
    if len(ranked) > 25:
        lines.append(f"- {len(ranked) - 25} additional findings were omitted from this message.")
    lines.append("Run the repository's formatter, linter, strict type checker, tests, build, architecture checks, and security scans as applicable. Do not claim they passed unless executed.")
    emit({"followup_message": "\n".join(lines)})


def main() -> int:
    event = read_event()
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode == "before-shell":
        before_shell(event)
    elif mode == "after-edit":
        after_edit(event)
    elif mode == "stop":
        stop(event)
    else:
        emit({"error": "Usage: guard.py before-shell|after-edit|stop"})
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
