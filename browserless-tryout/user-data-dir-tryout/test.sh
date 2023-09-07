#!/usr/bin/env bash

set -x

docker kill $(docker ps -qa)
docker rm $(docker ps -qa)

sudo chown 999:999 -R ./volumes/my-profile/user5
sudo rm -rf ./volumes/my-profile/user5/*

# ls -l ./volumes/my-profile/user5/SingletonLock
# ls -l ./volumes/my-profile/user5/SingletonLock

sleep 1

docker compose up -d --build
