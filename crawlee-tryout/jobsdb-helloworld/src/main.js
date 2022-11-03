// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';
import { router } from './routes.js';

const startUrls = []
// Array(1)
//   .fill('')
//   .map((o, i) => `https://hk.jobsdb.com/hk/search-jobs/validation/${i}`)

// startUrls.push('https://crawlee.dev')
startUrls.push('https://louiscklaw.github.io')

const crawler = new PlaywrightCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
})

await crawler.run(startUrls);
