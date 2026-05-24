# Task: Dashboard Skeleton Validation

## Goal

Verify the authenticated dashboard skeleton is usable, safe, and aligned with MVP scope before deeper pet, document, reminder, assistant, or sharing implementation begins.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Validation protects the MVP foundation by checking that the authenticated workspace supports onboarding and navigation without leaking into out-of-scope claims or unimplemented product behavior.

Related roadmap item:

`spec/roadmap.md` - Now: owner-facing account, privacy, consent, and language behavior are reliable enough for MVP validation.

## Scope

- Run focused tests for the authenticated app shell and dashboard skeleton.
- Run browser checks for desktop and mobile layouts.
- Verify language switching, auth gating, logout, navigation states, and major call-to-action behavior.
- Check that medical boundary and assistant copy avoid diagnosis, treatment advice, emergency advice, and official passport replacement claims.
- Record validation evidence and any deferred checks in the task or handoff.

## Non-Goals

- No implementation changes beyond small test or copy fixes discovered during validation.
- No performance/load testing.
- No real AI, upload, reminder, sharing, or persistence validation unless already implemented by earlier tasks.
- No release approval.

## Acceptance Criteria

- `pnpm lint` passes or any failure is recorded with cause.
- `pnpm test` passes or any failure is recorded with cause.
- Relevant Playwright/browser checks cover `/app` after successful auth.
- Desktop and mobile screenshots show no incoherent overlaps or clipped primary text.
- Scope-safety copy is reviewed against the roadmap and product context.
- `spec/handoff.md` records validation status and remaining gaps.

## Implementation Notes

- Use the smallest meaningful validation first, then broaden if dashboard implementation touched shared components.
- Prefer existing demo account and local Supabase seed behavior for authenticated browser checks.
- Do not mark the feature accepted or released without human approval.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Pending implementation.
