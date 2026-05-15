# Design: Caniello Visual Direction

## Status

Accepted

## Context

Caniello is in validation. Several visual artifacts show possible landing page, brand, and product UI directions.

The current strategy says Caniello should start as a pet health and care organization utility, not as a full marketplace, clinic SaaS platform, official passport replacement, or AI diagnosis tool.

## Provided Visual References

- `spec/design/visual-artifacts/caniello-ai-assistant-landing.png`
- `spec/design/visual-artifacts/caniello-better-care-landing.png`
- `spec/design/visual-artifacts/caniello-product-os-landing.png`
- `spec/design/visual-artifacts/caniello-dark-wordmark.png`

These binary PNG files are stored in this repository for Caniello product work and mirrored in the control plane as durable visual references.

## Goals

- Establish a landing-page direction for validation.
- Preserve strong brand signals without over-scoping the product.
- Separate validation-stage messaging from later-stage platform concepts.

## Proposed Design

Use the `Better care. Stronger bond.` direction as the primary validation-stage brand promise.

The first landing page should emphasize:

- health records and documents
- smart reminders
- shareable care information
- secure and private storage
- waitlist signup

The AI-assistant concept can inform later messaging, but initial claims should stay careful:

- acceptable: document organization, extraction, reminders, summaries, assistive Q&A over user-provided records
- avoid for now: diagnosis, medical advice, symptom checking, official passport replacement

## Landing Page Preference

Recommended starting point:

1. Use `caniello-better-care-landing.png` as the baseline validation landing page direction.
2. Borrow document-scanning and "Ask Caniello" elements from `caniello-ai-assistant-landing.png` only if the validation offer clearly explains limitations.
3. Treat `caniello-product-os-landing.png` as later-stage inspiration because it implies stronger market maturity, trust logos, pricing, and a broader product surface.

## Risks and Tradeoffs

- Overusing AI language may create medical or trust risk.
- Mentioning clinics too early may imply a B2B platform before owner-side retention is proven.
- Trust logos should not be used unless there are real relationships or explicit permission.
- A polished app UI can overpromise implementation maturity during waitlist validation.

## Validation

Validate the first landing page by measuring:

- waitlist conversion from relevant traffic
- message comprehension in owner interviews
- trust concerns around health data
- reaction to care sharing and document vault features
- willingness to pay for premium owner-side utility

## Related Artifacts

- [Visual artifacts index](visual-artifacts/README.md)
- [Caniello README](../../README.md)
