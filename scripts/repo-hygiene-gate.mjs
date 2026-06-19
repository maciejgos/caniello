import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

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
    violations.push(...trackedArtifactViolations(file));
  }
}

export function trackedArtifactViolations(file) {
  const found = [];
  if (generatedPathPatterns.some((pattern) => pattern.test(file))) {
    found.push(
      `${file}: generated output, cache, dependency folder, or tool artifact must not be tracked.`,
    );
  }
  if (localEnvPattern.test(file) && !allowedEnvFiles.has(file)) {
    found.push(`${file}: local environment files must not be tracked.`);
  }
  return found;
}

export function sourceBoundaryViolations(file, content) {
  const found = [];

  if (content.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")) {
    found.push(
      `${file}: service role keys must never use a NEXT_PUBLIC_ name.`,
    );
  }

  const isUiComponent =
    file.startsWith("apps/web/features/") && file.includes("/components/");
  if (isUiComponent && content.includes("SUPABASE_SERVICE_ROLE_KEY")) {
    found.push(
      `${file}: UI components must not read or reference Supabase service-role keys.`,
    );
  }
  if (
    isUiComponent &&
    (content.includes("@supabase/supabase-js") ||
      content.includes("createSupabaseServiceRoleClient"))
  ) {
    found.push(
      `${file}: UI components must not construct Supabase/provider clients directly.`,
    );
  }
  if (
    isUiComponent &&
    (content.includes("audit_logs") || content.includes("product_events"))
  ) {
    found.push(
      `${file}: UI components must not write audit or product-event records directly.`,
    );
  }

  const importPattern = /from\s+["']([^"']+)["']/g;
  const match = file.match(/^apps\/web\/features\/([^/]+)\//);
  if (match) {
    const currentFeature = match[1];
    let importMatch;
    while ((importMatch = importPattern.exec(content)) !== null) {
      const importPath = importMatch[1];
      const otherFeatureMatch =
        importPath.match(/^@\/features\/([^/]+)\//) ??
        importPath.match(/^apps\/web\/features\/([^/]+)\//);

      if (otherFeatureMatch && otherFeatureMatch[1] !== currentFeature) {
        found.push(
          `${file}: cross-feature import from "${importPath}" bypasses package contracts or feature-owned runtime boundaries.`,
        );
      }
    }
  }

  return found;
}

function checkSourceBoundaries(files) {
  for (const file of files) {
    violations.push(
      ...sourceBoundaryViolations(file, readFileSync(file, "utf8")),
    );
  }
}

function main() {
  const tracked = trackedFiles();
  const sourceFiles = sourceRoots.flatMap(walkFiles);

  checkTrackedArtifacts(tracked);
  checkSourceBoundaries(sourceFiles);

  if (violations.length > 0) {
    console.error("Repository hygiene gate failed:");
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log("Repository hygiene gate passed.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
