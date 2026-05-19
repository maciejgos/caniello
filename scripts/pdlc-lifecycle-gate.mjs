import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const checkpointDirs = [
  "spec/validation/",
  "spec/release-readiness/",
  "spec/lifecycle/",
];

const terminalStatuses = new Set([
  "accepted",
  "approved",
  "complete",
  "completed",
  "released",
  "merged",
]);

const explicitHumanDecisionWords = [
  "accepted",
  "approved",
  "reviewed",
  "released",
  "merged",
  "deferred",
  "rejected",
  "blocked",
];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFilesFromGit() {
  const files = new Set();
  const base = process.env.PDLC_GATE_BASE;
  const head = process.env.PDLC_GATE_HEAD || "HEAD";

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
      // Ignore unavailable local diff sources; CI should provide PDLC_GATE_BASE.
    }
  }

  return files;
}

function changedFiles() {
  if (process.env.PDLC_GATE_FILES) {
    return new Set(
      process.env.PDLC_GATE_FILES.split(/[\n,]/)
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

function humanCheckpoint(content) {
  return (
    section(content, "Human Decision") ||
    section(content, "Human Checkpoint") ||
    section(content, "Human Checkpoint State")
  );
}

const filesToCheck = [...changedFiles()].filter(
  (file) =>
    file.endsWith(".md") &&
    checkpointDirs.some((directory) => file.startsWith(directory)) &&
    existsSync(file),
);

const violations = [];

for (const file of filesToCheck) {
  const content = readFileSync(file, "utf8");
  const status = section(content, "Status").split("\n")[0]?.trim() ?? "";
  const humanDecision = humanCheckpoint(content);
  const normalizedStatus = status.toLowerCase();
  const normalizedDecision = humanDecision.toLowerCase();

  if (!humanDecision) {
    violations.push(
      `${file}: add a human decision or checkpoint section before changing PDLC checkpoint artifacts.`,
    );
    continue;
  }

  if (terminalStatuses.has(normalizedStatus)) {
    const hasExplicitDecision = explicitHumanDecisionWords.some((word) =>
      normalizedDecision.includes(word),
    );

    if (!hasExplicitDecision) {
      violations.push(
        `${file}: status "${status}" requires an explicit human decision, not a pending or placeholder checkpoint.`,
      );
    }
  }
}

if (violations.length > 0) {
  console.error("PDLC lifecycle gate failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

if (filesToCheck.length === 0) {
  console.log("PDLC lifecycle gate passed: no changed checkpoint artifacts.");
} else {
  console.log(
    `PDLC lifecycle gate passed: checked ${filesToCheck.length} checkpoint artifact(s).`,
  );
}
