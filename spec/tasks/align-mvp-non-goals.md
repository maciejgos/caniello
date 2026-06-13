# Task: Align MVP non-goal documentation

## Goal

Keep Caniello's discoverable README and active roadmap aligned with the fuller product non-goals so future MVP work does not accidentally expand into excluded product areas.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The Now roadmap allows local development, validation, and platform reliability work needed to build and verify the MVP. Clear non-goal documentation protects the MVP foundation and keeps upcoming tasks inside the owner-side health organization promise.

Related roadmap item:

`spec/roadmap.md` - Now: owner account, privacy, consent, language behavior, and local validation reliability needed for MVP validation.

## Scope

- Update `README.md` so its initial-product non-goals mirror the fuller exclusions in `spec/product-context.md`.
- Update `spec/roadmap.md` so its `Not Now` list reflects the same excluded areas and avoids narrower wording than the product context.
- Preserve the existing MVP promise, Now/Next/Later ordering, and validation goals without moving scope between phases.

## Non-Goals

- No product feature implementation.
- No roadmap phase changes or promotion of `Next`, `Later`, or `Not Now` items.
- No changes to accepted ADR status, release state, branch policy, or human approval state.
- No new architecture, database, API, UI, authentication, privacy workflow, analytics, marketplace, clinic, booking, payment, AI, sharing, caregiver-account, or mobile behavior.

## Acceptance Criteria

- `README.md` explicitly excludes payments-first monetization, broad clinic or partner workflow ownership, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, partner document-upload flows, treatment recommendations, veterinary decision-making, AI diagnosis/symptom checking, and official EU pet passport replacement claims.
- `spec/roadmap.md` `Not Now` scope includes the same excluded areas without removing existing constraints.
- `spec/product-context.md` remains the durable product truth and is not weakened or contradicted.
- Documentation review confirms no MVP scope moved from `Next`, `Later`, or `Not Now` into `Now`.
- Formatting and repository checks run where practical.

## Implementation Notes

- This task follows the repeated handoff recommendation to mirror the fuller non-goal wording from `spec/product-context.md` into `README.md` and `spec/roadmap.md`.
- Keep edits textual and scoped to non-goal clarity.
- Use 2-space indentation for Markdown list continuations if needed.

## Architecture Decisions

- Existing ADRs: None.
- New ADR needed: No.
- ADR draft: None.
- Approval state: Not needed.

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Planned with `forge-planner` on 2026-06-13 on branch `codex/align-mvp-non-goals`. Implementation should stay limited to aligning README and roadmap non-goal wording with `spec/product-context.md`; no product behavior, roadmap movement, ADR, release, merge, deployment, or human approval state changes are in scope.

Implemented with `forge-implementer` on 2026-06-13. Updated `README.md` and `spec/roadmap.md` non-goal wording to mirror `spec/product-context.md`, including payments-first monetization, broad clinic or partner workflow ownership, treatment recommendations, veterinary decision-making, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload boundaries. Validation passed: `git diff --check`; targeted `rg` review across `README.md`, `spec/roadmap.md`, and `spec/product-context.md`; manual diff review confirmed no product behavior, phase movement, ADR, release, deployment, merge, or human approval state changes. UI/browser validation was not applicable because this is documentation-only. Evaluator verdict: Pass. Artifact: `spec/validation/align-mvp-non-goals-evaluation.md`.

Handoff refreshed on 2026-06-13 in `spec/handoff.md`. Next recommended action: publish `codex/align-mvp-non-goals` as a draft PR for human review.
