# Feature: Back Office Support Console

## Status

Accepted

## Summary

Give authorized support and admin users a safe way to search, inspect, and assist beta user accounts, pets, documents, reminders, sharing state, and account requests.

## Source Requirements

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Back Office Backlog Notes](../notes/back-office/backlog.md)

## Users and Use Cases

- Support admins investigate user account, pet, document, reminder, and sharing issues.
- Admins respond to abuse, fraud, unverified account, deletion, and data portability cases.
- The founder monitors beta support problems without unrestricted direct data mutation.

## Scope

- Global search across users, pets, documents, emails, and document IDs.
- User list and user detail page.
- User account status display for active, suspended, unverified, or deleted states.
- Pet list and pet detail page with care context.
- Document and reminder metadata visibility for support investigations.
- Sharing status visibility and basic support actions where permitted.
- Resend email verification, disable account, view deletion requests, and support data export requests.
- Internal admin notes linked to users, documents, or reviews.
- Audit logging for support actions.

## Out of Scope

- Full helpdesk or support-ticket platform replacement.
- Bulk user operations.
- Billing and refund operations unless payments are introduced.
- Direct editing of user health history except through approved review or correction workflows.
- Partner or clinic management.

## Behavior

Support users can find a beta user's relevant context quickly, diagnose common onboarding, upload, reminder, and sharing problems, and take limited permitted actions. Sensitive support actions are permission-gated and recorded.

## Acceptance Criteria

- Given a support admin searches by email, pet data, or document ID, when a matching record exists, then the support console shows the matching user, pet, or document.
- Given a support admin opens a user detail page, when they investigate an issue, then account status, household, pets, documents, reminders, and sharing state are visible according to permissions.
- Given a support admin opens a pet detail page, when they inspect it, then pet profile, timeline, document, reminder, and care-team context are visible according to permissions.
- Given a user is unverified, when a permitted support admin resends verification, then Caniello initiates the resend and records the action.
- Given a serious account issue exists, when a permitted owner or admin disables an account, then the account state changes and the action is audited.
- Given a deletion request exists, when support opens deletion requests, then the request can be viewed or escalated according to policy.
- Given support adds an internal note, when another authorized back-office user opens the same context, then the note is visible internally and not exposed to the user.

## Related Stories

None yet.

## Related Artifacts

- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
