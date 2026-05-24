# Requirement: First Landing Page

## Status

Accepted

## Problem

Caniello needs a first public landing page to validate whether pet owners understand the product promise, trust the brand enough to show interest, and are willing to join a waitlist or otherwise signal demand before a broader MVP is built.

The repository currently defines Caniello as a pet health and care organization utility, but it does not yet have a product-facing web experience or implementation toolchain. The first landing page should turn the existing product intent into a small, testable web presence that supports early validation without implying that the product is a full marketplace, clinic system, AI diagnosis tool, or official pet passport replacement.

## Goals

- Communicate Caniello's core promise: one place for a pet's health records, reminders, documents, and shareable care information.
- Help early dog and cat owners quickly understand who Caniello is for and why it matters.
- Capture a clear validation signal, preferably through a waitlist signup or equivalent interest action.
- Establish the first reproducible frontend implementation baseline using Docker, React, and TailwindCSS.
- Keep the first version narrow enough to support landing-page conversion validation before expanding product scope.

## Non-Goals

- Building the authenticated product application.
- Building pet profiles, reminders, document vault, sharing flows, or PDF export.
- Adding clinic, marketplace, booking, payment, or partner tooling.
- Implementing AI diagnosis, symptom checking, or medical advice.
- Claiming that Caniello replaces an official EU pet passport.
- Creating a broad application scaffold beyond what is needed for the first landing page.

## Stakeholders

- Pet owners evaluating whether Caniello solves a real care-organization problem.
- Families and caregivers who may later share pet-care responsibilities.
- The Caniello founder or product owner validating positioning and demand.
- Codex and future implementation agents that need clear constraints before building.
- Future lightweight partners, such as petsitters, groomers, trainers, small service providers, or clinics, who should not be over-promised in the first version.

## Constraints

- The first implementation should use Docker for reproducible local development and execution.
- The frontend framework choice is React.
- Styling should use TailwindCSS.
- The first page should support validation of landing page conversion, with the repository README naming conversion above 8% from relevant traffic as a target signal.
- Messaging must avoid medical, diagnostic, legal, or official passport replacement claims.
- The page should reflect the Caniello name and primary domain, `https://caniello.com`.
- Polish should be the default language for the first MVP public experience, with an option to switch the landing page to English.
- Implementation details must be reproducible from committed files once tooling is introduced.
- This requirement is accepted; downstream feature, story, design, plan, and implementation artifacts may treat it as approved source scope.

## Acceptance Criteria

- Given a first-time pet owner visitor, when they open the landing page, then they can identify Caniello as a pet health and care organization utility within the first viewport.
- Given a visitor who fits the early audience, when they read the page, then they can understand the core promise of records, reminders, documents, and shareable care information.
- Given a visitor who is interested in Caniello, when they decide to act, then they have a clear primary action for joining a waitlist or signaling interest.
- Given the page is used for validation, when interest actions are submitted or clicked, then the team has a way to measure conversion or collect evidence for the validation cycle.
- Given Caniello's scope constraints, when the page describes the product, then it does not claim to replace an official EU pet passport, provide AI diagnosis, or offer clinic/marketplace functionality.
- Given a developer starts the project from committed files, when they use the documented Docker workflow, then the React and TailwindCSS landing page can run locally in a reproducible container.
- Given implementation tooling is added, when a future contributor reads the repository instructions, then they can find the exact install, dev, build, and test commands needed for the landing page.
- Given the landing page is viewed on common mobile and desktop screen sizes, when a user scans the page, then the primary message and action remain visible, readable, and usable.
- Given a visitor opens the first MVP landing page, when the page loads, then Polish is shown by default and the visitor can switch to English.
- Given a visitor switches language, when the page content updates, then the core product promise, waitlist action, privacy cues, and medical-scope language remain equivalent across Polish and English.

## Open Questions

- What should the primary conversion action be for version one: waitlist email capture, contact form, survey link, or a non-persistent interest click?
- Where should waitlist or lead data be stored, if the first version captures personal data?
- What final Polish and English marketing copy is approved for the landing page?
- What brand assets, tone, logo, color direction, or imagery are already approved for Caniello?
- Should analytics be included in the first version, and if so, which privacy and consent requirements apply?
- What deployment target should be assumed after local Docker validation?
- What exact content claims are approved for the first page hero, feature sections, and calls to action?

## Related Artifacts

- [Repository README](../../README.md)
- [Requirements README](README.md)
