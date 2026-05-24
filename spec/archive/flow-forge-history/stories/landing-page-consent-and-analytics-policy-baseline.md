# Story: Landing Page Consent and Analytics Policy Baseline

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session after `product_coherence_reviewer` returned `valid to accept`.

## User Story

As a landing-page visitor, I want clear consent and privacy controls before Caniello sends my email or tracks non-essential analytics, so that I understand what I am agreeing to.

## Background

The landing page collects waitlist and research-interest data and may collect validation analytics. To keep the implementation stories objective, the first public landing-page baseline is conservative: explicit consent is required before sending lead data to MailerLite, and non-essential analytics remain inactive until analytics consent is granted.

## Source Artifacts

- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Scope

- Consent copy near owner waitlist, provider interest, and clinic/vet interest forms.
- Required explicit consent control before sending lead data to MailerLite.
- Privacy Policy link near lead-capture forms.
- Non-essential analytics disabled until analytics consent is granted.
- Saved consent state for analytics where the page implements analytics.
- Clear out-of-scope note that final legal text still requires human/legal approval.

## Out of Scope

- Final legal approval of privacy policy, terms, or consent copy.
- Full cookie preference center beyond the consent needed for this landing-page validation slice.
- Authenticated account privacy settings.
- Data export, account deletion, or legal request workflows.
- Selecting the final analytics vendor.

## Acceptance Criteria

- Given a visitor views an owner waitlist form, when they are asked to submit an email, then consent copy and a Privacy Policy link are visible near the form.
- Given a visitor views a Wave 2 or Wave 3 interest form, when they are asked to submit an email, then consent copy and a Privacy Policy link are visible near the form.
- Given a visitor has not selected the required lead-capture consent control, when they submit any landing-page lead form, then the lead is not sent to MailerLite and a clear consent message is shown.
- Given a visitor selects the required lead-capture consent control, when a valid form is submitted, then the submission may proceed to the lead-capture flow.
- Given a visitor has not granted analytics consent, when the landing page loads, then non-essential analytics events are not sent.
- Given a visitor grants analytics consent, when analytics are configured, then validation events may be sent according to that saved consent state.
- Given final legal copy is not approved, when the story is implemented for public launch, then placeholder legal text is not treated as final approved legal content.

## Implementation Notes

- This story should be completed before accepting lead-capture or validation-instrumentation implementation as public-launch ready.
- This story defines the first-public landing-page baseline for the unresolved consent open question in the requirement.
- The analytics vendor remains open; the required behavior is consent gating, not a specific provider.

## Validation

- Validate consent-copy visibility, Privacy Policy link visibility, blocked submissions without lead consent, allowed submissions with lead consent, non-essential analytics blocking before consent, and analytics allowance after consent.

## Related Artifacts

- [Landing Backlog Notes](../notes/landing/backlog.md)
