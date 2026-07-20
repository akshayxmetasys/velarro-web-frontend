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
     -> stop any exact owned Playwright tree on interruption
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

On Windows, cleanup distinguishes the Next server from Playwright because their
ownership risks differ.

For the Next server, the runner first checks whether the exact owned child has
already emitted `exit`. If it has, cleanup is complete and the old PID is not
targeted again. If the child is still active, the runner requests shutdown
through that child object and waits a bounded grace period for the same child's
`exit` event.

Only after that grace period does Windows cleanup escalate to:

```text
taskkill /PID <owned-pid> /T /F
```

`taskkill` is invoked without a shell, with the exact owned child PID, and with
a timeout. After `taskkill` completes, fails, or times out, the runner again
waits briefly for the exact child exit event. A nonzero `taskkill` status is
retained as a diagnostic warning, but it is not authoritative when the exact
owned child is confirmed exited. Cleanup fails only when the exact owned child
still has not exited after all bounded stages, or when cleanup cannot confirm
that exit.

For Playwright on Windows, graceful direct-child shutdown is not used. Browser
descendants are owned through the Playwright root tree, so interruption cleanup
immediately starts exact-PID tree cleanup with:

```text
taskkill /PID <owned-playwright-root-pid> /T /F
```

The direct Playwright CLI root exiting is not sufficient proof that browser
descendants were cleaned up. If the root has already exited before tree cleanup
starts, if `taskkill` reports that the root can no longer be targeted, or if
the exact root exit cannot be confirmed after tree cleanup, the Playwright
cleanup result is a failure. This fails closed rather than reporting success
while an owned browser descendant may remain.

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

## Windows Integration Fixture

The regression coverage for Playwright cleanup is production-path unit coverage
with deterministic fake process lifecycles. A live Windows fixture that spawns a
real child and grandchild was not added because it would need platform-specific
process inspection and timing-sensitive orphan detection outside the repository
runner's existing boundaries. The unit coverage instead proves the safety
invariants that matter for the runner: exact PID targeting, no process-name or
port-wide termination, tree cleanup before direct root kill, failure when the
root is already gone, bounded escalation, and no cleanup-promise leakage.

## Rollback

Rollback is a single infrastructure revert:

1. Restore `package.json` so `test:e2e` calls Playwright directly.
2. Restore the previous Playwright `webServer` configuration only if the
   Windows teardown risk is intentionally accepted.
3. Remove `scripts/run-e2e.mjs`, its declaration file, lifecycle tests, and
   this document update. This also removes the separate Windows Playwright
   tree-cleanup mode and returns interrupted runs to Playwright-owned server
   lifecycle behavior.

## Remediation Scope

This infrastructure work is separate from REM-001. REM-001 remains frozen on
its own branch while the E2E lifecycle boundary is corrected here.

REM-011 CI work should consume this single outer-runner lifecycle rather than
introducing another server ownership pattern.
