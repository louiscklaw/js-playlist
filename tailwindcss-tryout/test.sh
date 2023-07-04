#!/usr/bin/env bash

set -ex

# # npm create vite@latest my-project -- --template react
# npx create-react-app my-project

# pushd my-project
#   npm install -D tailwindcss postcss autoprefixer
#   npx tailwindcss init -p
#   # npm install flowbite flowbite-react
# popd


npx create-next-app@latest --typescript
pushd my-app
  npm run build
  # npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p


popd
