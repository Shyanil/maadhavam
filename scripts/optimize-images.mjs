// One-off image optimizer: resizes oversized photos and re-encodes everything
// to WebP at high quality. Run with: node scripts/optimize-images.mjs
// (requires `npm install sharp`)
import sharp from 'sharp';
import { statSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const ASSETS = fileURLToPath(new URL('../src/assets/', import.meta.url));
const kb = (n) => (n / 1024).toFixed(0) + 'KB';

// [file, maxWidth (0 = keep native), quality]
const JOBS = [
  ['ps_sansara.webp', 1600, 80],
  ['vinayak_21_acre.webp', 1600, 80],
  ['dtc_still_waters.webp', 0, 80],
  ['hero_image_2.webp', 1600, 82],
  ['bhawani_paraiso.webp', 0, 80],
  ['eden_devprayag.webp', 0, 80],
];

let before = 0;
let after = 0;

for (const [file, maxW, quality] of JOBS) {
  const p = path.join(ASSETS, file);
  const sizeBefore = statSync(p).size;
  let img = sharp(p);
  const meta = await img.metadata();
  if (maxW && meta.width > maxW) img = img.resize({ width: maxW });
  const buf = await img.webp({ quality, effort: 6 }).toBuffer();
  writeFileSync(p, buf);
  before += sizeBefore;
  after += buf.length;
  console.log(`${file.padEnd(26)} ${kb(sizeBefore).padStart(7)} -> ${kb(buf.length).padStart(7)}`);
}

// PNG photo -> WebP
{
  const src = path.join(ASSETS, 'about_us.png');
  const out = path.join(ASSETS, 'about_us.webp');
  const sizeBefore = statSync(src).size;
  const buf = await sharp(src)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();
  writeFileSync(out, buf);
  before += sizeBefore;
  after += buf.length;
  console.log(`${'about_us.png -> .webp'.padEnd(26)} ${kb(sizeBefore).padStart(7)} -> ${kb(buf.length).padStart(7)}`);
}

console.log('—'.repeat(46));
console.log(`TOTAL${' '.repeat(21)} ${kb(before).padStart(7)} -> ${kb(after).padStart(7)}  (${((1 - after / before) * 100).toFixed(0)}% smaller)`);
