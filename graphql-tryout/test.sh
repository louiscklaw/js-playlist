#!/usr/bin/env bash

set -ex

curl -X POST \
  -H "Content-Type: application/json" \
  --data-raw '{"query":"{\n  hello\n}","variables":{"country":"hk"}}' \
  http://localhost:4001/graphql
