---
status: planned
roadmap: now
risk: high
adrs: [0014, 0019, 0024, 0028]
---

# Audit and product-event foundation

## User story

As an owner and operator, I want sensitive actions to produce bounded audit evidence while product usage remains a separate concern.

## Acceptance criteria

- Server-side helpers expose explicit audit actions and product-event names.
- Covered sensitive actions write bounded metadata without medical content, secrets, raw tokens, or signed URLs.
- Product events remain separate from audit logs and respect consent where applicable.
- UI code cannot write audit or product events directly.
- Tests reject disallowed sensitive payload fields and unauthorized writes.

## Constraints

- Do not add a broad analytics provider, admin tooling, or speculative event coverage.
- Preserve `public.audit_logs` as the audit source of truth.
- Any new durable product-event storage requires explicit migration approval.

## Verification

- Pending: helper and payload-safety tests, authorization checks, typecheck, and relevant live database checks.
