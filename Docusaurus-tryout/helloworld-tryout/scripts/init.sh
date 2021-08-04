#!/usr/bin/env bash

set -ex


npx @docusaurus/init@latest init my-website-classic classic &

npx @docusaurus/init@latest init my-website-facebook facebook &

npx @docusaurus/init@latest init my-website-bootstrap bootstrap &


wait
