<!-- GENERATED-BY: scripts/sync_agent_skills.py; SOURCE: .cursor/skills/production-readiness-review/SKILL.md; NAME: production-readiness-review -->
---
name: production-readiness-review
description: Use before merging or deploying a substantial feature, service, migration, infrastructure change, performance change, or reliability/security-sensitive fix.
---

# Production Readiness Review Skill

## Review sequence

1. Confirm scope and acceptance criteria are fully implemented.
2. Inspect the complete diff and generated artifacts.
3. Verify architecture boundaries and ADR status.
4. Verify strict types, validation, invariants, errors, and backward compatibility.
5. Verify threat model, authorization, secrets, dependency, and scanner status.
6. Verify tests across required layers and review untested risk.
7. Verify OpenTelemetry, structured logging, metrics, dashboards, alerts, and runbooks.
8. Verify performance budget and capacity assumptions.
9. Verify configuration, migrations, feature flags, rollout, health checks, and rollback.
10. Run repository-native formatter, lint, type, test, build, architecture, security, accessibility, and benchmark gates as applicable.

## Final report format

- implemented scope;
- validation commands and observed outcomes;
- security/reliability/performance status;
- deployment and migration sequence;
- rollback triggers and method;
- known limitations and residual risk;
- explicit go/no-go recommendation based only on evidence.
