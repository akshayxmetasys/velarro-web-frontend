import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import net from "node:net";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const E2E_HOSTNAME = "127.0.0.1";
export const E2E_PORT = 3000;
export const READINESS_INTERVAL_MS = 250;
export const READINESS_TIMEOUT_MS = 120_000;
export const PROCESS_CLEANUP_TIMEOUT_MS = 5_000;

const requireFromScript = createRequire(import.meta.url);

/**
 * @typedef {{
 *   cwd?: string,
 *   detached?: boolean,
 *   env?: NodeJS.ProcessEnv,
 *   shell: false,
 *   stdio: "inherit" | ["ignore", "pipe", "pipe"],
 *   windowsHide: true,
 * }} SpawnOptionsMinimal
 *
 * @typedef {{ command: string, args: string[], options: SpawnOptionsMinimal }} RunnerCommand
 *
 * @typedef {{ on(eventName: "data", listener: (chunk: { toString(): string }) => void): unknown }} ManagedChildStream
 *
 * @typedef {{
 *   kill?: (signal?: NodeJS.Signals | number) => boolean,
 *   once(eventName: "error", listener: (error: Error) => void): unknown,
 *   once(eventName: "exit", listener: (code: number | null, signal: NodeJS.Signals | null) => void): unknown,
 *   pid?: number,
 *   stderr?: ManagedChildStream | null,
 *   stdout?: ManagedChildStream | null,
 * }} ManagedChild
 *
 * @typedef {{
 *   code?: number | null,
 *   error?: Error,
 *   exitCode: number,
 *   signal?: NodeJS.Signals | null,
 *   type: "exit" | "spawn-error",
 * }} ManagedChildExit
 *
 * @typedef {{
 *   alreadyExited?: boolean,
 *   error?: Error,
 *   exitCode?: number,
 *   forced?: boolean,
 *   ok: boolean,
 *   output?: string,
 *   skipped?: boolean,
 *   timedOut?: boolean,
 *   warning?: string,
 * }} CleanupResult
 *
 * @typedef {{
 *   child: ManagedChild,
 *   cleanupPromise?: Promise<CleanupResult>,
 *   exitPromise: Promise<ManagedChildExit>,
 *   getExitResult(): ManagedChildExit | undefined,
 *   hasExited(): boolean,
 * }} ManagedChildLifecycle
 *
 * @typedef {(command: string, args: readonly string[], options: SpawnOptionsMinimal) => ManagedChild} SpawnFunction
 *
 * @typedef {(callback: () => void, ms: number) => ReturnType<typeof setTimeout> | number} TimeoutFunction
 *
 * @typedef {(timeout: ReturnType<typeof setTimeout> | number) => void} ClearTimeoutFunction
 *
 * @typedef {"SIGINT" | "SIGTERM" | "uncaughtException" | "unhandledRejection"} ProcessEventName
 *
 * @typedef {{
 *   exit(code?: number | string | null): never,
 *   off(eventName: ProcessEventName, listener: (...args: unknown[]) => void): unknown,
 *   once(eventName: ProcessEventName, listener: (...args: unknown[]) => void): unknown,
 * }} ProcessLike
 *
 * @typedef {{
 *   commandConfig: RunnerCommand,
 *   spawnFn?: SpawnFunction,
 * }} CreateManagedChildProcessOptions
 *
 * @typedef {{
 *   args?: string[],
 *   buildIdPath?: string,
 *   checkPortAvailableFn?: (options: { hostname: string, port: number }) => Promise<{ available: boolean, error?: Error }>,
 *   cleanupTimeoutMs?: number,
 *   clearTimeoutFn?: ClearTimeoutFunction,
 *   consoleLike?: Pick<Console, "error">,
 *   createManagedChildProcessFn?: (options: CreateManagedChildProcessOptions) => ManagedChildLifecycle,
 *   cwd?: string,
 *   env?: NodeJS.ProcessEnv,
 *   existsFn?: (path: string) => boolean,
 *   killFn?: (pid: number, signal?: NodeJS.Signals | number) => boolean,
 *   nextCli?: string,
 *   nodePath?: string,
 *   platform?: NodeJS.Platform,
 *   playwrightCli?: string,
 *   processLike?: ProcessLike,
 *   readinessFn?: (options: { setTimeoutFn?: TimeoutFunction, url: string }) => Promise<{ ok: boolean, attempts?: number, error?: Error }>,
 *   setTimeoutFn?: TimeoutFunction,
 *   spawnFn?: SpawnFunction,
 * }} RunE2EOptions
 */

