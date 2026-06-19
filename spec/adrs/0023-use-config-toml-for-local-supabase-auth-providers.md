# 0023 - Use config.toml for local Supabase Auth providers

## Status

Draft

## Date

2026-05-23

## Context

During local Supabase troubleshooting, the Supabase Studio `Sign In / Providers` screen at `http://127.0.0.1:55323/project/default/auth/providers` rendered the page shell but kept the `User Signups` and `Auth Providers` sections in a skeleton loading state.

The local Supabase stack itself was healthy:

- Supabase Auth settings responded at `http://127.0.0.1:55321/auth/v1/settings`.
- Studio, Auth, Kong, Postgres, and related containers were running and healthy.
- A Playwright network capture showed Studio loading profile, project, database, API key, billing, lint, and notification endpoints, but never issuing the expected Auth config request for the Providers data.
- The running Studio image, `public.ecr.aws/supabase/studio:2026.04.28-sha-89d08a2`, did not expose the expected local server route for `/api/platform/auth/[ref]/config`.

This means the local Studio Providers page cannot be relied on as the source of truth for local provider configuration.

## Decision

Local Supabase Auth provider configuration should be managed through `infra/supabase/config.toml`, not through the local Studio `Sign In / Providers` screen.

For local OAuth providers, configure the relevant `[auth.external.<provider>]` block in `infra/supabase/config.toml` and restart the local Supabase stack with:

```text
./scripts/stop.sh
./scripts/start.sh
```

Secrets must not be committed. Provider secrets should be referenced from environment variables, for example:

```toml
[auth.external.google]
enabled = true
client_id = "<google-client-id>"
secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET)"
skip_nonce_check = false
```

The local OAuth callback URL for this project is:

```text
http://127.0.0.1:55321/auth/v1/callback
```

## Consequences

### Positive

- Local Auth provider setup remains reproducible from committed Supabase CLI configuration.
- Developers do not lose time debugging a Studio UI screen that can be broken independently of Auth itself.
- Provider settings can be reviewed in code and aligned with local onboarding scripts.

### Tradeoffs / Risks

- The local Studio Providers page may show stale or permanently loading UI even when Auth is configured correctly.
- Developers must know to edit `infra/supabase/config.toml` and restart Supabase for local provider changes.
- Supabase CLI or Studio image updates may restore the Providers page later, but `config.toml` should remain the local source of truth unless a future ADR changes this.

### Mitigations

- Keep local Supabase Auth provider notes in the README or setup docs when OAuth providers are enabled.
- Verify local Auth configuration through `http://127.0.0.1:55321/auth/v1/settings` or relevant auth flow tests rather than relying only on Studio UI state.
- Avoid committing provider client secrets; use environment references in Supabase config.

## Related Artifacts

- [0004 - Use Supabase for MVP data, auth, storage, and RLS](./0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [0014 - Use Supabase Auth with minimal RBAC and audit controls](./0014-use-supabase-auth-minimal-rbac-and-audit.md)
- [0022 - Use host-first local development setup](./0022-use-host-first-local-development-setup.md)
- [Supabase local config](../../infra/supabase/config.toml)
- [start.sh](../../scripts/start.sh)
- [stop.sh](../../scripts/stop.sh)
