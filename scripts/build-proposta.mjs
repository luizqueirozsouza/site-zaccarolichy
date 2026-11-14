import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../../../propostas');
const src = path.join(root, 'zaccaro-lichy-site.html');
const out = path.join(root, 'zaccaro-lichy-site.pdf');

let html = fs.readFileSync(src, 'utf8');
const imgs = [...html.matchAll(/src="(assets\/[^"]+)"/g)].map((m) => m[1]);
for (const rel of imgs) {
  const file = path.join(root, rel);
  const width = /mobile/.test(rel) ? 900 : 1600;
  const buf = await sharp(file).resize({ width }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  html = html.split(`src="${rel}"`).join(`src="data:image/jpeg;base64,${buf.toString('base64')}"`);
}
const tmp = path.join(root, '.build.html');
fs.writeFileSync(tmp, html);
console.log('imagens embutidas:', imgs.length);

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
await page.goto('file:///' + tmp.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(700);

const widths = await page.evaluate(() => [...document.images].map((i) => i.naturalWidth));
if (widths.some((w) => w === 0)) throw new Error('alguma imagem não carregou: ' + JSON.stringify(widths));

await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });

const pages = await page.$$('.page');
for (let i = 0; i < pages.length; i++) {
  await pages[i].screenshot({ path: path.join(root, 'assets', `p${i + 1}.png`) });
}

await browser.close();
fs.unlinkSync(tmp);
console.log('paginas:', pages.length, '| pdf:', out, Math.round(fs.statSync(out).size / 1024) + ' KB');
