# Task: Live RLS fixture isolation

## Goal

Harden opt-in live Supabase RLS tests so they use disposable fixtures and do not mutate seeded demo rows.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Owner isolation and repeatable local validation are part of the platform reliability needed for MVP development and verification.

Related roadmap item:

`spec/roadmap.md` - Now / local development, CI, validation, and platform reliability needed to build and verify the MVP.

## Scope

- Identify live RLS tests that mutate seeded Anna/Bruno rows.
- Introduce disposable owner/household/pet/document/reminder/share fixtures for live tests.
- Ensure temporary Auth users and rows are cleaned up.
- Add tiny Storage fixture cleanup rules for upload tests if needed.
- Document approved outside-sandbox rerun expectations when localhost/Docker are blocked.

## Non-Goals

- Changing production RLS policies unless a bug is found and separately scoped.
- Replacing Vitest, Playwright, or Supabase local tooling.
- Removing seeded demo data.

## Acceptance Criteria

- Live RLS tests leave seeded demo rows unchanged.
- Temporary fixtures are clearly named and cleaned up.
- Cleanup failures are visible in test output or validation notes.
- Existing opt-in gating remains in place.
- Focused live RLS tests pass when local Supabase is available.

## Implementation Notes

- Follow ADR 0030 and ADR 0028.
- Likely files: `apps/web/features/account/server/*.rls.test.ts`, test helpers, `infra/supabase/seed.sql` only if needed, and validation notes.

## Architecture Decisions

- Existing ADRs: `0015`, `0028`, `0030`.
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
