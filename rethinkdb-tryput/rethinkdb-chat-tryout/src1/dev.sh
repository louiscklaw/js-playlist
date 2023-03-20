#!/usr/bin/env bash

set -ex

npm install -g gulp
# npm install phantomjs@2.1.1 --ignore-scripts
npm install phantomjs --ignore-scripts

npm install

gulp

npm run dev
