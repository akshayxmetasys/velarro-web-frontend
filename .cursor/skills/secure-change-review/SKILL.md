---
name: secure-change-review
description: Use for security-sensitive code, external input, authentication, authorization, APIs, uploads, webhooks, secrets, cryptography, dependencies, infrastructure, or pre-merge security review.
---

# Secure Change Review Skill

## Workflow

1. Identify assets, actors, entry points, trust boundaries, privileges, and sensitive data.
2. Define the security invariants that must remain true.
3. Trace untrusted data to every sink and verify canonicalization, validation, authorization, and output encoding.
4. Verify server-side object/action authorization and tenant isolation.
5. Review authentication/session lifecycle, replay, CSRF, idempotency, and audit logging.
6. Review injection, SSRF, traversal, unsafe parsing/deserialization, file handling, redirects, and denial-of-service bounds.
7. Review secret use, logging/redaction, cryptographic purpose separation, rotation, and failure behavior.
8. Inspect dependency and lockfile changes, install scripts, generated code, CI identities, containers, and IaC.
9. Add adversarial and negative tests.
10. Run available secret, SAST, SCA, license, container, IaC, and test gates.

## Output

Produce a ranked finding table with evidence, exploit preconditions, impact, remediation, regression test, and residual risk. Never infer a clean scan that was not run.
