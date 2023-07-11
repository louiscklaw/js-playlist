// https://docs.docker.com/engine/api/
// https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerCreate

const Docker = require('dockerode')

var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const paddedNumber = (num) => String(num).padStart(2, '0');

const createUbuntu = (CONTAINER_NAME, HOST_PORT) => {
  var VOLUME_NAME = `${CONTAINER_NAME}`
  var VOLUME_NAME_APP = `${VOLUME_NAME}-app`
  var VOLUME_NAME_STORE = `${VOLUME_NAME}-store`

  return docker
    .createContainer({
      Image: "test-linux-ubuntu",
      name: CONTAINER_NAME,
      WorkingDir: "/app",
      Labels: {
        'hello': 'world',
        'traefik.enable': 'true',
        [`traefik.http.routers.${CONTAINER_NAME}-http.rule`]: `Host("${CONTAINER_NAME}.localhost")`,
        [`traefik.http.routers.${CONTAINER_NAME}-http.entrypoints`]: `web`,

        [`traefik.http.routers.${CONTAINER_NAME}-http.middlewares`]: `${CONTAINER_NAME}-https`,

        [`traefik.http.middlewares.${CONTAINER_NAME}-https.redirectscheme.scheme`]: `https`,
        [`traefik.http.routers.${CONTAINER_NAME}-https.rule`]: `Host("${CONTAINER_NAME}.localhost")`,
        [`traefik.http.routers.${CONTAINER_NAME}-https.entrypoints`]: `websecure`,
        [`traefik.http.routers.${CONTAINER_NAME}-https.tls.certresolver`]: `myresolver`,
      },
      Cmd: ["sleep", "infinity"],
      StopSignal: "SIGTERM",
      StopTimeout: 10,
      HostConfig: {
        AutoRemove: true,
        Binds: [
          `${VOLUME_NAME_APP}:/app`,
          `${VOLUME_NAME_STORE}:/store`
        ],
      },
      ExposedPorts: {
        "80": {}
      },
    })
    .then(container => {
      return container.start()
    });
}

(async () => {
  console.log('start');

  Array(1).fill(0).forEach(async (_, idx) => {
    var container_number = paddedNumber(idx)
    var HOST_PORT = container_number;

    await createUbuntu(`test-linux-ubuntu-${container_number}`, HOST_PORT);
  })

  console.log('done');
})();


