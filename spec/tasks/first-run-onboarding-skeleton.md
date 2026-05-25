# Task: First-Run Onboarding Skeleton

## Goal

Help a newly signed-in owner understand the first MVP setup path inside the authenticated app: add a pet profile, add a first document, then use reminders and Ask Caniello only after trusted pet context exists.

## Roadmap Alignment

Phase: Now

Why this belongs here:

First-run onboarding supports MVP Foundation activation by helping an owner onboard without help and find the entry points for pet profiles, documents, and reminders. It keeps the dashboard useful as a product skeleton without adding persistence, live uploads, AI behavior, sharing links, or provider workflows.

Related roadmap item:

`spec/roadmap.md` - Now: user can onboard without help, creates at least one pet profile, and creates at least one reminder or document.

## Scope

- Replace the current protected `/app` placeholder body with a first-run onboarding dashboard state inside the existing authenticated app shell.
- Base the surface on `spec/features/authenticated-app-dashboard-skeleton.md` and `spec/design/visual-artifacts/mvp/image 6.png`.
- Show a compact three-step setup path: add a pet, add the first document, then prepare reminders and Ask Caniello once enough owner-owned context exists.
- Add a non-persistent add-pet form skeleton with MVP-friendly fields: pet name, species, breed, birth date, sex or gender, and weight when they can be represented safely as UI-only fields.
- Add a first-document prompt with upload and scan affordances presented as disabled, preview, or coming-soon placeholders.
- Add a reminder/Ask Caniello preview that is clearly dependent on saved pet records and avoids diagnosis, treatment, emergency, or veterinary replacement promises.
- Preserve the existing authenticated shell navigation, top bar, logout behavior, responsive behavior, and Polish/English language switching.
- Keep the implementation feature-local to the web app account/app-home surface unless small content helpers are needed.
- Add or update focused React Testing Library coverage for the first-run onboarding copy, form skeleton fields, disabled placeholder actions, language switching, and preserved logout behavior.

## Non-Goals

- No real pet save flow, local demo state mutation, Supabase writes, or database migration.
- No real document upload, camera scan, OCR, extraction, review-confirm workflow, storage bucket work, or file validation.
- No live reminders, recurrence rules, notification delivery, email delivery, push notifications, or calendar sync.
- No live AI chat, symptom checking, diagnosis, treatment recommendation, emergency advice, or generated medical guidance.
- No real share links, caregiver access, PDF export, permissions changes, or invitation flow.
- No new section routes or empty-state pages beyond what the existing shell already links to.
- No mobile app or native camera work.

## Acceptance Criteria

- A signed-in owner visiting `/app` sees a polished first-run setup dashboard rather than the previous placeholder message.
- The setup path clearly presents the three expected steps in order: pet profile, first document, then reminders or Ask Caniello after context exists.
- The add-pet form skeleton is visible, accessible by label, and does not submit or persist data.
- Upload, scan, reminder, and Ask Caniello affordances are visibly unavailable, preview-only, or disabled, without implying that data was saved or analyzed.
- Copy explains Caniello as an organizer of owner-provided care information and preserves the medical boundary that it does not replace a veterinarian, diagnosis, treatment advice, emergency care, or an official pet passport.
- Polish and English copy are present and remain coherent after switching languages.
- The authenticated shell navigation, search field, pet selector, notification affordance, account area, and logout behavior still render and behave as covered by existing tests.
- The layout works at desktop and small viewport widths without horizontal document overflow or text overlap.
- Focused tests pass for the changed account/app-home behavior.

## Implementation Notes

- Start from `apps/web/features/account/AccountApp.tsx` and `apps/web/features/account/content.ts`, where the authenticated shell and bilingual app copy currently live.
- Prefer extracting small feature-local presentational helpers inside `AccountApp.tsx` only if they make the onboarding surface easier to read; avoid broad app/dashboard abstractions in this task.
- Use static UI-only field values and disabled or inert actions for the skeleton. If a button remains enabled for accessibility or visual reasons, it must not pretend to complete persistence and should expose preview-only copy.
- Keep the existing `/app` route and route type (`app-home`) unchanged.
- Preserve Polish-first behavior through `useLanguage`; add matching English strings for every new visible label and helper text.
- Use safe wording for Ask Caniello: frame it as future organization assistance grounded in saved records, not as medical advice.
- Do not introduce new packages, schema changes, Supabase calls, API routes, storage behavior, or shared contracts.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed for skeleton-only work

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Validation notes:

- Forge evaluator artifact: `spec/validation/first-run-onboarding-skeleton-evaluation.md`
- Fresh evaluator verdict: Pass. Acceptance criteria are supported by implementation review, focused tests, full web tests, TypeScript validation, and authenticated Playwright smoke validation.
- Follow-up implementation aligned the onboarding surface more closely with `spec/design/visual-artifacts/mvp/image 6.png`: welcome header, horizontal three-step strip, pet setup panel, document extraction/review preview panel, pet imagery, and bottom Caniello tip band.
- Follow-up implementation split the authenticated shell, topbar/search/account controls, left menu, dashboard body, onboarding stepper, pet panel, document panel, tip, fields, and icons into separate feature-local components under `apps/web/features/account/components/`.
- Evaluator-run `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed with the existing localStorage experimental warning.
- Evaluator-run `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- Evaluator-run `pnpm --filter web test` passed; 8 test files and 44 tests passed with existing localStorage experimental warnings.
- Evaluator-run `git diff --check` passed.
- Follow-up `pnpm build` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`; Turbo emitted existing no-output-files warnings for TypeScript-only package build tasks.
- Evaluator-run authenticated Playwright smoke passed outside the sandbox after local Supabase was started with `./scripts/start.sh`; it confirmed `/app`, title `Witaj w Caniello`, visible searchbox, active Home nav, disabled `Dodaj Bruno`, disabled first-document upload, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Follow-up screenshots were captured outside the repo at `/private/tmp/caniello-first-run-mockup-desktop.png` and `/private/tmp/caniello-first-run-mockup-mobile.png`.
- In-app Browser validation was unavailable, so Playwright was used as the browser validation fallback.
- Temporary screenshots were captured outside the repo at `/private/tmp/caniello-first-run-desktop.png` and `/private/tmp/caniello-first-run-mobile.png`.

## Handoff Notes

Implemented on 2026-05-24 on branch `codex/first-run-onboarding-skeleton`.

The signed-in `/app` home now renders a Polish/English first-run onboarding skeleton inside the existing authenticated shell. The surface follows the `image 6.png` mockup structure with a welcome header, horizontal step strip, add-pet form card, first-document extraction/review preview card, pet imagery, and Caniello tip band. It keeps the implementation skeleton-only: no pet persistence, upload/storage, scan, extraction, reminders, AI answers, sharing, or new routes.
