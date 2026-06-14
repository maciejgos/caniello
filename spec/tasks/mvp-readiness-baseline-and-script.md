# Task: MVP readiness baseline and validation script

## Goal

Preserve the current readiness artifact as scoped evidence and create a clear validation script for the next MVP readiness pass.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The roadmap requires reliable MVP validation. This task makes the current "seeded-owner internal validation only" state explicit and prepares the next evidence pass without adding product behavior.

Related roadmap item:

`spec/roadmap.md` - Now / local development, CI, validation, and platform reliability needed to build and verify the MVP.

## Scope

- Keep `spec/validation/mvp-validation-readiness-2026-06-13.md` as accepted historical evidence with the revised readiness interpretation.
- Create or update a reusable next-pass validation checklist covering seeded-owner baseline checks, new-owner access, profile, reminders, documents, timeline, sharing, account settings, mobile smoke, console errors, and mockup review.
- Link the seven recovery tasks from the readiness artifact or handoff so the evidence chain is easy to follow.
- State clearly that seeded-owner validation is not equivalent to broader new-owner MVP readiness.

## Non-Goals

- Product code changes.
- Release, deployment, merge approval, or roadmap phase movement.
- Retesting every flow unless a separate evaluator task is requested.

## Acceptance Criteria

- A next-pass validation script exists under `spec/validation/` or is clearly embedded in the readiness artifact.
- The script distinguishes seeded-owner checks from new-owner checks.
- The script references the relevant task files and design artifacts.
- The handoff records that the current readiness artifact is historical evidence, not a launch approval.

## Implementation Notes

- Source artifact: `spec/validation/mvp-validation-readiness-2026-06-13.md`.
- Related feature brief: `spec/features/mvp-validation-readiness-recovery.md`.
- Keep this documentation-only unless the human asks for a live evaluator rerun.

## Architecture Decisions

- Existing ADRs: None.
- New ADR needed: No.
- ADR draft: None.
- Approval state: Not needed.

## Verification

- [x] `git diff --check`.
- [x] Manual review of links and readiness wording.
- [x] No roadmap scope expansion.
- [x] Handoff updated.
- [x] Evaluation artifact created: `spec/validation/mvp-readiness-baseline-and-script-evaluation.md`.

## Handoff Notes

Implemented on branch `codex/mvp-readiness-baseline-script`.

- Added next-pass validation script: `spec/validation/mvp-next-pass-validation-script.md`.
- Linked the script from `spec/features/mvp-validation-readiness-recovery.md`.
- The script preserves `spec/validation/mvp-validation-readiness-2026-06-13.md` as historical seeded-owner evidence and makes broader new-owner/mockup-fidelity readiness dependent on the recovery tasks.
- Validation: `git diff --check` passed; manual artifact review confirmed the script distinguishes seeded-owner checks from new-owner checks, references the recovery task files and MVP mockups, and does not add product behavior or roadmap scope.
- Evaluator verdict: Pass. Artifact: `spec/validation/mvp-readiness-baseline-and-script-evaluation.md`.
