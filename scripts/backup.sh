#!/usr/bin/env bash
# Backs up the PostgreSQL database and uploaded media into ./backups
# Keeps the last 14 backups of each.
set -euo pipefail
source "$(dirname "$0")/_env.sh"

DB="$(env_get POSTGRES_DB)"; DB="${DB:-menu}"
USER_="$(env_get POSTGRES_USER)"; USER_="${USER_:-menu}"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p backups

echo "▶ Database -> backups/db-$STAMP.sql.gz"
docker compose exec -T db pg_dump -U "$USER_" -d "$DB" --no-owner | gzip > "backups/db-$STAMP.sql.gz"

echo "▶ Media -> backups/media-$STAMP.tar.gz"
docker compose exec -T web tar -czf - -C /app media > "backups/media-$STAMP.tar.gz"

ls -1t backups/db-*.sql.gz 2>/dev/null | tail -n +15 | xargs -r rm --
ls -1t backups/media-*.tar.gz 2>/dev/null | tail -n +15 | xargs -r rm --
echo "✅ Backup finished"
