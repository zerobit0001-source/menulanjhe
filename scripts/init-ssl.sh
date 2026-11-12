#!/usr/bin/env bash
# Issues a Let's Encrypt certificate for $DOMAIN and switches nginx to HTTPS.
# Requirements: DNS A record of DOMAIN points to this server, port 80 is open,
# and the stack is already running in NGINX_MODE=http.
set -euo pipefail
source "$(dirname "$0")/_env.sh"

DOMAIN="$(env_get DOMAIN)"
EMAIL="$(env_get LETSENCRYPT_EMAIL)"

if [ -z "$DOMAIN" ] || [ "$DOMAIN" = "menu.example.com" ]; then
  echo "❌ Set DOMAIN in .env first." >&2; exit 1
fi
if [ -z "$EMAIL" ] || [ "$EMAIL" = "you@example.com" ]; then
  echo "❌ Set LETSENCRYPT_EMAIL in .env first." >&2; exit 1
fi

echo "▶ Making sure nginx is running in HTTP mode..."
env_set NGINX_MODE http
docker compose up -d nginx

echo "▶ Requesting certificate for $DOMAIN ..."
docker compose --profile certbot run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d "$DOMAIN" \
  --email "$EMAIL" --agree-tos --no-eff-email --non-interactive

echo "▶ Switching to HTTPS..."
env_set NGINX_MODE https
env_set USE_HTTPS true
env_set PUBLIC_URL "https://$DOMAIN"

# Recreates the containers whose settings changed (web, ws, frontend, nginx).
docker compose up -d

echo "✅ Done: https://$DOMAIN"
