---
status: planned
roadmap: next
risk: high
adrs: [0014, 0015, 0017, 0029]
---

# Caregiver access scope decision

## User story

As a maintainer, I want caregiver access boundaries decided before accounts or invitations are built so that owners retain clear control over recipient access.

## Acceptance criteria

- The decision defines recipient identity, invitation, acceptance, expiry, revocation, and offboarding behavior.
- The minimum permission model and pet scope are explicit without introducing complex household roles.
- Owner control, recipient visibility, audit evidence, abuse handling, and account-deletion effects are defined.
- Private document-file access remains excluded unless separately approved.
- The outcome produces an approved ADR and separate implementation tasks before product changes.

## Dependencies

- Scoped share-link hardening and evidence that owner-side sharing creates value.

## Constraints

- Decision only; no caregiver accounts, invitations, permissions, or recipient portal.

## Verification

- Pending after promotion: product, privacy, authorization, and abuse review; permission-model threat analysis; ADR decision; and explicit approval.
