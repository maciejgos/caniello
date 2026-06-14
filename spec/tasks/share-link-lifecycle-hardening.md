# Task: Share-link lifecycle hardening

## Goal

Strengthen share-link lifecycle behavior with access logging and operational revocation notes before expanding sharing beyond scoped links.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Trusted sharing is part of the MVP foundation, and scoped share links must remain safe before broader caregiver access is considered.

Related roadmap item:

`spec/roadmap.md` - Now / owner can share a care card, share link, or PDF-style summary when approved for implementation.

## Scope

- Add bounded access logging for share-link opens.
- Confirm raw share tokens are never stored or recovered after creation.
- Keep public share pages metadata-only for uploaded documents.
- Add an operational revoke-one and revoke-all note for owner/pet incidents.
- Add tests for access logging, revoked/expired links, invalid token behavior, and no raw token leakage.

## Non-Goals

- Caregiver accounts, invitations, recipient identity, persistent portals, family permissions, or role management.
- Public document-file sharing.
- PDF export.
- Advanced rate-limiting infrastructure unless abuse appears.

## Acceptance Criteria

- Share-link opens create bounded access evidence without storing raw tokens or document contents.
- Revoked, expired, and invalid links behave generically and safely.
- Owners can still revoke active share links.
- Public share pages do not expose uploaded document files.
- Tests cover the lifecycle and privacy boundaries.

## Implementation Notes

- Follow ADR 0029, ADR 0024, and ADR 0025.
- Likely files: `apps/web/features/account/server/share-links.ts`, `/api/share-links`, `/share/[token]`, contracts, migrations if an access-log table is needed, and tests.

## Architecture Decisions

- Existing ADRs: `0017`, `0024`, `0025`, `0029`.
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
