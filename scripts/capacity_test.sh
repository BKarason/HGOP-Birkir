#!/bin/bash

# exit when any command fails
set -e

GIT_COMMIT=$1

#MODIFIED JENKINS_DEPLOY SCRIPT

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/capacitytest
mkdir -p /var/lib/jenkins/terraform/hgop/capacitytest/scripts
rm -f /var/lib/jenkins/terraform/hgop/capacitytest/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/capacitytest/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/capacitytest/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/capacitytest/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/capacitytest/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/capacitytest/docker-compose.yml

rm -f /var/lib/jenkins/terraform/hgop/capacitytest/*.tf
cp *.tf /var/lib/jenkins/terraform/hgop/capacitytest

cd /var/lib/jenkins/terraform/hgop/capacitytest
terraform init # In case terraform is not initialized.
terraform destroy -auto-approve -var environment=capacitytest || exit 1
terraform apply -auto-approve -var environment=capacitytest || exit 1

echo "Game API running at " + $(terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

# Fetching terraform url so tests can be run
API_IP=$(cd /var/lib/jenkins/terraform/hgop/capacitytest && terraform output public_ip)

API_URL=http://${API_IP}:3000

# Run Capacity tests
cd /var/lib/jenkins/workspace/HGOP-Birkir/game_api/ && npm run test:capacity

# Tear down the capacitytest instance
terraform destroy -auto-approve -var environment=capacitytest || exit 1

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

exit 0