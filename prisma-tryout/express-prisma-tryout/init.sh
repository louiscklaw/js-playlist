#!/usr/bin/env bash

set -ex

npm i -D typescript @types/express @types/node
npx tsc --init

npm install -D concurrently nodemon

