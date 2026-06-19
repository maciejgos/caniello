# 0022 - Use host-first local development setup

## Status

Draft

## Date

2026-05-21

## Context

Caniello MVP uses a TypeScript-first pnpm/Turborepo monorepo, Next.js in `apps/web`, Supabase local services for database/auth/storage, and Vercel as the web deployment target.

The previous local-development direction selected a project-owned containerized workspace as the repeatable local development environment. During setup validation, that path proved more complex than the current MVP needs:

- Supabase local development still requires Docker Desktop because the Supabase CLI starts its own Docker-managed services.
- Running `supabase start` from inside a workspace container on Docker Desktop fails because Supabase CLI validates local Postgres through `127.0.0.1`, while the Postgres container is exposed on the host rather than on the workspace container loopback interface.
- Maintaining a full hand-written local container stack for Supabase would duplicate Supabase CLI behavior and require the project to own Kong, Auth, REST, Realtime, Storage, Studio, JWT, and service configuration details.
- The web app itself does not require Docker for local development; it can run directly on the host with Node.js and pnpm.
- Vercel CLI workflows require Node.js 18+ and a globally available Vercel CLI, with login/deploy handled from the developer workstation.

The repository now needs a simpler onboarding path that keeps Docker where it is truly needed, avoids unnecessary container networking confusion, and remains reproducible from committed files.

## Decision

The default local development setup should be host-first:

1. Developers run Node.js, pnpm, Turborepo, Vercel CLI, and project scripts on the host machine.
2. Docker Desktop remains required for local Supabase services only.
3. Supabase CLI is installed on the host and owns the local Supabase stack through `supabase start --workdir infra`.
4. The project provides `scripts/setup.sh` as the first-time macOS setup entry point.
5. The setup script uses Homebrew where possible to install or verify host dependencies:
   - Docker Desktop
   - Node.js
   - pnpm
   - Supabase CLI
6. The setup script installs Vercel CLI globally, preferring `pnpm i -g vercel` and falling back to `npm install -g vercel` if pnpm global installation is not configured.
7. The setup script creates `.env.local` from `.env.example` if missing, runs `pnpm install`, and starts local Supabase.
8. The project provides small lifecycle scripts:
   - `scripts/start.sh` starts local Supabase from the host.
   - `scripts/stop.sh` stops local Supabase without taking a backup.
   - `scripts/cleanup.sh --yes` stops local Supabase and removes generated project-local files and caches without uninstalling shared host tools.
9. The cleanup script requires `--yes` so accidental local data loss is less likely.
10. Project-owned containerized workspace support should be removed from the repository unless a future human-approved ADR reintroduces that path.

The standard local commands become:

```text
./scripts/setup.sh
pnpm dev
```

and:

```text
./scripts/start.sh
./scripts/stop.sh
./scripts/cleanup.sh --yes
```

Vercel workflows remain host CLI workflows:

```text
vercel login
vercel
vercel --prod
```

Production deployment is unchanged: Vercel remains responsible for deploying `apps/web`.

## Consequences

### Positive

- New developers have one project-owned setup entry point.
- Local development avoids containerized workspace and Docker socket setup as a default requirement.
- Supabase local services stay under Supabase CLI ownership instead of duplicating the full stack in project-maintained Compose files.
- The local web runtime is closer to the Vercel build/runtime toolchain because Node.js, pnpm, and Vercel CLI run directly on the host.
- Docker remains limited to the dependency that actually needs it: local Supabase.
- Troubleshooting becomes simpler: app issues are host Node/pnpm issues; Supabase issues are Supabase CLI/Docker Desktop issues.

### Tradeoffs / Risks

- Host machines can drift in Node.js, pnpm, Supabase CLI, and Vercel CLI versions unless the setup script and `packageManager` field are kept current.
- Developers without macOS/Homebrew need a parallel manual setup path.
- Developers who prefer containerized toolchains must use their own local setup until a future ADR reintroduces project-owned containerized development.
- Global Vercel CLI installation depends on each developer's npm/pnpm global configuration.
- Docker Desktop is still required for local Supabase; this decision does not remove Docker entirely.

### Mitigations

- Keep `packageManager` pinned in `package.json`.
- Keep local lifecycle scripts, README, and AGENTS.md aligned whenever tooling changes.
- Prefer Supabase CLI project config under `infra/supabase/config.toml` as the source of local Supabase ports and behavior.
- Do not reintroduce project-owned containerized workspace files without a new human-approved architecture decision.
- Revisit this decision if non-macOS onboarding becomes a near-term need.

## Related Artifacts

- [0005 - Deploy web on Vercel](./0005-deploy-web-on-vercel.md)
- [0006 - Use pnpm workspaces and Turborepo](./0006-use-pnpm-workspaces-and-turborepo.md)
- [0009 - Use one Vercel project for MVP](./0009-use-one-vercel-project-for-mvp.md)
- [README](../../README.md)
- [AGENTS](../../AGENTS.md)
- [setup.sh](../../scripts/setup.sh)
- [start.sh](../../scripts/start.sh)
- [stop.sh](../../scripts/stop.sh)
- [cleanup.sh](../../scripts/cleanup.sh)
