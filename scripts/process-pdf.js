const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];

  if (!inputFile || !outputFile) {
    console.error("Usage: node process-pdf.js <input.html> <output.pdf>");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("file://" + path.resolve(inputFile), {
    waitUntil: "networkidle0"
  });

  await page.pdf({
    path: outputFile,
    format: "A4",
    printBackground: true
  });

  await browser.close();
})();
