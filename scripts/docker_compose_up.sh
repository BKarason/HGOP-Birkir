#!/bin/bash

#random change to trigger build
export GIT_COMMIT=$1
docker-compose down
docker-compose up -d
