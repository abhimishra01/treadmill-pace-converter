# Code review: regression lens (treadmill-pace-converter)
Verdict: the arithmetic is correct in every case recomputed by hand, and the ACSM incline equation is used correctly. The copy overstates two things (the 15% limit, the 1% rule) and the citations are incomplete. Must-fix: 2.

## Formula check (ACSM running equation)
- Equation in code and article: VO2 (ml/kg/min) = 0.2 x S + 0.9 x S x G + 3.5, S = speed in m/min, G = grade as a fraction. Source: American College of Sports Medicine, ACSM's Guidelines for Exercise Testing and Prescription, metabolic calculations (running equation). The 0.2 (horizontal) and 0.9 (vertical) coefficients and the 3.5 resting term are the ACSM values. Confirmed through a peer-reviewed paper that restates it: Hippokratia 2013, "Indirect estimation of VO2max in athletes by ACSM's equation: valid or not?", https://pubmed.ncbi.nlm.nih.gov/24376318/ (equation as written, "only valid with steady state exercise ... speeds greater than 5.0 mph (134 m/min)").
- Flat equivalent: set the same VO2 at G = 0: 0.2 x S0 + 3.5 = 0.2 x S + 0.9 x S x G + 3.5, so S0 = S x (1 + 4.5 G). The 3.5 terms cancel and the ratio holds in any speed unit. Derivation in pace.js:64-70 and the test at tests/pace.test.mjs (VO2 identity) are correct.
- I could not open the ACSM book. Edition and table number are not verified by me. The page names no edition at all.
- The equation is known to over-estimate absolute VO2 in athletes (14.6 percent in the Hippokratia study). That is the absolute value, not the grade term, so it does not directly change the flat-equivalent ratio. Other published incline models (for example Minetti et al., 2002, J Appl Physiol) give a different grade penalty. I did not verify those numbers, so I make no claim here; the page should say "estimate" (it does) and name its one source.
- Jones and Doust (1996) is cited correctly in substance: J Sports Sci 14(4):321-327, nine trained men, 2.92 to 5.0 m/s (6.5 to 11.2 mph), grades 0 to 3 percent versus a level road. Source: https://pubmed.ncbi.nlm.nih.gov/8887211/ . The abstract says 1 percent matched at the middle speeds, while at the two lowest speeds 0 or 1 percent matched, and at the highest speed the match sat between 1 and 2 percent.

## Hand recomputation (all match the live page)
| Case | Hand result | Page |
|---|---|---|
| 6 mph | 3600/6 = 600 s = 10:00 per mile; 9.656 km/h; 372.8 s = 6:13 per km | 10:00, 9.66, 6:13 |
| 7.5 mph | 8:00; 12.07 km/h; 298.3 s = 4:58 | same |
| 8:30 per mile | 3600/510 = 7.0588 mph; nearest 0.1 step 7.1 = 507.04 s = 8:27; 316.9 s = 5:17 per km | 7.06, 8:27, 5:17 |
| 7.5 mph at 5% | 7.5 x 1.225 = 9.1875 mph = 391.8 s = 6:32; saved 88 s = 1:28 | 6:32 (9.19 mph), 1:28 |
| 6 mph at 1% | 6 x 1.045 = 6.27 mph = 574.2 s = 9:34; saved 26 s | 9:34, 0:26 |
| 12 km/h at 3% (km mode) | 12 x 1.135 = 13.62 km/h = 264.3 s = 4:24 per km | 4:24 (13.62 km/h) |
| 0.5 mph (low edge) | 7200 s = 120:00 per mile; 74:34 per km; 5K 22369 s = 6:12:49 | same |
| Race times at 7.5 mph | 5K 1491 s = 24:51; marathon 12585 s = 3:29:45 | 24:51, 3:29:45 |
| Article tables at 7:00, 9:00, 12:00 per mile | 21:45 / 43:30 / 1:31:46 / 3:03:32 (7:00); 27:58 / 55:55 / 1:57:59 / 3:55:58 (9:00) | match (node recompute) |
| FAQ and article prose | 60/7 = 8.571, 0.571 x 60 = 34 s = 8:34; 9-minute mile 6.67 mph = 10.73 km/h; 0.1 mph step moves a 10:00 mile 9.8 s; 3 s faster at 7.1 | all correct |
Input edges: "6,5" accepted; "-2", "abc", "26 mph", "40.1 km/h", pace "1:00", "8:75" rejected with a message; 25 mph x 15% gives 41.9 mph.

## Template rules
Canonical points to the real domain on every page and on the Pages build; Pages build adds noindex and uses the /treadmill-pace-converter/ base on every link, icon, manifest and OG image (all 200 over a local server); `_headers` has the pages.dev noindex rule; legal pages linked in the footer; 404 exists and is noindex and not in the sitemap; sitemap lists 5 URLs; GA and AdSense output nothing while IDs are empty (0 matches in built HTML); ads.txt is a comment while AdSense is off. All pass.

| Sev | file:line | Finding | Why | Fix |
|---|---|---|---|---|
| must | src/components/Tool.astro:90, Article.astro:62 | "up to 15% incline" and "grades up to about 15%" are stated as the equation's valid range. ACSM does not state this in anything I could find; the speed limit (above 5 mph) is documented, the 15% is not. The tool also caps the input at 15. | Honest-copy rule: no invented facts. | Say "this tool allows up to 15%" (a tool limit), and remove it as an ACSM limit. |
| must | src/components/Tool.astro:90, Article.astro:56-62, About, FAQ | The formula is cited as "ACSM running equation" with no edition, year or link. Jones and Doust has the year but no journal. Spec says cite every formula. | Readers and reviewers cannot check the source. | Add a short "Sources" list: ACSM's Guidelines for Exercise Testing and Prescription (name the edition you hold, for example 11th ed., 2021, Wolters Kluwer); Jones AM, Doust JH. J Sports Sci 1996;14(4):321-327 with the PubMed link. |
| should | src/components/Tool.astro:209-225 | The flat-ground result shows at any speed. Below 5 mph the running equation does not apply (a walker at 3.5 mph and 2% gets "15:44 per mile", about 1:25 faster). The only warning is small static text. | The equation is outside its range for walkers, and the older-adult persona is one of the research users. | When speed is under 5 mph (8 km/h), replace the flat-equivalent line with "Estimate not shown below 5 mph (8 km/h). This equation is for running." or add the ACSM walking equation (0.1 S + 1.8 S G) with its own label. |
| should | src/components/Article.astro:65-66, src/data/faq.ts:8 | Jones and Doust is summed up as "1% matched outdoor running". The speed range (6.5 to 11.2 mph) and the finding that 0 or 1 percent matched at the slowest speeds are left out. FAQ says "fits best at moderate speeds", which is fair but unsourced. | Overstates a study of nine men. | State the range and sample ("nine trained men, 6.5 to 11.2 mph"). |
| nice | src/lib/pace.js:78 | No upper cap on flat equivalent (25 mph at 15% shows 41.9 mph, 1:26 per mile). | Meaningless extreme. Covered by the below-5-mph fix only on the low side. | Warn above about 14 mph or cap. |
| nice | src/components/Tool.astro:145 | km limit 0.8 stores 0.497 mph, so 0.8 km/h reads back as 74:34 (not 75:00) after a unit switch. | Round-trip rounding at the edge. | Use one limit constant (see maintainer report). |
