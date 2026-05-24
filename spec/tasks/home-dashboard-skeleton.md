# Task: Home Dashboard Skeleton

## Goal

Give returning owners a useful home dashboard structure that shows what matters next for a pet and where core care records will appear.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The home dashboard organizes the MVP foundation areas: pet health information, reminders, documents, timeline, sharing entry points, and safe assistant discovery.

Related roadmap item:

`spec/roadmap.md` - Now: owner can manage pet profile, store health information, add reminders, upload/store documents, and access trusted sharing/export when approved.

## Scope

- Add a returning-user dashboard state inspired by `spec/design/visual-artifacts/mvp/image 1.png`.
- Show "What's next" cards for vaccine due, vet visit, medication, and document review as demo/skeleton data unless backed by existing records.
- Show health summary, recent documents, care timeline preview, Ask Caniello preview, sharing prompt, and Caniello tip sections.
- Keep calls to action routed to existing or planned section skeletons.
- Use safe copy for assistant and medical boundaries.
- Make the dashboard visually consistent with the existing Caniello brand direction.

## Non-Goals

- No real reminder creation/editing.
- No real document upload or verification statuses.
- No real timeline event detail pages.
- No live Ask Caniello answers.
- No real sharing permissions, links, or PDF export.
- No advanced analytics tracking unless separately approved.

## Acceptance Criteria

- A signed-in owner can see a complete home dashboard skeleton with the major sections from the mockup.
- Skeleton/demo data is visually distinguishable enough that it does not imply completed backend capabilities where they do not exist.
- All dashboard links either navigate to implemented skeleton sections or are safely disabled.
- Medical boundary language is available from the authenticated experience.
- The dashboard passes responsive visual checks for desktop and mobile widths.

## Implementation Notes

- Prefer simple static view models for this task unless a prior task has created real pet/reminder/document data access.
- Avoid introducing broad service layers for demo dashboard data.
- If the dashboard uses seeded demo data, document the assumption and keep production behavior safe for empty accounts.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Pending implementation.
