const { addAttach } = require('jest-html-reporters/helper')
const puppeteer = require('puppeteer')

describe('just examples', () => {
  test('test buffer', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.google.com')
    const data = await page.screenshot()
    await browser.close()
    await addAttach(data, 'test google 1', this.global)

    expect(1).toBe(1)
    expect(1).toBe(2)
  })
})
