var express = require('express')
var socket = require('socket.io')

// App setup
var app = express()
var server = app.listen(4001, function () {
  console.log('listen to requests on port 4001')
})

app.use(express.static('public'))

var io = socket(server)

io.on('connection', socket => {
  console.log('made socket connection')
})
