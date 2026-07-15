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

The scanner intentionally uses conservative heuristics. It is not a replacement for Gitleaks, SAST, SCA, architecture linting, type checking, or repository-native tests.