export function resolveRepositoryRoot(scriptUrl = import.meta.url) {
  return resolve(dirname(fileURLToPath(scriptUrl)), "..");
}

export function resolveNextCli(requireFn = requireFromScript) {
  return requireFn.resolve("next/dist/bin/next");
}

export function resolvePlaywrightCli(requireFn = requireFromScript) {
  return requireFn.resolve("@playwright/test/cli");
}

export function hasListArgument(args = /** @type {string[]} */ ([])) {
  return args.includes("--list");
}

export function createNextStartCommand({
  cwd = resolveRepositoryRoot(),
  env = process.env,
  nextCli = resolveNextCli(),
  nodePath = process.execPath,
  platform = process.platform,
} = {}) {
  return {
    command: nodePath,
    args: [
      nextCli,
      "start",
      "--hostname",
      E2E_HOSTNAME,
      "--port",
      String(E2E_PORT),
    ],
    options: {
      cwd,
      detached: platform !== "win32",
      env,
      shell: false,
      stdio: "inherit",
      windowsHide: true,
    },
  };
}

export function createPlaywrightCommand({
  args = /** @type {string[]} */ ([]),
  cwd = resolveRepositoryRoot(),
  env = process.env,
  nodePath = process.execPath,
  playwrightCli = resolvePlaywrightCli(),
  platform = process.platform,
} = {}) {
  return {
    command: nodePath,
    args: [playwrightCli, "test", ...args],
    options: {
      cwd,
      detached: platform !== "win32",
      env,
      shell: false,
      stdio: "inherit",
      windowsHide: true,
    },
  };
}

export function hasProductionBuild({
  buildIdPath = resolve(resolveRepositoryRoot(), ".next", "BUILD_ID"),
  existsFn = existsSync,
} = {}) {
  return existsFn(buildIdPath);
}

export function checkPortAvailable({
  createServerFn = net.createServer,
  hostname = E2E_HOSTNAME,
  port = E2E_PORT,
} = {}) {
  return new Promise((resolveCheck, rejectCheck) => {
    const server = createServerFn();

    server.once("error", (error) => {
      if (error?.code === "EADDRINUSE") {
        resolveCheck({ available: false, error });
        return;
      }
      rejectCheck(error);
    });

    server.listen({ host: hostname, port }, () => {
      server.close(() => {
        resolveCheck({ available: true });
      });
    });
  });
}

function wait(ms, setTimeoutFn = setTimeout) {
  return new Promise((resolveWait) => {
    setTimeoutFn(resolveWait, ms);
  });
}

export function httpGetReady({
  httpModule = http,
  url = `http://${E2E_HOSTNAME}:${E2E_PORT}/`,
} = {}) {
  return new Promise((resolveReady) => {
    const request = httpModule.get(url, (response) => {
      response.resume();
      resolveReady(response.statusCode >= 200 && response.statusCode < 500);
    });
    request.once("error", () => {
      resolveReady(false);
    });
    request.setTimeout(5_000, () => {
      request.destroy();
      resolveReady(false);
    });
  });
}

/**
 * @param {{
 *   intervalMs?: number,
 *   maxAttempts?: number,
 *   nowFn?: () => number,
 *   readinessTimeoutMs?: number,
 *   requestFn?: (options: { url: string }) => Promise<boolean>,
 *   setTimeoutFn?: TimeoutFunction,
 *   url?: string,
 * }} [options]
 * @returns {Promise<{ attempts: number, error?: Error, ok: boolean }>}
 */
export async function waitForReadiness({
  intervalMs = READINESS_INTERVAL_MS,
  maxAttempts = Math.ceil(READINESS_TIMEOUT_MS / READINESS_INTERVAL_MS),
  nowFn = Date.now,
  readinessTimeoutMs = READINESS_TIMEOUT_MS,
  requestFn = httpGetReady,
  setTimeoutFn = setTimeout,
  url = `http://${E2E_HOSTNAME}:${E2E_PORT}/`,
} = {}) {
  const startedAt = nowFn();

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (nowFn() - startedAt > readinessTimeoutMs) {
      break;
    }

    if (await requestFn({ url })) {
      return { ok: true, attempts: attempt };
    }

    if (attempt < maxAttempts) {
      await wait(intervalMs, setTimeoutFn);
    }
  }

  return {
    ok: false,
    attempts: maxAttempts,
    error: new Error(
      `Timed out waiting for ${url} after ${readinessTimeoutMs}ms`,
    ),
  };
}

