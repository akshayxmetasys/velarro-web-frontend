import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  cleanupWindowsProcessTree,
  createManagedChildProcess,
} from "../../scripts/run-e2e.mjs";

const FIXTURE_READY_TIMEOUT_MS = 5_000;
const CLEANUP_TIMEOUT_MS = 5_000;
const PID_STATE_TIMEOUT_MS = 5_000;
const POLL_INTERVAL_MS = 50;

const fixtureDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "fixtures",
);

function fail(message) {
  throw new Error(message);
}

function isExactPidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error?.code === "ESRCH") {
      return false;
    }
    if (error?.code === "EPERM") {
      return true;
    }
    throw error;
  }
}

function wait(ms) {
  return new Promise((resolveWait) => {
    setTimeout(resolveWait, ms);
  });
}

async function waitForPidState(pid, expectedAlive, label) {
  const deadline = Date.now() + PID_STATE_TIMEOUT_MS;

  while (Date.now() <= deadline) {
    if (isExactPidAlive(pid) === expectedAlive) {
      return;
    }
    await wait(POLL_INTERVAL_MS);
  }

  fail(
    `${label} PID ${pid} did not become ${expectedAlive ? "alive" : "gone"} within ${PID_STATE_TIMEOUT_MS}ms`,
  );
}

function readJsonLine(child, expectedType, label) {
  return new Promise((resolveRead, rejectRead) => {
    let output = "";
    const timer = setTimeout(() => {
      cleanup();
      rejectRead(
        new Error(
          `${label} did not report ${expectedType} within ${FIXTURE_READY_TIMEOUT_MS}ms`,
        ),
      );
    }, FIXTURE_READY_TIMEOUT_MS);

    const onData = (chunk) => {
      output += chunk.toString();
      const line = output.split(/\r?\n/).find(Boolean);
      if (!line) {
        return;
      }

      try {
        const message = JSON.parse(line);
        if (message.type !== expectedType) {
          throw new Error(
            `${label} reported ${message.type}; expected ${expectedType}`,
          );
        }
        cleanup();
        resolveRead(message);
      } catch (error) {
        cleanup();
        rejectRead(error);
      }
    };

    const onExit = (code, signal) => {
      cleanup();
      rejectRead(
        new Error(
          `${label} exited before readiness (code=${code}, signal=${signal})`,
        ),
      );
    };

    const onError = (error) => {
      cleanup();
      rejectRead(error);
    };

    const cleanup = () => {
      clearTimeout(timer);
      child.stdout?.off("data", onData);
      child.off("exit", onExit);
      child.off("error", onError);
    };

    child.stdout?.on("data", onData);
    child.once("exit", onExit);
    child.once("error", onError);
  });
}

async function terminateKnownPid(pid, label) {
  if (!Number.isInteger(pid) || pid <= 0 || !isExactPidAlive(pid)) {
    return;
  }

  try {
    process.kill(pid);
  } catch (error) {
    if (error?.code !== "ESRCH") {
      throw new Error(`Failed to terminate ${label} PID ${pid}: ${error.message}`);
    }
  }

  await waitForPidState(pid, false, label);
}

async function terminateKnownPids(pids) {
  for (const [label, pid] of pids) {
    await terminateKnownPid(pid, label);
  }
}

async function main() {
  if (process.platform !== "win32") {
    fail(
      "Windows process-tree cleanup integration must run on win32; use the dedicated Windows command.",
    );
  }

  const knownPids = [];
  let sentinel;

  const rootLifecycle = createManagedChildProcess({
    commandConfig: {
      command: process.execPath,
      args: [resolve(fixtureDirectory, "windows-root.mjs")],
      options: {
        cwd: process.cwd(),
        env: process.env,
        shell: false,
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      },
    },
  });

  if (Number.isInteger(rootLifecycle.child.pid)) {
    knownPids.push(["root", rootLifecycle.child.pid]);
  }

  try {
    const treeReady = await readJsonLine(
      rootLifecycle.child,
      "tree-ready",
      "owned root fixture",
    );

    const rootPid = treeReady.rootPid;
    const childPid = treeReady.childPid;
    const grandchildPid = treeReady.grandchildPid;
    knownPids.splice(0, knownPids.length);
    knownPids.push(
      ["grandchild", grandchildPid],
      ["child", childPid],
      ["root", rootPid],
    );

    sentinel = spawn(process.execPath, [
      resolve(fixtureDirectory, "windows-sentinel.mjs"),
    ], {
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    const sentinelReady = await readJsonLine(
      sentinel,
      "sentinel-ready",
      "unrelated sentinel fixture",
    );
    const sentinelPid = sentinelReady.sentinelPid;
    knownPids.push(["sentinel", sentinelPid]);

    for (const [label, pid] of [
      ["root", rootPid],
      ["child", childPid],
      ["grandchild", grandchildPid],
      ["sentinel", sentinelPid],
    ]) {
      if (!isExactPidAlive(pid)) {
        fail(`${label} PID ${pid} was not alive before cleanup.`);
      }
    }

    if (rootLifecycle.hasExited()) {
      fail("owned root exited before cleanup started.");
    }

    const cleanupResult = await cleanupWindowsProcessTree({
      cleanupMode: "playwright",
      cleanupTimeoutMs: CLEANUP_TIMEOUT_MS,
      lifecycle: rootLifecycle,
    });

    if (!cleanupResult.ok || !cleanupResult.forced) {
      fail(
        `cleanupWindowsProcessTree did not report forced success: ${JSON.stringify(cleanupResult)}`,
      );
    }

    if (!rootLifecycle.hasExited() || rootLifecycle.getExitResult()?.type !== "exit") {
      fail("cleanup reported success before the owned root exit was observed.");
    }

    await waitForPidState(rootPid, false, "root");
    await waitForPidState(childPid, false, "child");
    await waitForPidState(grandchildPid, false, "grandchild");

    if (!isExactPidAlive(sentinelPid)) {
      fail(`unrelated sentinel PID ${sentinelPid} did not survive cleanup.`);
    }

    console.log(
      `WINDOWS_PROCESS_TREE_EVIDENCE ${JSON.stringify({
        cleanupOk: cleanupResult.ok,
        cleanupForced: cleanupResult.forced === true,
        rootPid,
        childPid,
        grandchildPid,
        sentinelPid,
        sentinelAliveAfterCleanup: true,
      })}`,
    );
  } finally {
    await terminateKnownPids(knownPids);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
