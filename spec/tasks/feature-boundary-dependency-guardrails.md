---
status: planned
roadmap: now
risk: medium
adrs: [0011, 0028]
---

# Feature-boundary dependency guardrails

## User story

As a developer, I want lightweight mechanical checks around sensitive dependencies so that ordinary feature work stays simple without exposing owner data or secrets.

## Acceptance criteria

- Guidance explains feature-local code and when shared-package graduation is justified.
- Mechanical checks prevent service-role/provider clients and audit/product-event writes in UI components.
- Checks protect at least one real boundary without imposing empty architecture layers.
- Existing features are not broadly refactored.

## Constraints

- No mandatory repository/service/runtime folders, dependency framework, broad service layer, or new lint dependency without demonstrated need.

## Verification

- Pending: positive and negative boundary fixtures, repository-hygiene gate, typecheck, and test suite.
