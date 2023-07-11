const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const stream = require('stream');
const docker = new Docker();

const custom_image_options = (CONTAINER_NAME) => {
  // gen names
  var VOLUME_NAME = `${CONTAINER_NAME}`
  var VOLUME_NAME_APP = `${VOLUME_NAME}-app`
  var VOLUME_NAME_STORE = `${VOLUME_NAME}-store`

  return {
    name: CONTAINER_NAME,
    Image: "custom_image",
    WorkingDir: "/app",
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
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
    Labels: {
      'hello': 'world',
      [`traefik.http.routers.${CONTAINER_NAME}-http.rule`]: `Host("${CONTAINER_NAME}.localhost")`,
      [`traefik.http.routers.${CONTAINER_NAME}-http.entrypoints`]: `web`,

      [`traefik.http.routers.${CONTAINER_NAME}-http.middlewares`]: `${CONTAINER_NAME}-https`,

      [`traefik.http.middlewares.${CONTAINER_NAME}-https.redirectscheme.scheme`]: `https`,
      [`traefik.http.routers.${CONTAINER_NAME}-https.rule`]: `Host("${CONTAINER_NAME}.localhost")`,
      [`traefik.http.routers.${CONTAINER_NAME}-https.entrypoints`]: `websecure`,
      [`traefik.http.routers.${CONTAINER_NAME}-https.tls.certresolver`]: `myresolver`,
    }
  }
}


const returnContainersRouter = (io) => {
  router.get('/helloworld', (req, res) => {
    res.send('hello world');
  })

  router.post('/create', async (req, res, next) => {
    console.log('create new client');

    try {
      // validate input
      var CONTAINER_NAME = req.body.containerName;

      let options = custom_image_options(CONTAINER_NAME);
      let options_1 = custom_image_options(CONTAINER_NAME + '_1');
      let options_2 = custom_image_options(CONTAINER_NAME + '_2');

      // NOTE: pull is not required as using custom image, need to be built in advance
      // await docker.pull('traefik/whoami');

      Promise.all([
        docker.createContainer(options),
        docker.createContainer(options_1),
        docker.createContainer(options_2),
      ]).then(containers => {
        return Promise.all(containers.map(c => c.start()));
      }).then(() => {
        res.send({ status: 'success' });
      })

    } catch (error) {
      console.log('error found');
      console.log(error);
      res.send({ state: 'error createNewClient', })
    }
  })

  return router;
};

module.exports = returnContainersRouter;
