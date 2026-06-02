# Task: Home Dashboard Skeleton

## Goal

Give returning owners a useful home dashboard structure that shows what matters next for a pet and where core care records will appear.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The home dashboard organizes the MVP foundation areas: pet health information, reminders, documents, timeline, sharing entry points, and safe assistant discovery.

Related roadmap item:

`spec/roadmap.md` - Now: owner can manage pet profile, store health information, add reminders, upload/store documents, and access trusted sharing/export when approved.

## Scope

- Add a returning-user dashboard state inspired by `spec/design/visual-artifacts/mvp/image 1.png`.
- Keep the dashboard skeleton inside the existing authenticated app shell and preserve the first-run onboarding surface unless the codebase already has a safe local way to select the returning-owner state.
- Use a small feature-local static view model for returning-owner demo content. Do not read or write Supabase records in this task.
- Show "What's next" cards for vaccine due, vet visit, medication, and document review as preview/demo data.
- Show health summary, recent documents, care timeline preview, Ask Caniello preview, sharing prompt, and Caniello tip sections as inert or safely disabled skeleton surfaces.
- Keep calls to action routed only to implemented skeleton sections, or visibly disabled when the destination does not exist yet.
- Use safe copy for assistant and medical boundaries. Ask Caniello must be framed as future organization assistance grounded in saved owner records, not diagnosis, treatment advice, emergency guidance, or veterinary replacement.
- Make the dashboard visually consistent with the existing Caniello brand direction.
- Preserve Polish-first and English language behavior for all new visible copy.

## Non-Goals

- No pet persistence, demo-state persistence, Supabase writes, database migrations, or new API routes.
- No real reminder creation/editing.
- No real document upload, storage, OCR, extraction, review workflow, or verification statuses.
- No real timeline event detail pages.
- No live Ask Caniello answers, chat UI, AI provider calls, generated summaries, symptom checking, diagnosis, treatment recommendation, or emergency advice.
- No real sharing permissions, caregiver access model, share links, revocation, or PDF export.
- No new notifications, email delivery, push delivery, or calendar sync.
- No advanced analytics tracking unless separately approved.
- No clinic, partner, marketplace, booking, payment, or official EU pet passport replacement behavior.

## Acceptance Criteria

- A signed-in owner can see a complete home dashboard skeleton with the major sections from the mockup.
- Returning-owner demo data is visually distinguishable enough that it does not imply saved records, completed reminders, verified documents, AI analysis, or active sharing.
- All dashboard links either navigate to implemented skeleton sections or are visibly disabled with preview-only copy.
- Medical boundary language is available from the authenticated experience and does not claim Caniello replaces a veterinarian, emergency care, diagnosis, treatment advice, or an official pet passport.
- Polish and English copy are present and remain coherent after switching languages.
- The authenticated shell navigation, search field, pet selector, notification affordance, account area, first-run onboarding route behavior, and logout behavior do not regress.
- The dashboard passes responsive visual checks for desktop and mobile widths without horizontal document overflow or incoherent text overlap.
- Focused tests cover the dashboard skeleton copy, demo/preview state, disabled or inert unavailable actions, language switching, and preserved authenticated shell behavior.

## Implementation Notes

- Prefer simple static view models for this task unless a prior task has created real pet/reminder/document data access and the task is explicitly amended to use it.
- Avoid introducing broad service layers for demo dashboard data.
- If the implementation needs to distinguish first-run from returning-owner state before persistence exists, use the smallest safe local mechanism available in the existing app structure, and document that it is demo-only.
- Keep new dashboard UI in feature-local components under `apps/web/features/account/components/` where practical, following the existing first-run onboarding component boundaries.
- Do not add packages, shared contracts, Supabase helpers, storage behavior, or route-level architecture changes for this skeleton task.
- If a button remains enabled for accessibility or visual consistency, it must not imply that data was saved, analyzed, shared, uploaded, or scheduled.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
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

- Forge evaluator artifact: `spec/validation/home-dashboard-skeleton-evaluation.md`
- Fresh evaluator verdict: Pass. Acceptance criteria are supported by focused tests, full web tests, TypeScript validation, production build, manual scope review, and authenticated Playwright smoke validation.
- Implemented on 2026-06-02 on branch `codex/home-dashboard-skeleton`.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- `pnpm --filter web lint` failed in the sandbox with `[ERROR] fetch failed`; escalated rerun passed.
- `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- `pnpm build` failed in the sandbox with `[ERROR] fetch failed`; escalated rerun passed.
- `git diff --check` passed.
- Authenticated Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com` and password `CanielloDemo123!`; confirmed unauthenticated `/app` redirects to login, login returns to `/app`, returning-owner dashboard content renders, preview actions are disabled, Polish/English switching works, first-run onboarding remains reachable, no console errors occurred, and desktop/mobile widths had no horizontal overflow.
- Playwright screenshots were captured outside the repo at `/private/tmp/caniello-home-dashboard-desktop.png` and `/private/tmp/caniello-home-dashboard-mobile.png`.
- Manual scope review confirmed the implementation added no persistence, Supabase writes, migrations, API routes, uploads, storage, OCR, live reminders, live AI, real sharing, PDF export, notification delivery, calendar sync, clinic/provider, marketplace, booking, payment, or official passport replacement behavior.

## Handoff Notes

Implemented on 2026-06-02 on branch `codex/home-dashboard-skeleton`.

The signed-in `/app` home now defaults to a returning-owner dashboard skeleton for Bruno and keeps the first-run onboarding surface available through a local, non-persistent mode switch. Returning-owner dashboard data is static, feature-local demo content. Dashboard actions that would require unimplemented section routes, AI, document handling, reminders, or sharing are disabled or preview-only.

Evaluation pass completed on 2026-06-02. Artifact: `spec/validation/home-dashboard-skeleton-evaluation.md`.
