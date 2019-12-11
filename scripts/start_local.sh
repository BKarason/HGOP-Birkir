 #!/bin/bash

set -euxo pipefail

docker build ../game_api -t bkarason/hgop:dev
GIT_COMMIT=dev docker-compose up