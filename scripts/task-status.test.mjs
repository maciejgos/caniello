import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { updateTaskStatus } from "./task-status.mjs";

function fixture({
  taskStatus = "planned",
  backlogStatus = "Planned",
  includeBacklog = true,
  secondTaskStatus,
} = {}) {
  const root = mkdtempSync(join(tmpdir(), "caniello-task-status-"));
  const tasks = join(root, "spec", "tasks");
  mkdirSync(tasks, { recursive: true });
  writeFileSync(
    join(tasks, "example.md"),
    `---
status: ${taskStatus}
roadmap: now
risk: low
adrs: []
---

# Example
`,
  );
  if (secondTaskStatus) {
    writeFileSync(
      join(tasks, "other.md"),
      `---
status: ${secondTaskStatus}
roadmap: now
risk: low
adrs: []
---
`,
    );
  }
  writeFileSync(
    join(root, "BACKLOG.md"),
    includeBacklog
      ? `| 1 | [Example](spec/tasks/example.md) | ${backlogStatus} | Low |\n`
      : "| Priority | Task | Status | Risk |\n",
  );
  return root;
}

function contents(root) {
  return {
    task: readFileSync(join(root, "spec", "tasks", "example.md"), "utf8"),
    backlog: readFileSync(join(root, "BACKLOG.md"), "utf8"),
  };
}

test("updates task and backlog status together", async () => {
  const root = fixture();
  await updateTaskStatus({ root, slug: "example", status: "in-progress" });
  const updated = contents(root);
  assert.match(updated.task, /^status: in-progress$/m);
  assert.match(updated.backlog, /\| In progress \|/);
});

for (const [name, options, invocation] of [
  ["invalid slug", {}, { slug: "../example", status: "review" }],
  ["missing task", {}, { slug: "missing", status: "review" }],
  ["invalid status", {}, { slug: "example", status: "done" }],
  [
    "missing backlog row",
    { includeBacklog: false },
    { slug: "example", status: "review" },
  ],
  [
    "status drift",
    { backlogStatus: "Review" },
    { slug: "example", status: "in-progress" },
  ],
  [
    "another in-progress task",
    { secondTaskStatus: "in-progress" },
    { slug: "example", status: "in-progress" },
  ],
]) {
  test(`${name} fails without changing either file`, async () => {
    const root = fixture(options);
    const before = contents(root);
    await assert.rejects(() => updateTaskStatus({ root, ...invocation }));
    assert.deepEqual(contents(root), before);
  });
}

test("a write failure rolls back both files", async () => {
  const root = fixture();
  const before = contents(root);
  await assert.rejects(() =>
    updateTaskStatus({
      root,
      slug: "example",
      status: "review",
      write: () => {
        throw new Error("simulated write failure");
      },
    }),
  );
  assert.deepEqual(contents(root), before);
});
