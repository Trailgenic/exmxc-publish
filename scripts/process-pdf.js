const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const input = process.argv[2];
  const output = process.argv[3];

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto('file://' + path.resolve(input), {
    waitUntil: 'networkidle0'
  });

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true
  });

  await browser.close();
})();
