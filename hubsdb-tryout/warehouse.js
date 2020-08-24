const fs = require('fs')
const process = require('process')
const Hubdb = require('hubdb')

const {translateToKey, translateToKeys, translateToNames} = require('./db_keys')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const TEST_DB ='helloworld.json'

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'js-playlist',
  branch: 'db'
  });



db.get(TEST_DB,(err, current_contents)=>{
  var obj_test = translateToKey({hello: 'travis3'})
  var updated_content = [...current_contents,obj_test]

  db.update(TEST_DB,updated_content,(err, result, id) => {
    // console.log(err)
    // console.log(result)
  })
})
