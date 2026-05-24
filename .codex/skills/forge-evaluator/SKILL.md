---
name: forge-evaluator
description: Evaluate one project task against its acceptance criteria, roadmap scope, tests, UI behavior, API behavior, and data behavior. Use after implementation or when reviewing task readiness.
---

# Forge Evaluator

## Purpose

Verify whether one implemented task works and stays within roadmap scope. The evaluator reports readiness but cannot approve the work.

## Inputs

- One `spec/tasks/*` task file.
- Current git diff and changed files.
- `AGENTS.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/handoff.md`
- `spec/validation/TEMPLATE.md`
- Relevant tests, code, API routes, database migrations, and UI routes.

## Workflow

1. Read the task goal, roadmap alignment, scope, non-goals, and acceptance criteria.
2. Read `spec/product-context.md` and `spec/roadmap.md`.
3. Inspect changed files and identify the behavior under test.
4. Check for roadmap or MVP scope drift.
5. Run relevant validation commands when practical.
6. For UI changes, use Playwright or browser validation across relevant viewports.
7. For API or database changes, verify request validation, persistence, permissions, and error behavior where relevant.
8. Record failures, skipped checks, unavailable tooling, and residual risk.
9. Create or update a durable validation artifact in `spec/validation/` using `spec/validation/TEMPLATE.md`.
10. Link the validation artifact from the task verification notes when the task file is in scope.
11. Update `spec/handoff.md` when requested or when evaluation changes the current workflow state.

## Evaluation Criteria

Report one verdict:

- `Pass`: acceptance criteria are satisfied and validation is adequate.
- `Pass with gaps`: core behavior works, but residual checks, polish, or evidence are missing.
- `Fail`: acceptance criteria are not met, scope drift exists, or material validation failed.

Check:

- user outcome works;
- acceptance criteria are observable;
- tests are meaningful and relevant;
- UI has no obvious broken state, overlap, or console/API errors;
- API and data behavior match task intent;
- privacy, security, and medical-safety boundaries are preserved;
- no `Next`, `Later`, or `Not Now` work slipped into the task.

## Validation Artifact

Every evaluation must leave an artifact from its work so the AI-assisted delivery loop can be closed without relying on chat history.

Create one focused Markdown file under `spec/validation/` unless a clearly matching validation file already exists and should be updated. Use a task-derived kebab-case name when practical, for example:

```text
spec/validation/<task-slug>-evaluation.md
```

The artifact must include:

- task or outcome being evaluated;
- source artifacts and changed files reviewed;
- acceptance criteria mapping with evidence status;
- commands, browser checks, manual checks, and their results;
- findings ordered by severity;
- skipped, unavailable, or deferred checks with risk;
- final evaluator verdict: `Pass`, `Pass with gaps`, or `Fail`;
- recommended next action;
- approval caveat that the evaluator does not approve, merge, release, or mark human checkpoints complete.

If the evaluation is blocked before meaningful inspection, still create the artifact with `Result: Blocked`, the blocker, attempted checks, and the next action.

## Rules

- Do not approve, merge, release, or mark human checkpoints complete.
- Do not expand the task to fix unrelated issues.
- Prefer concrete reproduction steps and file references over broad critique.

## Output

End with:

- verdict;
- checks run;
- findings ordered by severity;
- missing validation;
- recommended fixes or next action;
- validation artifact path;
- approval caveat.
