#!/usr/bin/env bash
# Renews the certificate when it is close to expiry and reloads nginx.
# Put it in cron (see DEPLOY.md).
set -euo pipefail
source "$(dirname "$0")/_env.sh"

docker compose --profile certbot run --rm certbot renew \
  --webroot -w /var/www/certbot --quiet
docker compose exec -T nginx nginx -s reload
