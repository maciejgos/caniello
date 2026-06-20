---
status: planned
roadmap: later
risk: high
adrs: [0003, 0011, 0024]
---

# Partner workflow scope decision

## User story

As a maintainer, I want partner learning separated from partner product workflows so that owner utility remains the product lead.

## Acceptance criteria

- The task defines lightweight, consent-aware partner-interest research and success evidence.
- Research does not grant partners account access or expose owner records.
- Clinic SaaS, PIMS/EHR integration, partner portals, partner uploads, booking, and payments remain prohibited.
- Any proposed owner-benefiting partner capability is split into its own roadmap decision, ADR where needed, and implementation task.
- Weak owner retention cannot be used to justify silent partner-scope expansion.

## Dependencies

- Owner-side activation and retention evidence plus explicit promotion to `Now`.

## Constraints

- Decision and learning only; no partner product integration, data exchange, portal, or sales workflow.

## Verification

- Pending after promotion: research-plan review, consent/privacy review, scope-boundary check against `SPEC.md` and `ROADMAP.md`, and explicit approval.
