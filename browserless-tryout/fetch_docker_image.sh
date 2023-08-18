#!/usr/bin/env bash

set -ex

# docker pull browserless/chrome:1-chrome-stable
docker image tag browserless/chrome:1-chrome-stable 192.168.10.61:5000/browserless/chrome:1-chrome-stable
docker push 192.168.10.61:5000/browserless/chrome:1-chrome-stable

docker pull node:16-buster-slim
docker image tag node:16-buster-slim 192.168.10.61:5000/node:16-buster-slim
docker push 192.168.10.61:5000/node:16-buster-slim
