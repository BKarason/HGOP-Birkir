#!/bin/bash

set -euxo pipefail

docker build game_api -t bkarason/game_api:dev
(cd game_client && npm run build)
docker build game_client -t bkarason/game_client:dev

API_URL=localhost GIT_COMMIT=dev docker-compose up