# 0004 — Use Supabase for MVP data, auth, storage, and RLS

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will use Supabase as the primary backend platform for:

- PostgreSQL database
- Authentication
- File storage
- Row-level security
- migrations, policies, and seed data under `infra/supabase`

Shared Supabase access helpers, typed queries, and repository-style utilities should live in `packages/db`.

## Context

Caniello needs user accounts, pet profiles, health records, reminders, uploaded documents, and trusted sharing. These features require durable relational data, authenticated access, private storage, and authorization boundaries.

Supabase gives the MVP a fast path to Postgres, Auth, Storage, and RLS without building an entire custom backend platform before product validation.

## Consequences

### Positive

- Faster MVP delivery with managed Postgres, Auth, Storage, and RLS.
- Strong fit for user-owned pet health records and document metadata.
- RLS can enforce user and sharing boundaries close to the data.
- Supabase migrations and policies can be versioned under `infra/supabase`.
- TypeScript applications can share Supabase data-access helpers from `packages/db`.

### Tradeoffs

- The product becomes dependent on Supabase-specific Auth, Storage, and RLS behavior.
- RLS policy design must be treated as core security work, not incidental configuration.
- Local development and CI need a reproducible Supabase setup before database-backed implementation scales.
- Future migration away from Supabase would require replacing Auth, Storage, and data-access patterns.

## Implementation Standard

Implementation should:

- keep migrations, RLS policies, and seed data in `infra/supabase`;
- keep Supabase client setup and shared data access in `packages/db`;
- keep shared schemas and API contracts in `packages/contracts`;
- avoid embedding Supabase queries directly across unrelated UI components;
- validate all user-facing inputs before database writes;
- design RLS policies before exposing private pet, document, reminder, or sharing data.

## Review triggers

Revisit this decision if:

- Caniello requires database features Supabase cannot support well;
- RLS policies become too complex to reason about safely;
- storage, retention, or privacy requirements exceed Supabase's MVP fit;
- a dedicated backend service becomes necessary for data access orchestration;
- compliance, audit, or operational needs require a different data platform.
