#!/usr/bin/env bash
# Rebuilds and restarts everything after you upload new code.
# Migrations and collectstatic run automatically when "web" starts.
set -euo pipefail
source "$(dirname "$0")/_env.sh"

docker compose build
docker compose up -d
docker image prune -f >/dev/null
docker compose ps
