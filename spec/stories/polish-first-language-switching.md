# Story: Polish-First Language Switching

## Status

Accepted

## User Story

As a Polish-first MVP user, I want Caniello to open in Polish with an option to switch to English, so that the product feels local while remaining accessible to English-speaking users.

## Background

The human product decision is that Polish is the default language for the first MVP, with an English option. This applies to the public landing page, owner-facing Web MVP, and Mobile MVP core flows. The story should prevent later implementation from drifting into English-only behavior just because many mockups use English text.

## Source Artifacts

- [Owner Account and Privacy Foundation](../features/owner-account-privacy-foundation.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Scope

- Polish default language for first-MVP public and owner-facing screens.
- English language switch available from the landing page and authenticated app shell.
- Persisted language preference for returning users where practical.
- Polish and English coverage for core navigation, calls to action, form labels, validation messages, empty states, privacy cues, and medical-safety disclaimers.
- Test coverage that proves Polish default and English switching behavior.

## Out of Scope

- Additional languages beyond Polish and English.
- Full translation management platform.
- Language-specific SEO and marketing localization beyond MVP copy.
- Automatic machine translation of medical, legal, or AI safety copy.

## Acceptance Criteria

- Given a first-time visitor opens Caniello, when no language preference exists, then the landing page appears in Polish.
- Given a visitor switches to English, when the landing page updates, then the core product promise, waitlist action, privacy cues, and medical-scope language are shown in English.
- Given an authenticated user has no language preference, when they open the Web MVP app shell, then navigation and core actions appear in Polish.
- Given an authenticated user switches to English, when they continue through supported MVP flows, then navigation, form labels, validation messages, empty states, and medical-safety notices appear in English.
- Given a returning user previously selected English, when they return on the same supported client or account, then Caniello restores English where preference persistence is available.
- Given a medical disclaimer or AI safety refusal is shown, when language is Polish or English, then the disclaimer preserves the same non-diagnostic meaning in both languages.

## Implementation Notes

- Treat the English mockups in `spec/notes/web/` and `spec/notes/back-office/` as layout references, not as final language decisions.
- Use the earlier landing-page direction recorded in [first landing page plan](../plans/completed-foundation-plans.md): Polish default with an English switch.
- Translation keys should be stable enough to cover web and mobile later; avoid hard-coding copy deeply into individual components when shared language behavior is needed.

## Validation

- Add unit tests for language defaulting and switching.
- Add Playwright E2E tests that open the landing page in Polish by default, switch to English, and verify representative text changes.
- Add Web MVP E2E coverage for Polish default navigation and English app-shell switching once authenticated flows exist.
- Add Mobile MVP language-switch validation once the React Native app exists.

## Related Artifacts

None yet.
