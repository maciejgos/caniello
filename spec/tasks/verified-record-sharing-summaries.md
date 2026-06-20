---
status: planned
roadmap: later
risk: high
adrs: [0017, 0024, 0029]
---

# Verified-record sharing summaries

## User story

As an owner, I want to create a read-only summary from verified records so that I can share selected care context without exposing my account or private files.

## Acceptance criteria

- Summary content is limited to owner-selected, verified records with visible provenance.
- The owner previews and confirms the exact summary before creating or updating a scoped share.
- Recipients receive read-only summary data and no account, private-file, or unrelated pet access.
- Revocation, expiry, invalid-link behavior, and bounded access evidence use the hardened share-link lifecycle.
- Generated language does not add diagnosis, treatment advice, or unsupported facts.

## Dependencies

- Hardened sharing, owner-confirmed records, and explicit promotion to `Now`.

## Constraints

- No caregiver accounts, document-file sharing, recipient editing, or persistent portals.

## Verification

- Pending after promotion: summary selection/provenance tests, share authorization and revocation checks, public-page browser journeys, safety evaluation, live RLS evidence if schema changes, typecheck, build, and full verification.
