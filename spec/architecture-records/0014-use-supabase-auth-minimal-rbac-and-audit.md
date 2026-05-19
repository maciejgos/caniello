# 0014 - Use Supabase Auth with minimal RBAC and audit controls

## Status

Accepted

## Date

2026-05-17

## Context

The owner MVP needs authentication and private pet-health data boundaries. Future operator/admin work is possible, but broad back-office scope is not active MVP scope.

## Decision

Owner authentication uses Supabase Auth. Owner sessions are mediated through the Next.js app using Supabase-supported session handling and server-side checks before private data access.

RBAC starts with a minimal role model in Supabase-backed data: owner, trusted recipient through share token, and operator only when operational support work is explicitly approved. Administrative access is deferred from the active owner MVP. If beta operations need support tooling before a back-office app exists, privileged operator actions must be narrowly scoped, server-side, and audited.

MFA is not required for first owner access, but must be required or explicitly risk-accepted before operator/admin access handles user data. Audit entries are required for sensitive actions: document upload, extraction confirmation, reminder changes, share-link creation/revocation, export generation, account deletion request, and any operator action.

## Consequences

This gives the owner MVP a small, secure starting point without inventing an admin platform early. The tradeoff is that support tooling cannot be improvised later without explicit role, MFA, and audit decisions.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [0004 - Use Supabase for MVP data, auth, storage, and RLS](./0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
