# E2E Web Server Lifecycle

The E2E command is owned by `scripts/run-e2e.mjs`, not by Playwright's
`webServer` feature.

The Windows diagnostic for this remediation proved that the previous
Playwright-owned server path reached:

```text
pw:webserver Terminating the WebServer
```

and then hung before Playwright printed a matching `Terminated` message or a
final test summary. The exact Playwright or `taskkill` defect was not proven,
so this remediation avoids that lifecycle boundary instead of claiming a
vendor root cause.

A later focused Chronicle run using the repository-owned runner proved a
separate cleanup edge case: all four Chronicle tests passed and Playwright
completed, but Windows cleanup reported `ERROR: Access denied` from `taskkill`
for the owned Next PID. Port 3000 was clear afterward. That result does not
prove a specific Windows or `taskkill` defect, but it does prove that the
runner must base cleanup success on the observed final state of the exact
spawned child instead of treating the `taskkill` exit status as authoritative.

## Process Topology

The supported E2E topology is:

```text
npm run test:e2e
  -> node scripts/run-e2e.mjs
     -> direct Next production server child
     -> HTTP readiness polling
     -> direct Playwright CLI child
     -> preserve Playwright exit code
     -> stop the exact owned Next server tree
```

The runner resolves the installed Next and Playwright CLIs through Node's
package resolver and starts both through `process.execPath` with `shell: false`.
It does not use `npx`, `npm`, `npm.cmd`, `cmd.exe`, or port-wide process
termination as runtime lifecycle mechanisms.

## Readiness

Next binds only to `127.0.0.1:3000`. Before startup, the runner verifies that
the port is available. After startup, it polls:

```text
http://127.0.0.1:3000/
```

using Node's HTTP APIs with bounded attempts and an overall readiness timeout.
Playwright starts only after readiness succeeds.

## Cleanup

The runner tracks the exact child PIDs it creates. Cleanup is idempotent and
bounded, and it never terminates by executable name, every Node process, or
every process using a port.

On Windows, the runner first checks whether the exact owned Next child has
already emitted `exit`. If it has, cleanup is complete and the old PID is not
targeted again. If the child is still active, the runner requests shutdown
through that child object and waits a bounded grace period for the same child's
`exit` event.

Only after that grace period does Windows cleanup escalate to:

```text
taskkill /PID <owned-next-pid> /T /F
```

`taskkill` is invoked without a shell, with the exact owned child PID, and with
a timeout. After `taskkill` completes, fails, or times out, the runner again
waits briefly for the exact child exit event. A nonzero `taskkill` status is
retained as a diagnostic warning, but it is not authoritative when the exact
owned child is confirmed exited. Cleanup fails only when the exact owned child
still has not exited after all bounded stages, or when cleanup cannot confirm
that exit.

On Linux and macOS, the Next server starts in an owned process group. Cleanup
sends `SIGTERM` to only that group and escalates to `SIGKILL` only after a
bounded grace period.

If the runner receives `SIGINT`, `SIGTERM`, an uncaught exception, or an
unhandled rejection, it stops only its owned Playwright child tree and owned
Next server tree before exiting nonzero.

## Exit Codes

The Playwright child exit code is captured before server cleanup. A Playwright
failure remains the final result even when cleanup succeeds. If Playwright
fails and cleanup also fails, the Playwright nonzero result is preserved while
the cleanup failure is still reported. If Playwright succeeds but owned-child
cleanup cannot be confirmed, the runner exits nonzero.

## Build Prerequisite

Focused and normal E2E runs require an existing production build:

```text
.next/BUILD_ID
```

If the file is absent, the runner fails clearly and asks the developer to run:

```text
npm.cmd run build
```

The `--list` discovery mode does not start Next and does not require the
production build.

## Commands

Supported developer commands:

```text
npm.cmd run test:e2e -- --list
npm.cmd run test:e2e -- tests/e2e/m08-chronicle-fidelity.spec.ts
npm.cmd run test:e2e -- <playwright arguments>
```

The normal application command remains unchanged:

```text
npm.cmd run start
```

`test:e2e:playwright` is available only as a maintenance escape hatch for
direct Playwright invocation when an external server is already managed.

## Generated Artifacts

Failed or interrupted E2E runs may create:

```text
test-results
debug.log
.cursor/hooks/velarro-agent-hooks.log
```

Before removing repository copies, preserve the relevant artifacts externally
with recursive inventories, sizes, timestamps, and copy verification. Do not
use `git clean` for this remediation workflow.

## Rollback

Rollback is a single infrastructure revert:

1. Restore `package.json` so `test:e2e` calls Playwright directly.
2. Restore the previous Playwright `webServer` configuration only if the
   Windows teardown risk is intentionally accepted.
3. Remove `scripts/run-e2e.mjs`, its declaration file, lifecycle tests, and
   this document update.

## Remediation Scope

This infrastructure work is separate from REM-001. REM-001 remains frozen on
its own branch while the E2E lifecycle boundary is corrected here.

REM-011 CI work should consume this single outer-runner lifecycle rather than
introducing another server ownership pattern.
