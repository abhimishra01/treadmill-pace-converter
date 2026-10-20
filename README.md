# Treadmill pace converter

Free browser tool for treadmillpaceconverter.com. Converts treadmill speed (mph, km/h) to pace (min/mile, min/km) and back, shows the nearest speed a treadmill can hold, an incline-adjusted flat-ground pace estimate (ACSM running equation), and 5K, 10K, half and marathon times. Settings are saved in the browser. No backend.

Built with Astro (static) and Tailwind 4, Retro print skin.

## Where things live
- `src/lib/pace.js`: all math (pure functions). `tests/pace.test.mjs`: known-answer tests.
- `src/components/Tool.astro`: the converter UI. `Article.astro` and `src/data/faq.ts`: page text (tables are generated from the tested lib).
- `src/site.config.ts`: name, domain, brand, IDs. `src/lib/url.ts`: links that work under a sub-path.

## Commands
- `npm run dev`, `npm test`, `npm run build`, `npm run deploy` (Cloudflare Pages, needs `npx wrangler login`).

## GitHub Pages
`.github/workflows/pages.yml` builds on push to `main` and publishes to https://abhimishra01.github.io/treadmill-pace-converter/ with `PAGES_BASE` and `PAGES_SITE`. Pages builds are noindex. Canonical always points to the real domain.

## Formula
Flat-equivalent speed = speed x (1 + 4.5 x grade). From the ACSM running equation VO2 = 0.2S + 0.9SG + 3.5. Estimate only.
