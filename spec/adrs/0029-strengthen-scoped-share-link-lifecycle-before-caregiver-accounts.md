# 0029 - Strengthen scoped share-link lifecycle before caregiver accounts

## Status

Accepted

## Date

2026-06-14

## Context

Caniello already supports scoped, hashed, revocable share links for public care-card viewing. ADR 0017 requires scoped tokens, revocation, default expiry, and access logging when technically available.

The current MVP does not implement caregiver accounts, invitations, persistent recipient roles, document-file sharing, or family permissions. Those remain outside the current phase unless explicitly approved.

## Decision

Caniello will strengthen scoped share links before adding caregiver accounts or complex sharing roles.

For MVP:

- share tokens remain opaque, random, hashed at rest, pet-scoped, revocable, and expiring by default;
- default expiry remains short-lived enough for validation, currently 14 days unless a task changes it;
- share links expose care-card data only, not account access;
- public share pages must not expose uploaded document files until a separate file-sharing decision is approved;
- raw tokens are shown only immediately after creation and are not recoverable from stored data;
- owners can revoke active share links;
- implementation should add access logging for share opens when practical.

Share access logs should store bounded evidence:

- share link id;
- pet id;
- opened timestamp;
- coarse request metadata such as user agent family or IP hash only if needed and privacy-reviewed;
- no raw token;
- no document contents;
- no recipient identity unless recipient accounts are later approved.

Abuse posture for MVP:

- invalid tokens return a generic unavailable response;
- repeated invalid token requests should be observable in logs;
- rate limiting can start with platform-level protection and be revisited if abuse appears;
- emergency revoke-all for one pet or owner should be documented before public health-record upload.

Caregiver accounts, invitations, recipient roles, persistent portals, and family permissions require a later ADR.

## Consequences

This keeps trusted sharing useful while avoiding premature collaboration infrastructure.

The tradeoff is that sharing remains link-based and cannot prove recipient identity. That is acceptable for MVP validation as long as copy describes it honestly and owners can revoke links.

Tasks that add file upload, PDF export, or caregiver behavior must revisit this decision before exposing private files or durable account access to recipients.

## Related Artifacts

- [0017 - Use scoped share tokens and defer PDF export](./0017-use-scoped-share-tokens-and-deferred-pdf-export.md)
- [0024 - Separate audit logs from product events](./0024-separate-audit-logs-from-product-events.md)
- [0025 - Use Supabase Storage for MVP document upload](./0025-use-supabase-storage-for-mvp-document-upload.md)
- [Care card share link foundation](../tasks/care-card-share-link-foundation.md)
- `apps/web/features/account/server/share-links.ts`
- `apps/web/app/share/[token]/page.tsx`
