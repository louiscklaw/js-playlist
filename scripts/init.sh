#!/usr/bin/env bash

set -ex

TEST=`echo $PWD|rev |cut -d'/' -f1 |rev`

# git checkout -b test/$TEST

mkdir -p css js

cp ../scripts/template.html index.html
cp ../scripts/template.style.css css/style.css
cp ../scripts/template.app.js js/app.js

git add .
git commit -m"init commit $TEST"