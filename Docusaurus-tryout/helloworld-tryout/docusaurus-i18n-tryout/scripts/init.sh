#!/usr/bin/env bash

set -ex


yarn write-translations
yarn run write-translations -- --locale fr

# yarn run start -- --locale fr
# yarn run start -- --locale en



# Translate the docs
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/fr/docusaurus-plugin-content-docs/current

# Translate the blog
mkdir -p i18n/fr/docusaurus-plugin-content-blog
cp -r blog/** i18n/fr/docusaurus-plugin-content-blog

# Translate the pages
mkdir -p i18n/fr/docusaurus-plugin-content-pages
cp -r src/pages/**.md i18n/fr/docusaurus-plugin-content-pages
cp -r src/pages/**.mdx i18n/fr/docusaurus-plugin-content-pages


browser-sync start -s --https
