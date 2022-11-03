// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, Dataset } from 'crawlee'

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, log }) {
    const title = await page.title()
    log.info(`Title of ${request.loadedUrl} is '${title}'`)

    // Save results as JSON to ./storage/datasets/default
    await Dataset.pushData({ title, url: request.loadedUrl })
    console.log({
      posted: (await page.content()).match(/Posted on ([\w|-]+)/)[0],
    })

    // Extract links from the current page
    // and add them to the crawling queue.
    await enqueueLinks()
  },
  launchContext: {
    // Here you can set options that are passed to the playwright .launch() function.
    launchOptions: {
      headless: false,
    },
  },

  // Stop crawling after several pages
  maxRequestsPerCrawl: 1,
})

// Add first URL to the queue and start the crawl.
// await crawler.run(['https://hk.jobsdb.com/hk/search-jobs/appium'])
await crawler.run(['https://hk.jobsdb.com/hk/en/job/software-automation-qa-engineer-hong-kong-100003009778704'])
