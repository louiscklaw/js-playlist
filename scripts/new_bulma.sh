#!/usr/bin/env bash

rm -rf *
rm -rf .*

set -ex

cp -R ../scripts/bulma-start-0.0.4/* .

npm install
npm start
