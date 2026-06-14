# Task: Document upload scope decision

## Goal

Decide whether real document file upload is required for the next MVP validation pass, and make the document vault UI and validation script match that decision.

Decision accepted on 2026-06-14: real document upload is required for the next MVP validation pass, with Supabase Storage and conservative free-tier-friendly limits. Implementation should follow accepted ADR `spec/architecture-records/0025-use-supabase-storage-for-mvp-document-upload.md`.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The roadmap allows a document vault for medical records and test results. Current implementation stores document metadata only, so validation needs a clear decision before users are asked to test "upload" expectations.

Related roadmap item:

`spec/roadmap.md` - Now / owner can upload or store important documents.

## Scope

- Review the document vault against MVP mockups and current validation needs.
- Choose one path: metadata-only with clearer copy, or a scoped real upload/storage implementation task.
- If metadata-only remains acceptable, update copy and validation scripts so upload is not promised.
- If upload is required, produce the follow-up implementation task scope, required storage decisions, security checks, and approval needs.
- Treat the relevant document-safe mockup in `spec/design/visual-artifacts/mvp/` as the 1:1 UI target for any later implementation; if metadata-only remains the scope, record exactly how the UI will avoid diverging from or overpromising the mockup.
- Drafted upload path: private `pet-documents` Supabase Storage bucket, 5 MB max file size, PDF/JPEG/PNG/WebP only, 20 files per owner, 100 MB stored bytes per owner, one file per document, server-mediated upload, and short-lived owner-only signed read URLs.

## Non-Goals

- Implementing file upload in this decision task unless separately approved.
- OCR, extraction, AI classification, document summaries, or automatic reminders/timeline events.
- Partner document-upload flows.

## Acceptance Criteria

- The product decision is recorded in the task, handoff, and readiness evidence.
- Document safe copy and validation scripts no longer conflict with the chosen MVP scope.
- The decision states whether 1:1 mockup fidelity requires real upload now or an approved temporary deviation.
- If upload is required, the next implementation task clearly names Supabase Storage, access rules, file limits, and verification needs.
- No upload behavior is added without explicit approval.

## Implementation Notes

- Current document task intentionally excluded upload: `spec/tasks/document-vault-foundation.md`.
- ADR `0016-use-staged-ai-document-intake-pipeline.md` may become relevant if the decision moves toward upload plus extraction later.
- ADR `0004-use-supabase-for-mvp-data-auth-storage-and-rls.md` is relevant if real file storage is planned.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`, `spec/architecture-records/0016-use-staged-ai-document-intake-pipeline.md`.
- New ADR needed: Yes, because real upload introduces a durable storage, quota, access-control, and cost boundary.
- ADR draft: None.
- Approval state: ADR 0025 accepted by human on 2026-06-14.

## Verification

- [x] Documentation/copy review.
- [ ] Validation script updated if scope changes during implementation planning.
- [x] No roadmap scope expansion beyond document-vault MVP.
- [x] Handoff updated.

## Handoff Notes

Real upload architecture was accepted on 2026-06-14 in ADR 0025. Follow-up implementation task: `spec/tasks/document-upload-storage-implementation.md`. This decision task does not implement upload behavior, migrations, bucket creation, route changes, UI changes, release, deployment, or roadmap movement.
