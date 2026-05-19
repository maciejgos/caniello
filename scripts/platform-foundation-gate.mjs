import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const foundationTables = [
  "households",
  "pets",
  "documents",
  "document_processing_jobs",
  "extracted_fields",
  "timeline_events",
  "reminders",
  "share_links",
  "audit_logs",
];

const checks = [
  {
    label: "Shared health/version contract tests",
    command: "pnpm",
    args: ["--filter", "@caniello/contracts", "test", "--", "src/index.test.ts"],
  },
  {
    label: "Platform health/version API route tests",
    command: "pnpm",
    args: [
      "--filter",
      "web",
      "test",
      "--",
      "app/api/health/route.test.ts",
      "app/api/version/route.test.ts",
    ],
  },
  {
    label: "Supabase helper and migration baseline tests",
    command: "pnpm",
    args: ["--filter", "@caniello/db", "test", "--", "src/index.test.ts"],
  },
];

function fail(message) {
  console.error(`
[platform-foundation-gate] ${message}`);
  process.exit(1);
}

function read(path) {
  if (!existsSync(path)) {
    fail(`Missing required file: ${path}`);
  }
  return readFileSync(path, "utf8");
}

function walkFiles(root, extensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".env", ".example"])) {
  const files = [];

  function visit(path) {
    if (!existsSync(path)) {
      return;
    }

    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (["node_modules", ".next", ".turbo", "coverage", "test-results"].includes(path.split("/").at(-1))) {
        return;
      }
      for (const entry of readdirSync(path)) {
        visit(join(path, entry));
      }
      return;
    }

    const suffix = path.includes(".env") ? ".env" : path.slice(path.lastIndexOf("."));
    if (extensions.has(suffix)) {
      files.push(path);
    }
  }

  visit(root);
  return files;
}

function checkMigrationRls() {
  const migrationPath = "infra/supabase/migrations/20260519000100_mvp_foundation.sql";
  const migration = read(migrationPath);
  const missing = [];

  for (const table of foundationTables) {
    if (!migration.includes(`create table public.${table}`)) {
      missing.push(`${table}: missing table definition`);
    }
    if (!migration.includes(`alter table public.${table} enable row level security`)) {
      missing.push(`${table}: missing RLS enablement`);
    }
  }

  if (!migration.includes("references auth.users(id)")) {
    missing.push("households/audit model: missing auth.users ownership reference");
  }

  if (!migration.includes("auth.uid()")) {
    missing.push("RLS policies: missing auth.uid() owner scoping");
  }

  if (missing.length > 0) {
    fail(`Migration/RLS gate failed:\n- ${missing.join("\n- ")}`);
  }

  console.log("[platform-foundation-gate] Migration/RLS static coverage passed.");
}

function checkEnvironmentHygiene() {
  const envExample = read(".env.example");
  const violations = [];

  if (!envExample.includes("SUPABASE_SERVICE_ROLE_KEY=")) {
    violations.push(".env.example must document SUPABASE_SERVICE_ROLE_KEY as a server-only placeholder.");
  }

  if (envExample.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")) {
    violations.push(".env.example must not expose the Supabase service role key with NEXT_PUBLIC_.");
  }

  for (const file of walkFiles("apps")) {
    const content = readFileSync(file, "utf8");
    if (content.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")) {
      violations.push(`${file}: must not reference NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY.`);
    }
  }

  for (const file of walkFiles("packages")) {
    const content = readFileSync(file, "utf8");
    if (content.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")) {
      violations.push(`${file}: must not reference NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY.`);
    }
  }

  if (violations.length > 0) {
    fail(`Environment hygiene gate failed:\n- ${violations.join("\n- ")}`);
  }

  console.log("[platform-foundation-gate] Environment hygiene static coverage passed.");
}

for (const check of checks) {
  console.log(`
[platform-foundation-gate] ${check.label}`);
  execFileSync(check.command, check.args, { stdio: "inherit" });
}

checkMigrationRls();
checkEnvironmentHygiene();

console.log("\nPlatform foundation validation gate passed.");
