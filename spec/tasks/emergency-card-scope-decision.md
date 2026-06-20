---
status: planned
roadmap: next
risk: high
adrs: [0017, 0024, 0029]
---

# Emergency card scope decision

## User story

As a maintainer, I want an emergency-card boundary defined so that owners can share factual care information without Caniello providing emergency or treatment advice.

## Acceptance criteria

- The decision defines the minimal owner-provided factual fields and their provenance.
- Medical disclaimers and copy explicitly exclude diagnosis, triage, treatment, and emergency instructions.
- Preview, owner confirmation, expiry, revocation, offline/export behavior, and recipient scope are decided.
- Sensitive-field minimization and stale-information warnings are defined.
- Separate approved implementation tasks are created before product behavior changes.

## Dependencies

- Verified care-card scope, hardened sharing, and explicit promotion to `Now`.

## Constraints

- Decision only; no emergency advice, symptom checking, treatment recommendations, official-document claim, or implementation.

## Verification

- Pending after promotion: product-safety, privacy, legal-copy, and sharing review; field inventory; ADR need assessment; and explicit approval.
