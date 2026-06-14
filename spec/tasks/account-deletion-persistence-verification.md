# Task: Account deletion persistence verification

## Goal

Verify and, if needed, fix the account deletion request flow so a user's request is persisted to the intended table and can be trusted during privacy validation.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Account deletion request handling is part of the owner privacy and data-rights foundation needed before MVP validation with real users.

Related roadmap item:

`spec/roadmap.md` - Now / owner-facing account, privacy, consent, and language behavior are reliable enough for MVP validation.

## Scope

- Reproduce the manual finding by submitting an account deletion request through the UI.
- Inspect the local database table intended for deletion requests.
- Verify related audit behavior if the implementation is expected to create audit records.
- Fix route/helper/UI behavior only if the manual failure reproduces.
- Add or adjust tests to cover the live failure mode.

## Non-Goals

- Actual account deletion, auth user deletion, cascade cleanup, background jobs, or email notification.
- Production privacy operations workflow.
- Advanced account/team/household permissions.

## Acceptance Criteria

- The UI deletion request creates a durable row in the intended table or a verified explanation proves why the manual report was environment-specific.
- Tests cover the request path and persistence expectation.
- Browser or database evidence is recorded in the validation notes.
- Copy still explains that the request is queued for follow-up and does not instantly delete the account.

## Implementation Notes

- Existing code appears intended to write to `account_deletion_requests`; the manual finding says persistence failed, so reproduction comes before changes.
- Relevant files likely include `apps/web/features/account/server/account-settings.ts`, `/api/account/settings`, `AccountSettingsSection`, RLS tests, and migrations if a schema issue is discovered.
- Preserve data-rights copy and avoid promising immediate deletion.
- Follow ADR 0026 by preserving manual data-rights operations until automated lifecycle execution is explicitly approved.
- Follow ADR 0024 for audit/product-event separation if the request path records sensitive activity.
- Treat ADR 0031 as the release gate for public health-record upload readiness; this verification improves privacy readiness but does not approve release.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`, `spec/architecture-records/0024-separate-audit-logs-from-product-events.md`, `spec/architecture-records/0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md`, `spec/architecture-records/0031-require-release-readiness-playbook-before-public-health-record-upload.md`.
- New ADR needed: No for verification or bug fix; yes if changing account lifecycle policy.
- ADR draft: None.
- Approval state: ADRs accepted; account lifecycle policy changes still need explicit architecture approval.

## Verification

- [x] Focused account settings tests.
- [x] Database verification through opt-in live local Supabase RLS test.
- [x] RLS/security check preserved and extended for account deletion request audit evidence.
- [x] No actual account deletion behavior added.
- [x] Handoff updated.

## Handoff Notes

Implemented on branch `codex/account-deletion-persistence-verification`.

Evidence-only implementation: no runtime account settings behavior changed. Added focused server-helper coverage proving `requestOwnerAccountDeletion` requires the exact `DELETE` confirmation before auth/table access and inserts authenticated-owner requests into `account_deletion_requests`. Extended the opt-in live Supabase RLS test to prove an owner-owned `account_deletion_requests` insert creates an `audit_logs` row with `account.deletion_requested`, entity type `account_deletion_request`, the deletion request id, and bounded status/language metadata.

Validation passed:

- `pnpm --filter web exec vitest run features/account/server/account-settings.test.ts app/api/account/settings/route.test.ts features/account/AccountApp.test.tsx` outside sandbox: 3 files, 23 tests passed.
- `pnpm --filter web test`: 19 files passed, 5 skipped; 107 tests passed, 5 skipped.
- `pnpm --filter web lint` outside sandbox: passed.
- `CANIELLO_RUN_SUPABASE_RLS_TESTS=1 pnpm --filter web exec vitest run features/account/server/account-settings.rls.test.ts` outside sandbox with local Supabase: 1 file, 1 test passed.
- `git diff --check`: passed.

Validation artifact: `spec/validation/account-deletion-persistence-verification-evaluation.md`.

Known gaps: no browser UI smoke was run because this implementation changed only server and live RLS test evidence, while existing UI coverage already verifies the Settings deletion request posts `{ action: "account_deletion", payload: { confirmation: "DELETE", language: "pl" } }` and copy remains queued/manual. No human acceptance, release, deployment, merge, or roadmap movement is implied.
