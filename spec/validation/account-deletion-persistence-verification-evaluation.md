# Validation: Account Deletion Persistence Verification

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/account-deletion-persistence-verification.md`: verify that the account deletion request path persists to `account_deletion_requests`, preserves queued/manual copy boundaries, records audit evidence, and does not add actual account deletion behavior.

## Source Artifacts

- `spec/tasks/account-deletion-persistence-verification.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/architecture-records/0024-separate-audit-logs-from-product-events.md`
- `spec/architecture-records/0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md`
- `apps/web/features/account/server/account-settings.ts`
- `apps/web/features/account/server/account-settings.test.ts`
- `apps/web/features/account/server/account-settings.rls.test.ts`
- `apps/web/app/api/account/settings/route.test.ts`
- `apps/web/features/account/AccountApp.test.tsx`
- `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql`

## Preconditions

- Local dependencies installed.
- Local Supabase available for the opt-in RLS/database check.
- Account settings UI and API route already exist from the account privacy settings foundation.

## Execution Mode And Evaluator Layers

- Execution mode: Not explicitly defined by repo harness; treated as a focused validation/bug-verification task.
- Evaluator layers used: artifact review, code diff review, focused automated tests, full web Vitest, TypeScript lint, live local Supabase RLS/database test, roadmap/product-boundary review.

## Required Gates And Evidence Status

- Focused account settings tests: Passed.
- Full web tests: Passed.
- TypeScript lint/type gate: Passed.
- Live database/RLS evidence: Passed.
- UI/browser check: Not required for this evidence-only server/RLS test change; existing UI test coverage verifies the Settings deletion action posts the correct API payload and queued/manual copy was not changed.
- Roadmap/product boundary: Passed; no actual deletion, auth user deletion, cascade cleanup, email, operator UI, release, deployment, or product scope expansion was added.
- Architecture alignment: Passed; follows ADR 0024 audit boundary and ADR 0026 manual data-rights request queue.

## Ratchet Baseline Status

- Coverage baseline: Preserved and improved with focused account deletion request unit coverage and live audit evidence.
- Architecture constraints: Preserved; client UI still does not write directly to audit logs, and audit evidence remains database-triggered from the request row.
- Product constraints: Preserved; copy and behavior remain queued/manual and do not claim automatic deletion.
- Design constraints: Not applicable; no visible UI changed.

## Acceptance Criteria Mapping

- Criterion: The UI deletion request creates a durable row in the intended table or a verified explanation proves why the manual report was environment-specific.
  Evidence status: Supported.
  Evidence: `requestOwnerAccountDeletion` now has focused coverage proving it inserts authenticated-owner rows into `account_deletion_requests`; opt-in live RLS test passed against local Supabase and inserted an owner-owned deletion request row.

- Criterion: Tests cover the request path and persistence expectation.
  Evidence status: Supported.
  Evidence: `apps/web/features/account/server/account-settings.test.ts` covers exact confirmation validation and intended table insert; existing route/UI tests cover unauthenticated rejection and the Settings POST payload; `apps/web/features/account/server/account-settings.rls.test.ts` covers live owner insert/read isolation.

- Criterion: Browser or database evidence is recorded in the validation notes.
  Evidence status: Supported.
  Evidence: Live database/RLS command passed: `CANIELLO_RUN_SUPABASE_RLS_TESTS=1 pnpm --filter web exec vitest run features/account/server/account-settings.rls.test.ts`.

- Criterion: Copy still explains that the request is queued for follow-up and does not instantly delete the account.
  Evidence status: Supported.
  Evidence: No copy changed; existing `AccountApp.test.tsx` coverage still passes for account privacy settings and data-rights requests. `apps/web/features/account/content.ts` continues to say the account and records are not deleted automatically.

## Checks

- Check: Focused web account settings tests.
  Type: Automated.
  Status: Passed.
  Expected result: Server, route, and UI account settings behavior remains green.
  Actual result: `pnpm --filter web exec vitest run features/account/server/account-settings.test.ts app/api/account/settings/route.test.ts features/account/AccountApp.test.tsx` passed outside sandbox: 3 files, 23 tests.

- Check: Full web Vitest.
  Type: Automated.
  Status: Passed.
  Expected result: Existing web behavior remains green.
  Actual result: `pnpm --filter web test` passed: 19 files passed, 5 skipped; 107 tests passed, 5 skipped.

- Check: TypeScript lint/type gate.
  Type: Automated.
  Status: Passed.
  Expected result: TypeScript compiles without errors.
  Actual result: `pnpm --filter web lint` passed outside sandbox.

- Check: Live local Supabase account settings RLS/database test.
  Type: Security.
  Status: Passed.
  Expected result: Owner can insert own deletion request; second owner cannot read or insert another owner's records; deletion request audit evidence is written.
  Actual result: `CANIELLO_RUN_SUPABASE_RLS_TESTS=1 pnpm --filter web exec vitest run features/account/server/account-settings.rls.test.ts` passed outside sandbox: 1 file, 1 test.

- Check: Diff whitespace.
  Type: Automated.
  Status: Passed.
  Expected result: No whitespace errors.
  Actual result: `git diff --check` passed.

## Evidence

- Added `account-settings.test.ts` coverage for `requestOwnerAccountDeletion` inserting `{ owner_user_id, language }` into `account_deletion_requests` only after an exact `DELETE` confirmation.
- Added `account-settings.rls.test.ts` live assertion that an inserted deletion request creates an `audit_logs` row with action `account.deletion_requested`, entity type `account_deletion_request`, matching entity id, and bounded status/language metadata.
- Existing UI test coverage still confirms the Settings deletion request sends the API payload with `confirmation: "DELETE"` and does not change account deletion behavior.

## Findings

- P0: None.
- P1: None.
- P2: None.
- P3: None.

## Missing, Skipped, or Unavailable Checks

- Check: Browser UI smoke.
  Reason: Not run because no UI behavior, copy, CSS, route, or component logic changed. Existing AccountApp test coverage covers the relevant Settings interaction.
  Risk: Low.

## Future CI/CD or Lifecycle Gates

- Gate: Opt-in live RLS tests.
  Trigger: Before broader MVP privacy/readiness validation and before public health-record upload readiness.
  Blocks: Claims that account deletion request persistence and audit evidence are verified against live Supabase.

## Result

Pass

This is an evaluator readiness verdict only. It does not approve, merge, release, deploy, mark a human checkpoint complete, or accept the task artifacts.

## Follow-Up

Recommended next action: publish the focused evidence-only task as a small draft PR for human review.

## Human Decision

Pending.
