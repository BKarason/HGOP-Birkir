#!/bin/bash

# exit on error if any command fails
set -e

GIT_COMMIT=$1

docker build -t bkarason/hgop:$GIT_COMMIT game_api/
(cd game_client && npm run build)
docker build -t bkarason/hgopcli:$GIT_COMMIT game_client/

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

