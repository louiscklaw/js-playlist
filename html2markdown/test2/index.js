// import { html2Markdown } from '@inkdropapp/html2markdown'
// import fs from 'fs'

const {parse} = require('node-html-parser')
const fs = require('fs');
const { htmlToMarkdown } = require('./htmlToMarkdown');


const doc = fs.readFileSync('example.html', {encoding: 'utf8'})
const parsed_doc = parse(doc).querySelector('div').innerHTML


const md = htmlToMarkdown(parsed_doc)

fs.writeFileSync('example.md', md, {encoding:'utf8'})
