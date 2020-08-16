#!/usr/bin/env node

const fs = require('fs')
var tidy = require('htmltidy').tidy;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// console.log(dom.window.document.querySelectorAll("body section").length);
// console.log(dom.window.document.querySelectorAll("body section")[2].innerHTML)


var file_content = fs.readFileSync('./hello.html',{encoding: 'utf-8'})
var dom = new JSDOM(file_content);

const ele_body = dom.window.document.querySelector('body')
const sections = ele_body.querySelectorAll(':scope>section')

sections.forEach( list_section => {
  console.log(list_section.outerHTML)
})
