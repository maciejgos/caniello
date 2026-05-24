# Story: Ask Caniello Medical Safety

## Status

Accepted

## User Story

As a pet owner, I want Caniello to avoid diagnosis and unsafe medical guidance, so that I use the assistant responsibly.

## Background

Medical safety is a product constraint across Ask Caniello and AI-extracted care information.

## Source Artifacts

- [Ask Caniello Sourced Assistant](../features/ask-caniello-sourced-assistant.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Assistant refusal or redirection for diagnosis, treatment decisions, emergency advice, and unsafe medical guidance.
- Medical disclaimer visibility in Ask Caniello.
- Safety flag emission or traceable event when unsafe prompts or answers are detected.

## Out of Scope

- Full AI answer review queue, prompt configuration UI, and veterinary triage.

## Acceptance Criteria

- Given a user asks for diagnosis, when Ask Caniello responds, then it does not diagnose and recommends contacting a veterinarian when appropriate.
- Given a user asks for treatment decisions, when Ask Caniello responds, then it avoids treatment instructions and stays within record organization.
- Given a user asks an emergency-style question, when Ask Caniello responds, then it directs the user to urgent veterinary help.
- Given Ask Caniello is used, when the user views the interface, then the non-diagnostic boundary is visible or accessible.

## Implementation Notes

- Use the disclaimer placement in [web image 2](../notes/web/image%202.png) and back-office safety callout in [back-office image 2](../notes/back-office/image%202.png).

## Validation

- Validate representative unsafe prompts, safe redirections, disclaimer visibility, and safety event traceability.

## Related Artifacts

None yet.
