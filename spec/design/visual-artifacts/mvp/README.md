# Caniello MVP Visual Artifact Map

These filenames describe the screen or flow represented by each artifact. Use
the single-screen references as the primary 1:1 implementation targets. Use the
flow-overview boards for sequence and cross-platform context.

## Web Screen References

- `sign-up.png` - owner account creation.
- `sign-in.png` - returning-owner login.
- `first-run-onboarding.png` - authenticated first-run pet and first-document setup.
- `home-dashboard.png` - returning-owner dashboard.
- `documents-library.png` - document library and selected-document detail.
- `document-upload-scan.png` - upload or scan entry state.
- `document-processing.png` - document processing and extraction-progress state.
- `document-review-confirm.png` - owner review before extracted data is saved.
- `reminders.png` - reminders list and preference panels.
- `care-timeline.png` - historical care timeline with next-upcoming context.
- `ask-caniello.png` - record-grounded assistant surface.
- `share-care-summary.png` - care-summary selection, preview, and controlled sharing.

## Flow Overview References

- `web-core-onboarding-flow.png`
- `web-care-organization-flow.png`
- `web-assistant-sharing-flow.png`
- `mobile-core-onboarding-flow.png`
- `mobile-care-organization-flow.png`
- `mobile-assistant-sharing-flow.png`

No standalone Settings screenshot was supplied. Until one exists,
`/mvp-flow` Settings is the visual source for Settings layout and look and feel.
Production behavior must still follow the account privacy, consent, data-rights,
API, database, RLS, and audit requirements in the active task and accepted ADRs.
