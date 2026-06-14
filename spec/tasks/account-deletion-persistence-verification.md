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

- [ ] Focused account settings tests.
- [ ] Live local UI plus database verification.
- [ ] RLS/security check if persistence behavior changes.
- [ ] No actual account deletion behavior added.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
