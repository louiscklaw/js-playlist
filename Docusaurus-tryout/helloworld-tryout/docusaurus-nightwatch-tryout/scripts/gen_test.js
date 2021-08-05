#!/usr/bin/env node

const fs = require('fs');
const {DeviceByName} = require('./DeviceDescriptors.js');

const test_template = `
module.exports = {
  // disabled: true,
  '@tags': ['website'],

  beforeEach: function (client, done) {
    client.url('http://localhost:3000/', function () {
      done();
    });
  },

  'Demo test ~DEVICE_NAME~, ~DEVICE_WIDTH~, ~DEVICE_HEIGHT~': function (client) {
    client
      .waitForElementVisible('body', 1000)
      .resizeWindow(~DEVICE_WIDTH~, ~DEVICE_HEIGHT~)
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
`;

const getDeviceByName = (device_name) =>
  `../tests/device_snapshot/${device_name
    .replace(/ /g, '_')
    .replace(/\//g, '_')
    .replace(/__/g, '_')}.js`;

Object.keys(DeviceByName).forEach((device_name) => {
  let device_info = DeviceByName[device_name];
  fs.writeFileSync(
    getDeviceByName(device_name),
    test_template
      .replace(/~DEVICE_NAME~/g, device_info.name)
      .replace(/~DEVICE_WIDTH~/g, device_info.viewport.width)
      .replace(/~DEVICE_HEIGHT~/g, device_info.viewport.height),
    {
      encoding: 'utf-8',
    },
  );
});
