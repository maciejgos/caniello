# Story: Timeline From Confirmed Records

## Status

Accepted

## User Story

As a pet owner, I want confirmed care information to appear in a chronological timeline, so that I can understand what happened and when.

## Background

Timeline events should come from confirmed user data, not unreviewed AI output.

## Source Artifacts

- [Care Timeline and Reminders](../features/care-timeline-and-reminders.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Timeline creation from confirmed records.
- Timeline list with event types, dates, statuses, and source references.
- Timeline event detail link to source document where available.

## Out of Scope

- Version history, advanced timeline search, and manual event authoring unless needed for confirmed document flow.

## Acceptance Criteria

- Given a user confirms extracted document data, when the data includes a care event, then Caniello creates a timeline event for the pet.
- Given timeline events exist, when the user opens Timeline, then events appear in chronological order.
- Given an event has a source document, when the user opens the event, then the source reference is visible.
- Given AI output is unconfirmed, when the user opens Timeline, then that output is not shown as trusted history.

## Implementation Notes

- Use [web image 10](../notes/web/image%2010.png), [web image 13](../notes/web/image%2013.png), and [web image 16](../notes/web/image%2016.png) for timeline layouts.

## Validation

- Validate timeline creation after confirmation, chronology, source reference, filters if included, and unconfirmed-data exclusion.

## Related Artifacts

None yet.
