# Story: Share Link, PDF Export, and Revocation

## Status

Accepted

## User Story

As a pet owner, I want to share a care summary by secure link or PDF and revoke access, so that I control who can view my pet's information.

## Background

Sharing is valuable only if it exposes the right summary and remains under owner control.

## Source Artifacts

- [Care Summary Sharing](../features/care-summary-sharing.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Create secure summary link.
- Recipient read-only summary view.
- Export PDF action.
- Revoke link or all active summary access.
- Audit events for share and revoke actions.

## Out of Scope

- Care-team invitations, QR cards, expiring links unless selected, and partner uploads.

## Acceptance Criteria

- Given the owner creates a share link, when a recipient opens it, then the intended read-only summary is visible.
- Given the owner exports a summary, when export completes, then a PDF is available.
- Given the owner revokes a share link, when the recipient opens it later, then the summary is no longer accessible.
- Given sharing or revocation occurs, when audit evidence is reviewed, then the action is traceable.
- Given a shared summary is viewed, when the recipient reads it, then it does not imply diagnosis or official passport replacement.

## Implementation Notes

- Use [web image 7](../notes/web/image%207.png), [web image 14](../notes/web/image%2014.png), and [web image 17](../notes/web/image%2017.png) for share/export/revoke patterns.

## Validation

- Validate link creation, recipient access, PDF export, revocation, and audit evidence.

## Related Artifacts

None yet.
