import { Dataset, createPlaywrightRouter } from 'crawlee';

import checksum from 'checksum';

export const router = createPlaywrightRouter();

router.addHandler('test', async ({ enqueueLinks, request, page, log }) => {
  log.info('test hit !');

  // related search
  await enqueueLinks({
    globs: ['http://192.168.10.180:8080/**'],
    label: 'test',
  });

  log.info(`loaded ${request.loadedUrl}`);

  await Dataset.pushData({
    url: request.loadedUrl,
  });
});

router.addDefaultHandler(async ({ request, enqueueLinks, log }) => {
  log.info(`enqueueing new URLs ${request.url}`);

  await enqueueLinks({
    globs: ['http://192.168.10.180:8080/**'],
    label: 'test',
  });
});
