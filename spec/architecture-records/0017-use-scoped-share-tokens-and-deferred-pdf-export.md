# 0017 - Use scoped share tokens and defer PDF export

## Status

Accepted

## Date

2026-05-17

## Context

Caniello's owner value includes trusted sharing of care information. Sharing must not expose broad account access, and PDF export should wait until the care-summary scope is ready.

## Decision

Trusted sharing uses opaque, revocable share tokens served through `apps/web/app/share/[token]`. Share tokens are scoped to a specific pet, summary, document set, or care-card snapshot; broad account-level tokens are not allowed for MVP.

Share links must support revocation. Optional expiry should be the default for externally shared links unless a story explicitly requires persistent access. Access logging is required for share-link open events when technically available without collecting excessive recipient data.

PDF export is deferred until the care-summary story requires it. When added, generated PDFs should be stored in Supabase Storage or streamed server-side with an audit entry.

## Consequences

This keeps sharing useful but bounded. The tradeoff is that broad collaboration, persistent portals, and PDF workflows must wait for explicit stories and validation.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [Care Summary Sharing](../features/care-summary-sharing.md)
- [0003 - Keep landing, web app, and API in one Next.js project](./0003-keep-landing-app-and-api-in-one-nextjs-project.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
