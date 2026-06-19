import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { format } from "prettier";

const allowedStatuses = new Set(["planned", "in-progress", "review"]);
const backlogLabels = {
  planned: "Planned",
  "in-progress": "In progress",
  review: "Review",
};

function parseStatus(content) {
  return content.match(/^---\n[\s\S]*?^status:\s*([^\n]+)$/m)?.[1]?.trim();
}

function replaceTaskStatus(content, status) {
  if (!/^---\n[\s\S]*?^status:\s*[^\n]+$/m.test(content)) {
    throw new Error("Task is missing a status field in YAML frontmatter.");
  }
  return content.replace(/^(---\n[\s\S]*?^status:)\s*[^\n]+$/m, `$1 ${status}`);
}

function findBacklogRow(content, taskPath) {
  const lines = content.split("\n");
  const matches = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.includes(`](${taskPath})`));

  if (matches.length !== 1) {
    throw new Error(
      matches.length === 0
        ? `BACKLOG.md does not reference ${taskPath}.`
        : `BACKLOG.md references ${taskPath} more than once.`,
    );
  }

  const columns = matches[0].line.split("|");
  if (columns.length < 6) {
    throw new Error(`BACKLOG.md row for ${taskPath} is malformed.`);
  }

  return { ...matches[0], columns };
}

function normalizedStatus(value) {
  return value.trim().toLowerCase().replaceAll(" ", "-");
}

function replaceBacklogStatus(content, taskPath, currentStatus, nextStatus) {
  const row = findBacklogRow(content, taskPath);
  const backlogStatus = normalizedStatus(row.columns[3]);
  if (backlogStatus !== currentStatus) {
    throw new Error(
      `Status drift: task is "${currentStatus}" but BACKLOG.md is "${backlogStatus}".`,
    );
  }

  row.columns[3] = ` ${backlogLabels[nextStatus]} `;
  const lines = content.split("\n");
  lines[row.index] = row.columns.join("|");
  return lines.join("\n");
}

function assertSingleInProgress(tasksDirectory, selectedTaskPath, nextStatus) {
  if (nextStatus !== "in-progress") {
    return;
  }

  const otherActiveTasks = readdirSync(tasksDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => join(tasksDirectory, file))
    .filter((file) => file !== selectedTaskPath)
    .filter(
      (file) => parseStatus(readFileSync(file, "utf8")) === "in-progress",
    );

  if (otherActiveTasks.length > 0) {
    throw new Error(
      `Another task is already in progress: ${otherActiveTasks.join(", ")}.`,
    );
  }
}

function writePairAtomically(files) {
  const prepared = files.map(({ path, content }) => ({
    path,
    content,
    original: readFileSync(path, "utf8"),
    temporary: join(
      dirname(path),
      `.${basename(path)}.${process.pid}.${Date.now()}.tmp`,
    ),
  }));

  try {
    for (const file of prepared) {
      writeFileSync(file.temporary, file.content, "utf8");
    }
    for (const file of prepared) {
      renameSync(file.temporary, file.path);
    }
  } catch (error) {
    for (const file of prepared) {
      if (existsSync(file.temporary)) {
        unlinkSync(file.temporary);
      }
      if (readFileSync(file.path, "utf8") !== file.original) {
        writeFileSync(file.path, file.original, "utf8");
      }
    }
    throw error;
  }
}

export async function updateTaskStatus({
  root = process.cwd(),
  slug,
  status,
  write = writePairAtomically,
}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug ?? "")) {
    throw new Error("Task slug must use lowercase kebab-case.");
  }
  if (!allowedStatuses.has(status)) {
    throw new Error("Status must be planned, in-progress, or review.");
  }

  const taskPath = join(root, "spec", "tasks", `${slug}.md`);
  const backlogPath = join(root, "BACKLOG.md");
  if (!existsSync(taskPath)) {
    throw new Error(`Task does not exist: spec/tasks/${slug}.md.`);
  }
  if (!existsSync(backlogPath)) {
    throw new Error("BACKLOG.md does not exist.");
  }

  const taskContent = readFileSync(taskPath, "utf8");
  const backlogContent = readFileSync(backlogPath, "utf8");
  const currentStatus = parseStatus(taskContent);
  if (!allowedStatuses.has(currentStatus)) {
    throw new Error(
      `Task has invalid current status: ${currentStatus ?? "missing"}.`,
    );
  }

  assertSingleInProgress(dirname(taskPath), taskPath, status);
  const nextTaskContent = replaceTaskStatus(taskContent, status);
  const nextBacklogContent = await format(
    replaceBacklogStatus(
      backlogContent,
      `spec/tasks/${slug}.md`,
      currentStatus,
      status,
    ),
    { parser: "markdown" },
  );

  write([
    { path: taskPath, content: nextTaskContent },
    { path: backlogPath, content: nextBacklogContent },
  ]);

  return { currentStatus, status };
}

async function main() {
  const [, , slug, status] = process.argv;
  if (!slug || !status || process.argv.length !== 4) {
    console.error(
      "Usage: pnpm task:status -- <slug> <planned|in-progress|review>",
    );
    process.exit(2);
  }

  try {
    const result = await updateTaskStatus({ slug, status });
    console.log(
      `Updated ${slug}: ${result.currentStatus} -> ${result.status}.`,
    );
  } catch (error) {
    console.error(`Task status update failed: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
