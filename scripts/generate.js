const puppeteer = require("puppeteer");
const path = require("path");

async function run() {
  const filePath = process.argv[2];
  const fileName = process.argv[3];

  if (!filePath || !fileName) {
    console.error("Missing arguments: filePath fileName");
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("file://" + path.resolve(filePath), {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    path: path.join("pdf/outputs", fileName + ".pdf"),
    format: "A4",
    printBackground: true,
  });

  await browser.close();
}

run();
