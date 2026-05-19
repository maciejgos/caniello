# 0021 - Use Vercel AI Gateway for AI provider routing in MVP

## Status

Draft

## Date

2026-05-19

## Context

ADR 0016 intentionally deferred OCR/AI provider selection until a dedicated decision record defines provider choice, data-sharing boundaries, retry behavior, evaluation evidence, and medical-safety limits. The implementation now needs a concrete AI access layer that stays inside the existing Vercel + Next.js + Supabase runtime boundary and keeps model credentials server-side.

The MVP also needs flexibility to iterate on model/provider choice without coupling application logic to a single vendor SDK or transport path.

## Decision

For MVP AI capabilities, Caniello will use Vercel AI Gateway as the server-side gateway for model access from `apps/web`.

The implementation must follow these constraints:

1. **Server-side only access**: All AI Gateway calls are executed from trusted server runtime paths (Next.js server actions, route handlers, or background jobs). Browser clients must not call provider APIs directly and must not receive provider secrets.
2. **Minimal data sharing**: Only the minimum document/user context required by each AI task may be sent through AI Gateway. Sensitive medical context should be minimized and redacted where possible.
3. **Provider abstraction**: Product/domain logic must depend on internal application interfaces, not on provider-specific payloads, so provider/model swaps remain low-risk.
4. **Retry and fallback policy**: AI operations must use bounded retries and explicit failure states persisted in Supabase so review workflows can recover safely.
5. **Observability**: Request identifiers, latency/error classes, and task outcome states must be captured in application telemetry/logging without storing unnecessary sensitive prompt/response content.
6. **Safety boundaries**: AI output remains advisory and must stay within existing “review then confirm” product flow; no autonomous medical decisions are allowed.

## Consequences

### Positive

- Aligns with ADR 0016 by making provider choice explicit while preserving server-side secret handling.
- Reduces lock-in risk by routing model access through a single gateway boundary and internal interfaces.
- Improves operational control for retries, failure handling, and provider/model evolution.

### Tradeoffs / Risks

- Adds another platform dependency and potential failure domain (gateway availability/latency).
- Requires disciplined data minimization and logging controls to avoid oversharing sensitive content.
- Future cost/performance tuning still requires validation against real workloads.

## Related Artifacts

- [0016 - Use a staged AI document intake pipeline](./0016-use-staged-ai-document-intake-pipeline.md)
- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
