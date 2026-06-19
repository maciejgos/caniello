---
status: planned
roadmap: now
risk: high
adrs: [0017, 0024, 0025, 0029]
---

# Share-link lifecycle hardening

## User story

As a pet owner, I want scoped links to be safely observable and revocable so that sharing remains under my control.

## Acceptance criteria

- Share-link opens create bounded access evidence without raw tokens or document contents.
- Revoked, expired, and invalid links fail generically and safely.
- Owners can revoke one or all active links.
- Public pages do not expose uploaded document files.
- Tests cover access logging, token secrecy, expiry, invalid links, and revocation.

## Constraints

- No caregiver accounts, invitations, recipient portals, PDF export, public files, or broad rate-limiting infrastructure.
- Any access-log migration requires explicit human approval.

## Verification

- Pending: focused server/route tests, live RLS checks if schema changes, public-page browser checks, typecheck, and build.
