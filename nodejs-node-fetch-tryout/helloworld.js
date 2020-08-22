#!/usr/bin/env node

const fetch = require('node-fetch');

fetch('http://www.example.com')
  .then(r => r.text())
  .then(r_text => console.log(r_text))
