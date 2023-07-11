#!/usr/bin/env bash

set -x

node ./kill_container.js

node ./create_container.js
