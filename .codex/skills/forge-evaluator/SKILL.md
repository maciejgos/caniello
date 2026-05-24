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
9. Update the task verification notes and `spec/handoff.md` when requested.

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
- approval caveat.
