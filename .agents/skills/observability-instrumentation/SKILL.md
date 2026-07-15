---
name: observability-instrumentation
description: Use when adding or changing production modules, APIs, jobs, workflows, database operations, external calls, queues, caches, or operational failure behavior.
---
<!-- codex-skill-mirror: generated-from=.cursor/skills/observability-instrumentation/SKILL.md; do-not-edit -->


# Observability Instrumentation Skill

## Workflow

1. Find the repository's logger, OpenTelemetry initialization, semantic conventions, metric registry, dashboards, alerts, SLOs, and runbooks.
2. Define the operation boundary and telemetry questions: demand, success/failure, latency, saturation, dependency behavior, and critical business outcome.
3. Add spans only at meaningful boundaries and propagate context across all async/distributed hops.
4. Use stable low-cardinality attributes and redact sensitive data.
5. Add structured events at the ownership layer; avoid duplicate logs.
6. Add counters/gauges/histograms with explicit units, descriptions, and bounded labels.
7. Add tests for context propagation, error status, log redaction, metric emission, and cardinality where tooling supports it.
8. Update operational documentation and alert/runbook ownership.

## Review checklist

- no raw secrets or payloads;
- no user-controlled metric label values;
- no per-function span noise;
- no duplicate exception logs;
- timeout/retry/circuit state observable;
- telemetry failure cannot break the business operation unless explicitly required.
