export const E2E_HOSTNAME: "127.0.0.1";
export const E2E_PORT: 3000;
export const PROCESS_CLEANUP_TIMEOUT_MS: 5000;
export const READINESS_INTERVAL_MS: 250;
export const READINESS_TIMEOUT_MS: 120000;

export interface RunnerCommandOptions {
  cwd?: string;
  detached?: boolean;
  env?: NodeJS.ProcessEnv;
  shell: false;
  stdio: "inherit" | ["ignore", "pipe", "pipe"];
  windowsHide: true;
}

export interface SpawnOptionsMinimal {
  cwd?: string;
  detached?: boolean;
  env?: NodeJS.ProcessEnv;
  shell: false;
  stdio: "inherit" | ["ignore", "pipe", "pipe"];
  windowsHide: true;
}

export interface RunnerCommand {
  command: string;
  args: string[];
  options: SpawnOptionsMinimal;
}

export interface ManagedChildStream {
  on(eventName: "data", listener: (chunk: { toString(): string }) => void): unknown;
}

export interface ManagedChild {
  kill?(signal?: NodeJS.Signals | number): boolean;
  once(eventName: "error", listener: (error: Error) => void): unknown;
  once(
    eventName: "exit",
    listener: (code: number | null, signal: NodeJS.Signals | null) => void,
  ): unknown;
  pid?: number;
  stderr?: ManagedChildStream | null;
  stdout?: ManagedChildStream | null;
}

export interface ManagedChildExit {
  code?: number | null;
  error?: Error;
  exitCode: number;
  signal?: NodeJS.Signals | null;
  type: "exit" | "spawn-error";
}

export interface CleanupResult {
  alreadyExited?: boolean;
  error?: Error;
  exitCode?: number;
  forced?: boolean;
  ok: boolean;
  output?: string;
  skipped?: boolean;
  timedOut?: boolean;
  warning?: string;
}

export type CleanupMode = "next-server" | "playwright";

export interface ManagedChildLifecycle {
  child: ManagedChild;
  cleanupPromise?: Promise<CleanupResult>;
  exitPromise: Promise<ManagedChildExit>;
  getExitResult(): ManagedChildExit | undefined;
  hasExited(): boolean;
}

export type SpawnFunction = (
  command: string,
  args: readonly string[],
  options: SpawnOptionsMinimal,
) => ManagedChild;

export type ProcessEventName =
  | "SIGINT"
  | "SIGTERM"
  | "uncaughtException"
  | "unhandledRejection";

export interface ProcessLike {
  exit(code?: number | string | null): never;
  off(eventName: ProcessEventName, listener: (...args: unknown[]) => void): unknown;
  once(eventName: ProcessEventName, listener: (...args: unknown[]) => void): unknown;
}

export interface CreateManagedChildProcessOptions {
  commandConfig: RunnerCommand;
  spawnFn?: SpawnFunction;
}

export interface RunE2EOptions {
  args?: string[];
  buildIdPath?: string;
  checkPortAvailableFn?: (options: {
    hostname: string;
    port: number;
  }) => Promise<{ available: boolean; error?: Error }>;
  cleanupTimeoutMs?: number;
  clearTimeoutFn?: (timeout: ReturnType<typeof setTimeout> | number) => void;
  consoleLike?: Pick<Console, "error">;
  createManagedChildProcessFn?: (
    options: CreateManagedChildProcessOptions,
  ) => ManagedChildLifecycle;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  existsFn?: (path: string) => boolean;
  killFn?: (pid: number, signal?: NodeJS.Signals | number) => boolean;
  nextCli?: string;
  nodePath?: string;
  platform?: NodeJS.Platform;
  playwrightCli?: string;
  processLike?: ProcessLike;
  readinessFn?: (options: {
    setTimeoutFn?: typeof setTimeout;
    url: string;
  }) => Promise<{ ok: boolean; error?: Error }>;
  setTimeoutFn?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout> | number;
  spawnFn?: SpawnFunction;
}

export interface CleanupOwnedProcessOptions {
  cleanupTimeoutMs?: number;
  cleanupMode?: CleanupMode;
  clearTimeoutFn?: (timeout: ReturnType<typeof setTimeout> | number) => void;
  killFn?: (pid: number, signal?: NodeJS.Signals | number) => boolean;
  lifecycle?: ManagedChildLifecycle;
  platform?: NodeJS.Platform;
  setTimeoutFn?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout> | number;
  spawnFn?: SpawnFunction;
  signal?: NodeJS.Signals;
}

export function checkPortAvailable(options?: {
  createServerFn?: typeof import("node:net").createServer;
  hostname?: string;
  port?: number;
}): Promise<{ available: boolean; error?: Error }>;
export function cleanupOwnedProcess(
  options?: CleanupOwnedProcessOptions,
): Promise<CleanupResult>;
export function cleanupUnixProcessGroup(options?: {
  cleanupTimeoutMs?: number;
  exitPromise?: Promise<unknown>;
  killFn?: (pid: number, signal?: NodeJS.Signals | number) => boolean;
  pid?: number;
  setTimeoutFn?: typeof setTimeout;
  signal?: NodeJS.Signals;
}): Promise<CleanupResult>;
export function cleanupWindowsProcessTree(options?: {
  cleanupMode?: CleanupMode;
  cleanupTimeoutMs?: number;
  clearTimeoutFn?: (timeout: ReturnType<typeof setTimeout> | number) => void;
  lifecycle?: ManagedChildLifecycle;
  pid?: number;
  setTimeoutFn?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout> | number;
  spawnFn?: SpawnFunction;
}): Promise<CleanupResult>;
export function createManagedChildProcess(
  options: CreateManagedChildProcessOptions,
): ManagedChildLifecycle;
export function createNextStartCommand(options?: {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  nextCli?: string;
  nodePath?: string;
  platform?: NodeJS.Platform;
}): RunnerCommand;
export function createPlaywrightCommand(options?: {
  args?: string[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  nodePath?: string;
  platform?: NodeJS.Platform;
  playwrightCli?: string;
}): RunnerCommand;
export function hasListArgument(args?: string[]): boolean;
export function hasProductionBuild(options?: {
  buildIdPath?: string;
  existsFn?: (path: string) => boolean;
}): boolean;
export function httpGetReady(options?: {
  httpModule?: typeof import("node:http");
  url?: string;
}): Promise<boolean>;
export function isAlreadyExitedTaskkillResult(output: string): boolean;
export function normalizeChildExit(
  code: number | null,
  signal: NodeJS.Signals | null,
): number;
export function resolveNextCli(requireFn?: { resolve(id: string): string }): string;
export function resolvePlaywrightCli(requireFn?: {
  resolve(id: string): string;
}): string;
export function resolveRepositoryRoot(scriptUrl?: string): string;
export function runE2E(options?: RunE2EOptions): Promise<number>;
export function waitForReadiness(options?: {
  intervalMs?: number;
  maxAttempts?: number;
  nowFn?: () => number;
  readinessTimeoutMs?: number;
  requestFn?: (options: { url: string }) => Promise<boolean>;
  setTimeoutFn?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout> | number;
  url?: string;
}): Promise<{ attempts: number; error?: Error; ok: boolean }>;
