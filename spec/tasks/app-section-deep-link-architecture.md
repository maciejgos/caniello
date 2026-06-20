---
status: planned
roadmap: now
risk: medium
adrs: [0003, 0013, 0014, 0028]
---

# App section deep-link architecture

## User story

As a signed-in owner, I want each application section to have a stable protected URL so that refresh, bookmarks, and browser navigation preserve my location.

## Acceptance criteria

- Home, Pet, Timeline, Documents, Reminders, Sharing, and Settings have canonical routes under `/app`.
- Direct navigation and refresh restore the requested section for an authenticated owner.
- Unauthenticated requests preserve a safe return destination and redirect through the existing login flow.
- Back and forward navigation update both visible content and active navigation state.
- Unknown or unauthorized section URLs fail safely without exposing owner data.
- Existing feature-local server boundaries and first-pet behavior remain intact.

## Dependencies

- Review-ready foundation tasks should be merged before route composition changes to reduce churn.

## Constraints

- Do not add standalone unprotected feature routes or duplicate feature state.
- Ask Caniello remains unavailable until its Later task is promoted.

## Verification

- Pending: route and redirect tests, authenticated Playwright deep-link/refresh/back-forward journeys, authorization checks, typecheck, build, and `pnpm verify:fast`.
