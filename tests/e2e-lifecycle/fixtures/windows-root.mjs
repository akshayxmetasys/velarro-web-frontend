import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const fixtureDirectory = dirname(fileURLToPath(import.meta.url));
const child = spawn(
  process.execPath,
  [resolve(fixtureDirectory, "windows-child.mjs")],
  {
    stdio: ["ignore", "ignore", "inherit", "ipc"],
    windowsHide: true,
  },
);

child.once("message", (message) => {
  if (message?.type !== "child-ready") {
    throw new Error("Unexpected child fixture readiness message.");
  }

  process.stdout.write(
    `${JSON.stringify({
      type: "tree-ready",
      rootPid: process.pid,
      childPid: message.childPid,
      grandchildPid: message.grandchildPid,
    })}\n`,
  );
});

child.once("exit", (code, signal) => {
  if (process.exitCode === undefined) {
    process.exitCode = code ?? (signal ? 1 : 0);
  }
});

setInterval(() => undefined, 60_000);
