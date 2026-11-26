# M&M: Mango's Millions — build report

**File:** `fnb230/fnb230-mod13-mangos-millions.html` (single file, no external dependencies). **Built:** Nov 25, 2026; final review Nov 26, 2026. **Status:** final review complete, ready for Brett's play-test and publishing. Not merged to `main`, not uploaded to decisionfish.com.

Inputs and sources: `fnb230-mod13-mangos-millions-INPUTS.md`. Decisions: brief §17. Questions: `fnb230-mod13-mangos-millions-MCQ-DRAFT.md`. Engine and test scripts: `fnb230/mangos-millions-sim/`.

## Rounds as built

| Company | Today | Top of curve before news | Top after news | Ideal moves (step 1 → bet) | Do-nothing band (before / after) | Model value vs market EV ($B) | Model rating today |
|---|---|---|---|---|---|---|---|
| Nike (small up) | −1% | 63% | 66% | 63% → 66% | 63–73% / 66–76% | 32.5 vs 54.0 (−40%) | net cash |
| Delta Air Lines (small down) | 13% | 68% | 66% | 68% → 66% | 68–79% / 66% | 41.9 vs 62.9 (−33%) | AAA |
| Con Edison (no change) | 38% | 39% | 39% | 39% → 39% | 39% / 39% | 49.7 vs 72.1 (−31%) | A− |
| Charter (big down) | 84% | 39% | 14% | 39% → 14% | 39% / 14% | 93.6 vs 126.6 (−26%) | CCC |
| Alphabet (big up) | −4% | 68% | 88% | 68% → 88% | 68–79% / 88% | 1,239 vs 3,218 (−61%) | net cash |

Target outcomes: all five held (small up / small down / no change / big down / big up), re-verified after the Nov 25 resizing.

## Unit test battery (§11)

| Check | Result |
|---|---|
| Scoring logic | Pass. Best play = 100/100 (each round 5 + 10 + 5). |
| Simulation, every path | Pass. 45,265 (step 1 × bet) paths enumerated. Best path in every round equals the rule path (value-maximizing move after transaction costs). Worst = 0 every round. |
| Best / safe / worst | Best 100. Staying put every time with all questions right: 39 (Con Ed hold earns 14 of 15 move points; other rounds 0). Worst 0. |
| Screen flow | Pass. Start → 5 × (set, news, bet, reveal, explain) → debrief → board review. No dead ends. |
| Mango tells | Pass. Reliable throughout; the one not-in-the-mood moment (Round 2) uses 🐱 and says so. |
| Reflection moment | Pass. Charter reveal opens a held screen; Continue is disabled for 4 seconds; a fast tap during the hold does not skip it. |
| Results page | Pass. Score, label, per-round table, best/safe/worst line, screenshot ⓘ with five platforms. |
| Accessibility | Pass. All buttons and the slider ≥ 44px. Chart drag control fully keyboard-operable (role="slider", arrow keys, Page Up/Down, Home/End); focus stays on the chart after each change; Tab + Enter confirms. Touch tap and mouse drag tested. Contrast not machine-checked (see below). |
| Reading load | Pass. Words per game screen at 360px: 71–164 (highest: Nike reveal, 164, now with breakdown and required-return row). Optional explorer ~205 words. |
| Layout | Pass. No sideways scrolling at 320px or 360px on any screen tested. |
| Single file / offline | Pass. No `script src`, `link`, or `img` references; system fonts only. |
| Edge cases | Pass. Double-tap on Confirm plays one round. Reload mid-game offers "Continue where you left off" at the same step. Reduced motion shows final values at once and skips curve animation. |

## UX profiles (§10)

