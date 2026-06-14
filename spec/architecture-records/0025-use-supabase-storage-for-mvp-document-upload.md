# 0025 - Use Supabase Storage for MVP document upload

## Status

Accepted

## Date

2026-06-13

## Context

Caniello's MVP promise includes a document vault for medical records and test results. The current implementation lets a signed-in owner create and edit document metadata for the first pet, but it does not store real files. It writes placeholder storage values such as `metadata-only/...`.

Accepted ADR 0004 already chooses Supabase for data, auth, storage, and RLS. Accepted ADR 0016 says uploads should use server-authorized Supabase Storage paths or signed URLs and that clients must not receive broad storage privileges. The missing decision is the concrete MVP upload boundary: bucket, path, allowed file types, size limits, owner quotas, access rules, lifecycle behavior, and validation expectations.

Supabase's current Free plan includes a small storage allowance and egress allowance. Official Supabase docs also state that Free projects have a maximum file-size cap of 50 MB, while Supabase recommends standard uploads mainly for files not larger than 6 MB. Caniello should stay well below those limits during MVP validation to preserve the option of using the Free tier.

## Decision

Caniello will implement real MVP document upload with Supabase Storage, using conservative limits and a private owner-scoped access model.

### Bucket

Use one private Supabase Storage bucket:

```text
pet-documents
```

The bucket must not be public.

Configure the bucket with:

- `public: false`
- `fileSizeLimit: 5MB`
- `allowedMimeTypes`:
  - `application/pdf`
  - `image/jpeg`
  - `image/png`
  - `image/webp`

These limits intentionally stay below Supabase Free project limits and below the threshold where resumable uploads become important. HEIC/HEIF, DOCX, videos, archives, and arbitrary binary files are out of scope for the first upload implementation.

### MVP Quotas

Use application-level quotas in addition to bucket limits:

- maximum file size: 5 MB;
- maximum stored files per owner: 20;
- maximum stored bytes per owner: 100 MB;
- maximum files per pet for MVP validation: 20;
- one file per document record;
- no multi-file attachments in MVP;
- no duplicate-detection requirement in MVP.

These quotas protect the Free tier: 10 active validation owners at the owner quota would consume about 1 GB, so broader validation must either lower quotas, prune test data, or move to a paid plan.

### Object Path

Objects should be stored under owner- and pet-scoped paths:

```text
owners/{ownerUserId}/pets/{petId}/documents/{documentId}/{fileId}.{extension}
```

Rules:

- `ownerUserId`, `petId`, and `documentId` must be server-derived, not trusted from browser input.
- `fileId` should be an opaque UUID generated server-side.
- Original filenames remain metadata only; they must not determine the object path.
- Uploads must not use `upsert`; replacing a file should create a new object path and update the document row after successful upload.

### Upload Flow

Implement upload through the Next.js server boundary rather than giving broad client-side storage privileges.

Preferred MVP flow:

1. Authenticated owner submits a document metadata form plus one file to `/api/documents`.
2. The route validates:
   - authenticated owner;
   - first-pet ownership boundary or later active-pet ownership boundary;
   - MIME type allowlist;
   - file size;
   - owner and pet quotas;
   - required metadata fields.
3. The server creates or updates the `documents` row with status `uploaded` only after the file has been successfully written to Supabase Storage.
4. If Storage upload succeeds but the database write fails, the server attempts best-effort cleanup of the uploaded object and returns a clear failure.
5. If database write succeeds but later cleanup fails, record enough audit metadata to find the orphaned object.

Using a signed upload URL can be revisited later if direct browser upload is needed for larger files or mobile performance. For MVP, server-mediated upload keeps authorization and quota enforcement simpler.

### Download And Preview Flow

Document files remain private.

Owners should read files through short-lived signed URLs created by the server after ownership checks. Do not expose public URLs for private health documents.

Initial signed URL lifetime:

```text
5 minutes
```

Public share links should not expose uploaded document files in the first upload slice. Shared care cards may continue to show document metadata only unless a later task explicitly designs file sharing with its own scoped access decision.

### Database Model

The existing `public.documents` table remains the document source of record.

Use existing columns:

