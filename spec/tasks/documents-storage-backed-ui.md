---
status: planned
roadmap: now
risk: medium
adrs: [0024, 0025, 0028, 0031]
---

# Documents storage-backed UI

## User story

As a signed-in owner, I want the Documents section to reflect the real state of my privately stored files so that upload and access behavior is understandable and trustworthy.

## Acceptance criteria

- The Documents UI renders real metadata and private-file availability from the approved storage implementation.
- Upload progress, validation failures, quota failures, server failures, loading, empty, and retry states are explicit.
- Owner-authorized viewing uses the approved short-lived access flow and handles expired or unavailable access safely.
- Deletion or replacement controls are included only if the storage task implements their server behavior.
- Public sharing remains metadata or approved care-card data only.
- The UI never implies OCR, classification, extraction, AI verification, or generated summaries.

## Dependencies

- `document-upload-storage-implementation` must be review-ready or merged.

## Constraints

- No client-side Storage SDK access, multi-file upload, OCR, AI, caregiver file access, or public files.

## Verification

- Pending: component and route tests for all real storage states, browser upload/view/error journeys, owner-isolation evidence, typecheck, build, and `pnpm verify:fast`.
