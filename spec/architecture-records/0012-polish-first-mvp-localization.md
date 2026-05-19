# 0012 — Polish-first MVP localization

## Status

Accepted

## Date

2026-05-11

## Context

Caniello's first MVP should serve Polish users first while still allowing English-speaking users, collaborators, or beta participants to use the product. The public landing page, owner-facing Web MVP, and future Mobile MVP must therefore open in Polish by default and provide an English switch.

Many visual mockups in `spec/notes/` use English text. Those mockups remain useful for layout, visual hierarchy, and interaction intent, but they should not be treated as a decision to make the MVP English-only.

This decision affects implementation structure because landing, web app, mobile app, validation messages, privacy cues, and medical-safety disclaimers need consistent Polish and English coverage.

## Decision

Caniello's first MVP will use Polish as the default language and provide an English language switch.

The MVP implementation should avoid hard-coding user-facing copy deeply inside individual components when the same behavior needs Polish and English coverage. Web and mobile implementations should use stable copy keys or an equivalent localization structure so core copy can be rendered in either language.

The first localization scope covers:

- Public landing page.
- Owner-facing Web MVP app shell and core owner flows.
- Mobile MVP app shell and core owner flows.
- Core navigation, calls to action, form labels, validation messages, empty states, privacy cues, and medical-safety disclaimers.

Back-office localization is not required for the first MVP unless a human explicitly prioritizes Polish back-office operations. Back-office mockups may remain English-oriented while the owner-facing product is Polish-first.

## Consequences

Polish users get a local-first MVP experience, and English remains available without changing the product's primary market signal.

Implementation planning must include language-switch tests. Existing and future Playwright E2E checks should prove that the landing page opens in Polish by default and can switch to English. Web MVP and Mobile MVP validation should add representative checks for Polish default and English switching once those surfaces exist.

Medical disclaimers, privacy notices, AI safety refusals, and consent copy must preserve the same meaning in Polish and English. These strings should not rely on automatic machine translation without human review.

English mockups in `spec/notes/web/` and `spec/notes/back-office/` should be used as layout references. Product copy should be translated or rewritten into approved Polish and English copy during implementation.

The decision adds a small amount of implementation overhead, but it reduces later rework by forcing language structure before the owner-facing app grows.

## Related Artifacts

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)
- [Owner Account and Privacy Foundation](../features/owner-account-privacy-foundation.md)
- [Polish-First Language Switching Story](../stories/polish-first-language-switching.md)
- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [First Landing Page ExecPlan](../plans/completed-foundation-plans.md)
