#!/usr/bin/env node

const fetch = require('node-fetch');

function testFunc(){
  return fetch('http://www.example.com')
    .then(r => r.text())
}

Promise.all([testFunc()])
  .then((values)=>{
    console.log(values)
  })
