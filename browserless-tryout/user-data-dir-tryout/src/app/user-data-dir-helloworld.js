const fs = require('fs-extra');

const puppeteer = require('puppeteer-core');
const browserWSEndpoint = 'ws://browserless:3000';

(async () => {
  // await fs.ensureDir('/app/helloworld');
  // const userDataDir = `/tmp/user-data-1`;
  // await fs.ensureDir(userDataDir);

  // `${browserWSEndpoint}/?--user-data-dir=${userDataDir}&--disable-web-security`
  const browser = await puppeteer.connect({
     browserWSEndpoint: `ws://browserless:3000/`,
    });
  const page = await browser.newPage();

  await page.goto('http://gmail.com');
  
  await page.screenshot({ path: `/app/screens/gmail.png`, fullPage: true });

  console.log(JSON.stringify({ hello: 'world' }));
  
  process.exit();
})();
