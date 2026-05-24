# Task: App Section Empty States

## Goal

Create safe, navigable placeholder sections for the authenticated MVP areas so the dashboard skeleton feels coherent before every feature is fully implemented.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Section empty states support MVP foundation work by making the owner workspace navigable while individual pet, document, reminder, timeline, sharing, and settings flows are implemented in smaller tasks.

Related roadmap item:

`spec/roadmap.md` - Now: pet profile, health records, reminders, document vault, trusted sharing/export, and owner account/privacy foundations.

## Scope

- Add section surfaces or route states for Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings.
- Provide empty-state copy and primary actions that point to the relevant future workflows.
- Include safe placeholder copy for Ask Caniello that avoids diagnosis, treatment advice, and emergency guidance.
- Include privacy/account settings entry points without implementing new data-rights flows unless already available.
- Keep navigation consistent from every section.

## Non-Goals

- No full CRUD implementation for pets, documents, reminders, or timeline events.
- No AI chat implementation.
- No share-link creation, revocation, PDF export, or caregiver access model changes.
- No new account deletion/export behavior beyond existing foundations.
- No clinic, partner, marketplace, booking, or payment workflows.

## Acceptance Criteria

- Each core navigation item opens a coherent section or empty state.
- Empty states make the next intended action clear without implying unavailable backend behavior has shipped.
- Ask Caniello empty state includes a medical-safety boundary.
- Sharing empty state emphasizes owner control and does not expose real share links.
- Settings empty state does not regress existing logout, privacy, or language behavior.

## Implementation Notes

- This can be implemented as route-state rendering inside the existing `/app` area or as nested routes if the implementer decides that fits the app structure.
- Keep placeholders thin and defer feature-specific persistence to later tasks.
- Reuse existing legal and medical-boundary language where practical.

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
