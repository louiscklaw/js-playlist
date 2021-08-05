
module.exports = {
  // disabled: true,
  '@tags': ['website'],

  beforeEach: function (client, done) {
    client.url('http://localhost:3000/', function () {
      done();
    });
  },

  'Demo test iPad Pro, 1024, 1366': function (client) {
    client
      .waitForElementVisible('body', 1000)
      .resizeWindow(1024, 1366)
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
