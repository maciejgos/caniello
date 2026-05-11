# Story: Reminder Notification Preferences

## Status

Accepted

## User Story

As a pet owner, I want to choose basic reminder notification preferences, so that reminders reach me through useful channels.

## Background

The MVP should support email reminders and mobile push permission where mobile is in scope.

## Source Artifacts

- [Care Timeline and Reminders](../features/care-timeline-and-reminders.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Basic email notification toggle.
- Push notification permission and toggle where supported.
- Default reminder time, snooze default, or advance notice if selected for MVP.

## Out of Scope

- Calendar sync, daily digest unless explicitly selected, and advanced notification routing.

## Acceptance Criteria

- Given reminder notifications are available, when the user opens preferences, then email and push options are visible as applicable.
- Given a user changes a notification preference, when they save, then new reminders use that preference.
- Given mobile push requires permission, when the user enables push, then Caniello requests permission before using push notifications.
- Given a reminder notification is sent or fails, when status is inspected, then delivery state is available for operational support.

## Implementation Notes

- Use the preference panels in [web image 9](../notes/web/image%209.png) as the primary visual reference.

## Validation

- Validate preference save behavior, permission prompts, and delivery-state availability.

## Related Artifacts

None yet.
