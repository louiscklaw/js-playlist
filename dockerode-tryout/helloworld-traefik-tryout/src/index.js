const Docker = require('dockerode')
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const paddedNumber = (num) => String(num).padStart(2, '0');

(async () => {
  console.log('start');

  // Build a Docker image from a Dockerfile
  await docker.buildImage(
    // must be either dockerfile / Dockerfile
    { context: './dockerfiles/ubuntu', src: ['dockerfile'], },
    { t: 'test-linux-ubuntu' },
    (err, stream) => {
      if (err) throw err
      stream.pipe(process.stdout)
    },
  )

  // let it be fedora
  await docker.buildImage(
    // must be either dockerfile / Dockerfile
    { context: './dockerfiles/fedora', src: ['dockerfile'], },
    { t: 'test-linux-fedora' },
    (err, stream) => {
      if (err) throw err
      stream.pipe(process.stdout)
    },
  )

  console.log('done');
})();
