# Story: Back Office Review Queue Triage

## Status

Accepted

## User Story

As a reviewer, I want a filterable AI extraction review queue, so that I can prioritize documents needing human validation.

## Background

The review queue protects trust in AI extraction during beta operations.

## Source Artifacts

- [Back Office AI Review Queue](../features/back-office-ai-review-queue.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Queue list with document, pet, owner, confidence, status, upload time, and assigned reviewer.
- Filters for document type, confidence, status, assigned reviewer, and search.
- Queue summary metrics for pending, high-risk, low-confidence, and completed today where included.

## Out of Scope

- Reviewer performance metrics, bulk approval, and model-training analytics.

## Acceptance Criteria

- Given documents need review, when a reviewer opens Review Queue, then documents appear with confidence, status, pet, owner, and assignment data.
- Given a reviewer applies filters, when matching documents exist, then the queue updates.
- Given low-confidence documents exist, when the queue loads, then they are distinguishable.
- Given the reviewer selects a document, when selection succeeds, then the review detail context opens or updates.

## Implementation Notes

- Use [back-office image 2](../notes/back-office/image%202.png), [back-office image 4](../notes/back-office/image%204.png), and [back-office image 5](../notes/back-office/image%205.png) for review queue layout.

## Validation

- Validate queue population, filtering, low-confidence visibility, pagination if included, and document selection.

## Related Artifacts

None yet.
