# 0018 - Use MailerLite for marketing email and defer transactional email choice

## Status

Accepted

## Date

2026-05-17

## Context

MailerLite is already part of the landing-page validation surface. Product email needs are broader than marketing and waitlist follow-up, but reminder, export, support, and operational email are not yet active implementation scope.

## Decision

MailerLite owns marketing, waitlist, early-access lifecycle email, and survey follow-up. MailerLite must not become the source of record for product data, health records, reminders, exports, or account state.

Supabase Auth owns authentication email where Supabase provides the flow. Product transactional email for reminders, exports, support, and operational notices is deferred until the relevant story. That later story or ADR should choose whether to use Supabase-provided email, a Vercel-compatible transactional email provider, MailerLite only for non-transactional follow-up, or another provider.

## Consequences

This keeps the current MailerLite integration valuable without turning it into product infrastructure. The tradeoff is that reminder/export/support email cannot launch until transactional email is decided.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [0008 - Use MVP product tooling baseline](./0008-use-mvp-product-tooling-baseline.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
