'use strict';

const fs = require('fs'),
  path = require('path');

const puppeteer = require('puppeteer-core');

const PROJ_ROOT = __dirname;

(async () => {
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
  const page = await browser.newPage();

  // get list by category
  await page.goto('https://hk.jobsdb.com/hk/search-jobs/validation/1', { waitUntil: 'networkidle2' });

  // // get jobs from list
  const jobLinks = await page.evaluate(() => {
    var links = [];
    document.querySelectorAll('#jobList article a[href^="/hk/en/job"]').forEach((ele, i) => {
      if (i < 2) {
        links.push(ele.href.split('?')[0]);
      }
    });
    return links;
  });

  var extractedJob = [];
  for (var i = 0; i < jobLinks.length; i++) {
    // extractedJob.push(i);
    const link = jobLinks[i];

    const jobPage = await browser.newPage();
    await jobPage.setViewport({ width: 1920, height: 1080 * 2 });
    await jobPage.goto(link, { waitUntil: 'networkidle0' });


    const jobTitle = await jobPage.evaluate(() => {
      const title = document.querySelector('div[data-automation="detailsTitle"] h1').textContent;
      return title;
    });

    const _jobDetailsHeaderRawHTML = await jobPage.evaluate(() => {
      const title = document.querySelector('div[data-automation="jobDetailsHeader"]').outerHTML;
      return title;
    });

    const { companyName, jobAddress, postDate, _debugList } = await jobPage.evaluate(() => {
      var output = {}
      var debugList = [];

      document.querySelectorAll('div[data-automation="jobDetailsHeader"] span')
        .forEach((ele, idx) => {
          if (idx == 1) output['companyName'] = ele.textContent || '';
          if (idx == 2) output['jobAddress'] = ele.textContent || '';
          if (idx == 3) output['postDate'] = ele.textContent || '';
          debugList.push(ele.innerHTML)
        });

      output['_debugList'] = debugList;

      return output;
    });

    const jobHighlight = await jobPage.evaluate(() => {
      const title = document.querySelector('div[data-automation="job-details-job-highlights"] > div:nth-child(1)  > div:nth-child(2)').textContent;
      return title;
    });

    const jobDescription = await jobPage.evaluate(() => {
      const title = document.querySelector('div[data-automation="jobDescription"]').textContent;
      return title;
    });

    extractedJob.push({
      jobTitle,
      companyName,
      _jobDetailsHeaderRawHTML,
      _debugList,
      jobAddress,
      postDate,
      jobHighlight,
      jobDescription,

  });

    await jobPage.screenshot(
      { path: `${__dirname}/screens/jobsdb_${i}.png`, fullPage: true }
    );

  }

  console.log(extractedJob);

  await page.close();
  await browser.close();
})();
