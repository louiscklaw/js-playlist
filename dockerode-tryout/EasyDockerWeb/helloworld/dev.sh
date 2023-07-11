#!/usr/bin/env bash

set -ex

cd src
  docker run -it --env-file .env.docker \
    --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $PWD:/app \
    -w /app \
    -u 1000:1000 \
    -p 3000:3000 \
    node:lts bash

cd -