| Profile | Outcome | Label | Notes |
|---|---|---|---|
| Fast tapper (keeps every default, picks the second reason) | 14 / 100 | Back to the numbers | Gets points only for the Con Ed hold. Cannot skip the reflection screen. |
| Default accepter (keeps today's level every time, answers correctly) | 39 / 100 | Back to the numbers | The game never rewards staying put except where it is right (Con Ed). |
| Careful reader | 100 / 100 possible | Board favorite | All screens under 200 words. |
| Non-native English speaker | — | — | One word per idea, using the textbook's terms defined at first use: debt, debt level, firm value, benefit of debt, cost of bankruptcy risk, credit spread, transaction costs. Idioms removed in the copy pass. Read-aloud check still needed by Brett. |
| Disengaged / grade-motivated | Low unless they read the curve | — | Answer order is shuffled per student; "always the first answer" does not work. Step 1 chart is visible, so step-1 points are easy to get (by design: it teaches reading the curve). |
| Highly engaged | 100 possible | Board favorite | Depth: breakdown table, do-nothing band, after-cost line, company data ⓘ. |
| Keyboard / screen reader | Full play possible | — | Arrow keys move the slider; Tab/Enter for buttons. Not tested with an actual screen reader. |

## Departures from the spec or brief (with reasons)

1. **Labels compare with the best possible move, not the safe choice** (spec §5). Brett's decision; doing nothing is correct in the Con Ed round. A correct hold gets "Right to hold."
2. **No Tier 1 question** (brief §4 asked for a two-tier MCQ). Brett dropped it: the slider bet already records direction and size. One "Why?" question, 5 points; feedback still flags a right call with the wrong reason, using the bet.
3. **News flashes changed** from the brief's draft. Earnings news cannot move the best debt level in the textbook's method (Lasher §14.4e). Nike now changes the market risk premium (lender-rate news can't produce a small move because of the rating kinks); Delta, Charter change lender rates; Alphabet's tax rate goes to 35%.
4. **Slider extends to −10%** for companies with more cash than debt (Nike, Alphabet).
5. **Firm value uses EBIT × (1 − T) ÷ WACC** (brief), while Lasher p. 623 divides operating income by WACC. Changes levels, not the best debt level.
6. **Risk-free rate is the 10-year Treasury** (brief), while Lasher p. 623 uses short-term T-bills. Brett chose to keep the 10-year.
7. **No sound.** Web Audio is optional (§1); "juice" is visual (slider bump, live chart marker, count-ups, curve morph, news flash).
8. **Credit-rating strip under the chart from Round 1** (visual pass, Nov 25). It explains the kinks the moment students see them. It adds one more thing to read in the guided round; remove or delay it if play-testing shows overload (spec §4, progressive disclosure).
9. **No slider: students drag (or tap) the line on the chart** (Brett, Nov 26). The chart is an ARIA slider: arrow keys, Page Up/Down, Home/End. Vertical page scroll still works on phones (touch-action: pan-y).
10. **No mood emoji on Mango's avatar** (Brett, Nov 26). Spec §7 asks for emoji tells; Mango is reliable here, and her one not-in-the-mood moment says so in words ("Purr. Not in the mood…").
11. **Breakdown from Round 1** (Brett, Nov 26), not Round 2 as the brief planned; the guided round shows one more table.
12. **Look-back navigation** (Brett, Nov 26): Back re-reads earlier screens with every scored choice locked; browser/phone back stays inside the game. Tested: choices unchanged after back/forward; two browser-back presses stay on the page.
13. **Optional model explorer** (Brett, Nov 26): tutorial from the start screen, wrap-up from the board review. Unscored. About 205 words (240 with the perfect-world note open), slightly over the 200-word decision-screen budget; it is not a decision screen.
14. **Name field on the start page**, so the screenshot identifies the student (as in Leverage Legends).

## Still unverified or limited

- **Transaction costs** come from 1990–94 data (LLRZ 1996). Fees have likely fallen. **Buyback costs are not included**; no source found.
- **Charter's EBIT** includes only about 6 weeks of Cox earnings, while its debt includes all of Cox's. The model rates Charter CCC (real-world about BB+) because it charges today's rate on all debt.
- **Nike's EBIT** sign on net interest ($0.05B) not confirmed; effect under 2%.
- **Yahoo's Charter market cap** ($26.4B) does not match any share count found; the build uses 148.05M shares × $135.87.
- **The model says Nike, Delta and Alphabet should hold 63–68% debt.** Real levels are about 0–15%. Mango's debrief line addresses this.
- **Contrast** was chosen to pass AA (light text on dark navy, dark text on cream) but not machine-measured.
- **Screen reader** behavior not tested with VoiceOver/TalkBack.

## Final review (Nov 26, 2026)

**Checks run and passed:** JavaScript syntax; best play 100/100; stay put 39; fast tapper 14; all 45,265 choice paths with the best path equal to the rule path in all five rounds; personas (debt-is-free 27, debt-is-dangerous 29, timid 74, overshooter 64, direction-only 48, with all reasons right); keyboard on the chart and explorer sliders; touch tap; reload resume; double-tap; read-only Back with locked choices; browser back stays in game; reduced motion; no external files; no sideways scroll at 320/360px; 44px targets; explorer stages, locked axis, reset keeping the step.

**Full text read** of every screen and feedback branch (best, stay-put and wrong-answer playthroughs, explorer). Fixed in this pass: a correct hold at Con Ed with a wrong reason was told "The market fooled you" (now "Right call, but that's not the reason"); Nike's −1% start was unexplained in the guided round (now in its description).

**Learning objectives**
| SLO | Where it lives | Status |
|---|---|---|
| 1. Firm value and capital structure | Every chart; breakdown in every reveal (benefit of debt, cost of bankruptcy risk, transaction costs); explorer | Built |
| 2. MM Independence Hypothesis | Explorer step 1 (flat curve); debrief Mango line | Feel built; paraphrase left to assignment |
| 3. Taxes in MM; M&A premiums | Alphabet tax round; benefit-of-debt row; explorer step 2 | Taxes built; M&A link left to the LBO assignment question (Brett, Nov 26) |
| 4. Optimal structure with levered beta | Engine uses Hamada every round; every reveal now shows shareholders' required return and levered beta, plan → call | Feel built, numbers visible; calculation left to Queens Quality question |

**Decided in the final review (Brett):** add the required-return/levered-beta row (SLO 4); leave M&A to the assignment (SLO 3); shorter Alphabet hint; keep the model's deal size on the deal toy (Alphabet best play shows $1,167 billion; Charter's paydown ~$25B vs. $107B real, a consequence of model firm value below market).

**Likely student reactions to watch in class:** surprise that the model wants 60–90% debt (Mango's debrief line addresses it); the very large Alphabet numbers; Nike as the heaviest-reading round; the chart drag on small phones.

## Publishing (§14), not done yet

Merge to `main`, upload to decisionfish.com as `fnb230-mod13-mangos-millions.html`, replace the OneDrive copy in `2. Areas > Coding`, and add an entry to the Notion "Educational Games & Simulations" page.
