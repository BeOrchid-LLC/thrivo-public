#!/usr/bin/env node
/**
 * Generates public/og-image.png — the branded social-preview card used for
 * og:image / twitter:image (see lib/constants/texts.ts SEO_DETAILS.image).
 *
 * Re-run with `npm run generate:og-image` whenever the wordmark, tagline, or
 * brand colors change. Uses satori (JSX-like layout -> SVG) + resvg (SVG ->
 * PNG) so the output is a static file — no edge runtime, no request-time
 * rendering, and no dependency on Next's internal og-image route resolution.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import * as wawoff2 from 'wawoff2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

const INK = '#1A1A2E';
const MUTED = '#737373';
const GREEN = '#27AE60';

/**
 * satori needs a static-weight TTF/OTF/WOFF font buffer — Google Fonts only
 * serves variable fonts or WOFF2 for Inter now (satori can't parse WOFF2's
 * brotli compression). @fontsource ships static-weight WOFF2 files, so fetch
 * one and decompress it back to raw sfnt bytes with wawoff2.
 */
async function loadFontsourceFont(family, weight) {
  const url = `https://unpkg.com/@fontsource/${family}@5/files/${family}-latin-${weight}-normal.woff2`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${family} @${weight} from fontsource (${res.status})`);
  }
  const woff2Buffer = Buffer.from(await res.arrayBuffer());
  return Buffer.from(await wawoff2.decompress(woff2Buffer));
}

/** Inline T-mark from public/icons/logo.svg, reused so this script stays a single file. */
function LogoMark({ size }) {
  return {
    type: 'svg',
    props: {
      width: size,
      height: size,
      viewBox: '0 0 80 80',
      children: [
        {
          type: 'path',
          props: {
            d: 'M30.1369 0C41.0313 0 49.863 8.83164 49.863 19.726V70.137C49.863 75.5842 45.4471 80 39.9999 80C34.5528 80 30.1369 75.5842 30.1369 70.137V0Z',
            fill: '#09823C',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M19.726 19.726C8.83163 19.726 -3.86044e-07 10.8944 -8.62252e-07 -1.14441e-05L30.137 -1.27614e-05C41.0314 -1.32376e-05 49.863 8.83163 49.863 19.726L19.726 19.726Z',
            fill: '#09823C',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M49.8629 8.62251e-07C38.9686 3.86043e-07 30.1369 8.83165 30.1369 19.726L60.2739 19.726C71.1683 19.726 79.9999 10.8944 79.9999 2.17958e-06L49.8629 8.62251e-07Z',
            fill: '#F39C12',
          },
        },
      ],
    },
  };
}

async function main() {
  const [interBold, interExtraBold] = await Promise.all([
    loadFontsourceFont('inter', 700),
    loadFontsourceFont('inter', 800),
  ]);

  const markup = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: '90px 96px',
        position: 'relative',
      },
      children: [
        // Faint brand glow, top-right — matches the hero's decorative glow without
        // compromising the "white background" brief.
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: -180,
              right: -180,
              width: 560,
              height: 560,
              borderRadius: 9999,
              display: 'flex',
              background: `radial-gradient(circle, ${GREEN}26 0%, ${GREEN}00 70%)`,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 56 },
            children: [
              LogoMark({ size: 72 }),
              {
                type: 'span',
                props: {
                  style: { fontSize: 56, fontWeight: 800, color: INK, fontFamily: 'Inter' },
                  children: 'Thrivo',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: 44,
              fontWeight: 700,
              color: INK,
              fontFamily: 'Inter',
              maxWidth: 820,
              lineHeight: 1.25,
            },
            children: 'Weight loss without the nonsense.',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              marginTop: 28,
              fontSize: 26,
              color: MUTED,
              fontFamily: 'Inter',
              fontWeight: 400,
            },
            children: 'Honest pricing. Real food logging. A cancel button that works.',
          },
        },
      ],
    },
  };

  const svg = await satori(markup, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      { name: 'Inter', data: interExtraBold, weight: 800, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
  const png = resvg.render().asPng();

  await writeFile(OUTPUT_PATH, png);
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_PATH)} (${png.length} bytes)`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
