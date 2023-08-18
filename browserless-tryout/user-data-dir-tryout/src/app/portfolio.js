'use strict';

const puppeteer = require('puppeteer-core');

(async () => {
  let browser = null;

  try {
    // If your script executes too quickly, you can add a ?pause query parameter
    // to the connect call to pause the script from running until you're watching it
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://browserless:3000`,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Full puppeteer API is available
    await page.goto('https://louiscklaw.github.io/');
    await page.screenshot({ path: './screens/portfolio.png' });

    // await page.type('input[type="text"]', 'browserless.io');
    // await Promise.all([
    //   page.click('input[type="submit"]'),
    //   page.waitForNavigation(),
    // ]);

    // // Logs show up in the browser's devtools
    // console.log(`I show up in the page's console!`);

    // const topLinks = await page.evaluate(() => {
    //   const results = document.querySelectorAll('a');
    //   return [...results].map(el => [el.innerText, el.getAttribute('href')]);
    // });

    // // Can pause by injecting a "debugger;" statement
    // await page.evaluate(() => { debugger; });

    // console.table(topLinks);
  } catch (error) {
    console.log(error);
  } finally {
    browser && browser.close();
  }
})();
