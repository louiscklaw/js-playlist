const Docker = require('dockerode')
const docker = new Docker({ host: 'http://localhost', port: 2375 })

// Build a Docker image from a Dockerfile
docker.buildImage(
  {
    context: __dirname,
    src: ['Dockerfile'],
  },
  { t: 'my-image' },
  (err, stream) => {
    if (err) throw err
    stream.pipe(process.stdout)
  },
)

// Create a container from the image we just built
docker
  .createContainer({
    Image: 'my-image',
    name: 'my-container',
    HostConfig: {
      PortBindings: {
        '80/tcp': [{ HostPort: '8080' }],
      },
    },
  })
  .then(container => {
    return container.start()
  })
