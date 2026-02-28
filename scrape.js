const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 24; seed <= 33; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table', { timeout: 15000 });

    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.innerText.trim())).filter(n => !isNaN(n))
    );

    const seedSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${seedSum}`);
    total += seedSum;
  }

  console.log(`Total: ${total}`);
  await browser.close();
})();
