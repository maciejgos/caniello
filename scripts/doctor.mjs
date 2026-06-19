import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const results = [];

function result(status, label, detail, repair) {
  results.push({ status, label, detail, repair });
}

function commandVersion(command, args = ["--version"]) {
  try {
    return execFileSync(command, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const expectedNodeMajor = Number(packageJson.engines.node.match(/\d+/)?.[0]);
const actualNodeMajor = Number(process.versions.node.split(".")[0]);

if (actualNodeMajor === expectedNodeMajor) {
  result("PASS", "Node.js", process.version);
} else {
  result(
    "FAIL",
    "Node.js",
    `${process.version}; expected major ${expectedNodeMajor}`,
    "Install/use Node 24, then rerun pnpm run doctor.",
  );
}

const pnpmVersion = commandVersion("pnpm");
if (pnpmVersion === packageJson.engines.pnpm) {
  result("PASS", "pnpm", pnpmVersion);
} else {
  result(
    "FAIL",
    "pnpm",
    pnpmVersion ?? "not found",
    `Run corepack enable && corepack prepare pnpm@${packageJson.engines.pnpm} --activate.`,
  );
}

for (const [command, repair] of [
  ["docker", "Install and start Docker Desktop."],
  ["supabase", "Install Supabase CLI with Homebrew."],
]) {
  const version = commandVersion(command);
  result(
    version ? "PASS" : "FAIL",
    command,
    version ?? "not found",
    version ? undefined : repair,
  );
}

try {
  execFileSync("docker", ["info"], { stdio: "ignore" });
  result("PASS", "Docker daemon", "reachable");
} catch {
  result(
    "WARN",
    "Docker daemon",
    "not reachable",
    "Start Docker Desktop before live Supabase checks.",
  );
}

for (const file of [".env.local", "apps/web/.env.local"]) {
  result(
    existsSync(file) ? "PASS" : "FAIL",
    file,
    existsSync(file) ? "present" : "missing",
    existsSync(file) ? undefined : "Run ./scripts/setup.sh.",
  );
}

try {
  execFileSync("supabase", ["status", "--workdir", "infra"], {
    stdio: "ignore",
  });
  result("PASS", "Local Supabase", "running");
} catch {
  result(
    "WARN",
    "Local Supabase",
    "not running",
    "Run ./scripts/start.sh before live auth/RLS/Storage checks.",
  );
}

console.log("Caniello harness doctor\n");
for (const item of results) {
  console.log(`[${item.status}] ${item.label}: ${item.detail}`);
  if (item.repair) console.log(`       ${item.repair}`);
}

const failures = results.filter((item) => item.status === "FAIL");
const warnings = results.filter((item) => item.status === "WARN");
console.log(
  `\nSummary: ${results.length - failures.length - warnings.length} passed, ${warnings.length} warning(s), ${failures.length} failure(s).`,
);

if (failures.length > 0) process.exit(1);
