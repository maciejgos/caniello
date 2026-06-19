import { spawn } from "node:child_process";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 120000);
let server;
let output = "";

async function fetchWithTimeout(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    return await fetch(`${baseUrl}${path}`, {
      redirect: "manual",
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function isRunning() {
  try {
    return (await fetchWithTimeout("/api/health")).ok;
  } catch {
    return false;
  }
}

async function waitForServer() {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isRunning()) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Web server did not become ready within ${timeoutMs}ms.`);
}

async function checkJson(path, predicate, label) {
  const response = await fetchWithTimeout(path);
  const body = await response.json();
  if (!response.ok || !predicate(body)) {
    throw new Error(
      `${label} failed (${response.status}): ${JSON.stringify(body)}`,
    );
  }
  console.log(`[PASS] ${label}`);
}

async function checkStatus(path, predicate, label) {
  const response = await fetchWithTimeout(path);
  if (!predicate(response)) {
    throw new Error(
      `${label} failed: status=${response.status} location=${response.headers.get("location") ?? ""}`,
    );
  }
  console.log(`[PASS] ${label}`);
}

try {
  if (!(await isRunning())) {
    console.log(`Starting web server for smoke checks at ${baseUrl}...`);
    server = spawn("pnpm", ["--filter", "web", "dev"], {
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
      detached: process.platform !== "win32",
    });
    for (const stream of [server.stdout, server.stderr]) {
      stream.on("data", (chunk) => {
        output = `${output}${chunk}`.slice(-12000);
      });
    }
    await waitForServer();
  } else {
    console.log(`Using existing web server at ${baseUrl}.`);
  }

  await checkJson(
    "/api/health",
    (body) => body?.ok === true && body?.service === "caniello-web",
    "Health endpoint",
  );
  await checkJson(
    "/api/version",
    (body) => body?.app === "web" && typeof body?.version === "string",
    "Version endpoint",
  );
  await checkStatus("/", (response) => response.status === 200, "Landing page");
  await checkStatus(
    "/privacy",
    (response) => response.status === 200,
    "Privacy page",
  );
  await checkStatus(
    "/app",
    (response) =>
      [302, 303, 307, 308].includes(response.status) &&
      response.headers.get("location")?.includes("/login"),
    "Protected app redirect",
  );
  console.log("\nRuntime smoke passed.");
} catch (error) {
  console.error(`\nRuntime smoke failed: ${error.message}`);
  if (output) console.error(`\nRecent server output:\n${output}`);
  process.exitCode = 1;
} finally {
  if (server && !server.killed) {
    if (process.platform === "win32") server.kill();
    else process.kill(-server.pid, "SIGTERM");
  }
}
