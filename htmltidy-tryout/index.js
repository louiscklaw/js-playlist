#!/usr/bin/env node

var tidy = require('htmltidy').tidy

var opts = {
  doctype: 'html5',
  hideComments: false, //  multi word options can use a hyphen or "camel case"
  indent: true,
}

tidy('<table><tr><td>badly formatted html</tr>', opts, function (err, html) {
  console.log(html)
})
