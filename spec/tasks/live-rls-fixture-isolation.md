---
status: planned
roadmap: now
risk: high
adrs: [0015, 0028, 0030]
---

# Live RLS fixture isolation

## User story

As a developer, I want live RLS tests to use disposable data so that validation is repeatable and never mutates demo records.

## Acceptance criteria

- Live RLS tests leave seeded demo users and rows unchanged.
- Temporary owners and related rows use clear test identifiers and are cleaned up.
- Cleanup failures are visible in test output.
- Existing opt-in gating remains in place.
- Relevant live tests pass when local Supabase is available.

## Constraints

- Do not change production RLS policies unless a separate verified defect is found.
- Do not replace Vitest, Playwright, Supabase tooling, or seeded demo data.

## Verification

- Pending: before/after seed comparison, focused live RLS suite, cleanup-failure check, typecheck, and repository hygiene.
