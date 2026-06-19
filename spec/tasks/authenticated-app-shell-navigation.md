# Task: Authenticated App Shell Navigation

## Goal

Give signed-in owners a stable Caniello application frame after login so core MVP areas are discoverable from the first authenticated screen.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The authenticated shell is owner-side MVP foundation work. It prepares the app for pet profiles, documents, reminders, sharing, and account settings without implementing out-of-scope product mechanics.

Related roadmap item:

`spec/roadmap.md` - Now: owner can create/manage pet profile, store care information, add reminders/documents, and rely on account/privacy/language foundations.

## Scope

- Replace the current `/app` protected placeholder with a reusable authenticated app shell layout.
- Add shell navigation entries for Home, Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings.
- Show the current Home section as active when the owner is on `/app`.
- Add presentational top-bar affordances for search, active pet selection, notifications, and account/logout access.
- Preserve existing logout access and session-gated behavior.
- Preserve Polish and English language behavior using the existing account and marketing language patterns.
- Establish a main content region inside the shell for later dashboard tasks, with only minimal non-card placeholder content if needed.
- Match the navigation and shell direction of `spec/design/visual-artifacts/mvp/home-dashboard.png` and `first-run-onboarding.png` closely enough for later dashboard implementation.

## Non-Goals

- No dashboard cards, onboarding strips, health summaries, timeline previews, document previews, care tips, or sharing prompts.
- No new dashboard data model, API, persistence, migrations, seeded data, or Supabase behavior.
- No real search implementation.
- No real notifications.
- No real pet switching.
- No real Ask Caniello assistant, AI chat, symptom checking, diagnosis, treatment recommendation, or emergency advice.
- No real sharing links, permission changes, caregiver access, or PDF export.
- No section-specific feature implementation behind Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, or Settings.
- No new app-section empty states beyond what is necessary to render the shell on `/app`.
- No account menu actions beyond existing logout behavior.
- No mobile app implementation.

## Acceptance Criteria

- A signed-in owner visiting `/app` sees the Caniello app shell instead of the placeholder card.
- Navigation labels for the core MVP areas are visible and usable at desktop widths.
- The Home navigation item is visibly active on `/app`.
- Top-bar search, pet selector, notification, and account/logout affordances are visible but do not imply live search, live notifications, pet switching, or new account settings behavior.
- The app shell has a responsive fallback that does not overlap or clip content on small screens.
- Language switching keeps the shell labels and safety copy coherent in Polish and English.
- Unauthorized visitors remain blocked by the existing auth protection.
- The implementation does not add dashboard cards, persistence, real search, real notifications, live AI behavior, or sharing behavior.

## Implementation Notes

- Affected area is expected to be `apps/web/features/account/AccountApp.tsx` unless the implementer chooses to extract feature-local app shell components.
- Use existing brand, language, and account patterns before introducing shared UI abstractions.
- Keep assistant and sharing labels safe and non-promissory because they are navigation-only in this task.
- Prefer feature-local shell components under `apps/web/features/account/` if extraction keeps `AccountApp.tsx` readable.
- Do not introduce route handlers, database access, storage access, notification infrastructure, or assistant APIs.
- This task intentionally covers only the first candidate task from `spec/features/authenticated-app-dashboard-skeleton.md`; onboarding, dashboard cards, route empty states, and validation-depth tasks remain separate.

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

Validation completed on 2026-05-24:

- `pnpm --filter web test -- AccountApp.test.tsx` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web test` passed outside the sandbox; Vitest emitted existing localStorage experimental warnings.
- Started the web app on `http://localhost:3001` because port 3000 was already in use.
- Playwright fallback browser validation passed with the seeded local account `akowalska@example.com`: unauthenticated `/app` redirected to `/login?next=%2Fapp`, login returned to `/app`, Home had `aria-current="page"`, shell labels and top-bar affordances rendered, and desktop/mobile checks reported no horizontal document overflow.
- Temporary screenshots captured outside the repo at `/private/tmp/caniello-app-shell-desktop.png` and `/private/tmp/caniello-app-shell-mobile.png`.

## Handoff Notes

Implemented the authenticated `/app` shell/navigation only. The shell adds the left desktop rail, mobile horizontal nav fallback, localized top-bar affordances, active Home state, minimal main content region, medical-boundary copy, and existing logout behavior. No dashboard cards, onboarding, persistence, live search, notifications, AI, sharing, or section-specific routes were added.
