# Story: Review, Edit, and Confirm Extraction

## Status

Accepted

## User Story

As a pet owner, I want to review and correct AI-extracted document information before saving it, so that my pet's health history stays accurate.

## Background

This story is the safety gate between AI extraction and trusted pet records.

## Source Artifacts

- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Side-by-side or comparable source document and extracted fields view.
- Confidence labels for extracted fields.
- Edit fields, save as document only, and confirm-and-save actions.
- Reminder suggestion display when a next due date is present.

## Out of Scope

- Back-office reviewer approval, advanced field schemas for every document type, and automatic trusted saves.

## Acceptance Criteria

- Given extraction completes, when the user opens review, then source document and extracted fields are visible.
- Given fields have confidence levels, when review loads, then confidence is visible per field.
- Given a field is incorrect, when the user edits it, then the changed value is shown before saving.
- Given the user chooses save as document only, when they save, then Caniello stores the document without creating trusted timeline/reminder records.
- Given the user confirms and saves, when saving completes, then confirmed data can create timeline and reminder outputs.

## Implementation Notes

- Use [web image 5](../notes/web/image%205.png), [web image 13](../notes/web/image%2013.png), and [web image 16](../notes/web/image%2016.png) for review and confirm UI.

## Validation

- Validate confidence display, editing, save-as-document-only, confirm-and-save, and no silent AI save.

## Related Artifacts

None yet.
