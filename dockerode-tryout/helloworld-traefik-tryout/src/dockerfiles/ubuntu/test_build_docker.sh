#!/usr/bin/env bash

set -ex


docker build . -t test-linux-ubuntu

# docker run --rm -it \
#   -p 8082:80 \
#   test-linux-ubuntu
