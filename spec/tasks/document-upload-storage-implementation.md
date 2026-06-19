---
status: planned
roadmap: now
risk: high
adrs: [0024, 0025, 0028, 0030, 0031]
---

# Document upload storage implementation

## User story

As a signed-in owner, I want to upload and privately access a document for my pet so that Caniello stores real medical records safely.

## Acceptance criteria

- Allowed PDF, JPEG, PNG, and WebP files up to 5 MB persist in private Supabase Storage.
- Owner limits remain 20 files and 100 MB, with safe errors for invalid type, size, or quota.
- Document metadata persists and reloads; viewing uses short-lived owner-authorized signed URLs.
- Another owner cannot read or mutate the row or object.
- Failed database writes do not leave unexplained orphaned objects.
- Public share pages remain metadata-only.

## Constraints

- Server-mediated upload only; UI code must not call Storage directly.
- No OCR, AI extraction, public file sharing, caregiver access, multi-file upload, or production release approval.
- Any migration requires explicit human approval before implementation.

## Verification

- Pending: focused unit/route tests, live Storage and RLS checks, browser upload flow, typecheck, and build.
