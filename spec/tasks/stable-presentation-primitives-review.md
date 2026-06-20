---
status: planned
roadmap: now
risk: low
adrs: [0011, 0028]
---

# Stable presentation primitives review

## User story

As a developer, I want proven repeated presentation patterns to share stable primitives so that visual consistency improves without coupling feature behavior.

## Acceptance criteria

- Repeated icons, badges, cards, shell tokens, or controls are inventoried across production features.
- Only patterns with demonstrated reuse and identical semantics move into `packages/ui` or an existing shared presentation boundary.
- Feature state, server behavior, and domain-specific copy remain in their owning features.
- Production code does not import prototype state or prototype-only components.
- Visual and accessibility behavior remains stable after any extraction.

## Dependencies

- Dashboard, Documents, and responsive work should establish the final repeated patterns before extraction.

## Constraints

- No broad design-system rewrite, generic component framework, or speculative abstraction.

## Verification

- Pending: repository-boundary checks, focused component tests, visual regression inspection for affected surfaces, typecheck, and `pnpm verify:fast`.
