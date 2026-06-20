---
status: planned
roadmap: later
risk: high
adrs: [0016, 0019, 0021, 0025, 0028]
---

# Document processing state foundation

## User story

As an owner, I want document-processing progress and failures to be observable so that future extraction can recover safely without pretending work completed.

## Acceptance criteria

- A promoted implementation task defines deterministic queued, processing, review, failed, and terminal states.
- State transitions are server-owned, idempotent where retried, and persisted with bounded operational evidence.
- Owners can distinguish waiting, retryable failure, permanent failure, and review-required states.
- No state or copy claims OCR, AI extraction, or verification before a provider operation succeeds.
- Authorization and RLS preserve owner isolation for every state transition.

## Dependencies

- Private document storage, release-readiness evidence, and explicit promotion to `Now`.

## Constraints

- Planning record only until promoted.
- No provider integration, queue platform, extracted medical fields, or autonomous retries beyond an approved bounded design.

## Verification

- Pending after promotion: approved transition design, migration review, state-machine tests, live owner-isolation checks, failure/retry tests, typecheck, build, and full verification.
