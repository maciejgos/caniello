# Task: Audit and product-event foundation

## Goal

Implement the first accepted audit-log and product-event boundaries for sensitive MVP owner actions without turning audit logs into analytics.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Audit and activation evidence are required to trust sensitive owner flows and validate MVP usage without adding broad analytics scope.

Related roadmap item:

`spec/roadmap.md` - Now / owner account, privacy, consent, localization, validation, and platform reliability.

## Scope

- Add shared event/action names for accepted MVP audit and product events.
- Add server-side helpers for writing audit logs and minimal product events.
- Reconcile existing account privacy audit triggers with server-side helpers.
- Add audit coverage for reminder changes and share-link creation/revocation where practical.
- Keep product events separate from `public.audit_logs`.
- Ensure payloads exclude medical notes, document contents, tokens, signed URLs, and secrets.
- Add focused tests for event naming, payload safety, and unauthorized write prevention.

## Non-Goals

- Adding PostHog or a broad external analytics provider.
- Advanced analytics, referral mechanics, duplicate detection, calendar sync, or partner workflows.
- Full audit coverage for document upload if that is handled in the document upload task.
- Operator/admin support tooling.

## Acceptance Criteria

- Server-side code has a clear helper/interface for audit evidence and product events.
- Sensitive actions covered by the task write bounded audit metadata.
- Product events remain separate from audit logs and respect consent boundaries where applicable.
- UI code does not write audit or product events directly.
- Tests prove disallowed sensitive payload fields are not emitted.

## Implementation Notes

- Follow ADR 0024 and ADR 0028.
- Existing `public.audit_logs` table should remain the audit source of truth.
- Product events may start as server-side no-op or local table-backed helper if durable storage is needed for validation.
- Likely files: `packages/contracts`, `apps/web/features/account/server/`, `apps/web/app/api/validation-events/route.ts`, and focused tests.

## Architecture Decisions

- Existing ADRs: `0014`, `0019`, `0024`, `0028`.
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
