// import { html2Markdown } from '@inkdropapp/html2markdown'
// import fs from 'fs'

const fs = require('fs');
const {html2Markdown} = require('@inkdropapp/html2markdown')

const doc = fs.readFileSync('example.html')

const md = html2Markdown(doc)

console.log(md)
