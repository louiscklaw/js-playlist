#!/usr/bin/env bash

set -ex

npm i

# run docker container in development mode
npm run docker:dev
