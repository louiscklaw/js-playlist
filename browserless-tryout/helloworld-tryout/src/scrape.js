'use strict';

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const page = await browser.newPage();

  await page.goto('https://news.ycombinator.com');

  // Here, we inject some JavaScript into the page to build a list of results
  const items = await page.evaluate(() => {
    const elements = [...document.querySelectorAll('.athing a')];
    const results = elements.map((el) => ({
      title: el.textContent,
      href: el.href,
    }));
    return JSON.stringify(results);
  });

  // Finally, we return an object, which triggers a JSON file download
  return JSON.parse(items);
})();
