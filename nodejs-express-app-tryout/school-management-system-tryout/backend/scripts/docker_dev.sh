#!/usr/bin/env bash

set -ex

# run docker container in development mode
# docker compose build --no-cache

# update config
docker compose build

yarn docker:dev

# docker compose exec -it node-app sh

# # run docker container in production mode
# yarn docker:prod

# # run all tests in a docker container
# yarn docker:test
