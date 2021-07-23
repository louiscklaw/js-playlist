#!/usr/bin/env bash

set -ex

npm init -y
yarn add @wdio/cli

npx wdio config
npx wdio run ./wdio.conf.js
