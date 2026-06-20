import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateTaskContract,
  validateActiveTaskCount,
  validateBacklog,
  validateTaskContent,
} from "./task-contract-gate.mjs";

const valid = `---
status: in-progress
roadmap: now
risk: medium
adrs: [0011]
---

# Example

## User story

As a maintainer, I want a small task contract.

## Acceptance criteria

- The contract passes.

## Verification

- Tests are recorded here.
`;

test("accepts the lean task contract", () => {
  assert.deepEqual(
    validateTaskContent("spec/tasks/example.md", valid, () => true),
    [],
  );
});

test("rejects a project change without a task", () => {
  const violations = evaluateTaskContract(
    ["apps/web/example.ts"],
    () => "",
    () => true,
  );
  assert.ok(
    violations.some((violation) => violation.includes("require a changed")),
  );
});

test("rejects a deleted project file without a task", () => {
  const violations = evaluateTaskContract(
    ["apps/web/removed.ts"],
    () => "",
    () => false,
  );
  assert.ok(
    violations.some((violation) => violation.includes("require a changed")),
  );
});

test("allows documentation-only deletion of a completed task", () => {
  assert.deepEqual(
    evaluateTaskContract(
      ["spec/tasks/completed.md"],
      () => "",
      () => false,
    ),
    [],
  );
});

for (const [name, content, expected] of [
  ["missing frontmatter", "# Example", "missing YAML frontmatter"],
  ["invalid status", valid.replace("in-progress", "done"), "status must be"],
  [
    "invalid risk",
    valid.replace("risk: medium", "risk: extreme"),
    "risk must be",
  ],
  [
    "invalid roadmap",
    valid.replace("roadmap: now", "roadmap: someday"),
    "roadmap must be now, next, later, or not-now",
  ],
  [
    "empty user story",
    valid.replace("As a maintainer, I want a small task contract.", "TODO"),
    '"User story" must be non-empty',
  ],
  [
    "missing criteria",
    valid.replace("## Acceptance criteria", "## Outcomes"),
    '"Acceptance criteria" must be non-empty',
  ],
  [
    "missing verification",
    valid.replace("## Verification", "## Evidence"),
    '"Verification" must be non-empty',
  ],
]) {
  test(`rejects ${name}`, () => {
    assert.ok(
      validateTaskContent("spec/tasks/example.md", content).some((violation) =>
        violation.includes(expected),
      ),
    );
  });
}

for (const roadmap of ["next", "later", "not-now"]) {
  test(`accepts a planned ${roadmap} task`, () => {
    const content = valid
      .replace("status: in-progress", "status: planned")
      .replace("roadmap: now", `roadmap: ${roadmap}`);
    assert.deepEqual(
      validateTaskContent("spec/tasks/example.md", content, () => true),
      [],
    );
  });

  test(`rejects an active ${roadmap} task`, () => {
    const content = valid.replace("roadmap: now", `roadmap: ${roadmap}`);
    assert.ok(
      validateTaskContent("spec/tasks/example.md", content, () => true).some(
        (violation) => violation.includes("only roadmap now tasks"),
      ),
    );
  });
}

test("rejects pending verification at review", () => {
  const content = valid
    .replace("status: in-progress", "status: review")
    .replace("Tests are recorded here.", "Pending tests.");
  assert.ok(
    validateTaskContent("spec/tasks/example.md", content, () => true).some(
      (violation) => violation.includes("must not contain pending"),
    ),
  );
});

test("rejects a missing ADR reference", () => {
  assert.ok(
    validateTaskContent("spec/tasks/example.md", valid, () => false).some(
      (violation) => violation.includes("ADR 0011 does not exist"),
    ),
  );
});

test("validates backlog status, roadmap, and risk synchronization", () => {
  const backlog = `| 1 | [Example](spec/tasks/example.md) | In progress | Now | Medium |`;
  assert.deepEqual(
    validateBacklog(backlog, [
      {
        file: "spec/tasks/example.md",
        status: "in-progress",
        roadmap: "now",
        risk: "medium",
      },
    ]),
    [],
  );
});

test("rejects backlog drift", () => {
  const backlog = `| 1 | [Example](spec/tasks/example.md) | Planned | Later | High |`;
  const violations = validateBacklog(backlog, [
    {
      file: "spec/tasks/example.md",
      status: "in-progress",
      roadmap: "now",
      risk: "medium",
    },
  ]);
  assert.equal(violations.length, 3);
});

test("rejects more than one in-progress task", () => {
  assert.deepEqual(
    validateActiveTaskCount([
      {
        file: "spec/tasks/one.md",
        status: "in-progress",
      },
      {
        file: "spec/tasks/two.md",
        status: "in-progress",
      },
    ]),
    ["Only one task may be in progress: spec/tasks/one.md, spec/tasks/two.md."],
  );
});

test("allows multiple review tasks", () => {
  assert.deepEqual(
    validateActiveTaskCount([
      {
        file: "spec/tasks/one.md",
        status: "review",
      },
      {
        file: "spec/tasks/two.md",
        status: "review",
      },
    ]),
    [],
  );
});
