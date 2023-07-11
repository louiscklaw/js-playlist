var Dockerode = require('dockerode');
var DockerodeCompose = require('dockerode-compose');

var docker = new Dockerode({ socketPath: '/var/run/docker.sock' });
var compose = new DockerodeCompose(docker,
  './test/wordpress.yml',
  'wordpress');

(async () => {

  await compose.pull(null, { verbose: true })
  var state = await compose.up();
  console.log(state);

})();
