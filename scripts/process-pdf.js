const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const filePath = process.env.FILEPATH;
  const fileName = process.env.FILENAME;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("file://" + path.resolve(filePath), {
    waitUntil: "networkidle0"
  });

  await page.pdf({
    path: path.join("reports/output", fileName + ".pdf"),
    format: "A4",
    printBackground: true
  });

  await browser.close();
})();
