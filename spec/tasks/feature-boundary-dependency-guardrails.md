# Task: Feature boundary dependency guardrails

## Goal

Add lightweight dependency guardrails for sensitive MVP boundaries without imposing empty architecture layers on every feature.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Good code quality and explicit provider boundaries protect sensitive owner data while keeping MVP implementation pragmatic.

Related roadmap item:

`spec/roadmap.md` - Now / local development, CI, validation, and platform reliability needed to build and verify the MVP.

## Scope

- Document the accepted lightweight dependency rule in implementation guidance.
- Add focused mechanical checks where practical for sensitive boundaries.
- Start with rules such as no direct Supabase calls from client UI, no service-role secrets outside server/provider helpers, and no audit/product-event writes from UI.
- Keep feature-local vertical slices as the default for ordinary MVP behavior.
- Add tests or static checks only where they catch real risk.

## Non-Goals

- Creating mandatory `repo/service/runtime` folders for every feature.
- Refactoring all existing features into a new architecture shape.
- Introducing a broad service layer or dependency framework.
- Blocking simple UI work with excessive ceremony.

## Acceptance Criteria

- Implementation guidance describes the lightweight dependency rule and sensitive-boundary exceptions.
- At least one practical check or test protects a real boundary.
- Existing MVP features are not broadly refactored without need.
- Future implementers know when to keep feature-local code and when to graduate to shared packages.

## Implementation Notes

- Follow ADR 0028.
- Likely files: `AGENTS.md`, `apps/web/AGENTS.md`, package/test config, focused architecture tests, or lightweight lint/check scripts.
- Prefer small checks using existing tooling before adding new dependencies.

## Architecture Decisions

- Existing ADRs: `0011`, `0028`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: ADRs accepted by human on 2026-06-14.

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
