# Cursor Agent System

This repository uses Cursor rules, skills, subagents, hooks, and Codex mirrors to keep Velarro Estate engineering work strict, repeatable, and low-maintenance.

## Canonical Files

- `.cursor/rules/*.mdc` are the authoritative Cursor project rules.
- `.cursor/skills/*/SKILL.md` are the authoritative Cursor skills.
- `.cursor/agents/*.md` are the Cursor subagents.
- `.cursor/hooks.json` is the active portable hook configuration.
- `.cursor/hooks/guard.py` is the dependency-free hook implementation.
- `.agents/skills/*/SKILL.md` are generated Codex mirrors. Do not edit them directly.
- `.cursorrules` is a legacy compatibility mirror only.
- `AGENTS.md` is the root Codex instruction file.

## Discovery

Cursor discovers project rules from `.cursor/rules`, skills from `.cursor/skills`, subagents from `.cursor/agents`, and lifecycle hooks from `.cursor/hooks.json`. Codex reads `AGENTS.md`; repository-scoped Codex skills are mirrored from Cursor skills by `scripts/sync_agent_skills.py`.

## Skills

Use the six enterprise skills when their trigger descriptions apply:

- `architecture-conformance`: architecture boundaries, dependency direction, module ownership, or design decisions.
- `performance-engineering`: latency, bundle, rendering, concurrency, memory, or resource-use changes.
- `secure-change-review`: trust boundaries, input handling, CSP, secrets, dependencies, or security-sensitive code.
- `observability-instrumentation`: logging, metrics, tracing, errors, reliability, or production diagnosis.
- `test-design-and-coverage`: test strategy, coverage gaps, fixtures, deterministic tests, or regression protection.
- `production-readiness-review`: release readiness, rollback, CI evidence, documentation, operational risk, and final review.

The existing Velarro skills remain canonical for Velarro security coding and visibility/SEO coding.

## Subagents

Delegate to:

- `senior-performance-agent` for performance-sensitive implementation or review.
- `security-auditor-agent` for asset, actor, trust-boundary, data-flow, authorization, dependency, and supply-chain review.
- `test-coverage-agent` for mapping requirements to deterministic tests and reporting residual gaps.

Existing Velarro subagents remain available for Figma extraction, implementation review, QA, security, and visibility. The parent agent remains accountable for the integrated change and final evidence.

## Hooks

The active hook runtime is Python because the repository already requires npm/Node for application work and Python is available in the local environment and configured in CI for deterministic hook validation.

Hook events:

- `beforeShellExecution`: denies catastrophic deletion, destructive Git reset/clean, remote pipe-to-shell, likely secrets, and malformed events. In strict mode it asks for approval for force pushes, verification bypass, destructive database or infrastructure operations, broad Kubernetes deletion, unsafe permissions, complete environment dumping, and unpinned dependency additions.
- `afterFileEdit`: records minimal redacted findings for likely secrets, unsafe dynamic execution, type escapes, debug output, raw HTML insertion, placeholder markers, nondeterministic tests, and missing review signals on substantial new production code.
- `stop`: consolidates findings into one self-review message and clears session state.

Modes are controlled by `CURSOR_GUARD_MODE=strict|balanced|audit`; strict is the default. `CURSOR_GUARD_STATE_DIR` may point state at a temporary directory for tests.

Legacy PowerShell hook files are retained as historical Velarro references, but `.cursor/hooks.json` uses the portable Python guard.

## Validation

Run from the repository root:

```bash
npm run agent-skills:sync
npm run agent-skills:check
npm run cursor:validate
npm run cursor:hooks:test
npm run cursor:check
```

Application changes should also run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run test:e2e -- --list` as applicable.

## CI

`.github/workflows/cursor-agent-config.yml` runs on pull requests and pushes that touch agent configuration, engineering docs, or validation scripts. It checks mirrored skill drift, validates Cursor config, tests hooks, parses hook JSON, syntax-checks scripts, checks generated output drift, and rejects generated state or installer artifacts.

The existing `.github/workflows/ci.yml` continues to run application lint, type-check, tests, build, and E2E test listing.

## Safe Changes

To change policy safely:

1. Update the canonical file first.
2. Keep root `AGENTS.md` concise and durable.
3. Run `npm run agent-skills:sync` after changing `.cursor/skills`.
4. Run `npm run cursor:check`.
5. Document material architecture or operational decisions with the templates in `docs/engineering`.

To add a new rule, skill, subagent, or hook, follow the same frontmatter conventions, avoid secrets and machine-specific paths, keep behavior deterministic, and add focused validation when behavior changes.

## Blocked Commands

When a command is blocked, read the hook message, inspect `.cursor/hooks/guard.py` for the triggering policy, and decide whether to change the command, run a safer equivalent, or obtain explicit approval. Do not bypass hooks with `--no-verify` or by editing hook configuration to hide the risk.

## Limits

The hook scanner is heuristic. It is not proof of security, correctness, accessibility, performance, or production readiness. It complements TypeScript, ESLint, Vitest, Playwright, production builds, code review, and focused specialist review.

## Operating Model

For a two-engineer team, keep the system small: one canonical source per policy, generated mirrors checked by CI, no symlinks, no third-party hook dependencies, no network calls in hooks, and no heavyweight scanners added unless they are already part of the repository toolchain or are separately approved.
