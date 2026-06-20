---
status: planned
roadmap: later
risk: high
adrs: [0014, 0015, 0016, 0021, 0024, 0025]
---

# Owner-confirmed extraction intake

## User story

As an owner, I want to review and correct extracted document information before it becomes trusted history so that my pet record remains under my control.

## Acceptance criteria

- Extracted fields retain source-document provenance and confidence or uncertainty context.
- The owner can edit, reject, or confirm each supported field before durable health-history mutation.
- Unconfirmed output remains isolated from the trusted timeline, reminders, summaries, sharing, and Ask context.
- Confirmation writes bounded audit evidence without storing raw document content in logs.
- Duplicate submissions, stale reviews, partial failures, and authorization failures resolve safely.

## Dependencies

- Private storage, processing states, approved provider evaluation, and explicit promotion to `Now`.

## Constraints

- No autonomous medical interpretation or silent record mutation.
- The first implementation supports only explicitly approved structured fields.

## Verification

- Pending after promotion: contract and review-state tests, stale/duplicate/failure scenarios, live RLS evidence, owner-confirmation browser journey, audit-payload checks, typecheck, build, and full verification.
