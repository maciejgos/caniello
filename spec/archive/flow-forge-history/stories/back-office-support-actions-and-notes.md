# Story: Back Office Support Actions and Notes

## Status

Accepted

## User Story

As a support admin, I want permitted account actions and internal notes, so that I can help users while leaving an operational trace.

## Background

Support actions include resend verification, reset password entry, resend reminder, revoke share link, disable user, export data, and view audit log where permitted.

## Source Artifacts

- [Back Office Support Console](../features/back-office-support-console.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)

## Scope

- Permission-gated support actions from user detail.
- Internal notes attached to users or support contexts.
- Audit entries for support actions.

## Out of Scope

- Bulk support actions, refund handling, and direct clinical-data mutation.

## Acceptance Criteria

- Given a permitted support admin resends verification, when the action completes, then Caniello records the action.
- Given a permitted admin disables a user, when the action completes, then account state changes and the action is audited.
- Given a permitted admin revokes a share link, when the action completes, then the link is no longer active and the action is audited.
- Given support adds an internal note, when another permitted admin opens the same user, then the note is visible internally.
- Given a role lacks permission for an action, when they attempt it, then Caniello blocks the action.

## Implementation Notes

- Use admin action panels and notes from [back-office image 3](../notes/back-office/image%203.png) and [back-office image 6](../notes/back-office/image%206.png).

## Validation

- Validate permitted actions, denied actions, note visibility, user invisibility of notes, and audit entries.

## Related Artifacts

None yet.
