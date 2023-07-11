const Docker = require('dockerode')
// const docker = new Docker({ host: 'http://localhost', port: 2375 })
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

console.log('start');

function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}


function delay(ms) {
  console.log('into delay');
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await docker.listContainers({ all: true })
    .then((containers) => {
      containers.forEach(async (c, idx) => {
        console.log(`${c.Names[0]} -> ${c.State} ...`);
        if (c.Names[0].search(/test-container/) > -1) {
          if (c.State == 'running') {
            await docker.getContainer(c.Id).kill();
            // await docker.getContainer(c.Id).stop();
          }
        }
      })
    })
    .catch(err => {
      console.log(err);
    });

  // wait for all containers stopped
  console.log('before delay');
  var countdown = 10;
  while (countdown > 0) {
    var all_exited = await docker.listContainers({ all: true })
      .then((containers) => {
        var all_status = containers
          .filter(c => c.Names[0].search(/test-container/) > -1)
          .map((c, idx) => c.State)
        return every(all_status, (state) => ['exited', 'created'].includes(state));
      });

    if (!all_exited) {
      console.log(`waiting for all containers shutdown ... ${countdown}`)
      await delay(1000);
      countdown = countdown - 1;
    } else {
      countdown = 0;
    }
  }
  console.log('after delay');

  // all containers stopped before this line
  await docker.pruneContainers();

})();

console.log('done');