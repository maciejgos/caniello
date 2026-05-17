# Validation: Dev Container Local Development Support

## Status

Accepted

## Scope

This validation reviews the local development support for ADR 0010 after correcting the Dev Container and Docker Compose implementation. The validated outcome is that Docker Compose builds the workspace from `.devcontainer/Dockerfile`, the repository no longer has a root MVP production-style Dockerfile, the Dev Container has pnpm and Docker CLI access, and local development documentation points to the implemented setup.

## Source Artifacts

- `spec/architecture-records/0010-use-dev-containers-for-local-development.md`
- `spec/architecture/local-development.md`
- `spec/plans/caniello-mvp-nextjs-monorepo-migration.md`
- `.devcontainer/devcontainer.json`
- `.devcontainer/Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `.env.example`
- `README.md`

## Preconditions

The implementation branch is `codex/nextjs-monorepo-migration`. Docker Desktop is available on the host. The repository has a pnpm/Turborepo monorepo and the workspace service is the local development container entrypoint.

## Acceptance Criteria Mapping

- Criterion: ADR 0010 requires `.devcontainer/devcontainer.json` and `.devcontainer/Dockerfile` for the local developer environment.
  Evidence status: Supported
  Evidence: `.devcontainer/devcontainer.json` points at the Compose `workspace` service, and `docker-compose.yml` now builds that service from `.devcontainer/Dockerfile`.

- Criterion: ADR 0010 says Docker Compose should support local development without becoming a production Next.js deployment path.
  Evidence status: Supported
  Evidence: the root `Dockerfile` was removed; `docker-compose.yml` uses `.devcontainer/Dockerfile` only for the local `workspace` service.

- Criterion: Supabase CLI should be usable as the preferred local backend stack when schema/RLS work begins.
  Evidence status: Supported
  Evidence: the workspace image includes Docker CLI, mounts `/var/run/docker.sock`, and `docker compose run --rm workspace docker version` showed the container can reach the host Docker engine. After `pnpm install`, `docker compose run --rm workspace pnpm exec supabase --version` returned `2.98.2`. A full `pnpm exec supabase start --workdir infra/supabase` service start remains deferred until the first Supabase schema/RLS implementation.

- Criterion: Local setup should be documented in architecture docs and README.
  Evidence status: Supported
  Evidence: `README.md` identifies `.devcontainer/` in the repository structure and says `docker compose build` builds from `.devcontainer/Dockerfile`; `spec/architecture/local-development.md` documents the `workspace` service, host Docker socket access, and the no-production-Dockerfile boundary.

- Criterion: The Dev Container should give contributors a ready-to-use editor environment.
  Evidence status: Supported
  Evidence: `.devcontainer/devcontainer.json` recommends editor extensions for Codex, Tailwind, Markdown linting, ESLint, Prettier, dotenv files, Docker, Playwright, and YAML.

## Checks

- Check: `docker compose config`
  Type: Automated
  Status: Passed
  Expected result: Compose configuration parses and resolves the `workspace` service.
  Actual result: Passed. The resolved build target uses `.devcontainer/Dockerfile`.

- Check: `docker compose run --rm workspace node -e "JSON.parse(require('fs').readFileSync('.devcontainer/devcontainer.json','utf8'))"`
  Type: Automated
  Status: Passed
  Expected result: Dev Container configuration is valid JSON.
  Actual result: Passed.

- Check: `docker compose build workspace`
  Type: Automated
  Status: Passed
  Expected result: The Dev Container workspace image builds reproducibly.
  Actual result: Passed. The image builds from the standard `node:24-bookworm` base with Docker CLI, pnpm `9.15.4`, Turborepo, Vercel CLI, and Playwright Chromium installed.

- Check: `docker compose run --rm workspace pnpm --version`
  Type: Automated
  Status: Passed
  Expected result: pnpm is available in the workspace container.
  Actual result: Passed with pnpm `9.15.4`.

- Check: `docker compose run --rm workspace pnpm install`
  Type: Automated
  Status: Passed
  Expected result: Workspace dependencies install from the committed lockfile after the container is created.
  Actual result: Passed. The lockfile was up to date and Supabase CLI completed its postinstall download.

- Check: `docker compose run --rm workspace pnpm exec supabase --version`
  Type: Automated
  Status: Passed
  Expected result: Supabase CLI is available through the workspace dependency graph after `pnpm install`.
  Actual result: Passed with Supabase CLI `2.98.2`.

- Check: `docker compose run --rm workspace pnpm exec playwright --version`
  Type: Automated
  Status: Passed
  Expected result: Playwright CLI is available through the workspace dependency graph after `pnpm install`.
  Actual result: Passed with Playwright `1.60.0`.

- Check: `docker compose run --rm workspace docker version`
  Type: Operational
  Status: Passed
  Expected result: Docker CLI is available in the workspace container and can reach the host Docker engine through the mounted socket.
  Actual result: Passed. The container reported a Docker client and the Docker Desktop server.

- Check: `docker compose run --rm workspace pnpm test:e2e`
  Type: UI
  Status: Passed
  Expected result: Browser E2E tests run successfully using the Playwright installation baked into the standard Node-based Dev Container.
  Actual result: Passed. The web build completed and 12 Playwright Chromium tests passed.

## Evidence

- `docker-compose.yml` builds the `workspace` service with `dockerfile: .devcontainer/Dockerfile`.
- `.devcontainer/Dockerfile` starts from `node:24-bookworm`, installs Docker CLI, installs Playwright Chromium with system dependencies, and configures pnpm store caching at `/pnpm/store`.
- `.devcontainer/devcontainer.json` uses the Compose `workspace` service for editor-managed Dev Container sessions.
- `.devcontainer/devcontainer.json` recommends `OpenAI.chatgpt`, `bradlc.vscode-tailwindcss`, `DavidAnson.vscode-markdownlint`, `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode`, `mikestead.dotenv`, `ms-azuretools.vscode-docker`, `ms-playwright.playwright`, and `redhat.vscode-yaml`.
- The root `Dockerfile` was removed to keep Docker scoped to local development rather than MVP production deployment.
- `pnpm exec supabase --version` works inside the workspace container after `pnpm install`.
- `pnpm test:e2e` works inside the workspace container with the baked-in Playwright browser installation.

## Missing, Skipped, or Unavailable Checks

- Check: `pnpm exec supabase start --workdir infra/supabase`
  Reason: Starting the full Supabase stack is deferred until the first schema, Auth, Storage, or RLS implementation needs it.
  Risk: Supabase service behavior remains unvalidated beyond Docker CLI/socket readiness.

- Check: Full `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e`
  Reason: This patch changes local container wiring and documentation only; no product runtime code changed.
  Risk: Low. Existing monorepo migration validation already covers these commands for the migrated app.

## Future CI/CD or Lifecycle Gates

- Gate: Dev Container image build
  Trigger: Pull requests that change `.devcontainer/Dockerfile`, `.devcontainer/devcontainer.json`, `docker-compose.yml`, or `.dockerignore`.
  Blocks: Merge or release readiness when the workspace image cannot build.

- Gate: Docker socket readiness for Supabase local development
  Trigger: First Supabase schema/RLS/data implementation and any later local development environment changes.
  Blocks: Supabase-dependent implementation validation when the workspace container cannot run Supabase-managed local services.

## Result

Ready for human review

This validation is ready for human review, but it is not accepted or complete until a human explicitly approves it.

## Follow-Up

- Run `pnpm exec supabase start --workdir infra/supabase` during the first Supabase schema/RLS implementation.
- Consider cleaning up the existing orphan Compose container from the older `web` service when it is no longer needed.

## Human Decision

Accepted
