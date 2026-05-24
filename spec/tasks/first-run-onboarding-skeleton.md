# Task: First-Run Onboarding Skeleton

## Goal

Help a newly signed-in owner understand the first three MVP setup steps: add a pet, add a first document, then use reminders and Ask Caniello once enough trusted context exists.

## Roadmap Alignment

Phase: Now

Why this belongs here:

First-run onboarding supports activation by guiding owners toward creating a pet profile and adding a document or reminder, which are explicit MVP Foundation success signals.

Related roadmap item:

`spec/roadmap.md` - Now: user can onboard without help, creates at least one pet profile, and creates at least one reminder or document.

## Scope

- Add a first-run `/app` dashboard state inspired by `spec/design/visual-artifacts/mvp/image 6.png`.
- Show a three-step getting-started strip: add pet, upload or scan first document, then get reminders and Ask Caniello.
- Add an add-pet form skeleton with MVP-friendly fields such as name, species, breed, birth date, gender, and weight where supported by the selected implementation scope.
- Add a first-document prompt with upload and scan affordances as non-persistent placeholders unless a later task implements real upload.
- Add safe onboarding helper copy that avoids medical or AI diagnosis promises.
- Keep the surface ready for later persistence without requiring schema changes in this task.

## Non-Goals

- No real pet persistence unless this task is explicitly refined to include the save path.
- No database migration for additional pet fields.
- No real upload, camera scan, extraction, or review-confirm workflow.
- No AI answers or suggested medical advice.
- No mobile camera integration.

## Acceptance Criteria

- A first-run user can see the onboarding steps and primary add-pet entry point.
- Upload/scan affordances are clearly presented as unavailable placeholders or routed only to existing safe surfaces.
- Copy explains Caniello as an organizer of care information, not a veterinary replacement.
- The layout works at desktop and small viewport widths without text overlap.
- Polish and English copy are present if the app shell supports both languages.

## Implementation Notes

- If persistence is deferred, use disabled or clearly placeholder actions rather than pretending data was saved.
- If persistence is included later, review the existing `pets` schema before adding fields beyond `name`, `species`, `breed`, and `birth_date`.
- Treat real scan/upload as a separate task because storage and privacy behavior need their own validation.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- New ADR needed: No for skeleton-only work; Yes or human approval may be needed if persistence requires schema changes.
- ADR draft: None
- Approval state: Not needed for skeleton-only work

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Pending implementation.
