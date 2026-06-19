import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateTaskContract,
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
    "non-Now roadmap",
    valid.replace("roadmap: now", "roadmap: next"),
    "roadmap must be now",
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

test("validates backlog status and risk synchronization", () => {
  const backlog = `| 1 | [Example](spec/tasks/example.md) | In progress | Medium |`;
  assert.deepEqual(
    validateBacklog(backlog, [
      {
        file: "spec/tasks/example.md",
        status: "in-progress",
        risk: "medium",
      },
    ]),
    [],
  );
});

test("rejects backlog drift", () => {
  const backlog = `| 1 | [Example](spec/tasks/example.md) | Planned | High |`;
  const violations = validateBacklog(backlog, [
    {
      file: "spec/tasks/example.md",
      status: "in-progress",
      risk: "medium",
    },
  ]);
  assert.equal(violations.length, 2);
});
