#!/usr/bin/env node

const fetch = require('node-fetch')
const ProxyAgent = require('simple-proxy-agent')

fetch('http://www.example.com', {
  agent: new ProxyAgent('http://0.0.0.0:8080', {
    // Options, with all defaults
    tunnel: true, // If true, will tunnel all HTTPS using CONNECT method
    timeout: 5000, // Time in milli-seconds, to maximum wait for proxy connection to establish
  }),
})
  .then(r => r.text())
  .then(r_text => console.log(r_text))
