# Feature: Ask Caniello Sourced Assistant

## Status

Accepted

## Summary

Let owners ask questions about their pet's records and receive grounded, source-backed, non-diagnostic answers that help them find and understand their own care information.

## Source Requirements

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [Web and Mobile Backlog Notes](../notes/web/backlog.md)

## Users and Use Cases

- Pet owners ask what happened, what is due, or where a record is without manually searching.
- Owners use suggested prompts to learn what the assistant can answer.
- The product team validates whether an assistant-led interface improves trust and repeat usage.
- Safety reviewers need the assistant to avoid diagnosis and cite sources.

## Scope

- Ask Caniello navigation in the app.
- Chat-style question entry and answer display.
- Suggested prompts grounded in supported pet-care use cases.
- Answers based on the user's pet documents, timeline events, reminders, and confirmed data.
- Source references for answers.
- Safety guardrails that avoid diagnosis, treatment decisions, or emergency advice.
- Medical disclaimer visibility in assistant contexts.

## Out of Scope

- General veterinary advice not grounded in the user's records.
- Diagnosis, symptom checking, treatment recommendations, or emergency triage.
- Prompt configuration UI, prompt version history, and sampled answer review queues.
- Feedback and analytics loops unless included in a later feature.
- Asking from a specific document or timeline event as a required MVP behavior.

## Behavior

Ask Caniello is visible as a core app capability. The assistant responds only within safe boundaries, references the records used, and redirects users to a veterinarian when a question asks for medical judgment rather than record organization.

## Acceptance Criteria

- Given an authenticated user, when they open app navigation, then Ask Caniello is available.
- Given a user opens Ask Caniello for the first time, when they view the screen, then suggested prompts demonstrate supported record-based questions.
- Given a user asks about their pet's care history, when relevant confirmed data exists, then the assistant answers using that data.
- Given the assistant uses pet records in an answer, when the answer is displayed, then source documents or timeline events are referenced.
- Given no relevant record exists, when the user asks a question, then the assistant says it cannot find supporting information instead of inventing an answer.
- Given a user asks for diagnosis, treatment, emergency advice, or unsafe medical guidance, when the assistant responds, then it refuses or redirects appropriately and recommends contacting a veterinarian when needed.
- Given assistant safety disclaimers are required, when the user interacts with Ask Caniello, then the non-diagnostic boundary is visible or accessible.

## Related Stories

None yet.

## Related Artifacts

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
