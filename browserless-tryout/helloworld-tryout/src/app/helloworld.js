'use strict';

const fs = require('fs'), path = require('path');

const puppeteer = require('puppeteer-core');

const PROJ_ROOT = __dirname;

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const page = await browser.newPage();

  await page.goto('https://www.hko.gov.hk');

  console.log(JSON.stringify({ hello: 'world' }));

  await page.close();
  await browser.close();
})();
