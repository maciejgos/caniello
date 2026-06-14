# 0030 - Use disposable validation fixtures for live RLS tests

## Status

Accepted

## Date

2026-06-14

## Context

Caniello has opt-in live Supabase RLS tests for owner isolation. These tests are valuable, but handoff notes reported that some live validation paths mutate seeded Anna/Bruno demo rows.

Seeded demo data is useful for browser validation, but it should not be treated as disposable test data for isolation checks.

## Decision

Live RLS and integration tests must use disposable validation fixtures instead of mutating seeded demo rows.

Fixture rules:

- create temporary owners, households, pets, and related rows per test or test file;
- use unique emails and identifiers that clearly mark test ownership;
- clean up temporary Auth users and data after the test;
- leave `akowalska@example.com` and seeded Bruno data unchanged unless a manual validation task explicitly says otherwise;
- avoid relying on test execution order;
- keep opt-in live tests gated by environment variables;
- document any cleanup failure in validation notes.

When a test needs sample documents or Storage objects, it should:

- use a dedicated test object path prefix;
- keep files tiny;
- delete Storage objects during cleanup;
- not upload real medical documents.

Sandbox limitations should be recorded honestly. If local Supabase or Docker cannot be reached inside the sandbox, rerun outside the sandbox only with approval and record the result.

## Consequences

This keeps live security validation repeatable and prevents demo data from drifting.

The tradeoff is more fixture code. That is worthwhile because owner-isolation tests are security-relevant and should not leave the local project in an unknown state.

Future test helper extraction should follow ADR 0028: keep fixtures feature-local until duplication or cross-feature security risk justifies a shared test helper package.

## Related Artifacts

- [0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data](./0015-use-supabase-data-lifecycle-and-rls.md)
- [0028 - Use feature-local vertical slices with explicit shared-package graduation](./0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md)
- `infra/supabase/seed.sql`
- `apps/web/features/account/server/*.rls.test.ts`
- `spec/validation/mvp-validation-readiness-2026-06-13.md`
