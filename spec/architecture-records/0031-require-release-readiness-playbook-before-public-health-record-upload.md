# 0031 - Require release-readiness playbook before public health-record upload

## Status

Accepted

## Date

2026-06-14

## Context

ADR 0019 requires recovery playbooks before public health-record upload. Caniello has validation artifacts and local verification notes, but a production-facing readiness playbook is still missing.

Real document upload, share links, account data-rights requests, and private pet-health records increase operational responsibility even if the MVP remains small.

## Decision

Caniello must have a release-readiness playbook before collecting public health-record uploads.

The playbook must cover:

- production environment inventory;
- required environment variables and secret rotation;
- Vercel deployment, rollback, and preview/prod separation;
- Supabase project, Auth, Postgres, Storage, RLS, and backup expectations;
- Storage bucket existence, privacy, file limits, and usage monitoring;
- share-link incident response, including revoke-one and revoke-all procedures;
- data export and deletion request handling;
- audit evidence preservation;
- error/log review;
- support access boundaries;
- privacy/medical disclaimer checks;
- release approval checklist;
- rollback and pause-traffic procedure.

Release readiness is not the same as accepting an implementation task. A task may pass locally while public health-record upload remains blocked until the playbook is reviewed and approved.

## Consequences

This creates a clear gate between local MVP validation and public beta collection of sensitive data.

The tradeoff is extra documentation before launch. That is appropriate because uploaded medical documents and share links create trust, privacy, and recovery obligations.

Implementation tasks should continue to record local validation evidence, but production use requires a separate human release approval.

## Related Artifacts

- [0019 - Use Vercel and Supabase observability with MVP recovery playbooks](./0019-use-vercel-supabase-observability-and-mvp-recovery.md)
- [0024 - Separate audit logs from product events](./0024-separate-audit-logs-from-product-events.md)
- [0025 - Use Supabase Storage for MVP document upload](./0025-use-supabase-storage-for-mvp-document-upload.md)
- [0026 - Use manual data-rights runbook before automated account lifecycle](./0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md)
- [0029 - Strengthen scoped share-link lifecycle before caregiver accounts](./0029-strengthen-scoped-share-link-lifecycle-before-caregiver-accounts.md)
- `spec/validation/`
- `README.md`
