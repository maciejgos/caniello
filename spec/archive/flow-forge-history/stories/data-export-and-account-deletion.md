# Story: Data Export and Account Deletion

## Status

Accepted

## User Story

As a pet owner, I want to export or delete my account data, so that I remain in control of information I entrusted to Caniello.

## Background

The MVP requires data portability and deletion paths before sensitive beta data is collected at scale.

## Source Artifacts

- [Owner Account and Privacy Foundation](../features/owner-account-privacy-foundation.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Account settings entry points for data export and account deletion.
- Clear status after export or deletion is requested.
- Audit events for export and deletion actions.

## Out of Scope

- Legal request management, retention policy configuration, and admin-only deletion workflows.

## Acceptance Criteria

- Given an authenticated user, when they request a data export, then Caniello starts an export path and makes the request state clear.
- Given an authenticated user, when they request account deletion, then Caniello starts a deletion path and makes the next state clear.
- Given export or deletion is requested, when audit evidence is reviewed, then the action is traceable.

## Implementation Notes

- Align entry points with Settings navigation shown across `spec/notes/web` mockups.

## Validation

- Validate export request, deletion request, user-facing state, and audit evidence.

## Related Artifacts

None yet.
