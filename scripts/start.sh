#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/local-dev.sh"

cd "$PROJECT_ROOT"

ensure_host_runtime
ensure_env_file
start_supabase
sync_local_supabase_env

cat <<'MSG'

Local services are running.

Next command:
  pnpm dev

Local URLs:
  Web app:          http://localhost:3000
  Supabase API:     http://127.0.0.1:55321
  Supabase Studio:  http://localhost:55323
MSG
