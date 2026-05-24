#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/local-dev.sh"

cd "$PROJECT_ROOT"

stop_supabase