- `storage_bucket`
- `storage_path`
- `original_filename`
- `mime_type`
- `status`
- metadata fields added by the document-vault task.

Add only narrowly required columns if implementation needs them, such as:

- `file_size_bytes bigint`
- `uploaded_at timestamptz`
- `storage_etag text` or provider object metadata if needed for integrity/debugging.

Do not add OCR, extraction, or generated summary fields as part of the upload slice.

### Security And RLS

Private document authorization remains owner-scoped through the pet's household.

Storage access should be enforced by one of these MVP-safe patterns:

- server-mediated Storage writes/reads with the service role key kept server-side, plus database ownership checks before every operation; or
- Storage RLS policies on `storage.objects` that restrict paths under `owners/{auth.uid()}/...`, with server-side database checks still used for document row mutation.

For the first implementation, prefer server-mediated writes/reads because quotas and the existing first-pet lookup are easier to enforce atomically in application code.

The service role key must never reach browser code.

### Audit And Product Events

When ADR 0024 is approved or an implementation task explicitly adopts its boundary, document upload should record:

- audit action: `document.uploaded`;
- product event: `first_document_uploaded` or `document_uploaded` if product-event storage exists.

For now, at minimum, implementation should not block future audit insertion. Audit metadata should include bounded fields such as document id, pet id, file size, MIME type, and status. It must not include raw document contents or signed URLs.

### Non-Goals

The MVP upload slice does not include:

- OCR;
- AI extraction;
- document classification beyond owner-selected type;
- generated medical summaries;
- automatic timeline event creation;
- automatic reminder creation;
- virus scanning or malware sandboxing beyond MIME/size restriction and owner trust;
- public file sharing;
- caregiver file access;
- document version history;
- multi-file attachments;
- batch upload;
- mobile camera capture;
- resumable uploads;
- paid storage optimization or lifecycle tiering.

### Operational Limits

Before broader external validation, Caniello should review actual Supabase Storage usage. If expected validation exceeds roughly 10 active upload-heavy owners, reduce owner quotas, delete seeded/test files, or upgrade from Free to a paid plan.

## Consequences

This makes document upload real enough for MVP validation while keeping storage cost and security surface small.

The 5 MB limit is intentionally modest. It may reject large scans, multi-page high-resolution PDFs, HEIC photos, and videos. That is acceptable for MVP because the validation goal is proving that owners trust Caniello enough to store key documents, not supporting every possible file workflow.

Server-mediated upload increases server route complexity and can be less efficient than direct browser-to-storage upload for large files. The tradeoff is worthwhile for MVP because it centralizes owner checks, quotas, metadata creation, cleanup, and future audit insertion.

The architecture keeps OCR/AI and document-file sharing out of the upload slice, preserving medical-safety and privacy boundaries.

## Related Artifacts

- [0004 - Use Supabase for MVP data, auth, storage, and RLS](./0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data](./0015-use-supabase-data-lifecycle-and-rls.md)
- [0016 - Use a staged AI document intake pipeline](./0016-use-staged-ai-document-intake-pipeline.md)
- [0024 - Separate audit logs from product events](./0024-separate-audit-logs-from-product-events.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
- [Caniello Roadmap](../roadmap.md)
- [Caniello Product Context](../product-context.md)
- [Document upload scope decision](../tasks/document-upload-scope-decision.md)
- [Document Vault Foundation](../tasks/document-vault-foundation.md)
- `infra/supabase/migrations/20260519000100_mvp_foundation.sql`
- `infra/supabase/migrations/20260607100000_extend_document_metadata_fields.sql`
- `apps/web/features/account/server/documents.ts`
- Supabase Storage pricing and usage quotas: `https://supabase.com/docs/guides/platform/billing-on-supabase`
- Supabase Storage file limits: `https://supabase.com/docs/guides/storage/uploads/file-limits`
- Supabase Storage access control: `https://supabase.com/docs/guides/storage/security/access-control`
- Supabase Storage bucket restrictions: `https://supabase.com/docs/guides/storage/buckets/creating-buckets`
- Supabase standard uploads: `https://supabase.com/docs/guides/storage/uploads/standard-uploads`
