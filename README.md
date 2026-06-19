# Caniello

Caniello is an owner-controlled pet health and care organization utility for profiles, reminders, documents, and trusted sharing.

## Project Guides

- [SPEC.md](SPEC.md): product scope, privacy, and medical boundaries
- [ROADMAP.md](ROADMAP.md): Now/Next/Later/Not Now priorities
- [BACKLOG.md](BACKLOG.md): ordered planned and active tasks
- [DESIGN.md](DESIGN.md): visual and interaction guidance
- [ARCHITECTURE.md](ARCHITECTURE.md): system flow, code map, and invariants
- [AGENTS.md](AGENTS.md): coding-agent workflow and repository rules

## Structure

```text
apps/web/          Next.js App Router web app
apps/mobile/       Future Expo scaffold
packages/          Shared contracts, domain, database, UI, and config
infra/supabase/    Supabase configuration, migrations, and seed data
spec/adrs/         Durable architecture decisions
spec/tasks/        Planned, active, and review-ready task contracts
tests/             Cross-app and Playwright tests
```

## Development

Requirements: Node.js, pnpm, Docker Desktop, Supabase CLI, and Vercel CLI.

```bash
./scripts/setup.sh
pnpm dev
```

Useful commands:

```bash
pnpm build
pnpm test
pnpm test:e2e
pnpm lint
pnpm validation:task-contract
pnpm validation:repo-hygiene
pnpm run doctor
pnpm verify:fast
pnpm verify
pnpm smoke
./scripts/start.sh
./scripts/stop.sh
```

## Pull Requests

All pull requests use the [PR template](.github/pull_request_template.md) with lightweight agent work review. The harness validates; humans verify.

The web app runs at `http://localhost:3000`. Supabase local services are started through the repository scripts.

Vercel uses `apps/web` as the project root. Production deployment and public health-record upload require explicit human approval.
