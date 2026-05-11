# Story: Back Office Review Detail Actions

## Status

Accepted

## User Story

As a reviewer, I want to compare source documents with extracted fields and approve, edit, reprocess, or flag them, so that AI output can be handled safely.

## Background

This story covers the document-level decision workflow behind the review queue.

## Source Artifacts

- [Back Office AI Review Queue](../features/back-office-ai-review-queue.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)

## Scope

- Source document preview.
- Extracted fields with confidence scores.
- Review notes.
- Approve, edit, request reprocessing, and flag actions.
- Activity history for document review events.

## Out of Scope

- Final policy on whether reviewer edits bypass owner confirmation, prompt management, and bulk actions.

## Acceptance Criteria

- Given a reviewer opens a document, when source and extracted data exist, then both are visible together.
- Given fields have confidence scores, when the reviewer inspects them, then confidence is visible.
- Given extraction is acceptable, when the reviewer approves it, then status changes and the action is audited.
- Given extraction needs another attempt, when the reviewer requests reprocessing, then the document is marked or submitted for reprocessing.
- Given a document is unsafe, suspicious, low quality, or duplicate-risk, when the reviewer flags it, then it appears as flagged.
- Given a reviewer adds notes, when the document is reopened, then notes are visible to permitted reviewers.

## Implementation Notes

- Use detail panels from [back-office image 2](../notes/back-office/image%202.png) and [back-office image 5](../notes/back-office/image%205.png). Preserve visible medical-safety disclaimer placement.

## Validation

- Validate source preview, field confidence, approve, edit/stage, reprocess, flag, notes, and activity history.

## Related Artifacts

None yet.
