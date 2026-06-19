#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/local-dev.sh"

main() {
  cd "$PROJECT_ROOT"

  log "Checking Homebrew"
  ensure_brew

  log "Checking host dependencies"
  brew_install_cask_if_missing docker docker
  brew_install_formula node@24 node
  brew_install_formula supabase/tap/supabase supabase

  ensure_host_runtime
  ensure_vercel_cli
  ensure_env_file

  log "Installing project dependencies"
  pnpm install

  log "Installing Playwright Chromium"
  pnpm exec playwright install chromium

  start_supabase
  sync_local_supabase_env

  cat <<'MSG'

Setup complete.

Next commands:
  pnpm dev

Daily local lifecycle:
  ./scripts/start.sh
  ./scripts/stop.sh
  ./scripts/cleanup.sh --yes

Local URLs:
  Web app:          http://localhost:3000
  Supabase API:     http://127.0.0.1:55321
  Supabase Studio:  http://localhost:55323

Vercel:
  Run "vercel login" once before deploying.
  Run "vercel" for a preview deployment.
  Run "vercel --prod" for production.

If Supabase printed fresh anon/service-role keys, copy them into .env.local.
MSG
}

main "$@"
