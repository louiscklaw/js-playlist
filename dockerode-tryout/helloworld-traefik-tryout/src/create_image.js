const Docker = require('dockerode')
// const docker = new Docker({ host: 'http://localhost', port: 2375 })
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const paddedNumber = (num) => String(num).padStart(2, '0');

(async () => {
  console.log('start');

  // Build a Docker image from a Dockerfile
  await docker.buildImage(
    {
      context: './dockerfiles/ubuntu',
      src: ['dockerfile'],
    },
    { t: 'test-linux-ubuntu' },
    (err, stream) => {
      if (err) throw err
      stream.pipe(process.stdout)
    },
  )

  console.log('done');
})();
