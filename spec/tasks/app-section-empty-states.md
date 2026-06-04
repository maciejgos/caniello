# Task: App Section Empty States

## Goal

Create safe, navigable placeholder sections for the authenticated MVP areas so the dashboard skeleton feels coherent before pet, document, reminder, assistant, sharing, and settings features are fully implemented.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Section empty states support MVP foundation work by making the owner workspace navigable while individual pet, document, reminder, timeline, sharing, and account/privacy flows are implemented in smaller tasks. This task keeps the surfaces inert and does not introduce backend behavior.

Related roadmap item:

`spec/roadmap.md` - Now: pet profile, health records, reminders, document vault, trusted sharing/export, and owner account/privacy foundations.

## Scope

- Add section surfaces or route states for Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings inside the existing authenticated app experience.
- Keep Home returning-owner and first-run dashboard behavior available without regression.
- Provide empty-state copy and preview or disabled primary actions that point to the relevant future workflows without implying saved records or live backend capability.
- Include safe placeholder copy for Ask Caniello that frames it as future organization assistance grounded in owner-owned records.
- Include Sharing empty-state copy that emphasizes owner control without exposing real links, exports, invitations, or permissions.
- Include Settings empty-state copy for account, privacy, consent, and language foundations without adding new data-rights flows unless they already exist.
- Preserve Polish-first and English language behavior for all new visible labels and safety copy.
- Keep navigation consistent from every section across desktop and mobile layouts.

## Non-Goals

- No full CRUD implementation for pets, documents, reminders, or timeline events.
- No pet persistence, demo-state persistence, Supabase writes, database migrations, new API routes, storage buckets, or shared contract changes.
- No real document upload, scan, OCR, extraction, classification, review workflow, storage behavior, or verification statuses.
- No real reminder creation, recurrence rules, notification delivery, email delivery, push delivery, or calendar sync.
- No live AI chat, AI provider calls, generated summaries, generated medical guidance, symptom checking, diagnosis, treatment recommendation, veterinary decision-making, emergency advice, or unsafe medical guidance.
- No claim that Caniello replaces a veterinarian, emergency care, or an official EU pet passport.
- No share-link creation, revocation, PDF export, invitation flow, real caregiver access, sharing permissions, or advanced multi-role household model changes.
- No new account deletion, export, consent, or privacy workflow beyond existing foundations.
- No advanced analytics, referral mechanics, duplicate detection, calendar sync, or partner document-upload flows.
- No clinic, partner, marketplace, booking, payment, PIMS, EHR, or broad back-office workflows.
- No mobile app implementation.

## Acceptance Criteria

- Each authenticated core navigation item opens or selects a coherent section or empty state: Home, Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings.
- Home remains available and does not regress the returning-owner dashboard skeleton or first-run onboarding mode switch.
- Empty states make the next intended action clear while using disabled, preview-only, or unavailable states for unimplemented behavior.
- Empty states do not imply records were saved, uploaded, analyzed, scheduled, shared, exported, verified, or sent.
- Ask Caniello empty state includes a medical-safety boundary and avoids diagnosis, treatment advice, emergency guidance, and veterinary replacement claims in Polish and English.
- Sharing empty state emphasizes owner control and does not expose real share links, invitations, exports, revocation, or caregiver permissions.
- Settings empty state does not regress existing logout, privacy, consent, account, or language behavior.
- The authenticated shell navigation, search field, pet selector, notification affordance, account area, language switching, auth gating, and logout behavior continue to work.
- Desktop and small viewport layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
- Focused tests cover section navigation or route-state selection, empty-state copy, disabled or inert unavailable actions, language switching, safety copy, and preserved authenticated shell behavior.

## Implementation Notes

- Start from the existing authenticated app shell and account/home components under `apps/web/features/account/`.
- Prefer the smallest route-state or nested-route approach that fits the existing Next.js App Router structure. Do not introduce a durable routing architecture decision unless implementation discovers one is necessary.
- Keep section data static and feature-local. Avoid service layers for placeholder copy.
- Reuse existing legal, privacy, consent, and medical-boundary language where practical.
- Keep unavailable actions disabled or preview-only. If a control remains enabled for navigation or accessibility, it must not imply persistence, upload, AI analysis, sharing, export, scheduling, or notification delivery.
- Do not add packages, schemas, Supabase helpers, route handlers, storage access, AI provider access, notification infrastructure, analytics sinks, or mobile app code.
- Use existing component-boundary guidance from ADR 0011: keep route/page components thin and split distinct UI regions into feature-local components when it improves readability.

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

- Forge evaluator artifact: `spec/validation/app-section-empty-states-evaluation.md`
- Fresh evaluator verdict: Pass. Acceptance criteria are supported by implementation review, focused tests, full web tests, TypeScript validation, production build, manual scope review, and authenticated Playwright smoke validation.
- Implemented on 2026-06-04 on branch `codex/app-section-empty-states`.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 9 tests passed, with the existing localStorage experimental warning.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `pnpm --filter web test` passed; 8 test files and 45 tests passed, with existing localStorage experimental warnings.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Initial browser validation through the Node browser tool failed because Chromium could not launch under macOS sandbox permissions.
- Focused authenticated Playwright smoke initially could not log in until Docker Desktop and local Supabase were started. `./scripts/start.sh` passed after Docker Desktop launched.
- Focused authenticated Playwright smoke passed outside the sandbox on desktop Chromium and mobile Chromium using seeded account `akowalska@example.com`. It confirmed login to `/app`, section selection for Documents, Ask Caniello, Sharing, and Settings, disabled unavailable actions, Polish and English safety copy, Home navigation back to the dashboard, no browser console errors, and no horizontal overflow.

## Handoff Notes

Implemented authenticated section empty states as local route-state rendering inside the existing app shell. Navigation now selects Home, Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, or Settings without adding nested routes, backend calls, persistence, uploads, AI, real sharing, export, notification, calendar, clinic, partner, marketplace, booking, payment, or mobile behavior.

Human approved on 2026-06-04. Draft PR remains open at https://github.com/maciejgos/caniello/pull/20; no merge, release, or deployment has been recorded.
