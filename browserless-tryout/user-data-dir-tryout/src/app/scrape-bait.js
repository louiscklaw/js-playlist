'use strict';

const fs = require('fs'),
  path = require('path');

const puppeteer = require('puppeteer-core');

const PROJ_ROOT = __dirname;

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const jobPage = await browser.newPage();

  // get list by category
  await jobPage.goto('http://bait:8080', { waitUntil: 'networkidle2' });

  // get job
  const testText = await jobPage.evaluate(() => {
    var output = {}
    var debug_list = []
    document.querySelectorAll('div[data-automation="jobDetailsHeader"] span')
      .forEach((ele, idx) => {
        if (idx == 1) output['companyName'] = ele.textContent || '';
        if (idx == 2) output['jobAddress'] = ele.textContent || '';
        if (idx == 3) output['postDate'] = ele.textContent || '';
        debug_list.push(ele.innerHTML)
      })
    output['debug_list'] = debug_list;

    return output;
  });

  // const testText = await page.evaluate(() => {
  //   var output = []
  //   document.querySelectorAll('div[data-automation="hello"] span').forEach(ele => output.push(ele.innerHTML))
  //   return output;
  // });

  console.log(testText);

  await jobPage.close();
  await browser.close();
})();
