#!/usr/bin/env bash

set -ex

pushd docker
  docker-compose kill || true
  docker-compose down -v --remove-orphans -t 3 || true

  docker-compose pull
  docker-compose build
  docker-compose up

popd
