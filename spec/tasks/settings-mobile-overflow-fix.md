---
status: planned
roadmap: now
risk: low
adrs: [0011, 0012, 0027, 0028]
---

# Settings mobile overflow fix

## User story

As a signed-in owner, I want Settings and the authenticated header to fit on a mobile screen so that every control remains visible and usable.

## Acceptance criteria

- The authenticated header and Settings section have no horizontal overflow at 320, 375, 390, and 430 px widths.
- Navigation, language controls, account actions, and destructive actions remain reachable without clipped text or controls.
- Desktop layout and the first-pet product language remain unchanged.
- Polish and English labels wrap or collapse intentionally without layout shift.
- Focus indicators and touch targets remain visible and usable.

## Constraints

- Keep the existing authenticated app shell and Settings behavior.
- Do not redesign unrelated sections or add new account capabilities.

## Verification

- Pending: focused account component tests, responsive Playwright checks at the required widths, keyboard/focus inspection, typecheck, and `pnpm verify:fast`.
