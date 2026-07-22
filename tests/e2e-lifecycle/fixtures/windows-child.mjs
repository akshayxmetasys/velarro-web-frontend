import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

if (typeof process.send !== "function") {
  throw new Error("windows-child fixture requires an IPC channel.");
}

const fixtureDirectory = dirname(fileURLToPath(import.meta.url));
const grandchild = spawn(
  process.execPath,
  [resolve(fixtureDirectory, "windows-grandchild.mjs")],
  {
    stdio: ["ignore", "ignore", "ignore", "ipc"],
    windowsHide: true,
  },
);

grandchild.once("message", (message) => {
  if (message?.type !== "grandchild-ready") {
    throw new Error("Unexpected grandchild fixture readiness message.");
  }

  process.send({
    type: "child-ready",
    childPid: process.pid,
    grandchildPid: message.grandchildPid,
  });
});

grandchild.once("exit", (code, signal) => {
  if (process.exitCode === undefined) {
    process.exitCode = code ?? (signal ? 1 : 0);
  }
});

const keepAlive = setInterval(() => undefined, 60_000);

process.once("disconnect", () => {
  clearInterval(keepAlive);
});
