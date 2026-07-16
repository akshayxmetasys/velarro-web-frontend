# Cursor Agent System

## Canonical Files

- Cursor rules: `.cursor/rules/*.mdc`
- Cursor skills: `.cursor/skills/<name>/SKILL.md`
- Cursor subagents: `.cursor/agents/*.md`
- Cursor hooks: `.cursor/hooks.json` and `.cursor/hooks/`
- Codex repository skill mirrors: `.agents/skills/<name>/SKILL.md`
- Legacy compatibility mirror: `.cursorrules`
- Root Codex guidance: `AGENTS.md`

`.cursor/rules/` and `.cursor/skills/` are the sources of truth. Do not edit generated `.agents/skills/` files directly; edit the canonical Cursor skill and run `npm run agent-skills:sync`.

## Discovery

Cursor reads project rules from `.cursor/rules/*.mdc`, skills from `.cursor/skills/`, subagents from `.cursor/agents/`, and lifecycle hooks from `.cursor/hooks.json`. Codex reads `AGENTS.md` and repository skills under `.agents/skills/`.

## Skills

Use the six enterprise skills when their trigger descriptions match the task:

- `architecture-conformance`: module boundaries, dependencies, APIs, persistence, integrations, or refactors.
- `performance-engineering`: latency, bundle size, rendering, concurrency, resource usage, or budgets.
- `secure-change-review`: auth, input, secrets, dependencies, browser security, CI/CD, or sensitive data.
- `observability-instrumentation`: logs, metrics, traces, alerting, SLOs, and failure visibility.
- `test-design-and-coverage`: test strategy, coverage gaps, deterministic regression tests, and quality gates.
- `production-readiness-review`: release safety, rollback, operational risk, docs, and final readiness.

The existing Velarro skills remain canonical for Velarro-specific security and visibility work.

## Subagents

- `senior-performance-agent`: use for measured performance analysis before optimization.
- `security-auditor-agent`: use for assets, actors, trust boundaries, data flow, authorization, secrets, and supply-chain risk.
- `test-coverage-agent`: use for mapping requirements to deterministic tests and residual coverage gaps.

Existing Velarro subagents remain available for Figma extraction, implementation review, QA, security, and visibility review. The parent agent remains accountable for the final integrated change.

## Hooks

The active lifecycle hooks are:

- `beforeShellExecution`: runs `.cursor/hooks/guard.py before-shell` before commands.
- `afterFileEdit`: runs `.cursor/hooks/guard.py after-edit` after edits.
- `stop`: runs `.cursor/hooks/guard.py stop` at session end.

Existing Velarro PowerShell logging hooks are preserved. The enterprise guard is dependency-free Python and supports `strict`, `balanced`, and `audit` modes through `CURSOR_GUARD_MODE`. Default mode is `strict`.

The guard blocks catastrophic deletion, destructive Git reset/clean, remote pipe-to-shell, likely secrets, and malformed before-shell input. In strict mode it asks for approval on risky actions such as force pushes, verification bypasses, broad Kubernetes deletion, infrastructure destruction, unsafe permissions, full environment dumps, and unpinned dependency additions. Findings are redacted and stored temporarily under `.cursor/.state/`, which is ignored.

## Commands

- Sync Codex skill mirrors: `npm run agent-skills:sync`
- Check skill mirror drift: `npm run agent-skills:check`
- Validate Cursor config: `npm run cursor:validate`
- Test hooks: `npm run cursor:hooks:test`
- Run all Cursor checks: `npm run cursor:check`

Use `npm.cmd` instead of `npm` from Windows PowerShell if execution policy blocks `npm.ps1`.

## CI

`.github/workflows/cursor-agent-config.yml` runs on relevant agent configuration changes. It checks skill mirror drift, validates rules/skills/agents/hooks, runs hook tests, compiles scripts, parses hook JSON, rejects generated runtime artifacts, and verifies deterministic generated files with `git diff --exit-code`.

The main app CI remains responsible for install, lint, type-check, tests, build, and E2E listing.

## Changing Policies

Make policy changes in the canonical source, keep changes small, and run `npm run cursor:check`. Add or update tests for hook behavior. Use ADRs for material governance, security, architecture, or delivery changes.

To add a skill, create `.cursor/skills/<name>/SKILL.md`, validate frontmatter, run `npm run agent-skills:sync`, and commit both canonical and mirrored files. To add a rule, create one focused `.mdc` file with `description` and scoped `globs`; keep exactly one always-applied core rule. To add a subagent, create `.cursor/agents/<name>.md` with `name`, `description`, and `model`.

## Blocked Commands

When a command is blocked, read the guard message, inspect whether the command is actually necessary, and prefer a safer command. If a risky action is genuinely required, obtain explicit user approval and document the reason. Never bypass hooks with `--no-verify`.

## Limits

The system is a deterministic local guardrail. It is not a proof of security, a replacement for review, a secret scanner with full coverage, a CI substitute, or a guarantee that generated content is correct. Keep the operating model lightweight: canonical files, deterministic sync, fast local checks, and focused CI enforcement.
