const puppeteer = require('puppeteer');

const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

test('renders app click button', () => {
  expect(true).toBe(true);
});

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
    });
    let page = await browser.newPage();

    browser.close();
  });
});
