# Task: Data-rights manual runbook

## Goal

Create the manual operations runbook for data export and account deletion requests before Caniello collects public health-record uploads.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Owner privacy and data-rights foundations are required for MVP validation with sensitive pet-health data.

Related roadmap item:

`spec/roadmap.md` - Now / owner-facing account, privacy, consent, and language behavior are reliable enough for MVP validation.

## Scope

- Document manual request intake, verification, export contents, deletion scope, retained audit evidence, Supabase Auth handling, Storage cleanup, and owner communication.
- Align the runbook with existing `data_export_requests` and `account_deletion_requests`.
- Include uploaded document files once ADR 0025 implementation exists.
- Add validation notes for the current account deletion persistence check.
- Keep UI copy honest that requests are queued, not automatically completed.

## Non-Goals

- Automating export generation.
- Automatically deleting Supabase Auth users or cascading account data.
- Building operator/admin UI.
- Sending transactional email.

## Acceptance Criteria

- A fresh operator can follow the runbook without chat history.
- Export and deletion scope is explicit and limited to owner-owned Caniello data.
- Storage cleanup expectations are documented for uploaded files.
- Audit evidence preservation is documented.
- Existing account settings copy remains accurate.

## Implementation Notes

- Follow ADR 0026 and ADR 0031.
- This is primarily documentation under `spec/` unless verification finds a persistence bug that needs a separate implementation task.
- Likely files: `spec/validation/`, `spec/tasks/account-deletion-persistence-verification.md`, `spec/handoff.md`, and possibly a new `spec/operations/` note if the repo has or needs that folder.

## Architecture Decisions

- Existing ADRs: `0015`, `0024`, `0025`, `0026`, `0031`.
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
