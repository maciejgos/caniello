import { spawnSync } from "node:child_process";

const mode = process.argv[2];
if (!["fast", "full"].includes(mode)) {
  console.error("Usage: node scripts/verify.mjs <fast|full>");
  process.exit(2);
}

const fastStages = [
  ["Task contract", ["validation:task-contract"]],
  ["Formatting", ["format:check"]],
  ["Repository hygiene", ["validation:repo-hygiene"]],
  ["Lint", ["lint"]],
  ["Typecheck", ["typecheck"]],
];

const fullStages = [
  ...fastStages,
  ["MailerLite boundary", ["validation:mailerlite-integration"]],
  ["Platform foundation", ["validation:platform-foundation"]],
  ["Unit and contract tests", ["test"]],
  ["Production build", ["build"]],
  ["Runtime smoke", ["smoke"]],
  ["Browser journeys", ["test:e2e"]],
];

const stages = mode === "fast" ? fastStages : fullStages;
const startedAt = Date.now();

for (const [label, args] of stages) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync("pnpm", args, {
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(`\nVerification failed at: ${label}`);
    process.exit(result.status ?? 1);
  }
}

console.log(
  `\nVerification (${mode}) passed: ${stages.length} stage(s) in ${Math.round((Date.now() - startedAt) / 1000)}s.`,
);
