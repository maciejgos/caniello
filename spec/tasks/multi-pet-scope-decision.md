---
status: planned
roadmap: next
risk: high
adrs: [0015, 0027, 0029]
---

# Multi-pet scope decision

## User story

As a maintainer, I want the multi-pet product and data rules decided before implementation so that pet switching does not create ambiguous ownership or cross-pet behavior.

## Acceptance criteria

- The decision defines add, edit, delete, ordering, and persisted active-pet behavior.
- Per-pet dashboard, reminder, document, timeline, sharing, export, and future Ask filtering rules are explicit.
- Empty, deleted-active-pet, stale-session, and direct-link behavior is defined.
- RLS, audit, migration, mobile, and backward-compatibility implications are reviewed.
- The outcome updates or supersedes ADR 0027 and produces separate implementation tasks before product changes.

## Dependencies

- The first-pet experience and owner-side retention must be validated before promotion.

## Constraints

- Decision only; no multi-pet UI, migration, or active-pet persistence in this task.
- Do not introduce household roles or family plans.

## Verification

- Pending after promotion: product and security review, affected-surface inventory, ADR decision, migration/RLS feasibility review, and explicit approval.
