#!/usr/bin/env bash

set -ex

cd src
  docker build -t easy-docker-web .
  docker run \
    -p 3000:3000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    easy-docker-web
cd -
