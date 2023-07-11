const bull = require("bull");
const Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const express = require('express');
const app = require('express')();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());

const debugActive = require("debug")("active");

const PROJECT_ROOT = __dirname;
const DOCKER_VOLUME = `${PROJECT_ROOT}/volumes`;

const redisConfig = {
  redis: { port: 6379, host: "redis", },
};

io.on('connection', (socket) => {
  socket.on('create_new_docker', msg => {
    console.log('create_new_docker received: ' + msg);
    io.emit('create_new_docker', msg);
  });
});

const init = (sub_domain_name) => {
  const queue = new bull("simple-queue", redisConfig); // creating the queue
  queue.process(async (job, done) => {

    console.log(`${job.data.sub_domain_name}`);

    io.emit('create_new_docker', `job ${job.data.sub_domain_name} done`);

    var container_number = job.data.sub_domain_name;
    var CONTAINER_NAME = `test-container-${container_number}`;
    var VOLUME_NAME = `${DOCKER_VOLUME}/${CONTAINER_NAME}`;

    await docker.buildImage(
      { context: './test_docker_config', src: ['dockerfile'], },
      { t: 'test-container' },
      (err, stream) => {
        if (err) throw err
        stream.pipe(process.stdout)
      },
    );

    // await docker
    //   .createContainer({
    //     Image: "test-container",
    //     name: CONTAINER_NAME,

    //     WorkingDir: "/app",
    //     Labels: {
    //       "com.example.vendor": "Acme",
    //       "com.example.license": "GPL",
    //       "com.example.version": "1.0"
    //     },
    //     Cmd: [
    //       "sleep", "infinity"
    //     ],
    //     StopSignal: "SIGTERM",
    //     StopTimeout: 10,
    //     HostConfig: {
    //       Binds: [
    //         `${VOLUME_NAME}:/app`
    //       ],
    //       PortBindings: {
    //         '80/tcp': [{ HostPort: `80${host_port}` }],
    //       },
    //     },
    //   })
    //   .then(container => {
    //     return container.start()
    //   })




    done(null, "Job done ");
  });

  // Here you add the job
  queue.add({ sub_domain_name }, { retry: 10, delay: 1000 });
  // And other
  // queue.add({ xNumbers: 3, ySeconds: 4 }, { retry: 2, delay: 10 });
};

// NOTE: backup
const init_old = (sub_domain_name) => {
  const queue = new bull("simple-queue", redisConfig); // creating the queue
  queue.process(async (job, done) => {
    console.log(`Starting Job ${job.id}`);
    await count(job.data.xNumbers, job.data.ySeconds);
    console.log(`Job ${job.id} completed`);

    io.emit('chat message', 'job done');

    done(null, "Job done ");
  });

  // Here you add the job
  queue.add({ xNumbers: 3, ySeconds: 2 }, { retry: 10, delay: 10 });
  // And other
  // queue.add({ xNumbers: 3, ySeconds: 4 }, { retry: 2, delay: 10 });

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

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.get('/test_form', (req, res) => {
  res.sendFile(__dirname + '/public/test_form.html');
})

app.get('/test-get', function (req, res) {
  console.log('get called')
  console.log('para:' + JSON.stringify(req.query, null, 2))



  res.status(200).send('hello test-get')
})

app.get('/test-get-json', function (req, res) {
  console.log('get called')
  console.log('para:' + JSON.stringify(req.query, null, 2))

  res.status(200).send({ hello: 'world' })
})

app.post('/test-post', function (req, res) {
  console.log('post called')
  console.log('para:' + JSON.stringify(req.body, null, 2))

  const { sub_domain_name } = req.body;

  init(sub_domain_name);

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

var port = 3001;
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
})

var http1 = require('http')

http1
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
