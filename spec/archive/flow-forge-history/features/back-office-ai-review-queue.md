# Feature: Back Office AI Review Queue

## Status

Accepted

## Summary

Let authorized reviewers and admins validate AI-extracted document data, handle low-confidence or failed cases, and keep the document pipeline trustworthy during the beta.

## Source Requirements

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Back Office Backlog Notes](../notes/back-office/backlog.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Users and Use Cases

- Reviewers compare source documents with extracted fields and confidence scores.
- Admins assign or filter review work.
- Admins retry failed processing jobs.
- The product owner monitors AI extraction quality and operational risk.

## Scope

- Document list with processing status.
- Review queue for documents needing human validation.
- Filters by document type, confidence level, status, date, and assigned reviewer.
- Review assignment.
- Document detail with source preview, extracted fields, confidence scores, status, and related pet.
- Approve extraction, edit extracted field where permitted, request reprocessing, and flag document.
- Low-confidence extraction list and failed processing jobs view.
- Retry failed processing jobs where permitted.
- Duplicate-risk and flagged-items visibility when detected.
- Audit logging for review actions.

## Out of Scope

- Bulk approve high-confidence records unless selected for P1.
- Reviewer performance metrics and SLA tracking.
- Model-training workflows or automated correction analytics.
- Prompt management and prompt version history.
- Final decision on whether reviewer edits bypass or require owner confirmation.

## Behavior

The review queue organizes AI extraction work by risk and status. Reviewers can compare evidence, decide the next action, and leave a traceable record. Failed processing cases can be retried or escalated instead of disappearing from operations.

## Acceptance Criteria

- Given documents require review, when a reviewer opens the review queue, then those documents are listed with status and priority cues.
- Given a reviewer filters by status, type, confidence, date, or assignment, when matching documents exist, then the queue shows the filtered set.
- Given a reviewer opens a document detail page, when source and extraction are available, then the source preview and extracted fields are visible together.
- Given extracted fields have confidence scores, when a reviewer inspects them, then low-confidence fields are distinguishable.
- Given extraction is acceptable, when a permitted reviewer approves it, then the document status moves forward and the action is audited.
- Given extraction has an obvious error, when a permitted reviewer edits a field, then the correction is saved or staged according to policy and the action is audited.
- Given a document needs another AI attempt, when a reviewer requests reprocessing, then Caniello marks or submits the document for reprocessing.
- Given a processing job failed, when an admin retries it, then the retry action is recorded and the job state changes.
- Given a document is unsafe, low quality, suspicious, or duplicate-risk, when a reviewer flags it, then it appears in a flagged-items view.

## Related Stories

None yet.

## Related Artifacts

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
