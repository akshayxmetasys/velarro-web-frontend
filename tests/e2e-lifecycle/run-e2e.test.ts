import { EventEmitter } from "node:events";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  cleanupOwnedProcess,
  cleanupUnixProcessGroup,
  cleanupWindowsProcessTree,
  createNextStartCommand,
  createPlaywrightCommand,
  hasListArgument,
  runE2E,
  waitForReadiness,
} from "../../scripts/run-e2e.mjs";

type RunE2EOptions = NonNullable<Parameters<typeof runE2E>[0]>;
type ManagedChildFactory = NonNullable<
  RunE2EOptions["createManagedChildProcessFn"]
>;
type ManagedChildLifecycle = ReturnType<ManagedChildFactory>;
type ManagedChildExit = Awaited<ManagedChildLifecycle["exitPromise"]>;
type SpawnFunction = NonNullable<RunE2EOptions["spawnFn"]>;
type TaskkillSpawnOptions = {
  afterExit?: () => void;
  pid?: number;
  status?: number;
  stderr?: string;
  stdout?: string;
};
type TestLifecycle = ManagedChildLifecycle & {
  child: FakeChildProcess;
  resolveExit(exitCode?: number): void;
};
type RunnerProcessEvent =
  | "SIGINT"
  | "SIGTERM"
  | "uncaughtException"
  | "unhandledRejection";

const runnerProcessEvents: RunnerProcessEvent[] = [
  "SIGINT",
  "SIGTERM",
  "uncaughtException",
  "unhandledRejection",
];
let originalCwd = process.cwd();
let originalExitCode: NodeJS.Process["exitCode"];
let originalListenerCounts = snapshotProcessListenerCounts();

class FakeChildProcess extends EventEmitter {
  killed = false;
  pid?: number;
  stderr = new EventEmitter();
  stdout = new EventEmitter();

  constructor(pid?: number) {
    super();
    this.pid = pid;
  }

  kill() {
    this.killed = true;
    return true;
  }
}

function snapshotProcessListenerCounts(processLike = process) {
  return Object.fromEntries(
    runnerProcessEvents.map((eventName) => [
      eventName,
      processLike.listenerCount(eventName),
    ]),
  ) as Record<RunnerProcessEvent, number>;
}

function createProcessLike() {
  const emitter = new EventEmitter();
  return {
    emit: vi.fn((eventName: RunnerProcessEvent, ...args: unknown[]) =>
      emitter.emit(eventName, ...args),
    ),
    exit: vi.fn<(code?: number | string | null) => never>(() => {
      throw new Error("processLike.exit should not be called in this test.");
    }),
    listenerCount: (eventName: RunnerProcessEvent) =>
      emitter.listenerCount(eventName),
    off: vi.fn((eventName: RunnerProcessEvent, listener: (...args: unknown[]) => void) => {
      emitter.off(eventName, listener);
      return emitter;
    }),
    once: vi.fn((eventName: RunnerProcessEvent, listener: (...args: unknown[]) => void) => {
      emitter.once(eventName, listener);
      return emitter;
    }),
  };
}

function createControlledLifecycle(pid: number): TestLifecycle {
  const child = new FakeChildProcess(pid);
  let exited = false;
  let exitResult: ManagedChildExit | undefined;
  let resolveExitPromise: (result: ManagedChildExit) => void = () => {
    throw new Error("Expected exit promise to be initialized.");
  };
  const exitPromise = new Promise<ManagedChildExit>((resolveExit) => {
    resolveExitPromise = resolveExit;
  });

  return {
    child,
    exitPromise,
    getExitResult: () => exitResult,
    hasExited: vi.fn(() => exited),
    resolveExit(exitCode = 0) {
      if (exited) {
        return;
      }
      exited = true;
      exitResult = {
        code: exitCode,
        exitCode,
        signal: null,
        type: "exit",
      };
      child.emit("exit", exitCode, null);
      resolveExitPromise(exitResult);
    },
  };
}

function createLifecycle(pid: number, exitCode = 0): TestLifecycle {
  const lifecycle = createControlledLifecycle(pid);
  lifecycle.resolveExit(exitCode);
  return {
    ...lifecycle,
    hasExited: vi.fn(() => true),
  };
}

