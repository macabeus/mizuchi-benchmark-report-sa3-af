// Assembles the full GitHub Pages site into `_site/`:
//
//   _site/
//     index.html          homepage (from site/index.html) listing every benchmark
//     logo.png            shared logo referenced by the homepage
//     sonnet-4-6/         the Sonnet 4.6 report (this repo's multi-page app, built here)
//       index.html          benchmark-index → comparison / comparison-af / aggregated
//     fable-5/            the Fable 5 report (vendored self-contained build)
//       index.html
//
// The Sonnet report is built with a base of `${SITE_BASE}sonnet-4-6/` so its
// asset URLs and its internal links (comparison/, comparison-af/, aggregated/)
// resolve under that subfolder. SITE_BASE defaults to the repo's Pages path.
//
// Usage:  node scripts/build-site.mjs
//         SITE_BASE=/my-fork/ node scripts/build-site.mjs

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_BASE = process.env.SITE_BASE || '/mizuchi-benchmark-reports/';
const SONNET_BASE = `${SITE_BASE}sonnet-4-6/`;

const OUT = path.join(ROOT, '_site');
const DIST_BENCHMARK = path.join(ROOT, 'dist-benchmark');
const SITE_SRC = path.join(ROOT, 'site');

function run(cmd, env) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit', env: { ...process.env, ...env } });
}

// 1. Build the Sonnet 4.6 multi-page report under the sonnet-4-6/ base.
console.log(`\n▸ Building Sonnet 4.6 report (base ${SONNET_BASE})`);
run('npm run build:benchmark', { VITE_BASE_URL: SONNET_BASE });

// 2. Assemble _site.
console.log(`\n▸ Assembling ${path.relative(ROOT, OUT)}/`);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// homepage + logo (logo sourced from the shared asset, not duplicated in git)
fs.copyFileSync(path.join(SITE_SRC, 'index.html'), path.join(OUT, 'index.html'));
fs.copyFileSync(path.join(ROOT, 'src/ui/shared/assets/logo.png'), path.join(OUT, 'logo.png'));

// fable-5 (vendored) → _site/fable-5
fs.cpSync(path.join(SITE_SRC, 'fable-5'), path.join(OUT, 'fable-5'), { recursive: true });

// sonnet report build → _site/sonnet-4-6
fs.cpSync(DIST_BENCHMARK, path.join(OUT, 'sonnet-4-6'), { recursive: true });

// 3. Report what landed.
const list = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .map((d) => (d.isDirectory() ? `${d.name}/` : d.name))
    .sort()
    .join('  ');
console.log(`\n✓ _site assembled:`);
console.log(`  /                ${list(OUT)}`);
console.log(`  /sonnet-4-6/     ${list(path.join(OUT, 'sonnet-4-6'))}`);
console.log(`  base = ${SITE_BASE}`);
