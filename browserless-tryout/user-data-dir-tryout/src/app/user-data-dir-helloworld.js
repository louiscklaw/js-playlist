const fs = require('fs-extra');

const puppeteer = require('puppeteer-core');
const browserWSEndpoint = 'ws://browserless:3000';

(async () => {
  // `${browserWSEndpoint}/?--user-data-dir=${userDataDir}&--disable-web-security`
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });

  const page = await browser.newPage();

  await page.goto('http://gmail.com');

  await page.screenshot({ path: `/app/screens/gmail.png`, fullPage: true });

  console.log(JSON.stringify({ hello: 'world' }));

  await page.close();
  process.exit();
})();