function shiftLifecycle(
  lifecycles: ManagedChildLifecycle[],
): ManagedChildLifecycle {
  const lifecycle = lifecycles.shift();
  if (!lifecycle) {
    throw new Error("Expected another managed child lifecycle.");
  }
  return lifecycle;
}

function createTaskkillSpawn({
  pid = 9000,
  status = 0,
  stderr = "",
  stdout = "",
  afterExit,
}: TaskkillSpawnOptions = {}) {
  return vi.fn<SpawnFunction>(() => {
    const child = new FakeChildProcess(pid);
    queueMicrotask(() => {
      if (stdout) {
        child.stdout.emit("data", Buffer.from(stdout));
      }
      if (stderr) {
        child.stderr.emit("data", Buffer.from(stderr));
      }
      afterExit?.();
      child.emit("exit", status, null);
    });
    return child;
  });
}

function quietConsole() {
  return {
    error: vi.fn(),
    log: vi.fn(),
  };
}

function immediateTimer(callback: () => void) {
  callback();
  const timer = setTimeout(() => undefined, 0);
  clearTimeout(timer);
  return timer;
}

function microtaskTimer(callback: () => void) {
  queueMicrotask(callback);
  const timer = setTimeout(() => undefined, 0);
  clearTimeout(timer);
  return timer;
}

beforeEach(() => {
  originalCwd = process.cwd();
  originalExitCode = process.exitCode;
  originalListenerCounts = snapshotProcessListenerCounts();
});

afterEach(() => {
  try {
    expect(process.cwd()).toBe(originalCwd);
    expect(process.exitCode).toBe(originalExitCode);
    expect(snapshotProcessListenerCounts()).toEqual(originalListenerCounts);
  } finally {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    if (process.cwd() !== originalCwd) {
      process.chdir(originalCwd);
    }
    process.exitCode = originalExitCode;
  }
});

