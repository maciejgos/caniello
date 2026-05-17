# Web App Guidance

This subtree contains the Caniello MVP web app. Use Next.js App Router conventions:

- Put route files under `app/`.
- Keep coherent product areas under `features/`.
- Keep server-only integration helpers out of client components.
- Use shared schemas and types from `packages/contracts` when browser and API code exchange payloads.
- Preserve Polish-first behavior, English switching, explicit consent gates, and legal/medical-boundary copy when editing the marketing landing pages.

