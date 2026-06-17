# Task: Spec alignment gate

## Goal

Add a lightweight CI gate that verifies implementation-bearing changes are tied back to Caniello's scoped task and validation artifacts.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The roadmap explicitly allows local development, CI, validation, and platform reliability needed to build and verify the MVP. This task strengthens implementation governance without adding product behavior.

Related roadmap item:

`spec/roadmap.md` - Now / local development, CI, validation, and platform reliability needed to build and verify the MVP.

## Scope

- Replace the brittle keyword-only spec alignment check with a deterministic task and validation evidence gate.
- Require implementation-bearing changes to include a scoped `spec/tasks/*.md` artifact.
- Require task artifacts to include concrete roadmap alignment, scope, non-goals, acceptance criteria, verification, and handoff evidence.
- Wire the gate into package scripts and GitHub Actions, including the current `feature/**` branch family.

## Non-Goals

- Do not add product behavior, UI, routes, database migrations, or external service configuration.
- Do not attempt to make CI semantically prove that code fully satisfies every acceptance criterion.
- Do not update product scope, roadmap phase, accepted ADR state, release state, deployment state, merge state, or human approval state.

## Acceptance Criteria

- `pnpm validation:spec-alignment` runs the spec alignment gate.
- GitHub Actions runs the spec alignment gate in the validation job with base/head diff inputs.
- The gate passes for this scoped gate implementation when the task and validation artifacts are present.
- The gate fails when project-affecting files change without a task artifact.
- The gate fails when a changed task artifact still contains template placeholders or lacks completed verification evidence.

## Implementation Notes

- Use the existing Node script pattern from `scripts/pdlc-lifecycle-gate.mjs` and `scripts/repo-hygiene-gate.mjs`.
- Keep the gate deterministic and dependency-free.
- Treat the gate as an evidence contract, not a semantic reviewer.
- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.

## Architecture Decisions

- Existing ADRs: `0011`, `0028`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Implemented on branch `feature/spec-alignment-gate`. Validation artifact: `spec/validation/spec-alignment-gate-evaluation.md`. Review found Mistral's original committed gate was only partially implemented: it wired CI and `package.json`, but its CI-style diff failed because the branch did not include task or validation evidence. The repaired gate passed the explicit changed-file positive fixture, missing-task negative fixture, placeholder-task negative fixture, package script wiring, lifecycle gate compatibility, repository hygiene, formatting, and `git diff --check`. UI/browser validation was not required because this task changes CI/tooling only. Human accepted the spec-alignment gate artifacts on 2026-06-17; acceptance does not approve merge, release, deployment, release-readiness state, or roadmap movement.
