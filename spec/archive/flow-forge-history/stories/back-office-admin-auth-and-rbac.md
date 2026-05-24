# Story: Back Office Admin Auth and RBAC

## Status

Accepted

## User Story

As the system owner, I want secure back-office login and role-based permissions, so that sensitive operations are limited to authorized admins.

## Background

The back office will expose sensitive user, pet, document, and AI review data.

## Source Artifacts

- [Back Office Access Control](../features/back-office-access-control.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)

## Scope

- Admin login, logout, session timeout, and two-factor authentication.
- Roles for Owner, Admin, Reviewer, Support, and Read-only.
- Permission matrix and blocked unauthorized actions.

## Out of Scope

- Admin invitation flow, SSO, access review pages, and sensitive reveal workflows.

## Acceptance Criteria

- Given an admin has valid credentials and second factor, when they log in, then they reach the back office.
- Given a session is idle past timeout, when the admin returns, then re-authentication is required.
- Given a user role lacks a permission, when they attempt that action, then Caniello blocks it.
- Given the owner reviews roles, when they view the permission matrix, then role responsibilities are distinguishable.

## Implementation Notes

- Use sidebar/header structure from [back-office image 4](../notes/back-office/image%204.png), and [back-office image 5](../notes/back-office/image%205.png).

## Validation

- Validate login, 2FA, logout, timeout, and permission-denied cases per role.

## Related Artifacts

None yet.
