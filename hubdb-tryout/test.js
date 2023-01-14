const fs = require('fs')
const process = require('process')
const Hubdb = require('hubdb')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'hubdb-tryout',
  branch: 'db',
})

db.add({ grass: 'red' }, function () {
  db.list(function (err, res) {
    console.log(res)
  })
})

db.list((err, a) => {
  console.log('listing,', a)
})

db.get('4c30d8a1b5dcde897cc51aca2a8abfab.json', (err, contents) => {
  console.log('get,', contents)
})

db.update('4c30d8a1b5dcde897cc51aca2a8abfab.json', { hello: 'world' }, (err, result, id) => {
  console.log('result,', result)
  console.log('id,', id)
})
