# Feature: Back Office Access Control

## Status

Accepted

## Summary

Protect the Caniello back office with secure admin authentication, role-based access, session controls, and traceable permissions so beta operations do not expose sensitive user and pet data.

## Source Requirements

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Back Office Backlog Notes](../notes/back-office/backlog.md)

## Users and Use Cases

- Owners manage who can access the back office and what actions they can perform.
- Admins, reviewers, support users, and read-only observers access only the surfaces relevant to their responsibilities.
- Pet owners benefit from operational access controls that protect their sensitive records.

## Scope

- Back-office login, logout, session timeout, and secure session management.
- Two-factor authentication for admin users.
- Role definitions for Owner, Admin, Reviewer, Support, and Read-only.
- Permission matrix for view, edit, approve, export, delete, retry, disable, and configuration actions.
- Access denial behavior for unauthorized pages and actions.
- Audit events for login, logout, permission-sensitive actions, and access changes.

## Out of Scope

- Full admin invitation and admin user-management flows unless needed for the first beta.
- Periodic access review pages.
- Sensitive data masking and reason-required reveal unless promoted from open question to MVP scope.
- Single sign-on or enterprise identity provider integrations.

## Behavior

Back-office users authenticate securely and see only the data and actions their role permits. Attempts to perform unauthorized actions are blocked, and sensitive administrative activity is available for later audit.

## Acceptance Criteria

- Given an admin user has valid credentials and required second factor, when they log in, then the back office grants an authenticated session.
- Given an admin session is idle past the timeout, when the user returns, then the session requires re-authentication.
- Given an admin logs out, when they return to a protected back-office page, then access is denied until they log in again.
- Given a role has no permission for an action, when a user with that role attempts the action, then Caniello blocks it.
- Given the system owner reviews permissions, when they inspect the permission matrix, then the responsibilities for Owner, Admin, Reviewer, Support, and Read-only are distinguishable.
- Given an admin performs a permission-sensitive action, when the audit log is reviewed, then the actor, action, target, and timestamp are present.

## Related Stories

None yet.

## Related Artifacts

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
