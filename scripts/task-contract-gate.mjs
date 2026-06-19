import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const projectPatterns = [
  /^apps\//,
  /^packages\//,
  /^infra\//,
  /^tests\//,
  /^scripts\//,
  /^\.github\/workflows\//,
  /^package\.json$/,
  /^pnpm-lock\.yaml$/,
  /^pnpm-workspace\.yaml$/,
  /^turbo\.json$/,
  /^vercel\.json$/,
  /^tsconfig\.json$/,
];

const ignoredProjectPatterns = [
  /^scripts\/cleanup\.sh$/,
  /^scripts\/start\.sh$/,
  /^scripts\/stop\.sh$/,
];

const allowedStatus = new Set(["planned", "in-progress", "review"]);
const allowedRisk = new Set(["low", "medium", "high"]);
const requiredSections = ["User story", "Acceptance criteria", "Verification"];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFilesFromGit() {
  const files = new Set();
  const base = process.env.TASK_GATE_BASE;
  const head = process.env.TASK_GATE_HEAD || "HEAD";

  if (base) {
    for (const args of [
      ["diff", "--name-only", "--diff-filter=ACMRTD", `${base}...${head}`],
      ["diff", "--name-only", "--diff-filter=ACMRTD", base, head],
    ]) {
      try {
        git(args)
          .split("\n")
          .filter(Boolean)
          .forEach((file) => files.add(file));
        return files;
      } catch {
        // Try the next diff form.
      }
    }
  }

  for (const args of [
    ["diff", "--name-only", "--diff-filter=ACMRTD", "HEAD"],
    ["diff", "--cached", "--name-only", "--diff-filter=ACMRTD"],
    ["ls-files", "--others", "--exclude-standard"],
  ]) {
    try {
      git(args)
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
    } catch {
      // Local fallback is best effort.
    }
  }

  return files;
}

function changedFiles() {
  if (!process.env.TASK_GATE_FILES) {
    return changedFilesFromGit();
  }

  return new Set(
    process.env.TASK_GATE_FILES.split(/[\n,]/)
      .map((file) => file.trim())
      .filter(Boolean),
  );
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) {
    return null;
  }

  const values = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      continue;
    }
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return values;
}

function section(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = content.match(
    new RegExp(`^## ${escaped}\\s*\\n+([\\s\\S]*?)(?=\\n## |\\s*$)`, "m"),
  );
  return match?.[1]?.trim() ?? "";
}

function isProjectFile(file) {
  return (
    projectPatterns.some((pattern) => pattern.test(file)) &&
    !ignoredProjectPatterns.some((pattern) => pattern.test(file))
  );
}

function isTaskFile(file) {
  return /^spec\/tasks\/[^/]+\.md$/.test(file);
}

export function validateTaskContent(file, content) {
  const violations = [];
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    return [`${file}: missing YAML frontmatter.`];
  }

  if (!allowedStatus.has(frontmatter.status)) {
    violations.push(`${file}: status must be planned, in-progress, or review.`);
  }
  if (frontmatter.roadmap !== "now") {
    violations.push(`${file}: roadmap must be now.`);
  }
  if (!allowedRisk.has(frontmatter.risk)) {
    violations.push(`${file}: risk must be low, medium, or high.`);
  }
  if (!/^\[[^\]]*\]$/.test(frontmatter.adrs ?? "")) {
    violations.push(`${file}: adrs must be a YAML inline list.`);
  }

  for (const heading of requiredSections) {
    const body = section(content, heading);
    if (!body || /^(pending|todo|tbd)[.!]?$/i.test(body)) {
      violations.push(`${file}: "${heading}" must be non-empty.`);
    }
  }

  const criteria = section(content, "Acceptance criteria");
  if (criteria && !/^[-*]\s+\S/m.test(criteria)) {
    violations.push(`${file}: "Acceptance criteria" must use list items.`);
  }

  return violations;
}

export function evaluateTaskContract(
  files,
  read = readFileSync,
  exists = existsSync,
) {
  const projectFiles = files.filter(isProjectFile);
  const taskFiles = files.filter((file) => exists(file) && isTaskFile(file));
  const violations = [];

  if (projectFiles.length > 0 && taskFiles.length === 0) {
    violations.push(
      `Project-affecting changes require a changed spec/tasks/*.md file: ${projectFiles.join(", ")}`,
    );
  }

  for (const file of taskFiles) {
    violations.push(...validateTaskContent(file, read(file, "utf8")));
  }

  return violations;
}

function main() {
  const files = [...changedFiles()];
  const violations = evaluateTaskContract(files);

  if (violations.length > 0) {
    console.error("Task contract gate failed:");
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log(
    files.length === 0
      ? "Task contract gate passed: no changed files."
      : `Task contract gate passed: checked ${files.length} changed file(s).`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
