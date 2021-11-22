#!/usr/bin/env bash

set -ex

# rm -rf supabase
# git clone --depth 1 https://github.com/supabase/supabase

# curl -sLO https://github.com/supabase/cli/releases/download/v0.12.2/supabase_0.12.2_linux_amd64.deb && sudo dpkg -i supabase_0.12.2_linux_amd64.deb

# pushd supabase-helloworld
#   # cp .env.example .env
#   docker-compose kill
#   docker-compose down -v --remove-orphans

#   docker-compose build
#   docker-compose up

# supabase init

rm -rf supabase-react

npx create-react-app supabase-react

pushd supabase-react
  yarn add @supabase/supabase-js
