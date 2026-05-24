# Story: Care Summary Preview

## Status

Accepted

## User Story

As a pet owner, I want to preview a care summary before sharing it, so that I know exactly what information another person will see.

## Background

The care summary should be concise, read-only, and based on verified Caniello records.

## Source Artifacts

- [Care Summary Sharing](../features/care-summary-sharing.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Summary type selection if multiple types are included.
- Preview with pet profile, medications, vaccinations, feeding, allergies, notes, and key care data where available.
- Read-only and verified-data messaging.

## Out of Scope

- Recipient access management, PDF export, email sending, and share-link lifecycle.

## Acceptance Criteria

- Given a pet has care data, when the owner generates a summary, then Caniello shows a preview.
- Given the preview is shown, when the owner reviews it, then included sections are visible before sharing.
- Given data is unavailable for a section, when the preview renders, then Caniello handles the missing section clearly.
- Given the preview is shown, when the user reads it, then it is clear shared summaries are read-only and do not grant full account access.

## Implementation Notes

- Use [web image 7](../notes/web/image%207.png), [web image 14](../notes/web/image%2014.png), and [web image 17](../notes/web/image%2017.png) for summary preview intent.

## Validation

- Validate populated and partially populated summaries, read-only messaging, and preview before share/export.

## Related Artifacts

None yet.
