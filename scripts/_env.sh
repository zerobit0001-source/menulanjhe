# shellcheck shell=bash
# Helpers shared by the scripts. Reads values from ../.env without executing it.
cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1

if [ ! -f .env ]; then
  echo "❌ .env not found. Run: cp .env.example .env  (then edit it)" >&2
  exit 1
fi

env_get() {
  grep -E "^$1=" .env | tail -n 1 | cut -d= -f2- | tr -d '\r' | sed -e 's/^"//' -e 's/"$//'
}

env_set() {
  if grep -qE "^$1=" .env; then
    sed -i "s|^$1=.*|$1=$2|" .env
  else
    echo "$1=$2" >> .env
  fi
}
