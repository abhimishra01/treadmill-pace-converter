# Fix summary (treadmill-pace-converter, 2026-10-20)
Fixed:
- Stale flat box and race table after invalid input (blank() now clears them).
- Flat equivalent hidden below 5 mph (FLAT_MIN_MPH in pace.js) with a short note; test added.
- 15% incline cap now worded as this tool's own limit (Tool, Article).
- Sources block added (ACSM book, Hippokratia 2013 PubMed 24376318, Jones and Doust 1996 PubMed 8887211); linked from tool, article and About.
- Jones and Doust wording now states nine trained men, 6.5 to 11.2 mph, and the slow and fast speed results (Article, FAQ).
- One set of speed limits in pace.js (MIN_KMH, MAX_KMH); red invalid-field border in skin-retro.css; nearest-setting hint kept when incline changes; dead classes, duplicate CSS rule and raceSeconds wrapper removed; header Contact link hidden under 340 px; privacy "right now no cookies" sentence removed; tmp-*/ and dist-pages ignored.
- Pages build checked under /treadmill-pace-converter/ (home, about, privacy load, noindex present, canonical is the real domain).
Rejected / not done:
- Sticky result on phones, target-time mode, copy/print, 5K-column chart, DOM tests, error-on-blur: new features or larger changes, left for a later pass.
- Heading outline change, wrangler dependency: nice items, kept.
Status: npm test 19/19 pass; npm run build OK; screenshots at 1280 and 390, light and dark, in screenshots/ (ignored). Lighthouse not re-run (scores were 98/100/100/100 before; changes are small).
For the owner: the ACSM edition and table number are not verified (no edition is claimed on the page); add it if you hold the book. Set a real owner name before launch.
