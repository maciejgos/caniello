import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
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
const allowedRoadmap = new Set(["now", "next", "later", "not-now"]);
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

export function validateTaskContent(file, content, exists = existsSync) {
  const violations = [];
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    return [`${file}: missing YAML frontmatter.`];
  }

  if (!allowedStatus.has(frontmatter.status)) {
    violations.push(`${file}: status must be planned, in-progress, or review.`);
  }
  if (!allowedRoadmap.has(frontmatter.roadmap)) {
    violations.push(`${file}: roadmap must be now, next, later, or not-now.`);
  }
  if (frontmatter.roadmap !== "now" && frontmatter.status !== "planned") {
    violations.push(
      `${file}: only roadmap now tasks may be in-progress or review.`,
    );
  }
  if (!allowedRisk.has(frontmatter.risk)) {
    violations.push(`${file}: risk must be low, medium, or high.`);
  }
  if (!/^\[[^\]]*\]$/.test(frontmatter.adrs ?? "")) {
    violations.push(`${file}: adrs must be a YAML inline list.`);
  } else {
    const adrs = [...frontmatter.adrs.matchAll(/\b(\d{4})\b/g)].map(
      (match) => match[1],
    );
    for (const adr of adrs) {
      if (!exists(`spec/adrs/${adr}-placeholder.md`)) {
        violations.push(`${file}: referenced ADR ${adr} does not exist.`);
      }
    }
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

  const verification = section(content, "Verification");
  if (
    frontmatter.status === "review" &&
    /\b(?:pending|todo|tbd)\b/i.test(verification)
  ) {
    violations.push(
      `${file}: review tasks must not contain pending verification.`,
    );
  }

  return violations;
}

function taskRecord(file, content) {
  const frontmatter = parseFrontmatter(content);
  return {
    file,
    status: frontmatter?.status,
    roadmap: frontmatter?.roadmap,
    risk: frontmatter?.risk,
  };
}

export function validateBacklog(content, tasks) {
  const violations = [];
  const rows = [
    ...content.matchAll(
      /^\|\s*\d+\s*\|\s*\[[^\]]+\]\((spec\/tasks\/[^)]+)\)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/gm,
    ),
  ].map((match) => ({
    file: match[1],
    status: match[2].trim().toLowerCase().replaceAll(" ", "-"),
    roadmap: match[3].trim().toLowerCase().replaceAll(" ", "-"),
    risk: match[4].trim().toLowerCase(),
  }));
  const rowsByFile = new Map(rows.map((row) => [row.file, row]));

  for (const task of tasks) {
    const row = rowsByFile.get(task.file);
    if (!row) {
      violations.push(`BACKLOG.md: missing active task ${task.file}.`);
      continue;
    }
    if (row.status !== task.status) {
      violations.push(
        `BACKLOG.md: ${task.file} status "${row.status}" does not match "${task.status}".`,
      );
    }
    if (row.roadmap !== task.roadmap) {
      violations.push(
        `BACKLOG.md: ${task.file} roadmap "${row.roadmap}" does not match "${task.roadmap}".`,
      );
    }
    if (row.risk !== task.risk) {
      violations.push(
        `BACKLOG.md: ${task.file} risk "${row.risk}" does not match "${task.risk}".`,
      );
    }
  }

  for (const row of rows) {
    if (!tasks.some((task) => task.file === row.file)) {
      violations.push(`BACKLOG.md: references missing task ${row.file}.`);
    }
  }

  return violations;
}

export function validateActiveTaskCount(tasks) {
  const active = tasks.filter((task) => task.status === "in-progress");
  return active.length > 1
    ? [
        `Only one task may be in progress: ${active
          .map((task) => task.file)
          .join(", ")}.`,
      ]
    : [];
}

export function evaluateTaskContract(
  files,
  read = readFileSync,
  exists = existsSync,
  allTaskFiles = [],
  backlogContent = "",
) {
  const projectFiles = files.filter(isProjectFile);
  const taskFiles = files.filter((file) => exists(file) && isTaskFile(file));
  const violations = [];

  if (projectFiles.length > 0 && taskFiles.length === 0) {
    violations.push(
      `Project-affecting changes require a changed spec/tasks/*.md file: ${projectFiles.join(", ")}`,
    );
  }

  const tasksToValidate = allTaskFiles.length > 0 ? allTaskFiles : taskFiles;
  const records = [];
  const adrExists = (placeholder) => {
    const adr = placeholder.match(/spec\/adrs\/(\d{4})-/)?.[1];
    return adr
      ? readdirSync("spec/adrs").some((file) => file.startsWith(`${adr}-`))
      : exists(placeholder);
  };

  for (const file of tasksToValidate) {
    const content = read(file, "utf8");
    violations.push(...validateTaskContent(file, content, adrExists));
    records.push(taskRecord(file, content));
  }

  violations.push(...validateActiveTaskCount(records));

  if (backlogContent) {
    violations.push(...validateBacklog(backlogContent, records));
  }

  return violations;
}

function main() {
  const files = [...changedFiles()];
  const allTaskFiles = readdirSync("spec/tasks")
    .filter((file) => file.endsWith(".md"))
    .map((file) => `spec/tasks/${file}`);
  const violations = evaluateTaskContract(
    files,
    readFileSync,
    existsSync,
    allTaskFiles,
    readFileSync("BACKLOG.md", "utf8"),
  );

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
