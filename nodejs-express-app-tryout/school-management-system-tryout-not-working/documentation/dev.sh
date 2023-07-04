#!/usr/bin/env sh

set -x

rm -rf _site/docs
rm -rf _site/draft
rm -rf _site/parking

set -ex

# development
npm i -D

npm run dev
