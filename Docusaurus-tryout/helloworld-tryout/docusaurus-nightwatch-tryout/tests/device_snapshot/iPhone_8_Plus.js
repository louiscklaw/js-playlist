module.exports = {
  // disabled: true,
  '@tags': ['website'],

  beforeEach: function (client, done) {
    client.url('http://localhost:3000/', function () {
      done();
    });
  },

  'Demo test iPhone 8 Plus, 414, 736': function (client) {
    client
      .waitForElementVisible('body', 1000)
      .resizeWindow(414, 736)
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
