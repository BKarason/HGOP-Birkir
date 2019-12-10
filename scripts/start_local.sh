 #!/bin/bash

set -euxo pipefail

docker build ../game_api -t bkarason/hgop:dev
GIT_COMMIT=dev docker-compose up

API_URL=http://localhost:3000

cd ../game_api && npm run test:api