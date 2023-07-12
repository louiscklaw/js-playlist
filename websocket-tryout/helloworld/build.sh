#!/usr/bin/env bash

set -ex

docker build . -t custom_image

docker run -it --rm \
  -p 3000:3000 \
  custom_image bash