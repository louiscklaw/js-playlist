#!/usr/bin/env bash

set -ex

# yarn --dev
# yarn add lorem-ipsum-japanese samogot-lorem-ipsum-japanese
npm i

# node ./lorem-ipsum-japanese.js
node ./gen.js
