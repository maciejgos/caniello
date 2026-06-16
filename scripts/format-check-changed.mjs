import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const prettierExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedFilesFromGit() {
  const files = new Set();
  const base = process.env.FORMAT_CHECK_BASE;
  const head = process.env.FORMAT_CHECK_HEAD || "HEAD";

  if (base) {
    try {
      git(["diff", "--name-only", "--diff-filter=ACMRT", `${base}...${head}`])
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
      return files;
    } catch {
      git(["diff", "--name-only", "--diff-filter=ACMRT", base, head])
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
      return files;
    }
  }

  for (const args of [
    ["diff", "--name-only", "--diff-filter=ACMRT", "HEAD"],
    ["diff", "--cached", "--name-only", "--diff-filter=ACMRT"],
    ["ls-files", "--others", "--exclude-standard"],
  ]) {
    git(args)
      .split("\n")
      .filter(Boolean)
      .forEach((file) => files.add(file));
  }

  return files;
}

function extensionOf(file) {
  const index = file.lastIndexOf(".");
  return index === -1 ? "" : file.slice(index);
}

const files = [...changedFilesFromGit()].filter(
  (file) => existsSync(file) && prettierExtensions.has(extensionOf(file)),
);

if (files.length === 0) {
  console.log("Format check passed: no changed Prettier-managed files.");
  process.exit(0);
}

execFileSync("pnpm", ["exec", "prettier", "--check", ...files], {
  stdio: "inherit",
});
