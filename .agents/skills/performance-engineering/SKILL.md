<!-- GENERATED-BY: scripts/sync_agent_skills.py; SOURCE: .cursor/skills/performance-engineering/SKILL.md; NAME: performance-engineering -->
---
name: performance-engineering
description: Use for latency, throughput, CPU, memory, allocations, large datasets, hot loops, serialization, database performance, concurrency, backpressure, caching, or capacity planning.
---

# Performance Engineering Skill

## Workflow

1. Define workload and budget: rate, concurrency, payload/data size, latency percentiles, throughput, CPU, memory, and error tolerance.
2. Collect a representative baseline using existing benchmarks, profiler, tracing, database plans, or load tooling.
3. Decompose end-to-end cost into compute, allocation/copy, storage, network, contention, queueing, and retry components.
4. Rank bottlenecks by measured contribution.
5. Choose the simplest change with the highest expected impact.
6. For hot paths, assess streaming, zero/bounded copy, batching, preallocation, contiguous layout, cache locality, and bounded concurrency.
7. Preserve correctness with a reference/property test and add a performance regression threshold.
8. Re-run measurements under the same conditions and report variance.

## Complexity annotation

For each performance-critical function, document:

- time: best/typical/worst when materially different;
- auxiliary space;
- dominant allocations and copies;
- I/O and synchronization operations;
- input characteristic that drives the worst case.

## Stop conditions

Stop and request explicit design review before adding unsafe memory, lock-free algorithms, custom allocators, unbounded caches, or weaker durability/security semantics.
