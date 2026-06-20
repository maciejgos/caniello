---
status: planned
roadmap: next
risk: high
adrs: [0017, 0024, 0025, 0029, 0031]
---

# Secure care-card PDF export

## User story

As an owner, I want to export an approved care card as a PDF so that I can carry or share a factual snapshot without exposing my account.

## Acceptance criteria

- The owner previews and explicitly requests an export from approved care-card fields.
- Generation and delivery are server-controlled, owner-authorized, and auditable without logging medical content or signed URLs.
- Generated files are streamed or privately stored according to an approved lifecycle with expiry and cleanup behavior.
- Exported content shows generation time, selected scope, factual provenance, and an appropriate non-veterinary disclaimer.
- Failure, retry, duplicate request, and revoked-access behavior are safe and observable.

## Dependencies

- Verified summary scope, hardened sharing, release-readiness review, and explicit promotion to `Now`.

## Constraints

- No public bucket, email delivery, editable recipient document, or official pet-passport claim.

## Verification

- Pending after promotion: authorization and lifecycle tests, PDF content/render inspection, audit-payload checks, failure/cleanup scenarios, browser export journey, typecheck, build, and full verification.
