import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import fs from 'fs';
import path from 'path';

setDefaultTimeout(60 * 1000);

let browser: Browser | null = null;

declare module '@cucumber/cucumber' {
  interface World {
    page: Page;
  }
}

Before(async function () {
  const headless = process.env.HEADLESS !== 'false';
  const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

  browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  this.page = await context.newPage();

  // ✅ critical: go to app before steps
  await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
});

After(async function (scenario) {
  // ✅ optional but very helpful: artifacts on failure
  if (scenario.result?.status === Status.FAILED && this.page) {
    const outDir = path.join(process.cwd(), 'artifacts');
    fs.mkdirSync(outDir, { recursive: true });

    const safeName = scenario.pickle.name.replace(/[^a-z0-9-_ ]/gi, '_');
    await this.page.screenshot({
      path: path.join(outDir, `${safeName}.png`),
      fullPage: true,
    });

    const url = this.page.url();
    fs.writeFileSync(path.join(outDir, `${safeName}.url.txt`), url, 'utf-8');

    const html = await this.page.content();
    fs.writeFileSync(path.join(outDir, `${safeName}.html`), html, 'utf-8');
  }

  if (browser) {
    await browser.close();
    browser = null;
  }
});
