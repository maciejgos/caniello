# Story: Ask Caniello Chat With Sources

## Status

Accepted

## User Story

As a pet owner, I want to ask Caniello questions about my pet's records and see sources, so that I can find care information without manual searching.

## Background

Ask Caniello should answer from confirmed pet data and visibly cite documents or timeline events.

## Source Artifacts

- [Ask Caniello Sourced Assistant](../features/ask-caniello-sourced-assistant.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Ask Caniello navigation.
- Suggested prompts.
- Chat input and answer display.
- Source references for answers.
- Empty or unsupported question state when no record supports an answer.

## Out of Scope

- Prompt management UI, feedback analytics, and asking from a specific document or event.

## Acceptance Criteria

- Given an authenticated user, when they open navigation, then Ask Caniello is available.
- Given the user opens Ask Caniello, when prompts are shown, then supported record-based questions are suggested.
- Given relevant confirmed data exists, when the user asks a supported question, then Caniello answers from that data.
- Given an answer uses records, when the answer is shown, then source references are visible.
- Given no relevant record exists, when the user asks a question, then Caniello states it cannot find supporting information.

## Implementation Notes

- Use [web image 2](../notes/web/image%202.png), [web image 14](../notes/web/image%2014.png), and [web image 17](../notes/web/image%2017.png) for Ask Caniello interaction patterns.

## Validation

- Validate navigation, suggested prompts, sourced answers, unsupported/no-record behavior, and source links.

## Related Artifacts

None yet.
