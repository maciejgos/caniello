---
status: planned
roadmap: now
risk: high
adrs: [0015, 0024, 0025, 0026, 0031]
---

# Data-rights manual runbook

## User story

As an operator, I want a concise manual export and deletion procedure so that owner requests can be handled safely before public health-record uploads.

## Acceptance criteria

- A fresh operator can verify the requester and process export or deletion without chat history.
- The runbook names included owner data, Storage cleanup, Supabase Auth handling, retained audit evidence, and owner communication.
- Existing queued export/deletion UI language remains truthful.
- The procedure defines failure, escalation, and completion evidence.

## Constraints

- Do not automate export generation, account deletion, background processing, admin UI, or transactional email.
- Keep the runbook concise and place it at a stable root or operational path approved during implementation.

## Verification

- Pending: manual dry run against local data, link/reference check, and review against accepted data-rights and upload ADRs.
