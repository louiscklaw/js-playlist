var Dockerode = require('dockerode')
var DockerodeCompose = require('dockerode-compose')

var docker = new Dockerode({ host: 'http://localhost', port: 2375 })
var compose = new DockerodeCompose(docker, './test/wordpress.yml', 'wordpress')

;(async () => {
  await compose.pull()
  var state = await compose.up()
  console.log(state)
})()

// // Build a Docker image from a Dockerfile
// docker.buildImage(
//   {
//     context: __dirname,
//     src: ['Dockerfile'],
//   },
//   { t: 'my-image' },
//   (err, stream) => {
//     if (err) throw err
//     stream.pipe(process.stdout)
//   },
// )

// // Create a container from the image we just built
// docker
//   .createContainer({
//     Image: 'my-image',
//     name: 'my-container',
//     HostConfig: {
//       PortBindings: {
//         '80/tcp': [{ HostPort: '8080' }],
//       },
//     },
//   })
//   .then(container => {
//     return container.start()
//   })
