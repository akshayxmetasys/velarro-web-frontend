# Cursor policy hooks

The hook is dependency-free Python and reads one JSON event from standard input.

Modes:

- `before-shell`: returns `allow`, `ask`, or `deny` through Cursor's permission response.
- `after-edit`: scans edited content and stores findings under `.cursor/.state/`.
- `stop`: returns one consolidated `followup_message` and deletes the session state.

Environment controls:

- `CURSOR_GUARD_MODE=strict|balanced|audit` (default: `strict`).
  - `strict`: risky commands require approval and critical patterns are denied.
  - `balanced`: catastrophic/secret patterns are denied; other findings are audited.
  - `audit`: does not block commands; records findings only.
- `CURSOR_GUARD_STATE_DIR=/custom/path` overrides the state directory.

Windows/Cursor stdin robustness:

- Accepts UTF-8 and UTF-16 hook payloads.
- Extracts the first `{...}` JSON object when Cursor prefixes framing junk (historically logged as `n++{...}`).
- Resolves `command` from top-level or nested `tool_input` / `input` / `arguments`.

Production-module heuristics intentionally **exclude** `.cursor/hooks/` and related Cursor/Codex tooling paths. Those scripts are local deterministic policy scanners (stdin/stdout, no network). They do not sit on an application request path and must not require OpenTelemetry. Behavior coverage lives in `.cursor/hooks/tests/` and is executed by `npm run cursor:hooks:test`.

The scanner intentionally uses conservative heuristics. It is not a replacement for Gitleaks, SAST, SCA, architecture linting, type checking, or repository-native tests.
