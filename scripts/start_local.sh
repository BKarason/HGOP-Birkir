#!/bin/bash

set -euxo pipefail

docker build game_api -t bkarason/hgop:dev
(cd game_client && npm run build)
docker build game_client -t bkarason/hgopcli:dev

API_URL=http://localhost:3000 GIT_COMMIT=dev docker-compose up