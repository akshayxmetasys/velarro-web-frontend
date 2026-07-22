if (typeof process.send !== "function") {
  throw new Error("windows-grandchild fixture requires an IPC channel.");
}

process.send({
  type: "grandchild-ready",
  grandchildPid: process.pid,
});

const keepAlive = setInterval(() => undefined, 60_000);

process.once("disconnect", () => {
  clearInterval(keepAlive);
});
