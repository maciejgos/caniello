# Feature: Back Office Health, Audit, and AI Safety

## Status

Accepted

## Summary

Provide beta operators with operational health visibility, audit evidence, and AI safety monitoring so Caniello can detect failures, trace sensitive actions, and respond to unsafe assistant or extraction behavior.

## Source Requirements

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Back Office Backlog Notes](../notes/back-office/backlog.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Users and Use Cases

- Admins monitor platform health across document processing, reminders, notifications, storage, email, push, and API availability.
- Owners review audit logs for sensitive operational activity.
- Safety reviewers inspect unsafe AI outputs, risky prompts, or missing medical disclaimer coverage.
- Support users use activity and notification status to diagnose beta issues.

## Scope

- Dashboard overview for users, pets, documents, pending reviews, failed jobs, AI status, reminders, notifications, and system health.
- Activity feed for recent platform activity.
- Reminder and notification delivery status.
- Basic system health indicators for AI pipeline, storage, email, push, and API status.
- Audit log for sensitive user, document, extraction, sharing, export, deletion, account, and admin actions.
- Medical disclaimer visibility checks for AI-facing user experiences.
- AI safety incident flags for unsafe outputs or prompts.

## Out of Scope

- Automated anomaly alerts.
- Infrastructure and AI cost dashboards.
- Advanced audit filters beyond MVP needs.
- Full incident-management, legal-request, or data-retention workflows.
- Experiment dashboards and feature flag management.
- Prompt configuration and prompt version history.

## Behavior

The back office gives operators a concise view of whether the beta is healthy, what recent sensitive actions occurred, and whether any AI safety issues need attention. The feature emphasizes visibility and traceability over broad configuration.

## Acceptance Criteria

- Given an authorized admin opens the dashboard, when beta data exists, then they can see counts or status for users, pets, documents, pending reviews, failed jobs, AI status, reminders, notifications, and system health.
- Given recent platform activity exists, when an admin views the activity feed, then sensitive or operationally relevant actions are visible according to permissions.
- Given reminders or notifications have delivery states, when an admin opens status details, then sent, failed, bounced, or pending states are visible.
- Given a core service has an unhealthy state, when an admin views system health, then the affected area is visible.
- Given sensitive back-office or user-data actions occur, when a permitted user opens the audit log, then actor, action, target, timestamp, and relevant context are visible.
- Given an AI answer or extraction is flagged as unsafe, when a safety reviewer opens AI safety items, then the prompt, answer or extraction context, and status are visible according to permissions.
- Given AI-facing user experiences require a medical disclaimer, when an admin checks disclaimer visibility, then they can verify whether required disclaimer placement is present.

## Related Stories

None yet.

## Related Artifacts

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
