# Story: Cookie Consent, Privacy, and Medical Boundaries

## Status

Accepted

## User Story

As an EU visitor or beta user, I want clear privacy, cookie, terms, and medical boundary information, so that I can decide whether to trust Caniello.

## Background

Caniello handles sensitive pet-care information and must avoid implying diagnosis or official passport replacement.

## Source Artifacts

- [Owner Account and Privacy Foundation](../features/owner-account-privacy-foundation.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Scope

- Cookie banner, cookie preferences update path, privacy policy link, terms link, and medical disclaimer placement.
- Consent gating for non-essential analytics and marketing cookies.

## Out of Scope

- Final legal copy approval, legal request workflows, and advanced consent-history admin reporting.

## Acceptance Criteria

- Given a visitor has not granted cookie consent, when Caniello loads, then non-essential analytics and marketing cookies remain inactive.
- Given a visitor opens cookie preferences, when they update choices, then Caniello applies the saved consent state.
- Given a visitor or user needs policy information, when they open privacy, terms, or medical disclaimer links, then the content is reachable.
- Given Caniello describes AI behavior, when the disclaimer appears, then it states Caniello organizes records and does not replace a veterinarian.

## Implementation Notes

- Use privacy trust-callout patterns from [web image 1](../notes/web/image%201.png), [web image 3](../notes/web/image%203.png), and [web image 8](../notes/web/image%208.png).

## Validation

- Validate consent gating, preference changes, policy links, and medical disclaimer visibility.

## Related Artifacts

None yet.
