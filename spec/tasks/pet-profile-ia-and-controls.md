---
status: review
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

- `pnpm --filter web test -- AccountApp.test.tsx PetAvatar.test.tsx` — passed, 27 tests.
- `pnpm --filter web typecheck` — passed.
- `pnpm verify:fast` — passed task-contract, formatting, repository-hygiene, lint, and typecheck stages. Lint retained five existing warnings and reported no errors.
- Playwright Interactive at `http://localhost:3000/app` — passed Polish and English desktop checks for singular Pet navigation, saved-pet context, species avatar rendering, Pet form copy, and the structured Sex control. Exercised the Sex select and restored its original value without saving.
- Playwright Interactive responsive check at `390x844` — found and fixed authenticated-header horizontal overflow; final document width was `383px` within the `390px` viewport with no console errors or warnings.
- Owner-isolation review — no API, contract, database, authorization, or RLS behavior changed. Existing `pet-profile.rls.test.ts` remains the focused boundary evidence; live RLS was not rerun because this task is UI-only.
- Residual risk: generated avatars are fixed default artwork; user-uploaded pet photos and true multi-pet behavior remain out of scope.
- Next action: human review of the Pet copy, generated avatar style, and responsive presentation.
