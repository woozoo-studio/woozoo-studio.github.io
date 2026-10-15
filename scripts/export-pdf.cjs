// Rebuild the downloadable PDF whenever portfolio content or print styles change.
// Requires Playwright. PLAYWRIGHT_MODULE_PATH can point to an existing installation.
const { createServer } = require('node:http');
const { readFile, writeFile, rename } = require('node:fs/promises');
const { existsSync } = require('node:fs');
const { resolve, extname, sep } = require('node:path');
const { createHash } = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');

const root = resolve(__dirname, '..');
const assets = resolve(root, 'assets');
const publicFiles = new Set(['index.html', 'app.js', 'print.html', 'print.js', 'print.css', 'style.css', 'themes.css', 'web-refinement.css']);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.pdf': 'application/pdf' };
const server = createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).slice(1) || 'index.html';
    const file = resolve(root, path);
    if (!publicFiles.has(path) && !file.startsWith(assets + sep)) {
      response.writeHead(404).end();
      return;
    }
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(content);
  } catch {
    response.writeHead(404).end();
  }
});

(async () => {
  let browser;
  try {
    await new Promise((accept, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', accept);
    });
    const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    const executablePath = process.env.PDF_BROWSER_PATH || (process.platform === 'darwin' && existsSync(macChrome) ? macChrome : undefined);
    browser = await chromium.launch({ headless: true, executablePath });
    const page = await browser.newPage({ viewport: { width: 1200, height: 1100 } });
    await page.goto(`http://127.0.0.1:${server.address().port}/print.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => !document.querySelector('#save-pdf').disabled);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });
    const layout = await page.evaluate(() => [...document.querySelectorAll('.sheet')].map(sheet => ({
      gap: sheet.querySelector('.running-foot').getBoundingClientRect().top - sheet.querySelector('.sheet-body').lastElementChild.getBoundingClientRect().bottom
    })));
    if (layout.length !== 5 || layout.some(sheet => sheet.gap < 0)) throw new Error('Expected five sheets with no footer overlap.');
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
    const count = [...pdf.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length;
    if (count !== 5) throw new Error(`Expected five PDF pages, got ${count}.`);
    const target = resolve(assets, 'portfolio-ahnjaegwon.pdf');
    await writeFile(target + '.tmp', pdf);
    await rename(target + '.tmp', target);
    const version = createHash('sha256').update(pdf).digest('hex').slice(0, 12);
    const htmlPath = resolve(root, 'print.html');
    const html = await readFile(htmlPath, 'utf8');
    if (!html.includes('data-pdf-version=')) throw new Error('PDF version attribute is missing.');
    await writeFile(htmlPath, html.replace(/data-pdf-version="[^"]*"/, `data-pdf-version="${version}"`));
    console.log(`Exported ${count} A4 pages: assets/portfolio-ahnjaegwon.pdf (${version})`);
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
