<!-- GENERATED-BY: scripts/sync_agent_skills.py; SOURCE: .cursor/skills/architecture-conformance/SKILL.md; NAME: architecture-conformance -->
---
name: architecture-conformance
description: Use when adding modules, dependencies, services, integrations, APIs, persistence, events, queues, or refactoring boundaries. Verifies dependency direction, cohesion, contracts, cycles, and ADR needs.
---

# Architecture Conformance Skill

## Workflow

1. Inventory modules, deployable units, public interfaces, and ownership boundaries affected by the change.
2. Read architecture docs, ADRs, dependency-linter configuration, and representative neighboring modules.
3. Draw the intended dependency direction in plain text.
4. Trace every proposed import/call/event through that direction.
5. Reject cycles, inward dependencies on infrastructure, hidden service location, and shared mutable globals.
6. Define or refine typed ports/contracts at the consuming boundary.
7. Keep adapters at the edge and map vendor/database/transport types into internal types.
8. Add architecture tests or dependency-linter rules.
9. Create an ADR when the decision is material.
10. Validate with repository-native architecture, type, test, and build commands.

## Deliverables

- affected-boundary map;
- allowed and forbidden dependency directions;
- exact conformance findings;
- code/tests/config changes;
- ADR decision if required;
- validation evidence and unresolved risks.
