#!/usr/bin/env bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WEB_APP_DIR="$PROJECT_ROOT/apps/web"
ROOT_ENV_FILE="$PROJECT_ROOT/.env.local"
WEB_ENV_FILE="$WEB_APP_DIR/.env.local"

log() {
  printf '\n==> %s\n' "$1"
}

warn() {
  printf '\nWarning: %s\n' "$1" >&2
}

have() {
  command -v "$1" >/dev/null 2>&1
}

require_command() {
  local command_name="$1"
  local install_hint="$2"

  if have "$command_name"; then
    return
  fi

  cat >&2 <<MSG
Missing required command: ${command_name}
Install hint:
  ${install_hint}

MSG
  exit 1
}

ensure_brew() {
  if have brew; then
    return
  fi

  cat >&2 <<'MSG'
Homebrew is required for this setup script.
Install it from https://brew.sh/, then rerun:

  ./scripts/setup.sh

MSG
  exit 1
}

brew_install_formula() {
  local formula="$1"
  local command_name="${2:-$1}"

  if have "$command_name"; then
    printf '%s already installed: %s\n' "$command_name" "$("$command_name" --version 2>/dev/null | head -n 1 || true)"
    return
  fi

  log "Installing ${formula} with Homebrew"
  brew install "$formula"
}

brew_install_cask_if_missing() {
  local cask="$1"
  local command_name="$2"

  if have "$command_name"; then
    printf '%s already installed.\n' "$command_name"
    return
  fi

  log "Installing ${cask} with Homebrew Cask"
  brew install --cask "$cask"
}

ensure_docker_running() {
  require_command docker "Install Docker Desktop, for example: brew install --cask docker"

  if docker info >/dev/null 2>&1; then
    printf 'Docker is running.\n'
    return
  fi

  cat >&2 <<'MSG'
Docker is installed but not reachable.
Start Docker Desktop, wait until it is running, then rerun the command.

MSG
  exit 1
}

ensure_node_version() {
  require_command node "Install Node.js 18+ with Homebrew: brew install node"

  local major
  major="$(node -p "Number(process.versions.node.split('.')[0])")"
  if [ "$major" -ge 18 ]; then
    printf 'Node.js version is supported: %s\n' "$(node --version)"
    return
  fi

  cat >&2 <<MSG
Node.js 18+ is required. Current version: $(node --version)
Update Node.js, then rerun the command.

MSG
  exit 1
}

ensure_vercel_cli() {
  if have vercel; then
    printf 'vercel already installed: %s\n' "$(vercel --version 2>/dev/null | head -n 1 || true)"
    return
  fi

  require_command pnpm "Install pnpm with Homebrew: brew install pnpm"

  log "Installing Vercel CLI with pnpm"
  if pnpm i -g vercel; then
    return
  fi

  warn "pnpm global install failed; falling back to npm install -g vercel"
  require_command npm "Install Node.js with npm, for example: brew install node"
  npm install -g vercel
}

ensure_host_runtime() {
  ensure_node_version
  require_command pnpm "Install pnpm with Homebrew: brew install pnpm"
  require_command supabase "Install Supabase CLI with Homebrew: brew install supabase/tap/supabase"
  ensure_docker_running
}

ensure_env_file() {
  if [ -f "$ROOT_ENV_FILE" ]; then
    printf '.env.local already exists.\n'
  else
    log "Creating .env.local from .env.example"
    cp "$PROJECT_ROOT/.env.example" "$ROOT_ENV_FILE"
  fi

  if [ -f "$WEB_ENV_FILE" ]; then
    printf 'apps/web/.env.local already exists.\n'
    return
  fi

  log "Creating apps/web/.env.local from .env.local"
  cp "$ROOT_ENV_FILE" "$WEB_ENV_FILE"
}

update_env_value() {
  local file="$1"
  local key="$2"
  local value="$3"
  local temp_file

  temp_file="$(mktemp)"
  awk -v key="$key" -v value="$value" '
    BEGIN { updated = 0 }
    $0 ~ "^" key "=" {
      print key "=" value
      updated = 1
      next
    }
    { print }
    END {
      if (!updated) {
        print key "=" value
      }
    }
  ' "$file" >"$temp_file"
  mv "$temp_file" "$file"
}

sync_local_supabase_env() {
  local status_env
  local supabase_url
  local anon_key
  local service_role_key

  status_env="$(supabase status -o env --override-name api.url=NEXT_PUBLIC_SUPABASE_URL --workdir "$PROJECT_ROOT/infra")"
  supabase_url="$(printf '%s\n' "$status_env" | awk -F= '$1 == "NEXT_PUBLIC_SUPABASE_URL" { print $2; exit }')"
  anon_key="$(printf '%s\n' "$status_env" | awk -F= '$1 == "ANON_KEY" { print $2; exit }')"
  service_role_key="$(printf '%s\n' "$status_env" | awk -F= '$1 == "SERVICE_ROLE_KEY" { print $2; exit }')"

  if [ -z "$supabase_url" ] || [ -z "$anon_key" ]; then
    warn "Could not read local Supabase URL or anon key from supabase status."
    return
  fi

  update_env_value "$ROOT_ENV_FILE" "NEXT_PUBLIC_SUPABASE_URL" "$supabase_url"
  update_env_value "$ROOT_ENV_FILE" "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$anon_key"
  update_env_value "$WEB_ENV_FILE" "NEXT_PUBLIC_SUPABASE_URL" "$supabase_url"
  update_env_value "$WEB_ENV_FILE" "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$anon_key"

  if [ -n "$service_role_key" ]; then
    update_env_value "$ROOT_ENV_FILE" "SUPABASE_SERVICE_ROLE_KEY" "$service_role_key"
    update_env_value "$WEB_ENV_FILE" "SUPABASE_SERVICE_ROLE_KEY" "$service_role_key"
  fi

  printf 'Local Supabase env values are synced for root and apps/web.\n'
}

start_supabase() {
  log "Starting local Supabase"
  supabase start --workdir "$PROJECT_ROOT/infra"
}

ensure_supabase_studio_paths() {
  if ! docker ps --format '{{.Names}}' | grep -qx 'supabase_studio_caniello-local'; then
    return
  fi

  docker exec supabase_studio_caniello-local mkdir -p "$PROJECT_ROOT/infra/supabase/functions" >/dev/null 2>&1 || true
}

stop_supabase() {
  if ! have supabase; then
    echo "Supabase CLI is not installed; nothing to stop."
    return
  fi

  log "Stopping local Supabase"
  supabase stop --workdir "$PROJECT_ROOT/infra" --no-backup
}

confirm_destructive() {
  local flag="${1:-}"
  local message="$2"

  if [ "$flag" = "--yes" ]; then
    return
  fi

  cat >&2 <<MSG
${message}

Rerun with --yes to confirm.

MSG
  exit 1
}
