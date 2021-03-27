const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/main.html', {
    waitUntil: 'networkidle2',
  });
  const a = await page.$('a');
  console.log(a.asElement().boxModel());
  await browser.close();
})();
