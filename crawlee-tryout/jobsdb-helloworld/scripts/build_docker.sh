#!/usr/bin/env bash

set -ex

docker kill `docker ps -qa` || true

docker container prune -f
docker system prune -f
docker image prune -f
docker volume prune -f
docker network prune -f

docker compose build --no-cache

yarn docker_rebuild
yarn into_docker
