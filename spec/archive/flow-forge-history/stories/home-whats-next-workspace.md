# Story: Home What's Next Workspace

## Status

Accepted

## User Story

As a returning pet owner, I want a home workspace that shows what matters next for my pet, so that I can act without searching.

## Background

The home view is the owner's operational dashboard for pending reviews, upcoming reminders, recent documents, timeline preview, sharing, and Ask Caniello.

## Source Artifacts

- [Pet Onboarding and Owner Workspace](../features/pet-onboarding-and-workspace.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Active pet header or selector.
- What's-next cards for reminders and pending document review.
- Recent documents, care timeline preview, health summary, sharing prompt, and Ask Caniello entry.

## Out of Scope

- Advanced analytics, full search behavior, and complete implementation of every linked detail screen.

## Acceptance Criteria

- Given a returning user has an active pet, when they open Home, then the active pet context is visible.
- Given upcoming reminders exist, when Home loads, then the next reminders are visible.
- Given documents require review, when Home loads, then pending review is visible.
- Given recent documents or timeline events exist, when Home loads, then previews are visible with links to their full areas.
- Given no next action exists, when Home loads, then Caniello offers a useful next step such as upload, add reminder, or ask.

## Implementation Notes

- Use [web image 1](../notes/web/image%201.png), [web image 13](../notes/web/image%2013.png), and [web image 16](../notes/web/image%2016.png) for home/workspace layout intent.

## Validation

- Validate populated, empty, and pending-review home states across desktop and mobile.

## Related Artifacts

None yet.
