#!/usr/bin/env bash

set -ex

# rm -rf node_modules/*
npm install

npm run build
npm run start
