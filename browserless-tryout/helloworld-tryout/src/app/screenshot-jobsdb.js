'use strict';

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect(
    { browserWSEndpoint: 'ws://browserless:3000' }
  );
  const page = await browser.newPage();

  await page.setViewport({ width: 600, height: 299 });
  await page.goto(
    'https://hk.jobsdb.com/hk/search-jobs/validation/1',
    { waitUntil: 'networkidle2' });
  // await page.waitForSelector('img[alt="Google"]');
  await page.screenshot({ path: `${__dirname}/screens/jobsdb.png`, fullPage: true });

  await browser.close();
})();
