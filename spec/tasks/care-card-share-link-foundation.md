# Task: Care card share link foundation

## Goal

Let a signed-in owner create and revoke a controlled care-card share link for their saved pet so a trusted recipient can view a read-only care summary without account access.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The MVP promise includes shareable care information. This task turns the existing owner-only care card preview into the smallest real sharing foundation while keeping access scoped, revocable, and separate from caregiver accounts or PDF export.

Related roadmap item:

`spec/roadmap.md` - Now: trusted sharing or export, pet profile, reminders, document vault, and owner account/privacy foundations.

## Scope

- Add owner-authenticated share-link create/list/revoke behavior for the first saved pet's care card.
- Store only an opaque token hash in `public.share_links`; show the raw token URL only at creation time or from the active local UI state.
- Add a public read-only `/share/[token]` care-card page that resolves active, unexpired, unrevoked tokens and displays bounded pet profile, active upcoming reminders, and recent document metadata.
- Keep copy clear that the shared page is informational, owner-controlled, not an official EU pet passport, and not veterinary advice.
- Add focused server, route, UI, and browser validation for create, revoke, invalid token, expired/revoked token, and shared read-only display.

## Non-Goals

- No PDF generation, browser print automation, downloads, Supabase Storage writes, signed URLs, or server-side export streaming.
- No caregiver accounts, invitations, family plans, household permission changes, role management, or broad collaboration.
- No document file sharing, file previews, file downloads, storage bucket access, OCR, AI extraction, or generated summaries.
- No email, SMS, push delivery, calendar sync, notification delivery, booking, payments, marketplace, clinic/provider workflows, mobile app work, release, deployment, merge, or roadmap movement.
- No broad account-level tokens, persistent public pet profiles, editable public forms, or recipient authentication.

## Acceptance Criteria

- A signed-in owner with a saved pet can create an expiring care-card share link from the Sharing section.
- The owner can see active share-link status and revoke the active link.
- Share-link API requests reject unauthenticated owners before data access.
- Share-link tokens are generated as opaque random tokens and persisted only as hashes.
- `/share/[token]` displays a read-only care card for an active unexpired token and never exposes owner account, household, hidden documents, or raw token hashes.
- Invalid, expired, or revoked tokens show a safe unavailable state without leaking whether a pet or owner exists.
- UI copy remains Polish-first with English switching for owner management copy and shared-page safety boundaries.
- Focused tests cover owner create/revoke, public token resolution, unauthenticated API access, token hashing behavior, UI create/revoke states, public invalid-token display, and preserved existing shell behavior.

## Implementation Notes

- Use accepted ADR `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`.
- Reuse the existing `public.share_links` table and owner RLS policies from the MVP foundation migration when possible.
- Prefer Node `crypto` primitives for token generation and hashing in server-only code.
- Keep public token lookup server-side. Do not expose service-role configuration, token hashes, owner IDs, household IDs, or Supabase internals to client components.
- Bound shared content to the same care-card preview style: saved pet identity and health notes, a few active upcoming reminders, and a few recent document metadata rows.
- If access logging cannot be implemented without a new migration or excessive recipient data, record it as a deferred ADR 0017 follow-up rather than expanding this task.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed; scoped share tokens are already accepted in ADR 0017.

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Planned with `forge-planner` on 2026-06-11. Implementation should stay limited to a revocable, scoped care-card share link and public read-only care-card page. PDF export, invitations, caregiver accounts, broad permissions, document file access, AI, provider workflows, and release/deployment remain out of scope.

Implemented with `forge-implementer` on 2026-06-11 on branch `codex/care-card-share-link-foundation`. Added shared share-link API response contracts, owner-authenticated `/api/share-links`, server-only share-link helpers using opaque random tokens and SHA-256 hashes, public `/share/[token]` read-only care-card rendering, and Sharing-section create/revoke UI. Evaluation artifact: `spec/validation/care-card-share-link-foundation-evaluation.md`. Fresh evaluator verdict: Pass. Validation passed: focused share-link server and route tests, focused AccountApp UI tests, full web Vitest, full monorepo tests outside sandbox after sandbox fetch failure, web/contracts/db TypeScript checks, web lint outside sandbox after sandbox fetch failure, production build outside sandbox after sandbox fetch failure, `git diff --check`, and desktop/mobile Playwright smoke for public invalid share page and protected app redirect. Seeded local Supabase authenticated browser smoke was unavailable because local Supabase startup hung and no Supabase containers were running; coverage is otherwise provided by focused server, route, UI, build, and public-page browser checks. This task does not approve release, merge, deployment, human acceptance, or roadmap movement.
