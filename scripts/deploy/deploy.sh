#!/usr/bin/env bash
# Build and start the container, then roll back to the previous image if it never becomes healthy.
# Run from the environment folder on the VPS, after the checkout: bash scripts/deploy/deploy.sh
set -euo pipefail

set -a
# shellcheck disable=SC1091
. ./.env
set +a

: "${LAPIKIT_ENV:?LAPIKIT_ENV is missing from .env}"
image="lapikit-${LAPIKIT_ENV}"
container="lapikit_${LAPIKIT_ENV}"
timeout="${HEALTH_TIMEOUT:-120}"

export BUILD_ID="${BUILD_ID:-$(git rev-parse --short HEAD)-$(date +%s)}"

has_previous=false
if docker image inspect "${image}:latest" >/dev/null 2>&1; then
	docker tag "${image}:latest" "${image}:previous"
	has_previous=true
fi

docker compose build --pull
docker compose up -d --remove-orphans

echo "Waiting for ${container} to be healthy (max ${timeout}s)..."
status=starting
for ((elapsed = 0; elapsed < timeout; elapsed += 5)); do
	status=$(docker inspect --format '{{.State.Health.Status}}' "$container" 2>/dev/null || echo missing)
	[[ $status == healthy || $status == unhealthy ]] && break
	sleep 5
done

if [[ $status == healthy ]]; then
	echo "Deployed ${image} (${BUILD_ID})"
	docker image prune -f >/dev/null
	exit 0
fi

echo "::error::${container} is ${status} after deploy"
docker logs --tail 50 "$container" || true

if [[ $has_previous == true ]]; then
	echo "Rolling back to ${image}:previous"
	docker tag "${image}:previous" "${image}:latest"
	docker compose up -d --no-build --remove-orphans
fi
exit 1
