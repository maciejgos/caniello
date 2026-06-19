# Web App Guidance

This subtree contains the Caniello MVP web app. Use Next.js App Router conventions:

- Read root `SPEC.md`, `ROADMAP.md`, and the active `spec/tasks/` contract before product changes.
- Read root `DESIGN.md` before visible UI work.
- Put route files under `app/`.
- Keep coherent product areas under `features/`.
- Keep server-only integration helpers out of client components.
- Use shared schemas and types from `packages/contracts` when browser and API code exchange payloads.
- Preserve Polish-first behavior, English switching, explicit consent gates, and legal/medical-boundary copy when editing the marketing landing pages.
- Client components must not import Supabase service-role helpers, server-only provider clients, audit writers, storage mutation helpers, or external integration clients.
- API routes should validate untrusted input with contracts from `packages/contracts`.
- Feature UI should stay under `features/<feature>/components`; feature server logic should stay under `features/<feature>/server` unless shared-package graduation is justified.
- Authenticated app changes should include at least one focused component, route, or Playwright check when user-visible behavior changes.
