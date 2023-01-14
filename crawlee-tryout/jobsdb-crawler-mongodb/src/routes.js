import { Dataset, createPlaywrightRouter } from 'crawlee'

export const router = createPlaywrightRouter()

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`)
  await enqueueLinks({
    globs: ['https://crawlee.dev/**'],
    label: 'crawlee_detail',
  })

  await enqueueLinks({
    globs: ['https://louiscklaw.github.io/**'],
    label: 'louiscklaw_github_io_test',
  })

  await enqueueLinks({
    globs: ['https://hk.jobsdb.com/hk/en/job/**'],
    label: 'hk_jobsdb_com',
  })

  // next page ?
  // https://hk.jobsdb.com/hk/search-jobs/validation/2
  await enqueueLinks({
    globs: ['https://hk.jobsdb.com/hk/search-jobs/**'],
    label: 'hk_jobsdb_com',
  })

  // https://hk.jobsdb.com/hk/jobs/medical-services/1
  await enqueueLinks({
    globs: ['https://hk.jobsdb.com/hk/jobs/**'],
    label: 'hk_jobsdb_com',
  })
})

router.addHandler('crawlee_detail', async ({ request, page, log }) => {
  const title = await page.title()
  await page.waitForSelector('html body')

  log.info(`${title}`, { url: request.loadedUrl })

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
  })
})

router.addHandler('hk_jobsdb_com', async ({ request, page, log }) => {
  const title = await page.title()
  await page.waitForSelector('html body div#app h1')

  // the actor card elements and allows their manipulation.
  const actorTexts = await page.$$eval('html body div#app h1', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent)
  })

  // the actor card elements and allows their manipulation.
  const dateTexts = await page.$$eval('//html/body/div[1]/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div/div/div[2]/div/div/div/div[2]/span', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent)
  })

  // details
  // /html/body/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div
  const detailsTexts = await page.$$eval('//html/body/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent)
  })

  log.info({ url: request.loadedUrl })

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
    actorTexts,
    dateTexts,
    detailsTexts,
  })
})

router.addHandler('louiscklaw_github_io_test', async ({ request, page, log }) => {
  const title = await page.title()
  await page.waitForSelector('html body')

  const bodyText = await page.$$eval('//html/body', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent)
  })

  log.info(`${title}`, { url: request.loadedUrl })

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
    bodyText,
  })
})
