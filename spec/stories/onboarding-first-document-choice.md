# Story: Onboarding First Document Choice

## Status

Accepted

## User Story

As a new pet owner, I want to choose between scanning a first document or adding details manually, so that onboarding feels fast and AI-first without blocking me.

## Background

Caniello should start from scan-first value while still allowing a manual path when the user has no document ready.

## Source Artifacts

- [Pet Onboarding and Owner Workspace](../features/pet-onboarding-and-workspace.md)
- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Onboarding stepper or guided start state.
- Choice between scan/upload first document and manual pet setup continuation.
- Clear privacy reassurance for uploaded documents.

## Out of Scope

- Full document processing implementation and advanced onboarding personalization.

## Acceptance Criteria

- Given a new user has added a pet, when onboarding continues, then Caniello presents scan/upload and manual continuation options.
- Given the user chooses scan/upload, when they continue, then Caniello moves to document intake.
- Given the user chooses manual continuation, when they continue, then Caniello reaches the pet workspace without requiring a document.
- Given onboarding displays document capture, when the user reads it, then privacy reassurance is visible.

## Implementation Notes

- Use [web image 6](../notes/web/image%206.png), [web image 12](../notes/web/image%2012.png), and [web image 15](../notes/web/image%2015.png) for onboarding sequence.

## Validation

- Validate both onboarding branches and visible step state.

## Related Artifacts

None yet.
