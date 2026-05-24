# Story: Document Processing Status

## Status

Accepted

## User Story

As a pet owner, I want to see Caniello reading and processing my document, so that I know the upload worked and what will happen next.

## Background

AI/OCR work should run asynchronously and avoid leaving users waiting on a blocked or silent screen.

## Source Artifacts

- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Processing screen with source preview.
- Step states for uploaded, reading document, classifying, extracting fields, and preparing review.
- Live or staged preview of extracted details when available.
- Error state and retry or support next step.

## Out of Scope

- User confirmation edits and back-office retry workflow.

## Acceptance Criteria

- Given a document upload completes, when processing starts, then Caniello shows processing status.
- Given processing advances, when the user views the status screen, then the current step is visibly indicated.
- Given extracted preview values are available, when processing is in progress, then Caniello can show them as provisional.
- Given processing fails, when the user views status, then Caniello shows a clear error and next step.
- Given processing is not confirmed, when preview values appear, then Caniello does not present them as saved trusted history.

## Implementation Notes

- Use [web image 3](../notes/web/image%203.png), [web image 12](../notes/web/image%2012.png), and [web image 15](../notes/web/image%2015.png) for processing states.

## Validation

- Validate processing, partial preview, completed, and failed states.

## Related Artifacts

None yet.
