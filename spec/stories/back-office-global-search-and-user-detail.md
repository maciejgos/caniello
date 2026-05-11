# Story: Back Office Global Search and User Detail

## Status

Accepted

## User Story

As a support admin, I want to search users, pets, and documents and inspect a user detail page, so that I can diagnose beta support issues quickly.

## Background

Support needs context without unrestricted mutation access.

## Source Artifacts

- [Back Office Support Console](../features/back-office-support-console.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)

## Scope

- Global search by user, pet, document, email, or document ID.
- User detail page with account status, household, pets, recent documents, reminders, sharing/access, recent activity, support status, and notes.

## Out of Scope

- Full support-ticket platform, billing operations, and direct editing of health records.

## Acceptance Criteria

- Given a support admin searches by email, pet data, or document ID, when a match exists, then matching records are shown.
- Given a support admin opens a user detail page, when permitted, then account, household, pets, documents, reminders, sharing, activity, and notes are visible.
- Given the support admin lacks permission for sensitive fields, when the detail page loads, then restricted data is hidden or unavailable.
- Given no search result exists, when the search completes, then Caniello shows a clear no-result state.

## Implementation Notes

- Use [back-office image 3](../notes/back-office/image%203.png) and [back-office image 6](../notes/back-office/image%206.png) for user detail patterns.

## Validation

- Validate search success, no results, permission-limited view, and user detail navigation.

## Related Artifacts

None yet.
