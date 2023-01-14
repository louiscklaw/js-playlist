//

var express = require('express')
var app = express()

var cb_done = function (req, res, next) {
  console.log('LOGGED')
  res.send('done')
}

app.get(
  '/test-get',
  function (req, res, next) {
    console.log('get called')
    console.log('para:' + req.query['hello'])
    res.redirect('/call-done')

    // next()
  },
  cb_done,
)

app.post(
  '/test-post',
  function (req, res, next) {
    console.log('post called')
    console.log('parameters:' + req.query['hello'])
    next()
  },
  cb_done,
)

app.get('/call-done', function (req, res) {
  console.log('call-done')
  res.send('call done')
})

app.listen(3001)

//

//

var http = require('http')

http
  .createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' })

    // Send the response body as "Hello World"
    response.end('Hello World\n')
  })
  .listen(8081)

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/')
