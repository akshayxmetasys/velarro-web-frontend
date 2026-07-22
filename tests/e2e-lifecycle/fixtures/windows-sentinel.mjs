process.stdout.write(
  `${JSON.stringify({
    type: "sentinel-ready",
    sentinelPid: process.pid,
  })}\n`,
);

setInterval(() => undefined, 60_000);
