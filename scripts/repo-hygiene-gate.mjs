import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const generatedPathPatterns = [
  /(^|\/)\.next(\/|$)/,
  /(^|\/)\.turbo(\/|$)/,
  /(^|\/)node_modules(\/|$)/,
  /(^|\/)coverage(\/|$)/,
  /(^|\/)playwright-report(\/|$)/,
  /(^|\/)test-results(\/|$)/,
  /(^|\/)pnpm-store(\/|$)/,
  /(^|\/)\.pnpm-store(\/|$)/,
  /(^|\/)dist(\/|$)/,
  /\.tsbuildinfo$/,
];

const localEnvPattern = /(^|\/)\.env(\..*)?$/;
const allowedEnvFiles = new Set([".env.example"]);
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs"]);
const sourceRoots = ["apps", "packages"];

const violations = [];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function trackedFiles() {
  const output = git(["ls-files"]);
  return output ? output.split("\n").filter(Boolean) : [];
}

function extensionOf(file) {
  const index = file.lastIndexOf(".");
  return index === -1 ? "" : file.slice(index);
}

function walkFiles(root) {
  const files = [];

  function visit(path) {
    if (!existsSync(path)) {
      return;
    }

    const stat = statSync(path);
    if (stat.isDirectory()) {
      const name = path.split("/").at(-1);
      if (
        [
          "node_modules",
          ".next",
          ".turbo",
          "coverage",
          "playwright-report",
          "test-results",
        ].includes(name)
      ) {
        return;
      }
      for (const entry of readdirSync(path)) {
        visit(join(path, entry));
      }
      return;
    }

    if (sourceExtensions.has(extensionOf(path))) {
      files.push(path);
    }
  }

  visit(root);
  return files;
}

function checkTrackedArtifacts(files) {
  for (const file of files) {
    if (generatedPathPatterns.some((pattern) => pattern.test(file))) {
      violations.push(
        `${file}: generated output, cache, dependency folder, or tool artifact must not be tracked.`,
      );
    }

    if (localEnvPattern.test(file) && !allowedEnvFiles.has(file)) {
      violations.push(`${file}: local environment files must not be tracked.`);
    }
  }
}

function checkSensitiveProviderBoundaries(files) {
  for (const file of files) {
    const content = readFileSync(file, "utf8");

    if (content.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")) {
      violations.push(
        `${file}: service role keys must never use a NEXT_PUBLIC_ name.`,
      );
    }

    const isUiComponent =
      file.startsWith("apps/web/features/") && file.includes("/components/");
    if (!isUiComponent) {
      continue;
    }

    if (content.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      violations.push(
        `${file}: UI components must not read or reference Supabase service-role keys.`,
      );
    }

    if (
      content.includes("@supabase/supabase-js") ||
      content.includes("createSupabaseServiceRoleClient")
    ) {
      violations.push(
        `${file}: UI components must not construct Supabase/provider clients directly.`,
      );
    }

    if (content.includes("audit_logs") || content.includes("product_events")) {
      violations.push(
        `${file}: UI components must not write audit or product-event records directly.`,
      );
    }
  }
}

function checkCrossFeatureImports(files) {
  const importPattern = /from\s+["']([^"']+)["']/g;

  for (const file of files) {
    const match = file.match(/^apps\/web\/features\/([^/]+)\//);
    if (!match) {
      continue;
    }

    const currentFeature = match[1];
    const content = readFileSync(file, "utf8");
    let importMatch;

    while ((importMatch = importPattern.exec(content)) !== null) {
      const importPath = importMatch[1];
      const otherFeatureMatch =
        importPath.match(/^@\/features\/([^/]+)\//) ??
        importPath.match(/^apps\/web\/features\/([^/]+)\//);

      if (otherFeatureMatch && otherFeatureMatch[1] !== currentFeature) {
        violations.push(
          `${file}: cross-feature import from "${importPath}" bypasses package contracts or feature-owned runtime boundaries.`,
        );
      }
    }
  }
}

const tracked = trackedFiles();
const sourceFiles = sourceRoots.flatMap(walkFiles);

checkTrackedArtifacts(tracked);
checkSensitiveProviderBoundaries(sourceFiles);
checkCrossFeatureImports(sourceFiles);

if (violations.length > 0) {
  console.error("Repository hygiene gate failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Repository hygiene gate passed.");
