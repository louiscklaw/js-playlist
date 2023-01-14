#!/usr/bin/env bash

set -ex

npm i -D

chmod 777 -R /app/node_modules

npm run migrate_dev

npm run db_seed
