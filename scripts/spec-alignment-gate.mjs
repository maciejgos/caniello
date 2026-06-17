import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const projectFilePatterns = [
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

const ignoredProjectFilePatterns = [
  /^scripts\/cleanup\.sh$/,
  /^scripts\/start\.sh$/,
  /^scripts\/stop\.sh$/,
];

const requiredTaskSections = [
  "Goal",
  "Roadmap Alignment",
  "Scope",
  "Non-Goals",
  "Acceptance Criteria",
  "Verification",
  "Handoff Notes",
];

const placeholderPatterns = [
  /\[(?:Task name|Describe|Concrete|Observable|Explicitly|Link or name|Known constraints|Mention relevant|List relevant|Yes \/ No|Path if created|Not needed \/ Draft pending human approval|Updated by Codex)[^\]]*\]/i,
  /<[^>]+>/,
  /\bTODO\b/i,
  /\bTBD\b/i,
  /\[Updated by Codex/i,
  /\[Describe\b/i,
  /\[Concrete\b/i,
  /\[Observable\b/i,
  /\[Explicitly\b/i,
  /\[Link or name\b/i,
];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFilesFromGit() {
  const files = new Set();
  const base = process.env.SPEC_GATE_BASE;
  const head = process.env.SPEC_GATE_HEAD || "HEAD";

  if (base) {
    try {
      git(["diff", "--name-only", "--diff-filter=ACMRT", `${base}...${head}`])
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
      return files;
    } catch {
      try {
        git(["diff", "--name-only", "--diff-filter=ACMRT", base, head])
          .split("\n")
          .filter(Boolean)
          .forEach((file) => files.add(file));
      } catch {
        git(["diff-tree", "--no-commit-id", "--name-only", "-r", head])
          .split("\n")
          .filter(Boolean)
          .forEach((file) => files.add(file));
      }
      return files;
    }
  }

  for (const args of [
    ["diff", "--name-only", "--diff-filter=ACMRT", "HEAD"],
    ["diff", "--cached", "--name-only", "--diff-filter=ACMRT"],
    ["ls-files", "--others", "--exclude-standard"],
  ]) {
    try {
      git(args)
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
    } catch {
      // CI should provide SPEC_GATE_BASE; local fallback is best effort.
    }
  }

  return files;
}

function changedFiles() {
  if (process.env.SPEC_GATE_FILES) {
    return new Set(
      process.env.SPEC_GATE_FILES.split(/[\n,]/)
        .map((file) => file.trim())
        .filter(Boolean),
    );
  }

  return changedFilesFromGit();
}

function section(content, heading) {
  const match = content.match(
    new RegExp(`^## ${heading}\\s*\\n+([\\s\\S]*?)(?=\\n## |\\s*$)`, "m"),
  );
  return match?.[1]?.trim() ?? "";
}

function hasPlaceholder(content) {
  return placeholderPatterns.some((pattern) => pattern.test(content));
}

function hasListItem(content) {
  return /^[-*]\s+\S/m.test(content);
}

function isProjectFile(file) {
  return (
    projectFilePatterns.some((pattern) => pattern.test(file)) &&
    !ignoredProjectFilePatterns.some((pattern) => pattern.test(file))
  );
}

function isTaskFile(file) {
  return (
    /^spec\/tasks\/[^/]+\.md$/.test(file) && file !== "spec/tasks/TEMPLATE.md"
  );
}

function isValidationFile(file) {
  return (
    /^spec\/validation\/[^/]+\.md$/.test(file) &&
    file !== "spec/validation/TEMPLATE.md" &&
    file !== "spec/validation/README.md"
  );
}

function isSpecSourceOfTruth(file) {
  return file === "spec/product-context.md" || file === "spec/roadmap.md";
}

function readExisting(file) {
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

function checkTaskFile(file) {
  const violations = [];
  const content = readExisting(file);

  if (!content) {
    return [`${file}: changed task file does not exist in the working tree.`];
  }

  for (const heading of requiredTaskSections) {
    const body = section(content, heading);
    if (!body) {
      violations.push(`${file}: missing required "${heading}" section.`);
      continue;
    }

    if (hasPlaceholder(body)) {
      violations.push(
        `${file}: "${heading}" still contains template placeholder text.`,
      );
    }
  }

  const roadmapAlignment = section(content, "Roadmap Alignment");
  const phase = roadmapAlignment.match(/^Phase:\s*(.+)$/im)?.[1]?.trim();
  if (!phase) {
    violations.push(`${file}: Roadmap Alignment must include "Phase: Now".`);
  } else if (!/^Now\b/i.test(phase)) {
    violations.push(
      `${file}: implementation-bearing tasks must remain in Now; found "Phase: ${phase}".`,
    );
  }

  for (const heading of ["Scope", "Non-Goals", "Acceptance Criteria"]) {
    const body = section(content, heading);
    if (body && !hasListItem(body)) {
      violations.push(
        `${file}: "${heading}" must include concrete list items.`,
      );
    }
  }

  const verification = section(content, "Verification");
  if (verification && !/\[[xX]\]/.test(verification)) {
    violations.push(
      `${file}: Verification must record completed checks with checked items.`,
    );
  }

  const handoffNotes = section(content, "Handoff Notes");
  if (
    handoffNotes &&
    !/(validation|verified|passed|skipped|unavailable|artifact)/i.test(
      handoffNotes,
    )
  ) {
    violations.push(
      `${file}: Handoff Notes must record validation evidence or skipped/unavailable checks.`,
    );
  }

  return violations;
}

const files = [...changedFiles()];
const projectFiles = files.filter(
  (file) => existsSync(file) && isProjectFile(file),
);
const taskFiles = files.filter((file) => existsSync(file) && isTaskFile(file));
const validationFiles = files.filter(
  (file) => existsSync(file) && isValidationFile(file),
);
const sourceOfTruthFiles = files.filter(
  (file) => existsSync(file) && isSpecSourceOfTruth(file),
);
const violations = [];

if (projectFiles.length > 0 && taskFiles.length === 0) {
  violations.push(
    `Project-affecting changes require a changed spec/tasks/*.md file. Changed project files: ${projectFiles.join(", ")}`,
  );
}

if (projectFiles.length > 0 && validationFiles.length === 0) {
  const taskHasValidationEvidence = taskFiles.some((file) =>
    /(validation|verified|passed|skipped|unavailable|artifact)/i.test(
      section(readExisting(file), "Handoff Notes"),
    ),
  );

  if (!taskHasValidationEvidence) {
    violations.push(
      "Project-affecting changes require a changed validation artifact or task handoff notes with validation evidence.",
    );
  }
}

for (const file of taskFiles) {
  violations.push(...checkTaskFile(file));
}

if (sourceOfTruthFiles.length > 0 && projectFiles.length > 0) {
  violations.push(
    `Do not mix product truth changes with implementation changes in one gate run: ${sourceOfTruthFiles.join(", ")}`,
  );
}

if (violations.length > 0) {
  console.error("Spec alignment gate failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  console.error(
    "\nTo fix: link implementation to a scoped Now task, record validation evidence, and keep product-truth edits separate.",
  );
  process.exit(1);
}

if (files.length === 0) {
  console.log("Spec alignment gate passed: no changed files.");
} else if (projectFiles.length === 0) {
  console.log(
    `Spec alignment gate passed: no project-affecting files among ${files.length} changed file(s).`,
  );
} else {
  console.log(
    `Spec alignment gate passed: ${projectFiles.length} project-affecting file(s), ${taskFiles.length} task artifact(s), ${validationFiles.length} validation artifact(s).`,
  );
}
