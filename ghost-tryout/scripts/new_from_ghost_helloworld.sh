#!/usr/bin/env bash

set -ex

cd gatsby-ghost-helloworld

  rm -rf * &
  rm -rf .* &
  wait

  gatsby new gatsby-starter-ghost https://github.com/TryGhost/gatsby-starter-ghost

  cd gatsby-starter-ghost
    yarn
    yarn build
    yarn clean
    yarn start
  cd ..
cd ..