describe("outer E2E runner", () => {
  it("does not add persistent process listeners when imported", async () => {
    const beforeImport = snapshotProcessListenerCounts();

    await import("../../scripts/run-e2e.mjs");

    expect(snapshotProcessListenerCounts()).toEqual(beforeImport);
  });

  it("removes runner signal listeners after completion", async () => {
    const processLike = createProcessLike();

    await expect(
      runE2E({
        consoleLike: quietConsole(),
        existsFn: vi.fn(() => false),
        processLike,
      }),
    ).resolves.toBe(1);

    for (const eventName of runnerProcessEvents) {
      expect(processLike.listenerCount(eventName)).toBe(0);
    }
    expect(processLike.once).toHaveBeenCalledTimes(runnerProcessEvents.length);
    expect(processLike.off).toHaveBeenCalledTimes(runnerProcessEvents.length);
  });

  it("keeps process exitCode and cwd unchanged during deterministic runs", async () => {
    const processLike = createProcessLike();
    const beforeExitCode = process.exitCode;
    const beforeCwd = process.cwd();

    await runE2E({
      consoleLike: quietConsole(),
      existsFn: vi.fn(() => false),
      processLike,
    });

    expect(process.exitCode).toBe(beforeExitCode);
    expect(process.cwd()).toBe(beforeCwd);
  });

  it("allows a lifecycle test to use fake timers", () => {
    let fired = false;

    vi.useFakeTimers();
    setTimeout(() => {
      fired = true;
    }, 1);
    vi.runAllTimers();

    expect(fired).toBe(true);
  });

  it("uses real timers after a previous lifecycle test used fake timers", async () => {
    await expect(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("real timer fired");
        }, 0);
      }),
    ).resolves.toBe("real timer fired");
  });

  it("constructs a direct Next start command without npm, npx, cmd, shell, or broad targets", () => {
    const command = createNextStartCommand({
      nextCli: "C:\\repo\\node_modules\\next\\dist\\bin\\next",
      nodePath: "C:\\Program Files\\nodejs\\node.exe",
      platform: "win32",
    });

    expect(command.command).toBe("C:\\Program Files\\nodejs\\node.exe");
    expect(command.args).toEqual([
      "C:\\repo\\node_modules\\next\\dist\\bin\\next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      "3000",
    ]);
    expect(command.options).toMatchObject({
      detached: false,
      shell: false,
      stdio: "inherit",
      windowsHide: true,
    });
    expect([command.command, ...command.args].join(" ")).not.toMatch(
      /\bnpm(?:\.cmd)?\b|\bnpx\b|\bcmd(?:\.exe)?\b|\/IM|localhost/i,
    );
  });

  it("constructs a direct Playwright command and forwards requested arguments", () => {
    const command = createPlaywrightCommand({
      args: ["tests/e2e/m08-chronicle-fidelity.spec.ts", "--project=chromium"],
      nodePath: "node",
      platform: "win32",
      playwrightCli: "C:\\repo\\node_modules\\@playwright\\test\\cli.js",
    });

    expect(command.command).toBe("node");
    expect(command.args).toEqual([
      "C:\\repo\\node_modules\\@playwright\\test\\cli.js",
      "test",
      "tests/e2e/m08-chronicle-fidelity.spec.ts",
      "--project=chromium",
    ]);
    expect(command.options.shell).toBe(false);
    expect(command.options.stdio).toBe("inherit");
    expect([command.command, ...command.args].join(" ")).not.toMatch(
      /\bnpm(?:\.cmd)?\b|\bnpx\b|\bcmd(?:\.exe)?\b/i,
    );
  });

  it("runs Playwright discovery without starting Next for --list", async () => {
    const playwright = createLifecycle(222, 0);
    const createManagedChildProcessFn = vi.fn<ManagedChildFactory>(
      () => playwright,
    );

    await expect(
      runE2E({
        args: ["--list"],
        checkPortAvailableFn: vi.fn(() => {
          throw new Error("port should not be checked");
        }),
        createManagedChildProcessFn,
        existsFn: vi.fn(() => false),
        platform: "win32",
        playwrightCli: "playwright-cli",
        spawnFn: createTaskkillSpawn(),
      }),
    ).resolves.toBe(0);

    expect(hasListArgument(["--project=chromium", "--list"])).toBe(true);
    expect(createManagedChildProcessFn).toHaveBeenCalledTimes(1);
    const firstCall = createManagedChildProcessFn.mock.calls[0];
    if (!firstCall) {
      throw new Error("Expected Playwright child factory to be called.");
    }
    expect(firstCall[0].commandConfig.args).toEqual([
      "playwright-cli",
      "test",
      "--list",
    ]);
  });

  it("fails clearly when the production build is absent", async () => {
    const consoleLike = quietConsole();
    const createManagedChildProcessFn = vi.fn<ManagedChildFactory>(() => {
      throw new Error("child should not be created");
    });

    await expect(
      runE2E({
        buildIdPath: "C:\\repo\\.next\\BUILD_ID",
        consoleLike,
        createManagedChildProcessFn,
        existsFn: vi.fn(() => false),
      }),
    ).resolves.toBe(1);

    expect(consoleLike.error).toHaveBeenCalledWith(
      expect.stringContaining("Missing production build"),
    );
    expect(createManagedChildProcessFn).not.toHaveBeenCalled();
  });

  it("fails clearly when port 3000 is already occupied", async () => {
    const consoleLike = quietConsole();
    const createManagedChildProcessFn = vi.fn<ManagedChildFactory>(() => {
      throw new Error("child should not be created");
    });

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: false })),
        consoleLike,
        createManagedChildProcessFn,
        existsFn: vi.fn(() => true),
      }),
    ).resolves.toBe(1);

    expect(consoleLike.error).toHaveBeenCalledWith(
      expect.stringContaining("Port 3000 on 127.0.0.1 is already occupied"),
    );
    expect(createManagedChildProcessFn).not.toHaveBeenCalled();
  });

  it("waits for readiness before starting Playwright", async () => {
    const order: string[] = [];
    const server = createControlledLifecycle(111);
    server.child.kill = vi.fn(() => {
      server.resolveExit(0);
      return true;
    });
    const playwright = createLifecycle(222, 0);
    const createManagedChildProcessFn = vi.fn<ManagedChildFactory>(
      ({ commandConfig }) => {
        if (commandConfig.args.includes("start")) {
          order.push("server");
          return server;
        }
        order.push("playwright");
        return playwright;
      },
    );

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: true })),
        createManagedChildProcessFn,
        existsFn: vi.fn(() => true),
        platform: "win32",
        readinessFn: vi.fn(async () => {
          order.push("ready");
          return { ok: true };
        }),
        spawnFn: createTaskkillSpawn(),
      }),
    ).resolves.toBe(0);

    expect(order).toEqual(["server", "ready", "playwright"]);
  });

  it("times out readiness and cleans up the owned server without starting Playwright", async () => {
    const server = createControlledLifecycle(111);
    const createManagedChildProcessFn = vi.fn<ManagedChildFactory>(
      () => server,
    );
    const taskkillSpawn = createTaskkillSpawn({
      afterExit: () => server.resolveExit(0),
    });

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: true })),
        createManagedChildProcessFn,
        existsFn: vi.fn(() => true),
        platform: "win32",
        readinessFn: vi.fn(async () => ({
          error: new Error("readiness timeout"),
          ok: false,
        })),
        setTimeoutFn: vi.fn(microtaskTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toBe(1);

    expect(createManagedChildProcessFn).toHaveBeenCalledTimes(1);
    expect(taskkillSpawn).toHaveBeenCalledWith(
      "taskkill",
      ["/PID", "111", "/T", "/F"],
      expect.objectContaining({ shell: false }),
    );
  });

  it("propagates Playwright success and cleans up the server", async () => {
    const server = createControlledLifecycle(111);
    server.child.kill = vi.fn(() => {
      server.resolveExit(0);
      return true;
    });
    const lifecycles = [server, createLifecycle(222, 0)];
    const taskkillSpawn = createTaskkillSpawn();

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: true })),
        createManagedChildProcessFn: vi.fn<ManagedChildFactory>(() =>
          shiftLifecycle(lifecycles),
        ),
        existsFn: vi.fn(() => true),
        platform: "win32",
        readinessFn: vi.fn(async () => ({ ok: true })),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toBe(0);

    expect(server.child.kill).toHaveBeenCalledTimes(1);
    expect(taskkillSpawn).not.toHaveBeenCalled();
  });

  it("preserves Playwright failure exit codes while still cleaning up the server", async () => {
    const server = createControlledLifecycle(111);
    server.child.kill = vi.fn(() => {
      server.resolveExit(0);
      return true;
    });
    const lifecycles = [server, createLifecycle(222, 7)];
    const taskkillSpawn = createTaskkillSpawn();

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: true })),
        createManagedChildProcessFn: vi.fn<ManagedChildFactory>(() =>
          shiftLifecycle(lifecycles),
        ),
        existsFn: vi.fn(() => true),
        platform: "win32",
        readinessFn: vi.fn(async () => ({ ok: true })),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toBe(7);

    expect(taskkillSpawn).not.toHaveBeenCalled();
  });

  it("makes unexpected server cleanup failures nonzero after Playwright success", async () => {
    const server = createControlledLifecycle(111);
    const lifecycles = [server, createLifecycle(222, 0)];
    const taskkillSpawn = createTaskkillSpawn({
      status: 5,
      stderr: "ERROR: Access is denied.",
    });

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: true })),
        createManagedChildProcessFn: vi.fn<ManagedChildFactory>(() =>
          shiftLifecycle(lifecycles),
        ),
        existsFn: vi.fn(() => true),
        platform: "win32",
        readinessFn: vi.fn(async () => ({ ok: true })),
        setTimeoutFn: vi.fn(microtaskTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toBe(1);
  });

  it("preserves Playwright failure when server cleanup also fails", async () => {
    const consoleLike = quietConsole();
    const server = createControlledLifecycle(111);
    const lifecycles = [server, createLifecycle(222, 7)];
    const taskkillSpawn = createTaskkillSpawn({
      status: 5,
      stderr: "ERROR: Access is denied.",
    });

    await expect(
      runE2E({
        checkPortAvailableFn: vi.fn(async () => ({ available: true })),
        consoleLike,
        createManagedChildProcessFn: vi.fn<ManagedChildFactory>(() =>
          shiftLifecycle(lifecycles),
        ),
        existsFn: vi.fn(() => true),
        platform: "win32",
        readinessFn: vi.fn(async () => ({ ok: true })),
        setTimeoutFn: vi.fn(microtaskTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toBe(7);

    expect(consoleLike.error).toHaveBeenCalledWith(
      expect.stringContaining("Next server cleanup failed"),
    );
  });

  it("runs Windows cleanup once and targets only the owned PID", async () => {
    const lifecycle = createControlledLifecycle(4567);
    const taskkillSpawn = createTaskkillSpawn({
      afterExit: () => lifecycle.resolveExit(0),
    });
    const setTimeoutFn = vi.fn(microtaskTimer);

    await expect(
      cleanupOwnedProcess({
        lifecycle,
        platform: "win32",
        setTimeoutFn,
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: true });
    await expect(
      cleanupOwnedProcess({
        lifecycle,
        platform: "win32",
        setTimeoutFn,
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: true });

    expect(taskkillSpawn).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(taskkillSpawn.mock.calls)).toContain(
      '"/PID","4567","/T","/F"',
    );
    expect(JSON.stringify(taskkillSpawn.mock.calls)).not.toMatch(
      /\/IM|node\.exe|\bnode\b|localhost|3000/i,
    );
  });

  it("settles owned cleanup promises before the test completes", async () => {
    const lifecycle = createControlledLifecycle(4567);
    const taskkillSpawn = createTaskkillSpawn({
      afterExit: () => lifecycle.resolveExit(0),
    });

    const cleanupResult = await cleanupOwnedProcess({
      lifecycle,
      platform: "win32",
      setTimeoutFn: vi.fn(microtaskTimer),
      spawnFn: taskkillSpawn,
    });

    expect(cleanupResult).toMatchObject({ ok: true });
    await expect(lifecycle.cleanupPromise).resolves.toMatchObject({ ok: true });
  });

  it("does not share child state between deterministic lifecycle fixtures", async () => {
    const first = createControlledLifecycle(1111);
    first.child.kill = vi.fn(() => {
      first.resolveExit(0);
      return true;
    });
    const second = createControlledLifecycle(2222);
    second.child.kill = vi.fn(() => {
      second.resolveExit(0);
      return true;
    });
    const taskkillSpawn = createTaskkillSpawn();

    await expect(
      cleanupOwnedProcess({
        lifecycle: first,
        platform: "win32",
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: true });
    await expect(
      cleanupOwnedProcess({
        lifecycle: second,
        platform: "win32",
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: true });

    expect(first.child.kill).toHaveBeenCalledTimes(1);
    expect(second.child.kill).toHaveBeenCalledTimes(1);
    expect(first.getExitResult()?.exitCode).toBe(0);
    expect(second.getExitResult()?.exitCode).toBe(0);
    expect(taskkillSpawn).not.toHaveBeenCalled();
  });

  it("does not target a Windows child that already emitted exit", async () => {
    const lifecycle = createLifecycle(4567, 0);
    const taskkillSpawn = createTaskkillSpawn();

    await expect(
      cleanupOwnedProcess({
        lifecycle,
        platform: "win32",
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ alreadyExited: true, ok: true });

    expect(lifecycle.child.killed).toBe(false);
    expect(taskkillSpawn).not.toHaveBeenCalled();
  });

  it("does not invoke taskkill when a Windows child exits during graceful shutdown", async () => {
    const lifecycle = createControlledLifecycle(4567);
    lifecycle.child.kill = vi.fn(() => {
      lifecycle.resolveExit(0);
      return true;
    });
    const taskkillSpawn = createTaskkillSpawn();

    await expect(
      cleanupOwnedProcess({
        lifecycle,
        platform: "win32",
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: true });

    expect(lifecycle.child.kill).toHaveBeenCalledTimes(1);
    expect(taskkillSpawn).not.toHaveBeenCalled();
  });

  it("treats taskkill success as cleanup only after the Windows child exits", async () => {
    const lifecycle = createControlledLifecycle(4567);
    const taskkillSpawn = createTaskkillSpawn({
      afterExit: () => lifecycle.resolveExit(0),
    });

    await expect(
      cleanupWindowsProcessTree({
        lifecycle,
        setTimeoutFn: vi.fn(microtaskTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ forced: true, ok: true });

    expect(taskkillSpawn).toHaveBeenCalledWith(
      "taskkill",
      ["/PID", "4567", "/T", "/F"],
      expect.objectContaining({ shell: false }),
    );
  });

  it("keeps nonzero taskkill diagnostics when the Windows child exit is observed", async () => {
    const lifecycle = createControlledLifecycle(4567);
    const taskkillSpawn = createTaskkillSpawn({
      afterExit: () => lifecycle.resolveExit(0),
      status: 5,
      stderr: "ERROR: Access is denied.",
    });

    await expect(
      cleanupWindowsProcessTree({
        lifecycle,
        setTimeoutFn: vi.fn(microtaskTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({
      ok: true,
      output: expect.stringContaining("Access is denied"),
      warning: expect.stringContaining("taskkill failed"),
    });
  });

  it("fails when taskkill exits nonzero and the Windows child never exits", async () => {
    const lifecycle = createControlledLifecycle(4567);
    const taskkillSpawn = createTaskkillSpawn({
      status: 5,
      stderr: "ERROR: Access is denied.",
    });

    await expect(
      cleanupWindowsProcessTree({
        lifecycle,
        setTimeoutFn: vi.fn(microtaskTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({
      error: expect.objectContaining({
        message: "taskkill failed for owned PID 4567",
      }),
      ok: false,
    });
  });

  it("fails when taskkill times out and the Windows child never exits", async () => {
    const lifecycle = createControlledLifecycle(4567);
    const taskkillSpawn = vi.fn<SpawnFunction>(
      () => new FakeChildProcess(9000),
    );

    await expect(
      cleanupWindowsProcessTree({
        cleanupTimeoutMs: 12,
        lifecycle,
        setTimeoutFn: vi.fn(immediateTimer),
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: false, timedOut: true });
  });

  it("applies a bounded timeout to Windows taskkill", async () => {
    const taskkillSpawn = vi.fn<SpawnFunction>(
      () => new FakeChildProcess(9000),
    );
    const setTimeoutFn = vi.fn(immediateTimer);

    await expect(
      cleanupWindowsProcessTree({
        cleanupTimeoutMs: 12,
        clearTimeoutFn: vi.fn(),
        pid: 1234,
        setTimeoutFn,
        spawnFn: taskkillSpawn,
      }),
    ).resolves.toMatchObject({ ok: false, timedOut: true });

    expect(setTimeoutFn).toHaveBeenCalledWith(expect.any(Function), 12);
  });

  it("treats an already-exited Windows taskkill result as cleanup complete without lifecycle state", async () => {
    await expect(
      cleanupWindowsProcessTree({
        pid: 4567,
        spawnFn: createTaskkillSpawn({
          status: 128,
          stderr: 'ERROR: The process "4567" not found.',
        }),
      }),
    ).resolves.toMatchObject({ alreadyExited: true, ok: true });
  });

  it("targets only the owned Unix process group", async () => {
    const killFn = vi.fn();

    await expect(
      cleanupUnixProcessGroup({
        exitPromise: Promise.resolve(),
        killFn,
        pid: 321,
        signal: "SIGTERM",
      }),
    ).resolves.toMatchObject({ ok: true });

    expect(killFn).toHaveBeenCalledWith(-321, "SIGTERM");
    expect(killFn).not.toHaveBeenCalledWith(321, "SIGTERM");
  });

  it("escalates only the owned Unix group after a bounded grace period", async () => {
    const killFn = vi.fn();
    const setTimeoutFn = vi.fn(immediateTimer);

    await expect(
      cleanupUnixProcessGroup({
        cleanupTimeoutMs: 1,
        exitPromise: new Promise(() => undefined),
        killFn,
        pid: 654,
        setTimeoutFn,
      }),
    ).resolves.toMatchObject({ ok: false });

    expect(killFn).toHaveBeenCalledWith(-654, "SIGTERM");
    expect(killFn).toHaveBeenCalledWith(-654, "SIGKILL");
  });

  it("keeps unrelated fixture processes untouched", async () => {
    const unrelated = new FakeChildProcess(9999);
    const taskkillSpawn = createTaskkillSpawn();

    await cleanupWindowsProcessTree({
      pid: 4567,
      spawnFn: taskkillSpawn,
    });

    expect(unrelated.killed).toBe(false);
    expect(JSON.stringify(taskkillSpawn.mock.calls)).not.toContain("9999");
  });

  it("bounds readiness attempts and the overall timeout", async () => {
    let now = 0;

    await expect(
      waitForReadiness({
        intervalMs: 1,
        maxAttempts: 3,
        nowFn: () => {
          now += 51;
          return now;
        },
        readinessTimeoutMs: 100,
        requestFn: vi.fn(async () => false),
        setTimeoutFn: vi.fn(immediateTimer),
      }),
    ).resolves.toMatchObject({ ok: false });
  });
});
