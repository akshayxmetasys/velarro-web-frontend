# Observability Review Checklist

- [ ] Meaningful OpenTelemetry spans exist at operation and dependency boundaries.
- [ ] Trace context propagates across HTTP/RPC, queues, jobs, and async tasks.
- [ ] Span names are stable and attributes are low-cardinality.
- [ ] No secrets, raw payloads, or sensitive personal data enter telemetry.
- [ ] Structured logs include event, severity, operation, outcome, correlation, and safe identifiers.
- [ ] Errors preserve causal context without duplicate logging.
- [ ] Demand, errors, latency, saturation, and critical outcome metrics exist with explicit units.
- [ ] Metric labels have bounded cardinality and no user-controlled arbitrary values.
- [ ] Timeouts, retries, circuit state, queue depth, and resource saturation are observable.
- [ ] Dashboards, SLOs, alerts, runbooks, and owners are updated.
- [ ] Telemetry behavior is tested where it forms part of the operational contract.
