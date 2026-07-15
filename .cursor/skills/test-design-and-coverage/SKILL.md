---
name: test-design-and-coverage
description: Use to design tests for new behavior, bug fixes, refactors, APIs, migrations, security controls, concurrency, failure handling, observability, accessibility, or performance-sensitive code.
---

# Test Design and Coverage Skill

## Workflow

1. Convert acceptance criteria and invariants into a requirement-to-test matrix.
2. Select the lowest-cost test layer that proves each behavior without coupling to implementation.
3. Reuse existing fixtures and test utilities.
4. Cover expected, boundary, malformed, denied, timeout, retry, duplicate, concurrency, cleanup, and recovery behavior according to risk.
5. Control nondeterminism through injected clocks/randomness, fixed seeds, ephemeral resources, and observable synchronization.
6. Verify telemetry and redaction when operational behavior is part of the contract.
7. Run focused tests, then broader suites and coverage/mutation tools supported by the repository.
8. Report remaining untested risks rather than manufacturing low-value tests.

## Test quality bar

Every test must have a meaningful failure mode, deterministic setup, explicit assertion, clear ownership, bounded runtime, and cleanup. Avoid sleeps, private-method mocks, implementation duplication, and broad snapshots that conceal semantics.
