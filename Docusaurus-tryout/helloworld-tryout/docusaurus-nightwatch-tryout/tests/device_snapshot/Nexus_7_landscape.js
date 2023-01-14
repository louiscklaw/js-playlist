module.exports = {
  // disabled: true,
  '@tags': ['website'],

  beforeEach: function (client, done) {
    client.url('http://localhost:3000/', function () {
      done();
    });
  },

  'Demo test Nexus 7 landscape, 960, 600': function (client) {
    client
      .waitForElementVisible('body', 1000)
      .resizeWindow(960, 600)
      .assert.screenshotIdenticalToBaseline('body');
  },

  Finished: function (client) {
    client
      .perform(() => {
        // eslint-disable-next-line no-console
        console.log('[perform]: Finished Test:', client.currentTest.name);
      })
      .end();
  },
};
