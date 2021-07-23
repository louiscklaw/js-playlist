#!/usr/bin/env bash

set -ex

touch helloworld
DELETE_FILE_LIST=`find . |grep -v scripts |grep -E -i -v '\.$'`
rm -rf $DELETE_FILE_LIST


npm init -y
yarn add @wdio/cli

npx wdio config
npx wdio run ./wdio.conf.js
