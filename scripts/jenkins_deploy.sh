#!/bin/bash

# exit when any command fails
set -e

GIT_COMMIT=$1
TERR_ENV=$2

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/${TERR_ENV}
mkdir -p /var/lib/jenkins/terraform/hgop/${TERR_ENV}/scripts
rm -f /var/lib/jenkins/terraform/hgop/${TERR_ENV}/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/${TERR_ENV}/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/${TERR_ENV}/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/${TERR_ENV}/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/${TERR_ENV}/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/${TERR_ENV}/docker-compose.yml

rm -f /var/lib/jenkins/terraform/hgop/${TERR_ENV}/*.tf
cp *.tf /var/lib/jenkins/terraform/hgop/${TERR_ENV}

cd /var/lib/jenkins/terraform/hgop/${TERR_ENV}
terraform init # In case terraform is not initialized.
terraform destroy -auto-approve -var environment=${TERR_ENV} || exit 1
terraform apply -auto-approve -var environment=${TERR_ENV} || exit 1

echo "Game API running at " + $(terraform output public_ip)

API_URL="http://$(terraform output public_ip):3000"

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT $API_URL $TERR_ENV"

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

exit 0