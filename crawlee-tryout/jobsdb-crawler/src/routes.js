import { Dataset, createPlaywrightRouter } from 'crawlee';

import checksum from 'checksum';

import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:admin@mongo:27017/test');

const JobsdbModel = mongoose.model('JobsdbModel', {
  url: String,
  title: String,
  actorText: String,
  dateText: String,
  detailsText: String,
  Industry: String,
  detailsTextCs: String,
});

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Zildjian' })

// kitty.save().then(() => {
//   console.log('meow')
// })

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`);

  // await enqueueLinks({
  //   globs: ['https://crawlee.dev/**'],
  //   label: 'crawlee_detail',
  // })

  await enqueueLinks({
    globs: ['https://louiscklaw.github.io/**'],
    label: 'louiscklaw_github_io_test',
  });

  await enqueueLinks({
    globs: ['https://www.google.com/**'],
    label: 'example_test',
  });

  // await enqueueLinks({
  //   globs: ['https://hk.jobsdb.com/hk/en/job/**'],
  //   label: 'hk_jobsdb_com',
  // })

  // // next page ?
  // // https://hk.jobsdb.com/hk/search-jobs/validation/2
  // await enqueueLinks({
  //   globs: ['https://hk.jobsdb.com/hk/search-jobs/**'],
  //   label: 'hk_jobsdb_com',
  // })

  // // https://hk.jobsdb.com/hk/jobs/medical-services/1
  // await enqueueLinks({
  //   globs: ['https://hk.jobsdb.com/hk/jobs/**'],
  //   label: 'hk_jobsdb_com',
  // })

  log.info('enqueue done');
});

router.addHandler('example_handler', async ({ request, page, log }) => {
  log.info('example_handler hit !');

  await Dataset.pushData({
    url: request.loadedUrl,
  });
});

router.addHandler('crawlee_detail', async ({ request, page, log }) => {
  const title = await page.title();
  await page.waitForSelector('html body');

  log.info(`${title}`, { url: request.loadedUrl });

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
  });
});

router.addHandler('hk_jobsdb_com', async ({ request, page, log }) => {
  const title = await page.title();
  await page.waitForSelector('html body div#app h1');

  // the actor card elements and allows their manipulation.
  const actorText = await page.$$eval('html body div#app h1', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent)[0];
  });

  // the actor card elements and allows their manipulation.
  const dateText = await page.$$eval(
    '//html/body/div[1]/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div/div/div[2]/div/div/div/div[2]/span',
    els => {
      // Extract text content from the actor cards
      return els.map(el => el.textContent)[0];
    },
  );

  // details
  // /html/body/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div
  const detailsText = await page.$$eval('//html/body/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent)[0];
  });

  // details
  // /html/body/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div
  const Industry = await page.$$eval(
    '//html/body/div[1]/div/div/div[2]/div/div/div[2]/div/div[2]/div/div[2]/div/div[2]/div/div/div[1]/div/div/div[2]/span',
    els => {
      // Extract text content from the actor cards
      return els.map(el => el.textContent)[0];
    },
  );

  log.info({ url: request.loadedUrl });

  const new_job = new JobsdbModel({
    url: request.loadedUrl,
    title: title,
    actorText: actorText,
    dateText: dateText.replace(/Posted on/, ''),
    detailsText: detailsText,
    Industry: Industry,
    detailsTextCs: checksum(detailsText),
  });
  new_job.save().then(() => {
    console.log(JSON.stringify(title));
    console.log('saving done');
  });

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
    actorText,
    dateText,
    detailsText,
  });

  process.exit();
});

router.addHandler('louiscklaw_github_io_test', async ({ request, page, log }) => {
  log.info('louiscklaw-github-io hit !');
  const title = await page.title();
  await page.waitForSelector('html body');

  const bodyText = await page.$$eval('//html/body', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent);
  });

  log.info(`${title}`, { url: request.loadedUrl });

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
    bodyText,
  });
});

router.addHandler('example_test', async ({ request, page, log }) => {
  log.info('example_test hit !');
  const title = await page.title();
  await page.waitForSelector('html body');

  const bodyText = await page.$$eval('//html/body', els => {
    // Extract text content from the actor cards
    return els.map(el => el.textContent);
  });

  log.info(`${title}`, { url: request.loadedUrl });

  await Dataset.pushData({
    url: request.loadedUrl,
    title,
    bodyText,
  });
});
