#!/usr/bin/env bash

set -ex

node ./destroy_docker.js

node ./create_docker.js
