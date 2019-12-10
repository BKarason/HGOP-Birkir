#!/bin/bash

# exit when any command fails
set -e

# Fetching terraform url so tests can be run
API_IP=$(cd /var/lib/jenkins/terraform/hgop/apitest && terraform output public_ip)

API_URL=http://${API_IP}:3000 npm run test:api

# Tear down the apitest instance
cd /var/lib/jenkins/terraform/hgop/apitest && terraform destroy -auto-approve -var environment=apitest || exit 1

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

exit 0