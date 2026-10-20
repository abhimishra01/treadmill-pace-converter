# Design and SEO review (treadmill-pace-converter)
Tested on a production build served locally, Chrome (Lighthouse) and playwright at 1280, 390, 375, 360, 320, light and dark, 2026-10-20.

## Scores (Lighthouse via npx, headless Google Chrome)
| Run | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile | 98 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |
Mobile LCP 1.5 s, CLS 0, TBT 0 ms. Home HTML 34.6 KB (8.4 KB gzip), one CSS file and one JS file. No web fonts.

Verdict: strong. Clearly cleaner and faster than the small calculator sites in the research. The Retro print skin and the edge-contrast fix are applied (input edges are ink, measured about 15:1). Must-fix: 0 design, 0 SEO.

| Sev | Area | Finding | Fix |
|---|---|---|---|
| should | Phone layout | On a 390x844 phone the "Your pace" box starts at y=670 and ends at y=993. The user types in the speed or pace field above it. With the keyboard open the result is not on screen. Same at 375x667 and 360x740. | Put the four result cells and the status line in a sticky strip under the header on phones, or move the result above the pace field. |
| should | Phone layout | At 320 px wide the header overflows (scroll width 339): the theme button is clipped and "Pace" touches "About". Fine at 360 and up. | Hide the "Contact" header link under 340 px, or shrink the logo text. |
| should | Error state | Invalid input shows red text under the field, but the field border stays ink (the Tailwind red border is overridden by the skin). The red text alone is the only cue. | Add an `aria-invalid` border rule in skin-retro.css. |
| should | Trust | The formula is named but not sourced (no edition, no link). The page has no author or "last reviewed" line. Health-adjacent pages are judged on this. | Add a "Sources" block under the incline section and a "Reviewed" date. |
| nice | Heading outline | The tool's own h2 headings ("Your pace", "Flat-ground equivalent", "Race time at this pace") come before the article h2s. Outline is valid, but search sees UI labels as page sections. | Make the three tool headings `p` or `h3` with the same look. |
| nice | Content | The speed chart (3 to 12 mph) sits in the article far below the tool. Research panel asked for "a table I can screenshot". There is no copy, share or print button. | Add a "Copy result" button and a print stylesheet for the chart. |
| nice | Content | Article is 847 words, 3 tables, worked example, 8 FAQ items. Enough for the query. No link to related tools (barbell family) in the footer or article. | Add a "More gym tools" line once the sibling sites are live. |
| nice | Hero | The intro paragraph is hidden on phones (`hidden sm:block`). The tool appears at once, which is good. Title and description are fine (52 and 134 characters). | None. |
| nice | Dark mode | Dark theme checked at 390 and 1280: contrast good, shadows read as black offsets, selected chips stay blue. | None. |

## SEO check
- Title "Treadmill Pace Converter: mph, km/h and Min per Mile" (52 characters); one H1 matching the query; meta description present; canonical to the real domain on every page; robots.txt and sitemap-index present; sitemap has 5 URLs (404 excluded).
- JSON-LD parses: WebApplication (free offer, featureList) and FAQPage with 8 questions that match the visible FAQ text.
- OG image 1200x630 renders well (checked by eye), twitter card summary_large_image, theme-color, manifest and favicon set all present and 200 under both the root and the GitHub Pages sub-path.
- GitHub Pages build: noindex meta present, canonical still the real domain, all internal links and assets use the base path. 404 page has noindex.
- Competitor comparison (research file): small sites with dated layouts and forum threads. This page beats them on phone input, both directions, nearest-setting hint, incline and race times. Open risk from the research: a Google unit box on "mph to min/mile". Check US Google in a private window before buying the domain.
