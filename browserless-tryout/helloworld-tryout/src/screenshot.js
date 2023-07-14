'use strict';

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://www.google.com/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('img[alt="Google"]');
  await page.screenshot({ path: `${__dirname}/screens/google.png`, fullPage: true });
  await browser.close();
})();
