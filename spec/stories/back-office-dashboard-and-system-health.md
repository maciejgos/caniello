# Story: Back Office Dashboard and System Health

## Status

Accepted

## User Story

As an admin, I want a back-office dashboard with platform and AI pipeline health, so that I can operate the beta safely.

## Background

The dashboard is the first operational view for users, pets, documents, reviews, failed jobs, reminders, notifications, and AI status.

## Source Artifacts

- [Back Office Health, Audit, and AI Safety](../features/back-office-health-audit-and-ai-safety.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)

## Scope

- Dashboard metrics for users, pets, documents processed, pending reviews, failed jobs, reminders, notification status, and AI confidence/status.
- Processing funnel or equivalent status summary.
- System health indicator for AI pipeline, storage, email, push, and API status where available.

## Out of Scope

- Cost dashboards, advanced anomaly alerts, and experiment analytics.

## Acceptance Criteria

- Given an authorized admin opens the dashboard, when beta data exists, then key operational metrics are visible.
- Given document processing states exist, when the dashboard loads, then the processing funnel or status summary is visible.
- Given service health data exists, when the dashboard loads, then unhealthy services are distinguishable.
- Given pending reviews or failed jobs exist, when the dashboard loads, then entry points to investigate them are visible.

## Implementation Notes

- Use [back-office image 4](../notes/back-office/image%204.png) for dashboard layout intent.

## Validation

- Validate dashboard populated state, empty state, unhealthy service state, and links to review/failure areas.

## Related Artifacts

None yet.
