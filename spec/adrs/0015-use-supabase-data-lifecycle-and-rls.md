# 0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data

## Status

Accepted

## Date

2026-05-17

## Context

Caniello will handle pet profiles, documents, reminders, sharing, and account data controls. The MVP needs a durable data lifecycle before collecting health-record uploads from public users.

## Decision

Supabase migrations under `infra/supabase/migrations` own schema evolution. RLS policies are required before exposing private pet, document, reminder, timeline, account, or sharing data. Supabase Storage stores raw uploads and generated artifacts such as exports when they enter scope.

Retention defaults to retaining owner data while the account is active and deleting or anonymizing data when an approved deletion flow runs, unless legal, abuse-prevention, or audit obligations require a narrower retained record. Export and deletion flows must be designed before collecting health-record uploads from public users.

Backup and recovery rely on Supabase managed capabilities for MVP, with recovery expectations recorded in release-readiness before production health-record collection.

## Consequences

This keeps product data, files, and access policy in one Supabase-centered lifecycle. It also makes migrations and RLS policy review a blocking security concern rather than incidental setup.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [0004 - Use Supabase for MVP data, auth, storage, and RLS](./0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
