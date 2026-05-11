# Story: Upload or Scan Document

## Status

Accepted

## User Story

As a pet owner, I want to upload a PDF or image or scan a document with my camera, so that Caniello can extract important care details.

## Background

Document intake is the first AI-first value moment and feeds extraction review, timeline, reminders, and Ask Caniello.

## Source Artifacts

- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Upload page with drag-and-drop or file picker for PDF/images.
- Mobile scan/camera path.
- Accepted file type and capture quality guidance.
- Secure upload state and selected-pet association.

## Out of Scope

- OCR/extraction processing details, duplicate detection, and back-office upload.

## Acceptance Criteria

- Given a web user selects a supported PDF or image, when they upload it, then Caniello accepts the file and associates it with the selected pet.
- Given a mobile user scans a document, when they capture it, then Caniello accepts the image for upload.
- Given a user selects an unsupported file, when they upload it, then Caniello shows a clear file validation error.
- Given upload is in progress or complete, when the user views the page, then status is visible.

## Implementation Notes

- Use [web image 8](../notes/web/image%208.png), [web image 12](../notes/web/image%2012.png), and [web image 15](../notes/web/image%2015.png) for upload/scan intent.

## Validation

- Validate supported upload, unsupported upload, scan path, selected pet association, and status display.

## Related Artifacts

None yet.
