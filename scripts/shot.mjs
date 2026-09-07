/**
 * Screenshots a built page at phone and desktop width and reports any element
 * wider than the viewport. Run against the static export:
 *
 *   npx serve out   (or python3 -m http.server 8099 from out/)
 *   node scripts/shot.mjs /thinkers/schmitt/ [dark]
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const route = process.argv[2] ?? '/';
const theme = process.argv[3] ?? 'light';
const base = process.env.BASE_URL ?? 'http://localhost:8099';
const outDir = process.env.SHOT_DIR ?? '/tmp/shots';
mkdirSync(outDir, { recursive: true });

const name = route.replaceAll('/', '_').replace(/^_|_$/g, '') || 'home';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});

for (const [label, width, height] of [
  ['phone', 360, 1200],
  ['desktop', 1280, 1400],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.addInitScript((value) => {
    try {
      localStorage.setItem('theme', value);
    } catch {}
  }, theme);
  await page.goto(base + route, { waitUntil: 'networkidle' });

  const report = await page.evaluate((viewportWidth) => {
    const wide = [];
    for (const el of document.querySelectorAll('body *')) {
      const rect = el.getBoundingClientRect();
      if (rect.width > viewportWidth + 1 || rect.right > viewportWidth + 1) {
        wide.push(
          `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ').slice(0, 3).join('.')} w=${Math.round(rect.width)} right=${Math.round(rect.right)}`,
        );
      }
    }
    return {
      scrollWidth: document.documentElement.scrollWidth,
      offenders: wide.slice(0, 8),
    };
  }, width);

  console.log(
    `${label} ${width}px  scrollWidth=${report.scrollWidth}${report.scrollWidth > width ? '  OVERFLOW' : '  ok'}`,
  );
  for (const offender of report.offenders) console.log(`   ${offender}`);

  await page.screenshot({ path: `${outDir}/${name}-${label}-${theme}.png`, fullPage: label === 'phone' });
  await page.close();
}

await browser.close();
