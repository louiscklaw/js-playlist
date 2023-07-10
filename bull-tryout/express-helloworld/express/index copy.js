const bull = require("bull");
const express = require('express');
const app = express();
const debugActive = require("debug")("active");

debugActive('start');

const redisConfig = {
  redis: {
    port: 6379,
    host: "redis",
    // password: "", if you are using production redis store the password with .env
  },
};


const init = () => {
  const queue = new bull("simple-queue", redisConfig); // creating the queue
  queue.process(async (job, done) => {
    debugActive(`Starting Job ${job.id}`);
    await count(job.data.xNumbers, job.data.ySeconds);
    debugActive(`Job ${job.id} completed`);
    done(null, "Job done ");
  });

  queue.add({ xNumbers: 10, ySeconds: 10 }, { retry: 10, delay: 5000 }); // Here you add the job
  queue.add({ xNumbers: 20, ySeconds: 5 }, { retry: 2, delay: 1000 }); // And other

  /* Compare the approach
  count(10, 10);
  count(20, 5);
  */
};



const count = (xNumbers, ySeconds) => {
  return new Promise((accept) => {
    let x = 0;
    const intervalID = setInterval(() => {
      if (++x === xNumbers) {
        clearInterval(intervalID);
        accept("Count finished");
      }
      console.log(x);
    }, (ySeconds * 1000) / xNumbers);
  });
};

var cb_done = function (req, res, next) {
  console.log('LOGGED')
  res.send('done')
}

app.get('/test-get', function (req, res) {
  console.log('get called')
  console.log('para:' + JSON.stringify(req.query, null, 2))

  init();

  res.status(200).send('hello test-get')
})

app.get('/test-get-json', function (req, res) {
  console.log('get called')
  console.log('para:' + JSON.stringify(req.query, null, 2))

  res.status(200).send({ hello: 'world' })
})

app.post('/test-post', function (req, res) {
  console.log('post called')
  console.log('para:' + JSON.stringify(req.query, null, 2))
  res.status(200).send('hello test-get')
})

app.get('/redirect', (req, res) => {
  res.redirect('/call-done')
})

app.get('/call-done', function (req, res) {
  console.log('call-done')
  res.send('call done')
})

console.log('Server running at http://127.0.0.1:3001/')
console.log('endpoint running at http://127.0.0.1:3001/test-get')
console.log('endpoint running at http://127.0.0.1:3001/test-get-json')
console.log('endpoint running at http://127.0.0.1:3001/test-post')
console.log('endpoint running at http://127.0.0.1:3001/redirect')
app.listen(3001)

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
  .listen(4002)

// Console will print the message
console.log('Server running at http://127.0.0.1:4002/')

debugActive('end');
