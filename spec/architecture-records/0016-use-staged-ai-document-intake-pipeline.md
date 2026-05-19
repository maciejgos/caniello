# 0016 - Use a staged AI document intake pipeline

## Status

Accepted

## Date

2026-05-17

## Context

The document memory loop needs upload, processing status, review, confirmation, and later OCR/AI assistance. A real OCR/AI provider has not yet been selected, and medical-safety boundaries must remain explicit.

## Decision

The first implementation uses deterministic processing states and server-side orchestration inside the Next.js/Supabase boundary before introducing a real OCR/AI provider. Uploads use server-authorized Supabase Storage paths or signed URLs; clients must not receive broad storage privileges.

Processing state is stored in Supabase so retries, failures, and review handoff are observable. Real OCR/AI provider selection is deferred until a dedicated story or ADR defines provider choice, data sent to the provider, retry policy, evaluation evidence, and medical-safety boundaries. AI/model provider secrets must stay server-side in Vercel/Supabase-managed environments.

## Consequences

This lets the product validate the document workflow before committing to a provider. The tradeoff is that real extraction quality and provider operations remain future work.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
