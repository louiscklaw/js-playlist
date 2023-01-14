#!/usr/bin/env bash

set -ex

npx prisma migrate dev --name init
