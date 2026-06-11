# Task: Care Card Preview Foundation

## Goal

Create an authenticated, owner-only care card preview that summarizes the saved pet profile, reminders, and document metadata so an owner can inspect what would later become shareable or exportable care information.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The MVP promise includes shareable care information. This task delivers the smallest useful foundation for that promise by showing an owner-controlled care card preview from existing saved records without creating public links, PDFs, invitations, or caregiver permissions.

Related roadmap item:

`spec/roadmap.md` - Now: trusted sharing or export, pet profile, reminders, document vault, and owner account/privacy foundations.

## Scope

- Replace the inert Sharing placeholder with an authenticated care card preview surface.
- Load the current owner's first saved pet profile, reminder list, and document metadata using existing authenticated APIs.
- Summarize core care details: pet identity, microchip, allergies, medication, important notes, upcoming active reminders, and recent document metadata.
- Keep unavailable sharing/export actions disabled or preview-only.
- Include Polish and English copy that makes owner control, privacy, and medical boundaries clear.
- Provide a no-pet state that routes the owner back to the Pets section.
- Preserve existing Home, Pets, Documents, Reminders, Settings, language switching, auth gating, and logout behavior.

## Non-Goals

- No public `/share/[token]` route, share-token generation, revocation, expiry, access logging, invitations, caregiver accounts, caregiver permissions, or household permission changes.
- No PDF generation, browser print command automation, file download, Supabase Storage writes, signed URLs, or server-side export streaming.
- No database migration, new API route, shared contract change, storage bucket, external service, email, push, SMS, or calendar integration.
- No AI summaries, generated medical guidance, diagnosis, treatment recommendation, veterinary decision-making, emergency advice, or official EU pet passport replacement claim.
- No document upload, scan, OCR, extraction, classification, file preview, file download, or document verification.
- No reminder notification delivery, recurrence engine, snooze, digest, test notification, or automatic reminder suggestions.
- No marketplace, clinic/provider workflow, booking, payments, advanced analytics, referral mechanics, duplicate detection, partner document-upload flow, or mobile app work.

## Acceptance Criteria

- The authenticated Sharing navigation item opens an owner-only care card preview rather than the generic empty state.
- The preview loads existing owner-owned pet profile, reminder, and document metadata through existing authenticated API endpoints.
- The no-pet state clearly asks the owner to create a pet profile first and can navigate to the Pets section.
- The care card displays saved profile fields when available and uses clear missing-value copy without implying records exist when they do not.
- The preview lists a bounded set of upcoming active reminders and recent documents when those records exist.
- Sharing, link, invitation, PDF, export, and caregiver access controls remain disabled or unavailable and do not imply external access was created.
- Polish and English copy include owner-control, privacy, medical-boundary, and official-passport boundary language.
- Loading and error states are visible and do not wipe existing UI unexpectedly.
- Existing authenticated shell behavior, section navigation, language switching, auth gating, and logout behavior do not regress.
- Desktop and mobile layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
- Focused tests cover the care card preview, no-pet state, disabled unavailable actions, language switching, API-backed data display, and preserved shell behavior.

## Implementation Notes

- Start in `apps/web/features/account/components/AuthenticatedAppShell.tsx` and account feature components.
- Prefer a feature-local `CareCardPreviewSection` component rather than growing `AuthenticatedAppShell.tsx`.
- Reuse existing `/api/pets/profile`, `/api/reminders`, and `/api/documents` calls from the authenticated client. Do not add a combined endpoint unless a later task needs it.
- Keep the preview client-only and owner-authenticated. Do not introduce public share routes in this task.
- Bound list sizes in the UI, for example a few upcoming reminders and recent documents, to keep the care card scannable.
- Use existing ADR 0017 only as a boundary: scoped share tokens are accepted for future sharing, but this task intentionally defers token/link implementation.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Validation notes:

- Forge evaluator artifact: `spec/validation/care-card-preview-foundation-evaluation.md`
- Fresh evaluator verdict: Pass. Acceptance criteria are supported by focused tests, full web tests, TypeScript/lint validation, production build, scope review, and authenticated desktop/mobile Playwright smoke validation.
- Passed: `pnpm --filter web test -- AccountApp.test.tsx`; 1 test file and 13 tests passed, with the existing localStorage experimental warning.
- Passed: `pnpm --filter web test`; 13 files passed, 3 opt-in files skipped, 78 tests passed, 3 skipped, with existing localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
- Sandboxed `./scripts/start.sh` could not access Docker; approved outside-sandbox rerun passed, applied migrations, seeded data, and synced env files.
- In-process Playwright browser smoke failed under the macOS sandbox with Mach-port permission denial; approved outside-sandbox Playwright smoke passed on desktop 1440x1000 and mobile 390x900 using seeded owner `akowalska@example.com`.
- Browser smoke confirmed login, Sharing navigation, care card preview, disabled share-link and PDF actions, Polish/English safety and official-passport boundary copy, no console/page errors, and zero horizontal overflow.

## Handoff Notes

Planned, implemented, and evaluated on 2026-06-11 on branch `codex/care-card-preview-foundation`. The implementation replaces the inert Sharing placeholder with an authenticated owner-only care card preview built from existing pet profile, reminder, and document APIs. It intentionally adds no public share route, share token, revocation, expiry, access logging, invitation, caregiver permission, PDF export, storage write, migration, new API route, AI, notification delivery, clinic/provider workflow, booking, payment, marketplace, mobile work, release, deployment, or roadmap movement.