export function normalizeChildExit(code, signal) {
  if (typeof code === "number") {
    return code;
  }
  return signal ? 1 : 1;
}

/**
 * @param {CreateManagedChildProcessOptions} options
 * @returns {ManagedChildLifecycle}
 */
export function createManagedChildProcess({
  commandConfig,
  spawnFn = spawn,
} = {}) {
  const child = spawnFn(
    commandConfig.command,
    commandConfig.args,
    commandConfig.options,
  );
  let exited = false;
  /** @type {ManagedChildExit | undefined} */
  let exitResult;

  const exitPromise = new Promise((resolveExit) => {
    child.once("error", (error) => {
      exited = true;
      exitResult = { error, exitCode: 1, type: "spawn-error" };
      resolveExit(exitResult);
    });
    child.once("exit", (code, signal) => {
      exited = true;
      exitResult = {
        code,
        exitCode: normalizeChildExit(code, signal),
        signal,
        type: "exit",
      };
      resolveExit(exitResult);
    });
  });

  return {
    child,
    exitPromise,
    getExitResult: () => exitResult,
    hasExited: () => exited,
  };
}

export function isAlreadyExitedTaskkillResult(output) {
  return /not found|not running|no instance|could not be found/i.test(output);
}

/**
 * @param {ManagedChild} child
 * @returns {() => string}
 */
function collectProcessOutput(child) {
  let stdout = "";
  let stderr = "";
  child.stdout?.on?.("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr?.on?.("data", (chunk) => {
    stderr += chunk.toString();
  });
  return () => `${stdout}\n${stderr}`;
}

/**
 * @param {{
 *   lifecycle?: ManagedChildLifecycle,
 *   pid?: number,
 *   cleanupTimeoutMs?: number,
 *   clearTimeoutFn?: ClearTimeoutFunction,
 *   setTimeoutFn?: TimeoutFunction,
 *   spawnFn?: SpawnFunction,
 * }} [options]
 * @returns {Promise<CleanupResult>}
 */
export async function cleanupWindowsProcessTree({
  pid,
  lifecycle,
  cleanupTimeoutMs = PROCESS_CLEANUP_TIMEOUT_MS,
  clearTimeoutFn = clearTimeout,
  setTimeoutFn = setTimeout,
  spawnFn = spawn,
} = {}) {
  if (lifecycle?.hasExited()) {
    return { alreadyExited: true, ok: true };
  }

  const ownedPid = pid ?? lifecycle?.child.pid;

  if (!Number.isInteger(ownedPid) || ownedPid <= 0) {
    return { ok: true, skipped: true };
  }

  if (lifecycle) {
    try {
      lifecycle.child.kill?.();
    } catch (error) {
      if (lifecycle.hasExited()) {
        return {
          ok: true,
          warning: `owned PID ${ownedPid} exited after exact-child kill threw: ${error?.message ?? error}`,
        };
      }
    }

    if (
      await hasLifecycleExitedOrExitsWithin(
        lifecycle,
        cleanupTimeoutMs,
        setTimeoutFn,
      )
    ) {
      return { ok: true };
    }
  }

  const taskkillResult = await invokeWindowsTaskkill({
    cleanupTimeoutMs,
    clearTimeoutFn,
    pid: ownedPid,
    setTimeoutFn,
    spawnFn,
  });

  if (!lifecycle) {
    return taskkillResult;
  }

  if (
    await hasLifecycleExitedOrExitsWithin(
      lifecycle,
      cleanupTimeoutMs,
      setTimeoutFn,
    )
  ) {
    if (taskkillResult.ok) {
      return { ...taskkillResult, forced: true, ok: true };
    }
    return {
      ok: true,
      output: taskkillResult.output,
      warning: `${taskkillResult.error?.message ?? "taskkill returned nonzero"} after owned PID ${ownedPid} exited`,
    };
  }

  if (taskkillResult.ok) {
    return {
      ok: false,
      output: taskkillResult.output,
      error: new Error(`owned PID ${ownedPid} did not exit after taskkill`),
    };
  }

  return taskkillResult;
}

