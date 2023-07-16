'use strict';

const fs = require('fs'), path = require('path');

const puppeteer = require('puppeteer-core');

const PROJ_ROOT = __dirname;

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const page = await browser.newPage();

  await page.goto('https://www.carousell.com.hk/search/coding');

  // Here, we inject some JavaScript into the page to build a list of results
  const items = await page.evaluate(() => {
    // NOTE: remove head advertisment 
    document.querySelectorAll('#main > div:nth-child(1) > div')[0].remove()

    const elements = [...document.querySelectorAll('#main > div:nth-child(1) > div')];
    const results = elements.map((el) => ({
      title: el.textContent,
      href: el.href,
    }));
    return JSON.stringify(results, null, 2);
  });

  await fs.writeFileSync(
    path.join(__dirname, '/output/test.json'),
    items,
    { encoding: 'utf-8' }
  )

  // Finally, we return an object, which triggers a JSON file download
  return JSON.parse(items);
})();
