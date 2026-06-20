---
status: planned
roadmap: now
risk: medium
adrs: [0011, 0012]
---

# Authenticated app accessibility audit

## User story

As an owner using assistive technology or zoom, I want the authenticated application to remain understandable and operable so that I can manage care records independently.

## Acceptance criteria

- Auth, onboarding, Pet, Reminders, Documents, Timeline, Sharing, and Settings are audited with keyboard-only navigation.
- Focus order, visible focus, labels, landmarks, headings, dialog behavior, validation, and status announcements are corrected where defects are found.
- Text and controls remain usable at 200% zoom and common mobile widths without loss of content or function.
- Status does not rely on color alone, and relevant text/background contrast meets the project accessibility target.
- Findings, fixes, unavailable checks, and residual risks are recorded in this task.

## Dependencies

- Complete the identified responsive fixes before final zoom and mobile evidence.

## Constraints

- Keep changes feature-local and avoid replacing the component system wholesale.
- This task records practical conformance evidence but does not claim formal certification.

## Verification

- Pending: focused automated accessibility checks where available, keyboard walkthroughs, 200% zoom and responsive Playwright evidence, screen-reader announcement inspection, typecheck, and `pnpm verify:fast`.
