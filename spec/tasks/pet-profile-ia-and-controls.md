---
status: planned
roadmap: now
risk: medium
adrs: [0014, 0015, 0027, 0028]
---

# Pet profile IA and controls

## User story

As a pet owner, I want the profile experience to clearly support the first-pet MVP so that controls do not promise unavailable multi-pet behavior.

## Acceptance criteria

- The UI clearly communicates the supported first-pet scope.
- Unavailable add/edit pet affordances are removed or made honest.
- Species and sex-or-gender controls use clear product language.
- Existing profile save, reload, authentication, and owner isolation remain covered.

## Constraints

- Do not introduce true multi-pet management, household roles, veterinary taxonomy, or a database migration without separately approved scope.
- Preserve existing contracts unless a change is explicitly approved.

## Verification

- Pending: focused profile tests, browser validation, typecheck, and owner-isolation review.
