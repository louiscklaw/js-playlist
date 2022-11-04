// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';
import { router } from './routes.js';

import mongoose from 'mongoose';

const startUrls = [];
// Array(1)
//   .fill('')
//   .map((o, i) => `https://hk.jobsdb.com/hk/search-jobs/validation/${i}`)

// startUrls.push('https://crawlee.dev')
// startUrls.push('https://www.example.com');
// startUrls.push('https://hk.jobsdb.com/hk/search-jobs/validation-engineer/1');
// startUrls.push('https://hk.jobsdb.com/hk/search-jobs/qa-engineer/1');
startUrls.push('http://192.168.10.180:8080');

const crawler = new PlaywrightCrawler({
  maxConcurrency: 1,
  maxRequestsPerMinute: 3,

  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,

  async failedRequestHandler({ request }) {
    // This function is called when the crawling of a request failed too many times
    await Dataset.pushData({
      url: request.url,
      succeeded: false,
      errors: request.errorMessages,
    });
  },
});

await crawler.run(startUrls);

mongoose.connection.close();
