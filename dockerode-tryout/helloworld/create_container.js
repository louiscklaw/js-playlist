// https://docs.docker.com/engine/api/v1.37/#tag/Container/operation/ContainerCreate

const Docker = require('dockerode')
// const docker = new Docker({ host: 'http://localhost', port: 2375 })

// config
const PROJECT_ROOT = __dirname
const DOCKER_VOLUME = `${PROJECT_ROOT}/volumes`

var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const paddedNumber = (num) => String(num).padStart(2, '0');

(async () => {
  console.log('start');

  Array(10).fill(0).forEach(async (_, idx) => {
    var container_number = paddedNumber(idx)
    var host_port = container_number;

    var CONTAINER_NAME = `test-container-${container_number}`
    var VOLUME_NAME = `${DOCKER_VOLUME}/${CONTAINER_NAME}`

    await docker
      .createContainer({
        Image: "test-container",
        name: CONTAINER_NAME,

        WorkingDir: "/app",
        Labels: {
          "com.example.vendor": "Acme",
          "com.example.license": "GPL",
          "com.example.version": "1.0"
        },
        Cmd: [
          "sleep", "infinity"
        ],
        StopSignal: "SIGTERM",
        StopTimeout: 10,
        HostConfig: {
          Binds: [
            `${VOLUME_NAME}:/app`
          ],
          PortBindings: {
            '80/tcp': [{ HostPort: `80${host_port}` }],
          },
        },
      })
      .then(container => {
        return container.start()
      })
  })

  console.log('done');
})();


