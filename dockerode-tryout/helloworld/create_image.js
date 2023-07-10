const Docker = require('dockerode')
// const docker = new Docker({ host: 'http://localhost', port: 2375 })
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const paddedNumber = (num) => String(num).padStart(2, '0');

(async () => {
  console.log('start');

  // Build a Docker image from a Dockerfile
  await docker.buildImage(
    { context: './test_docker_config', src: ['dockerfile'], },
    { t: 'test-container' },
    (err, stream) => {
      if (err) throw err
      stream.pipe(process.stdout)
    },
  )

  console.log('done');
})();


