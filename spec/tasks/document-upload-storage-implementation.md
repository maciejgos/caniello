# Task: Document upload storage implementation

## Goal

Let a signed-in owner upload one real document file to Supabase Storage for the first pet while preserving private access, cost limits, and metadata consistency.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The roadmap allows a document vault for medical records and test results. Real upload is required for the next MVP validation pass after ADR 0025 was accepted.

Related roadmap item:

`spec/roadmap.md` - Now / owner can upload or store important documents.

## Scope

- Create or configure private Supabase Storage bucket `pet-documents`.
- Enforce accepted MVP limits: 5 MB max, PDF/JPEG/PNG/WebP only, one file per document, 20 files per owner, 100 MB per owner.
- Implement server-mediated upload through the Next.js document boundary.
- Store real `storage_bucket`, `storage_path`, `original_filename`, `mime_type`, and narrowly required file metadata in `public.documents`.
- Return owner-only short-lived signed URLs for viewing or downloading uploaded files.
- Keep public share pages metadata-only for uploaded documents.
- Add focused unit, route, storage, RLS, and browser validation.

## Non-Goals

- OCR, AI extraction, summaries, classification beyond owner-selected type, automatic reminders, or timeline automation.
- Public file sharing, caregiver file access, multi-file attachments, version history, batch upload, mobile camera capture, or resumable upload.
- Production release or public health-record upload approval.

## Acceptance Criteria

- A signed-in owner can upload an allowed file and see the document persist after reload.
- Disallowed MIME types, oversize files, and quota violations are rejected with safe user-facing errors.
- A different owner cannot read or mutate another owner's document row or file.
- Uploaded files are private and only readable through server-created short-lived signed URLs.
- Storage cleanup behavior is handled or documented for failed DB writes.
- Public share views still expose metadata only.

## Implementation Notes

- Follow ADR 0025 exactly for bucket, object path, upload flow, signed URL lifetime, and limits.
- Follow ADR 0028 for provider boundaries: UI must not call Supabase Storage directly.
- Follow ADR 0024 for future audit/product event compatibility; add audit if the task includes it, or leave a clear follow-up.
- Likely files: `infra/supabase/migrations/`, `infra/supabase/seed.sql`, `apps/web/features/account/server/documents.ts`, `apps/web/app/api/documents/route.ts`, document UI components, contracts, and tests.

## Architecture Decisions

- Existing ADRs: `0024`, `0025`, `0028`, `0030`, `0031`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: ADRs accepted by human on 2026-06-14.

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
