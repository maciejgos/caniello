# Story: Reminder Suggestions and Management

## Status

Accepted

## User Story

As a pet owner, I want Caniello to suggest and manage reminders from confirmed care dates, so that I do not miss important pet-care actions.

## Background

Reminders are one of the core repeat-use loops for the MVP.

## Source Artifacts

- [Care Timeline and Reminders](../features/care-timeline-and-reminders.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Reminder suggestion from confirmed next due dates.
- Reminder list with upcoming/completed/category states.
- Reminder detail or edit action for date and context.
- Manual create reminder entry point if needed for MVP usability.

## Out of Scope

- Advanced recurrence, calendar sync, and complex medication schedules.

## Acceptance Criteria

- Given confirmed data includes a next due date, when the confirmation is saved, then Caniello creates or suggests a reminder.
- Given reminders exist, when the user opens Reminders, then upcoming reminders are listed with dates and care context.
- Given a user edits a reminder, when they save changes, then the reminder updates.
- Given a user marks a reminder complete, when the action succeeds, then the reminder moves out of the active upcoming state.

## Implementation Notes

- Use [web image 9](../notes/web/image%209.png), [web image 14](../notes/web/image%2014.png), and [web image 17](../notes/web/image%2017.png) for reminder screens.

## Validation

- Validate reminder creation/suggestion, list states, edit, and completion.

## Related Artifacts

None yet.
