# Code review: minimalism lens (treadmill-pace-converter)
Verdict: already small (pace.js 104 lines, Tool script about 190). A few dead or overridden bits. Must-fix: 0.

Known template leftovers not repeated.

| Sev | file:line | Finding | Why | Fix |
|---|---|---|---|---|
| should | src/components/Tool.astro:30, 46, 58 | The Tailwind classes `aria-[invalid=true]:border-red-600` on the three inputs are dead in the Retro skin. skin-retro.css:51 sets `border: 2px solid var(--edge)` on `#tool input[type="text"]` with higher specificity. Measured: an invalid input keeps the ink border. | Dead code, and the intended red border never shows. | Add `#tool input[aria-invalid="true"] { border-color: #b91c1c }` (dark: lighter red) in skin-retro.css and drop the Tailwind class. |
| should | src/lib/pace.js:91 (`secondsSavedPerMile`) | Field is computed in `describe()` and used only by one test. Tool.astro recomputes the gain itself (Tool.astro:221). | Duplicate logic, one copy unused by the page. | Use it in the Tool (convert for km) or delete it and its test lines. |
| nice | src/lib/pace.js:73-75 (`raceSeconds`, used at :94-95) | One-line wrapper for a multiplication. | Needless indirection. | Inline `paceSecPerKm * r.km`. |
| nice | src/components/Tool.astro:10 | `sm:shadow-[6px_6px_0_0_var(--line)]` on `#tool` is overridden by the skin (`box-shadow: 6px 6px 0 var(--shadow-ink)`). | Dead class, confusing next to the skin rule. | Delete the class. |
| nice | src/components/Tool.astro:132-133 (`.cell .u` twice) | `.cell .u` is declared twice (lines for colour and for display). | Duplicate rule. | Merge into one. |
| nice | src/components/Tool.astro:117-129 (`.chip`, `.seg-face`, `.step`) plus skin-retro.css | Border, radius and background of these three controls are set in both places. | Two files to edit for one look. | Keep structure in Tool.astro and look in the skin only. |
| nice | package.json | `wrangler` is a dev dependency (351 MB node_modules total) used only by `npm run deploy`. | Heavy for a static site. | Keep (template choice) or call `npx wrangler` on demand. |

Checked: no unused imports in Tool.astro or pace.js; no leftover demo code; no external fonts or scripts; home page HTML is 34.6 KB (8.4 KB gzip).