/**
 * @param {{
 *   pid: number,
 *   cleanupTimeoutMs: number,
 *   clearTimeoutFn: ClearTimeoutFunction,
 *   setTimeoutFn: TimeoutFunction,
 *   spawnFn: SpawnFunction,
 * }} options
 * @returns {Promise<CleanupResult>}
 */
function invokeWindowsTaskkill({
  pid,
  cleanupTimeoutMs,
  clearTimeoutFn,
  setTimeoutFn,
  spawnFn,
}) {
  const child = spawnFn("taskkill", ["/PID", String(pid), "/T", "/F"], {
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  const output = collectProcessOutput(child);

  return new Promise((resolveCleanup) => {
    let settled = false;
    const timer = setTimeoutFn(() => {
      if (settled) {
        return;
      }
      settled = true;
      child.kill?.();
      resolveCleanup({
        ok: false,
        timedOut: true,
        error: new Error(`taskkill timed out for owned PID ${pid}`),
        output: output(),
      });
    }, cleanupTimeoutMs);

    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeoutFn(timer);
      resolveCleanup(result);
    };

    child.once("error", (error) => {
      finish({ ok: false, error, output: output() });
    });

    child.once("exit", (code) => {
      const taskkillOutput = output();
      if (code === 0) {
        finish({ ok: true, output: taskkillOutput });
        return;
      }
      if (isAlreadyExitedTaskkillResult(taskkillOutput)) {
        finish({ alreadyExited: true, ok: true, output: taskkillOutput });
        return;
      }
      finish({
        ok: false,
        error: new Error(`taskkill failed for owned PID ${pid}`),
        exitCode: normalizeChildExit(code, null),
        output: taskkillOutput,
      });
    });
  });
}

async function waitForExitOrTimeout(exitPromise, ms, setTimeoutFn) {
  if (!exitPromise) {
    return false;
  }

  let timeoutReached = false;
  await Promise.race([
    exitPromise,
    wait(ms, setTimeoutFn).then(() => {
      timeoutReached = true;
    }),
  ]);
  return !timeoutReached;
}

async function hasLifecycleExitedOrExitsWithin(lifecycle, ms, setTimeoutFn) {
  if (lifecycle.hasExited()) {
    return true;
  }

  if (await waitForExitOrTimeout(lifecycle.exitPromise, ms, setTimeoutFn)) {
    return true;
  }

  return lifecycle.hasExited();
}

/**
 * @param {{
 *   cleanupTimeoutMs?: number,
 *   exitPromise?: Promise<unknown>,
 *   killFn?: (pid: number, signal?: NodeJS.Signals | number) => boolean,
 *   pid?: number,
 *   setTimeoutFn?: TimeoutFunction,
 *   signal?: NodeJS.Signals,
 * }} [options]
 * @returns {Promise<CleanupResult>}
 */
export async function cleanupUnixProcessGroup({
  cleanupTimeoutMs = PROCESS_CLEANUP_TIMEOUT_MS,
  exitPromise,
  killFn = process.kill,
  pid,
  setTimeoutFn = setTimeout,
  signal = "SIGTERM",
} = {}) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return { ok: true, skipped: true };
  }

  try {
    killFn(-pid, signal);
  } catch (error) {
    if (error?.code === "ESRCH") {
      return { alreadyExited: true, ok: true };
    }
    return { ok: false, error };
  }

  if (await waitForExitOrTimeout(exitPromise, cleanupTimeoutMs, setTimeoutFn)) {
    return { ok: true };
  }

  try {
    killFn(-pid, "SIGKILL");
  } catch (error) {
    if (error?.code !== "ESRCH") {
      return { ok: false, error };
    }
  }

  if (await waitForExitOrTimeout(exitPromise, cleanupTimeoutMs, setTimeoutFn)) {
    return { forced: true, ok: true };
  }

  return {
    ok: false,
    error: new Error(`owned process group ${pid} did not exit after SIGKILL`),
  };
}

