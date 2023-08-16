// import { html2Markdown } from '@inkdropapp/html2markdown'
// import fs from 'fs'

const {parse} = require('node-html-parser')
const fs = require('fs');

const doc = fs.readFileSync('example.html', {encoding: 'utf8'})
const parsed_doc = parse(doc).querySelector('div').innerHTML

const md = parsed_doc
  .replace(/ +\<h1\>(.*?)\<\/h1\>/g,'# $1')
  .replace(/.+\<h2\>(.*?)\<\/h2\>/g,'## $1')
  .replace(/.+\<h3\>(.*?)\<\/h3\>/g,'### $1')
  .replace(/.+\<h4\>(.*?)\<\/h4\>/g,'#### $1')
  .replace(/.+\<h5\>(.*?)\<\/h5\>/g,'##### $1')
  .replace(/.+\<p\>(.*?)\<\/p\>/g,'\n$1\n')
  .trim();

fs.writeFileSync('example.md', md, {encoding:'utf8'})