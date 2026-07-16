# Performance Budget: Workload or service

## Workload definition

- Operation/journey:
- Request/event rate:
- Concurrency:
- Payload/data distribution:
- Environment and hardware/runtime:
- Warm/cold state:

## Budgets

- Latency p50/p95/p99:
- Throughput:
- Error/timeout rate:
- CPU:
- Resident/peak memory:
- Allocations/GC:
- Storage/network I/O:
- Queue depth and maximum wait:
- Startup/cold start:

## Measurement method

Tool, duration, warm-up, sample count, dataset, isolation, profiler/tracing configuration, and variance treatment.

## Regression policy

Threshold, confidence, allowed variance, CI behavior, owner, and exception process.

## Capacity and degradation

Saturation point, backpressure behavior, shedding/degradation strategy, and scaling trigger.
