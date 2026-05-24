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

- Replace the current `/app` protected placeholder with a reusable authenticated app layout.
- Add left navigation entries for Home, Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings.
- Add top-bar skeleton elements for search, active pet selector, notification affordance, and account menu.
- Preserve logout access and session-gated behavior.
- Preserve Polish and English language behavior using the existing account/marketing language patterns.
- Match the visual direction of `spec/design/visual-artifacts/mvp/image 1.png` and `image 6.png` closely enough for implementation follow-up.

## Non-Goals

- No real search implementation.
- No real notifications.
- No real pet switching or account menu actions beyond existing logout behavior.
- No dashboard data persistence changes.
- No mobile app implementation.

## Acceptance Criteria

- A signed-in owner visiting `/app` sees the Caniello app shell instead of the placeholder card.
- Navigation labels and active state are visible and usable at desktop widths.
- The app shell has a responsive fallback that does not overlap or clip content on small screens.
- Language switching keeps the shell labels and safety copy coherent in Polish and English.
- Unauthorized visitors remain blocked by the existing auth protection.

## Implementation Notes

- Affected area is expected to be `apps/web/features/account/AccountApp.tsx` unless the implementer chooses to extract feature-local app shell components.
- Use existing brand, language, and account patterns before introducing shared UI abstractions.
- Keep assistant and sharing labels safe and non-promissory if their sections are placeholders.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Pending implementation.