/**
 * @param {{
 *   cleanupTimeoutMs?: number,
 *   clearTimeoutFn?: ClearTimeoutFunction,
 *   killFn?: (pid: number, signal?: NodeJS.Signals | number) => boolean,
 *   lifecycle?: ManagedChildLifecycle,
 *   platform?: NodeJS.Platform,
 *   setTimeoutFn?: TimeoutFunction,
 *   spawnFn?: SpawnFunction,
 *   signal?: NodeJS.Signals,
 * }} [options]
 * @returns {Promise<CleanupResult>}
 */
export async function cleanupOwnedProcess({
  cleanupTimeoutMs = PROCESS_CLEANUP_TIMEOUT_MS,
  clearTimeoutFn = clearTimeout,
  killFn = process.kill,
  lifecycle,
  platform = process.platform,
  setTimeoutFn = setTimeout,
  spawnFn = spawn,
  signal = "SIGTERM",
} = {}) {
  if (!lifecycle || lifecycle.hasExited?.()) {
    return { alreadyExited: true, ok: true };
  }

  if (lifecycle.cleanupPromise) {
    return lifecycle.cleanupPromise;
  }

  lifecycle.cleanupPromise = (async () => {
    if (platform === "win32") {
      return cleanupWindowsProcessTree({
        cleanupTimeoutMs,
        clearTimeoutFn,
        lifecycle,
        setTimeoutFn,
        spawnFn,
      });
    }

    return cleanupUnixProcessGroup({
      cleanupTimeoutMs,
      exitPromise: lifecycle.exitPromise,
      killFn,
      pid: lifecycle.child.pid,
      setTimeoutFn,
      signal,
    });
  })();

  return lifecycle.cleanupPromise;
}

function reportCleanupFailure(consoleLike, label, result) {
  if (result.ok) {
    if (result.warning) {
      consoleLike.error(`${label} cleanup warning: ${result.warning}`);
      if (result.output) {
        consoleLike.error(result.output);
      }
    }
    return;
  }
  consoleLike.error(`${label} cleanup failed: ${result.error?.message}`);
  if (result.output) {
    consoleLike.error(result.output);
  }
}

function registerInterruptionHandlers({
  cleanupTimeoutMs,
  clearTimeoutFn,
  consoleLike,
  getPlaywrightLifecycle,
  getServerLifecycle,
  killFn,
  platform,
  processLike,
  setTimeoutFn,
  spawnFn,
}) {
  let shuttingDown = false;

  const shutdownAndExit = async (signal, error) => {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;
    if (error) {
      consoleLike.error(error);
    }

    const playwrightCleanup = await cleanupOwnedProcess({
      cleanupTimeoutMs,
      clearTimeoutFn,
      killFn,
      lifecycle: getPlaywrightLifecycle(),
      platform,
      setTimeoutFn,
      spawnFn,
      signal,
    });
    reportCleanupFailure(consoleLike, "Playwright", playwrightCleanup);

    const serverCleanup = await cleanupOwnedProcess({
      cleanupTimeoutMs,
      clearTimeoutFn,
      killFn,
      lifecycle: getServerLifecycle(),
      platform,
      setTimeoutFn,
      spawnFn,
      signal,
    });
    reportCleanupFailure(consoleLike, "Next server", serverCleanup);

    processLike.exit(1);
  };

  const onSigint = () => {
    void shutdownAndExit("SIGINT");
  };
  const onSigterm = () => {
    void shutdownAndExit("SIGTERM");
  };
  const onUncaughtException = (error) => {
    void shutdownAndExit("SIGTERM", error);
  };
  const onUnhandledRejection = (error) => {
    void shutdownAndExit("SIGTERM", error);
  };

  processLike.once("SIGINT", onSigint);
  processLike.once("SIGTERM", onSigterm);
  processLike.once("uncaughtException", onUncaughtException);
  processLike.once("unhandledRejection", onUnhandledRejection);

  return () => {
    processLike.off("SIGINT", onSigint);
    processLike.off("SIGTERM", onSigterm);
    processLike.off("uncaughtException", onUncaughtException);
    processLike.off("unhandledRejection", onUnhandledRejection);
  };
}

/**
 * @param {RunE2EOptions} [options]
 * @returns {Promise<number>}
 */
