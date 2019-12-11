#!/bin/bash

# exit when any command fails
set -e

# Fetching terraform url so tests can be run
API_IP=$(cd /var/lib/jenkins/terraform/hgop/capacitytest && terraform output public_ip)

sleep 15

API_URL=http://${API_IP}:3000 npm run test:capacity

# Tear down the capacitytest instance
cd /var/lib/jenkins/terraform/hgop/capacitytest && terraform destroy -auto-approve -var environment=capacitytest || exit 1

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

exit 0