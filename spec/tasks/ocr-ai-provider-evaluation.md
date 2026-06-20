---
status: planned
roadmap: later
risk: high
adrs: [0016, 0019, 0021, 0024]
---

# OCR and AI provider evaluation

## User story

As a maintainer, I want evidence for OCR and model-provider choices so that sensitive document processing has an approved privacy, quality, cost, and reliability boundary.

## Acceptance criteria

- The evaluation defines representative, de-identified fixtures and measurable extraction-quality criteria.
- Candidate models or providers are assessed through the accepted Vercel AI Gateway boundary where applicable.
- The review documents data sent, retention controls, regions, subprocessors, credentials, cost, latency, retry behavior, and failure modes.
- Logging and evaluation evidence exclude unnecessary medical content, secrets, and owner identifiers.
- A human explicitly approves the provider, model, and operating policy before implementation.

## Dependencies

- Document-processing states and explicit promotion to `Now`.

## Constraints

- Evaluation and decision only; do not process production owner documents or ship a provider integration.
- No diagnosis, treatment recommendations, symptom checking, or emergency advice.

## Verification

- Pending after promotion: privacy/security review, reproducible evaluation results, cost and failure analysis, ADR consistency check, and explicit approval record.
