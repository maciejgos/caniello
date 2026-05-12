# Story: Landing Page Footer, Legal, and Responsive Trust

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session after `product_coherence_reviewer` returned `valid to accept`.

## User Story

As a landing-page visitor, I want clear trust, legal, and navigation cues on any device, so that I can evaluate Caniello confidently before sharing my email.

## Background

The landing page collects waitlist and research-interest data, so trust cues, privacy access, terms access, and responsive usability are part of the validation experience rather than afterthoughts.

## Source Artifacts

- [Landing Page MVP Value Experience](../features/landing-page-mvp-value-experience.md)
- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Scope

- Footer with Caniello identity, short description, product links, company links, resource links, legal links, and final signup access.
- Privacy Policy and Terms of Service links or clearly marked placeholder pages before publication.
- Privacy cue near form submissions, such as no-spam or privacy-respect copy.
- Responsive desktop and mobile layout for hero, value cards, process section, future-wave cards, forms, and footer.
- Accessibility-oriented basics for readable text, usable controls, and non-overlapping content.

## Out of Scope

- Final legal text approval.
- Full legal request workflows, data export, account deletion, or authenticated privacy controls.
- Cookie preference center unless selected during design or implementation planning.
- Social media publishing or outbound marketing setup.

## Acceptance Criteria

- Given the footer is displayed, when a visitor looks for product and company navigation, then the footer provides access to the main product and company destinations or clearly marked placeholders.
- Given the footer is displayed, when a visitor looks for legal information, then Privacy Policy and Terms of Service links are visible.
- Given the page includes a form, when a visitor is asked to submit an email, then a privacy cue is visible near the submission context.
- Given the footer or final signup area is displayed, when a visitor decides to join the waitlist at the end of the page, then a final signup action is available without returning to the hero.
- Given the page is viewed on common mobile viewport sizes, when the visitor scans each section, then text remains readable and controls remain usable.
- Given the page is viewed on common desktop viewport sizes, when the visitor scans each section, then visual elements and text do not overlap incoherently.
- Given keyboard focus is used on actionable elements, when the visitor tabs through links and controls, then the focus order follows the visible page structure.

## Implementation Notes

- Use the footer and compact section patterns in [Landing Concept Image 1](../notes/landing/image%201.png) as visual direction.
- Legal links may point to placeholders before public launch if placeholders are clearly marked and approved for the launch context.
- Keep final signup behavior aligned with the shared source value `landing_page_footer`.

## Validation

- Verify footer links, final signup placement, privacy cues, responsive layouts, no visual overlap, and keyboard access for visible actions.

## Related Artifacts

- [Landing Concept Image 1](../notes/landing/image%201.png)
