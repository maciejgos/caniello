---
status: planned
roadmap: not-now
risk: high
adrs: [0017, 0018, 0024, 0029]
---

# Email sharing scope decision

## User story

As a maintainer, I want email-sharing requirements decided before implementation so that recipient privacy, consent, and delivery claims remain trustworthy.

## Acceptance criteria

- A future decision defines the transactional-email provider boundary separately from MailerLite marketing.
- Recipient address handling, owner confirmation, consent, expiry, revocation, abuse controls, bounce/failure behavior, and evidence retention are explicit.
- Email content and links expose only the approved scoped summary.
- Delivery status language distinguishes request, provider acceptance, delivery, and failure.
- Separate approved implementation tasks and any required ADR change are created before sending email.

## Dependencies

- Verified sharing summaries, hardened links, demonstrated demand, and explicit promotion from `Not Now`.

## Constraints

- Decision only; no provider integration, recipient storage, template sending, or background delivery.

## Verification

- Pending after promotion: privacy and abuse review, provider-boundary analysis, data-retention review, ADR decision, and explicit approval.
