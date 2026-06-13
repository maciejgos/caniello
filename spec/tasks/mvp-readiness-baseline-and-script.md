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
- Create or update a reusable next-pass validation checklist covering new-owner access, profile, reminders, documents, timeline, sharing, account settings, mobile smoke, console errors, and mockup review.
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

- [ ] `git diff --check`.
- [ ] Manual review of links and readiness wording.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
