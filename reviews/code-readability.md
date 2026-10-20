# Code review: readability lens (treadmill-pace-converter)
Verdict: clear names, short functions, helpful comments, README matches the code. A few stale or misleading comments and one risky static sentence. Must-fix: 0.

Known template leftovers not repeated (build-date year, hard-coded Last updated).

| Sev | file:line | Finding | Why | Fix |
|---|---|---|---|---|
| should | src/lib/pace.js:100-101 (`nearestSetting` comment) | Comment says "the speed a treadmill can really be set to ... next to a speed, and the pace it gives". The function returns only a speed. | Comment promises more than the code does. | "Nearest treadmill setting (steps of 0.1) for a speed." |
| should | src/components/Tool.astro:191 (`paintResult(from: 'speed' | 'pace' | 'other')`) | `'other'` means "not typed by the user". Only `'pace'` has an effect (shows the nearest-setting hint). Result: changing the incline removes the hint. | Name hides the behaviour; the hint disappears for no clear reason. | Pass a boolean `showNearest`, and keep the hint until the speed changes. |
| should | src/pages/privacy.astro:18 | "Right now the site sets no advertising or analytics cookies." is static text that depends on site.config. | Becomes false when IDs are set. | See maintainer report. |
| should | src/components/Tool.astro:145 and src/lib/pace.js:11-12 | Speed limits live in two files in different units. | A reader must find both. | One constant block in pace.js. |
| nice | src/components/Tool.astro:15 | Comment "First paint matches the default state" is right, but a saved km or incline state flashes 6 mph until the script runs (no layout shift, measured CLS 0). | Small honesty gap in the comment. | Add "then the script restores saved settings". |
| nice | src/components/Tool.astro:158-165 | State shape `{unit, mph, incline}` is saved under key `treadmill-pace-v1`; mph is always the base unit, and nothing says so. | Easy to break when adding a unit. | One-line comment: "mph is the single source of truth". |
| nice | src/site.config.ts:15 | Comment on `skin` lists "minimal, swiss, clay or retro" correctly. `owner` is the site name, not a person; privacy and terms use it as the legal owner. | Legal pages name "Treadmill Pace Converter" as owner. | Set a real owner name before launch. |
| nice | README.md | Accurate (files, commands, Pages, formula). Missing: how to add a unit or change the incline cap, and the source list once added. | New engineer questions. | Add two lines. |

Checked: no placeholder, lorem, TODO, em dash or vendor text anywhere in src or README; all copy is US English; About, Privacy, Terms, Contact and FAQ read as finished. Terms and units are consistent (mph, km/h, "min per mile", "per km").
