var connect = require('connect')
var vhost = require('vhost')
var app = connect()

app.use(
  vhost('*.*.localhost', function handle(req, res, next) {
    // for match of "foo.bar.example.com:8080" against "*.*.example.com":
    console.dir({ '.host': req.vhost.host }) // => 'foo.bar.example.com:8080'
    console.dir({ '.hostname': req.vhost.hostname }) // => 'foo.bar.example.com'
    console.dir({ '.length': req.vhost.length }) // => 2
    console.dir({ 'vhost[0]': req.vhost[0] }) // => 'foo'
    console.dir({ 'vhost[1]': req.vhost[1] }) // => 'bar'

    res.end('hello from mail!')
  }),
)

console.log('Server running at http://foo.bar.localhost:3001/')
app.listen(3001)
