---
status: planned
roadmap: later
risk: high
adrs: [0016, 0021, 0024, 0028]
---

# Grounded Ask Caniello

## User story

As an owner, I want to ask organizational questions about my verified records so that I can find information without receiving veterinary judgment.

## Acceptance criteria

- Answers use only authorized owner-owned records appropriate to the question and cite the supporting records.
- The interface distinguishes sourced facts, uncertainty, missing evidence, and unavailable answers.
- Safety behavior refuses diagnosis, symptom checking, treatment recommendations, medication changes, and emergency advice.
- Retrieval, prompts, responses, and logs minimize sensitive content and never expose another owner's data.
- The owner can inspect sources and report unhelpful output without turning feedback into trusted medical history.

## Dependencies

- Owner-confirmed records, approved AI provider policy, evaluation evidence, and explicit promotion to `Now`.

## Constraints

- No general veterinary chatbot, web-grounded medical advice, autonomous actions, or uncited verified claims.

## Verification

- Pending after promotion: retrieval authorization tests, grounded-answer evaluation, cross-owner isolation, safety/refusal suites, citation browser journeys, logging review, typecheck, build, and full verification.
