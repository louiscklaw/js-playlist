#!/usr/bin/env bash


set -ex


node ./index_1.js &
node ./index_2.js &
node ./index_3.js &
node ./index_4.js &
node ./index_5.js &


wait

