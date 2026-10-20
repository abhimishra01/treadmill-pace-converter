# Mock-customer test (treadmill-pace-converter)
Five personas used the production build in playwright. Dana, Rick and Marcus-style km flows used real clicks and typed fields at their viewport; Jordan, Marcus (numbers) and Priya were driven partly by script calls that set field values and fire input events, plus real viewport checks. Notes are in each persona's voice after the run. Answers were checked by hand (see code-regression.md).

## Dana, 34, Chicago, iPhone 14 (390x844). Winter 10K plan
Real task: "My plan says 8:30 per mile. What do I set the belt to? And what is that with 1% incline?"
She typed 8:30 in the pace box. The page said 7.06 mph and "Nearest treadmill setting: 7.1 mph, which is 8:27 per mile". She set 1% and got "8:08 per mile (7.38 mph)".
"Would I click this? Yes, the title says exactly what I typed. Done in 15 seconds. The nearest-setting line is the best part, no other site does that. It confused me that the hint vanished when I added the incline. The result box is under the pace box, so I scrolled with the keyboard up. I would bookmark it if I could type my 10K goal time and get the pace. I trust it, the numbers match my watch app."

## Rick, 67, Florida, iPhone SE (375x667). Daily walks
Real task: "3.5 mph walking. What is my mile time? What if I add 2% incline?"
17:09 per mile at 3.5 mph. With 2% the page said "15:44 per mile on flat ground, 1:25 faster".
"The first answer is good and the big buttons are easy. The incline answer worries me. The small print says it is for running 5 mph and up, but I am walking and it still gave me a number. Is it right? I do not know. The plus and minus buttons are large, good. I would come back for the mile time only."

## Jordan, 20, Michigan, laptop (1280). Intramural 5K
Real task: "I want a 22:00 5K. What speed?"
He could not do this directly. He tried 7:05 per mile by hand and read the 5K time: 22:00 at about 7:05.
"I clicked in because of the title. The tool is fast and clean. But I think in target time, not pace. I wanted to type 22:00 and pick 5K. The race table works one way only. I would not bookmark it until it does the reverse. Tables below are nice for a screenshot."

## Marcus, 41, Austin, desktop (1280). Marathon runner, uses km/h at 1% on a gym treadmill
Real task: "12 km/h at 3% incline, what is the flat pace? Half marathon time at that?"
Km mode: 12 km/h = 5:00 per km; 3% gives 4:24 per km (13.62 km/h); race table has a Flat equivalent column.
"Good: units remember, chips for km, second column for the flat equivalent. The one number I want to copy into my notes has no copy button. I want the 1% outdoors rule shown as a toggle next to the result, not buried in the article. I want a source link for the 4.5% per percent claim. The article says ACSM but not which book. Trust is medium until I see the source."

## Priya, 29, Seattle, Android (360x740). Coach for a school team, prints chart for the bench
Real task: "Show me a chart of every treadmill speed 5.0 to 9.0 with the pace and 5K time. I print it."
She used the chips and the chart in the article. The chart has 14 speeds in uneven steps (3, 4, 5, then 0.5 steps) and no 5K column.
"The tool is quick on my phone. But my kids use treadmills with 0.1 steps and I want one printable page. No print button, and the chart is far down the page. A top-of-page link to the chart would help. The page did not break at 360 wide. Plus and minus buttons are large enough."

## Ranked changes
| Rank | Sev | Change | Asked by |
|---|---|---|---|
| 1 | must (UX) | Show the result where the user can see it while typing on a phone (sticky result or result above the pace box). | Dana, Rick, Priya (3 of 5) |
| 2 | should | Add "target race time to pace and speed" (type 22:00, pick 5K). | Jordan, Dana, Marcus (3 of 5) |
| 3 | should | Copy result, print page and a full 0.1-step speed chart (with 5K time) near the tool. | Marcus, Priya, Dana (3 of 5) |
| 4 | should | Under 5 mph, do not show a running-equation flat pace for walkers, or use a walking equation with its own label. | Rick (1 of 5, strong) |
| 5 | should | Add a named source with edition and link for the incline formula, and state the 1% rule's range. | Marcus, Rick (2 of 5) |
| 6 | should | Keep the "nearest setting" hint when the incline changes. | Dana (1 of 5) |
| 7 | nice | Add a "+1% outdoor feel" shortcut next to the incline chips. | Marcus, Dana (2 of 5) |
| 8 | nice | Stale race table and flat box after an invalid entry (shown dashes above, old times below). | Observed in all runs with bad input |
