# 0020 - Defer Stripe payments until paid-plan stories are approved

## Status

Accepted

## Date

2026-05-17

## Context

Stripe is the intended payment provider for Caniello when paid plans enter scope. Current MVP requirements focus on owner validation, records, reminders, documents, sharing, and trust-building, not monetization.

## Decision

Stripe is the accepted payment provider when paid plans enter scope. Payments are explicitly deferred from the active owner MVP until a human-approved requirement or story defines paid-plan trigger, plan boundaries, trial behavior, cancellation, refunds, invoices, and how billing state affects product access.

No Stripe implementation, billing tables, checkout flow, webhook handler, or paid access gating should be added before that approval.

## Consequences

This preserves a clear vendor direction while keeping MVP implementation focused. The tradeoff is that billing cannot be added opportunistically; it needs a dedicated requirements, design, and validation loop.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [0008 - Use MVP product tooling baseline](./0008-use-mvp-product-tooling-baseline.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
