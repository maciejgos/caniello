# Feature: Care Timeline and Reminders

## Status

Accepted

## Summary

Turn confirmed pet-care information into a chronological care history and actionable reminders so owners can understand what happened and what needs attention next.

## Source Requirements

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [Web and Mobile Backlog Notes](../notes/web/backlog.md)

## Users and Use Cases

- Pet owners review the pet's care history over time.
- Owners see upcoming vaccinations, medication, deworming, visits, or rechecks.
- Owners inspect the source document behind a timeline event to verify trust.
- Mobile users receive reminder notifications when enabled.

## Scope

- Creation of timeline events from user-confirmed document data.
- Timeline list and timeline event detail with source-document reference.
- Reminder creation or suggestion from confirmed dates.
- Reminder list and reminder detail.
- Reminder editing for dates and notification preferences.
- Email reminders and mobile push permission flow where mobile is in scope.
- Reminder status surfaced enough for owner trust and beta support.

## Out of Scope

- Advanced recurring medication schedules.
- Calendar integration.
- Grooming, parasite prevention, and care routines beyond first-beta reminder categories unless explicitly selected.
- Deep notification preference management beyond basic email/push choices.
- Search, tags, version history, and duplicate cleanup.

## Behavior

When an owner confirms extracted care information, Caniello creates or suggests a timeline event and reminder. The owner can inspect care history chronologically, see what is due next, and adjust reminders so the pet-care memory remains useful and trustworthy.

## Acceptance Criteria

- Given a user confirms extracted document information, when the data includes a past care event, then Caniello creates a timeline event for the correct pet.
- Given a timeline event came from a document, when the user opens the event, then the source document or document reference is visible.
- Given confirmed information includes a next due date or follow-up date, when Caniello processes the confirmation, then it creates or suggests a reminder.
- Given a reminder exists, when the user opens the reminders list, then the reminder appears with its date and care context.
- Given a user needs to correct a reminder, when they edit reminder details, then Caniello saves the updated date or notification setting.
- Given mobile push reminders are available, when a mobile user grants notification permission, then Caniello can use push notifications for reminders.
- Given email reminders are enabled, when a reminder reaches its notification time, then Caniello can send an email reminder.
- Given no source or confirmed data supports an event, when the user views the timeline, then Caniello does not present unconfirmed AI output as trusted history.

## Related Stories

None yet.

## Related Artifacts

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
