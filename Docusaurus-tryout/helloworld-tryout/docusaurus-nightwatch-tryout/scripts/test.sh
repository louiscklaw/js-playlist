#!/usr/bin/env bash

set -ex

yarn --dev

# yarn test -- --coverage
yarn nightwatch /home/logic/_workspace/js-playlist/Docusaurus-tryout/helloworld-tryout/docusaurus-nightwatch-tryout/tests
