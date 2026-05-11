# Feature: Care Summary Sharing

## Status

Accepted

## Summary

Allow owners to create a concise pet-care summary and share it through a controlled link or PDF so family members, caregivers, petsitters, groomers, or veterinarians can access relevant information when needed.

## Source Requirements

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [Web and Mobile Backlog Notes](../notes/web/backlog.md)

## Users and Use Cases

- Owners share important pet-care information with a family member or caregiver.
- Owners bring or send a PDF summary to a veterinarian.
- Owners revoke shared access when temporary access is no longer appropriate.
- Recipients view only the summary information the owner intended to share.

## Scope

- Generate a care summary from selected or default pet profile, care history, reminders, medication, allergies, notes, and document references.
- Preview the summary before sharing or exporting.
- Export the summary as a PDF.
- Create a limited share link for the summary.
- Revoke a share link.
- Audit share creation, access changes, and revocation.

## Out of Scope

- Full care-team invitations and role-based household collaboration.
- QR share cards and emergency cards.
- Expiring share links unless selected for the first beta.
- Partner or clinic upload access.
- Public pet profiles or marketplace sharing.
- Fine-grained recipient analytics.

## Behavior

An owner can generate a clear summary of the pet's important care information, review it, and share it in a way they control. Shared access can be revoked, and Caniello avoids exposing full account data when a summary is enough.

## Acceptance Criteria

- Given a pet has profile and care-history data, when the owner generates a care summary, then Caniello creates a summary with relevant pet-care information.
- Given the owner previews a care summary, when they review it, then they can understand what information will be included before sharing.
- Given the owner exports a summary, when the export completes, then a PDF version is available.
- Given the owner creates a share link, when a recipient opens the link, then the recipient can view the intended summary information.
- Given a recipient opens a share link, when the link has been revoked, then the summary is no longer accessible through that link.
- Given a share action occurs, when operational evidence is reviewed, then creation and revocation actions are present in the audit trail.
- Given Caniello presents shared information, when the summary is viewed, then it does not imply official pet passport replacement or veterinary diagnosis.

## Related Stories

None yet.

## Related Artifacts

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