export async function runE2E({
  args = process.argv.slice(2),
  buildIdPath = resolve(resolveRepositoryRoot(), ".next", "BUILD_ID"),
  checkPortAvailableFn = checkPortAvailable,
  cleanupTimeoutMs = PROCESS_CLEANUP_TIMEOUT_MS,
  clearTimeoutFn = clearTimeout,
  consoleLike = console,
  createManagedChildProcessFn = createManagedChildProcess,
  cwd = resolveRepositoryRoot(),
  env = process.env,
  existsFn = existsSync,
  killFn = process.kill,
  nextCli = resolveNextCli(),
  nodePath = process.execPath,
  platform = process.platform,
  playwrightCli = resolvePlaywrightCli(),
  processLike = process,
  readinessFn = waitForReadiness,
  setTimeoutFn = setTimeout,
  spawnFn = spawn,
} = {}) {
  let serverLifecycle;
  let playwrightLifecycle;
  const unregisterHandlers = registerInterruptionHandlers({
    cleanupTimeoutMs,
    clearTimeoutFn,
    consoleLike,
    getPlaywrightLifecycle: () => playwrightLifecycle,
    getServerLifecycle: () => serverLifecycle,
    killFn,
    platform,
    processLike,
    setTimeoutFn,
    spawnFn,
  });

  try {
    const playwrightCommand = createPlaywrightCommand({
      args,
      cwd,
      env,
      nodePath,
      platform,
      playwrightCli,
    });

    if (hasListArgument(args)) {
      playwrightLifecycle = createManagedChildProcessFn({
        commandConfig: playwrightCommand,
        spawnFn,
      });
      const result = await playwrightLifecycle.exitPromise;
      return result.exitCode;
    }

    if (!hasProductionBuild({ buildIdPath, existsFn })) {
      consoleLike.error(
        `Missing production build: expected ${buildIdPath}. Run npm.cmd run build before E2E.`,
      );
      return 1;
    }

    const portCheck = await checkPortAvailableFn({
      hostname: E2E_HOSTNAME,
      port: E2E_PORT,
    });
    if (!portCheck.available) {
      consoleLike.error(
        `Port ${E2E_PORT} on ${E2E_HOSTNAME} is already occupied. Stop the owning process before E2E.`,
      );
      return 1;
    }

    serverLifecycle = createManagedChildProcessFn({
      commandConfig: createNextStartCommand({
        cwd,
        env,
        nextCli,
        nodePath,
        platform,
      }),
      spawnFn,
    });

    const readiness = await Promise.race([
      readinessFn({
        setTimeoutFn,
        url: `http://${E2E_HOSTNAME}:${E2E_PORT}/`,
      }),
      serverLifecycle.exitPromise.then((result) => ({
        ok: false,
        error: new Error(`Next server exited before readiness: ${result.exitCode}`),
      })),
    ]);

    if (!readiness.ok) {
      consoleLike.error(readiness.error?.message ?? "Next server was not ready.");
      const cleanupResult = await cleanupOwnedProcess({
        cleanupTimeoutMs,
        clearTimeoutFn,
        killFn,
        lifecycle: serverLifecycle,
        platform,
        setTimeoutFn,
        spawnFn,
      });
      reportCleanupFailure(consoleLike, "Next server", cleanupResult);
      return 1;
    }

    playwrightLifecycle = createManagedChildProcessFn({
      commandConfig: playwrightCommand,
      spawnFn,
    });
    const playwrightResult = await playwrightLifecycle.exitPromise;
    const cleanupResult = await cleanupOwnedProcess({
      cleanupTimeoutMs,
      clearTimeoutFn,
      killFn,
      lifecycle: serverLifecycle,
      platform,
      setTimeoutFn,
      spawnFn,
    });
    reportCleanupFailure(consoleLike, "Next server", cleanupResult);

    if (playwrightResult.exitCode !== 0) {
      return playwrightResult.exitCode;
    }
    return cleanupResult.ok ? 0 : 1;
  } catch (error) {
    consoleLike.error(error);
    const cleanupResult = await cleanupOwnedProcess({
      cleanupTimeoutMs,
      clearTimeoutFn,
      killFn,
      lifecycle: serverLifecycle,
      platform,
      setTimeoutFn,
      spawnFn,
    });
    reportCleanupFailure(consoleLike, "Next server", cleanupResult);
    return 1;
  } finally {
    unregisterHandlers();
  }
}

const isMain = process.argv[1]
  ? pathToFileURL(process.argv[1]).href === import.meta.url
  : false;

if (isMain) {
  runE2E()
    .then((exitCode) => {
      process.exit(exitCode);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
