#!/usr/bin/env bash

set -ex

mkdir ghost-helloworld

cd ghost-helloworld
  ghost install local
  ghost doctor
cd ..

# firefox http://localhost:2368/ghost