import { execFileSync } from "node:child_process";

const checks = [
  {
    label: "Shared landing lead contract tests",
    command: "pnpm",
    args: ["--filter", "@caniello/contracts", "test"],
  },
  {
    label: "MailerLite landing lead server tests",
    command: "pnpm",
    args: ["--filter", "web", "test", "--", "features/marketing/server/landing-leads.test.ts"],
  },
  {
    label: "Web typecheck for MailerLite integration",
    command: "pnpm",
    args: ["--filter", "web", "typecheck"],
  },
];

for (const check of checks) {
  console.log(`
[mailerlite-integration-gate] ${check.label}`);
  execFileSync(check.command, check.args, { stdio: "inherit" });
}

console.log("\nMailerLite integration validation gate passed.");
