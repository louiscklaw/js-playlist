'use strict';

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const page = await browser.newPage();

  await page.goto('http://bait:8080');

  console.log(JSON.stringify({ hello: 'world' }));

  await page.close();
  await browser.close();
})();
