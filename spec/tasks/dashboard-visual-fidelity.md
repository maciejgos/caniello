---
status: planned
roadmap: now
risk: low
adrs: [0012, 0027, 0028]
---

# Dashboard visual fidelity

## User story

As a pet owner, I want the production dashboard to present upcoming care and recent records with clear hierarchy so that I can understand what needs attention quickly.

## Acceptance criteria

- The dashboard improves information hierarchy, spacing, and responsive card composition using the approved visual direction.
- Existing real pet, reminder, document metadata, timeline, and sharing states remain the source of displayed content.
- Empty, loading, unavailable, and error states remain truthful and do not imitate unsupported AI, delivery, extraction, or notification capabilities.
- The first-pet scope remains clear and the dashboard does not imply pet switching.
- Polish and English layouts work without horizontal overflow.

## Dependencies

- Stable deep-link and production data surfaces should be available before final visual verification.

## Constraints

- Do not introduce new product behavior, generated insights, or prototype-only data.

## Verification

- Pending: focused dashboard tests, desktop/mobile visual comparison, empty/loading/error-state checks, typecheck, and `pnpm verify:fast`.
