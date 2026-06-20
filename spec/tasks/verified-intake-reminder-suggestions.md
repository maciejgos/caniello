---
status: planned
roadmap: later
risk: high
adrs: [0016, 0024, 0028]
---

# Verified-intake reminder suggestions

## User story

As an owner, I want optional reminder suggestions from information I confirmed so that I can schedule care without surrendering control.

## Acceptance criteria

- Suggestions use only owner-confirmed intake fields and retain a visible source reference.
- Every suggestion is editable, dismissible, and optional.
- Suggestions never create or update reminders until the owner explicitly saves through the normal reminder flow.
- Uncertain, missing, conflicting, or expired source information produces no authoritative due-date claim.
- Audit and product-event evidence remains bounded and separate.

## Dependencies

- Owner-confirmed extraction intake and explicit promotion to `Now`.

## Constraints

- No veterinary recommendations, generated treatment schedules, notification delivery, or automatic saves.

## Verification

- Pending after promotion: suggestion-rule tests, uncertainty/conflict cases, edit/dismiss/save browser journeys, audit payload checks, typecheck, and full verification.
