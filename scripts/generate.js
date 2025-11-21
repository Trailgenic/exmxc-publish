const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const input = process.argv[2];
  const output = process.argv[3];

  if (!input || !output) {
    console.error("Usage: node process-pdf.js <input.html> <output.pdf>");
    process.exit(1);
  }

  const absPath = path.resolve(input);
  const outputDir = path.dirname(output);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("file://" + absPath, { waitUntil: "networkidle0" });

  await page.pdf({
    path: output,
    format: "A4",
    printBackground: true
  });

  await browser.close();
})();
