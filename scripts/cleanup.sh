#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/local-dev.sh"

cd "$PROJECT_ROOT"

confirm_destructive "${1:-}" "This will stop local Supabase and remove generated project files such as node_modules, build output, test output, local env files, and local caches. It will not uninstall shared host tools."

stop_supabase || true

log "Removing project-local generated files"
rm -rf \
  node_modules \
  apps/web/.next \
  .next \
  dist \
  coverage \
  playwright-report \
  test-results \
  .turbo \
  .vercel \
  pnpm-store \
  .pnpm-store \
  infra/supabase/.branches \
  infra/supabase/.temp

rm -f .env.local apps/web/.env.local

cat <<'MSG'

Project-local generated files were removed.
Run ./scripts/setup.sh to recreate the local environment.
MSG
