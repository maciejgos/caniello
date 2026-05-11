# Feature: AI Document Intake and Review

## Status

Accepted

## Summary

Enable owners to upload or scan veterinary documents, let Caniello classify and extract useful pet-care information, and require user review before AI output becomes trusted history.

## Source Requirements

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [Web and Mobile Backlog Notes](../notes/web/backlog.md)

## Users and Use Cases

- Mobile users photograph a document after a vet visit.
- Web users upload a PDF or image document.
- Owners review extracted fields instead of typing everything manually.
- The product team validates whether AI-first document intake creates faster activation than manual entry.

## Scope

- Mobile camera scan and web/mobile file upload for PDFs or images.
- Secure document storage and upload status.
- Asynchronous document processing status.
- Document classification for initial veterinary document categories.
- AI/OCR extraction of relevant fields such as pet name, date, clinic, veterinarian, vaccine, medication, dosage, and next due dates when present.
- Confidence display for extracted fields.
- User review, edit, and confirmation of extracted information.
- Error handling for upload, processing, extraction, and save failures.

## Out of Scope

- Specialized extraction for every document subtype.
- Duplicate detection as a required MVP behavior.
- Automatic trusted record creation without user confirmation.
- Back-office reviewer workflows, except where owner-facing status needs to show that review is pending.
- Lab result interpretation or medical advice.

## Behavior

Users can add a document without starting from a blank form. Caniello shows progress while processing, presents extracted data with confidence cues, and lets users correct or confirm the result. Only confirmed information can create downstream records, reminders, or timeline events.

## Acceptance Criteria

- Given a mobile user has a veterinary document, when they take a photo in Caniello, then the document is accepted for upload and processing.
- Given a web or mobile user has a PDF or image document, when they upload it, then Caniello stores it securely and shows upload status.
- Given a document has been uploaded, when AI/OCR processing starts, then the user can see that processing is in progress.
- Given processing completes successfully, when the user opens the result, then Caniello shows the document type and extracted fields.
- Given extracted fields have confidence scores, when the user reviews them, then low-confidence or uncertain fields are visibly distinguishable.
- Given extracted information is wrong or incomplete, when the user edits fields, then the corrected values are shown before confirmation.
- Given the user confirms extracted information, when Caniello saves it, then the confirmed data can be used by timeline and reminder features.
- Given upload or processing fails, when the user views the document state, then Caniello shows a clear error and a useful next step.

## Related Stories

None yet.

## Related Artifacts

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
