# M&M: Mango's Millions — build report

**File:** `fnb230/fnb230-mod13-mangos-millions.html` (single file, no external dependencies). **Built:** Nov 25, 2026. **Status:** first build, ready for Brett's play-test. Not merged to `main`, not uploaded to decisionfish.com.

Inputs and sources: `fnb230-mod13-mangos-millions-INPUTS.md`. Decisions: brief §17. Questions: `fnb230-mod13-mangos-millions-MCQ-DRAFT.md`. Engine and test scripts: `fnb230/mangos-millions-sim/`.

## Rounds as built

| Company | Today | Top of curve before news | Top after news | Ideal moves (step 1 → bet) | Do-nothing band (before / after) | Model value vs market EV ($B) | Model rating today |
|---|---|---|---|---|---|---|---|
| Nike | −1% | 63% | 75% | 63% → 75% | 63–73% / 75% | 32.5 vs 54.0 (−40%) | net cash |
| Delta Air Lines | 13% | 68% | 32% (flat top 30–62%) | 68% → 62% | 68–79% / 32–62% | 41.9 vs 62.9 (−33%) | AAA |
| Con Edison | 38% | 39% | 39% | 39% → 39% | 39% / 39% | 49.7 vs 72.1 (−31%) | A− |
| Charter (Spectrum) | 84% | 39% | 14% | 39% → 14% | 39% / 14% | 93.6 vs 126.6 (−26%) | CCC |
| Alphabet | −4% | 68% | 81% | 68% → 81% | 68–79% / 81% | 1,239 vs 3,218 (−61%) | net cash |

Target outcomes: all five held (more / less / no change / pay down most / extreme). Delta's "less debt" holds on the ideal path (68% → 62%); a student who stayed at 13% in step 1 is told to move *up* to 32%.

## Unit test battery (§11)

| Check | Result |
|---|---|
| Scoring logic | Pass. Best play = 100/100 (each round 5 + 10 + 5). |
| Simulation, every path | Pass. 45,265 (step 1 × bet) paths enumerated. Best path in every round equals the rule path (value-maximizing move after transaction costs). Worst = 0 every round. |
| Best / safe / worst | Best 100. Staying put every time with all questions right: 39 (Con Ed hold earns 14 of 15 move points; other rounds 0). Worst 0. |
| Screen flow | Pass. Start → 5 × (set, news, bet, reveal, explain) → debrief → receipt. No dead ends. |
| Mango tells | Pass. Reliable throughout; the one not-in-the-mood moment (Round 2) uses 🐱 and says so. |
| Reflection moment | Pass. Charter reveal opens a held screen; Continue is disabled for 4 seconds; a fast tap during the hold does not skip it. |
| Results page | Pass. Score, label, per-round table, best/safe/worst line, screenshot ⓘ with five platforms. |
| Accessibility | Pass. All buttons and the slider ≥ 44px. Slider fully keyboard-operable; focus stays on the slider after each change; Tab + Enter confirms. Native range input with `aria-valuetext`. Contrast not machine-checked (see below). |
| Reading load | Pass. Words per screen at 360px: 85–168 (highest: Delta reveal, 168). |
| Layout | Pass. No sideways scrolling at 320px or 360px on any screen tested. |
| Single file / offline | Pass. No `script src`, `link`, or `img` references; system fonts only. |
| Edge cases | Pass. Double-tap on Confirm plays one round. Reload mid-game offers "Continue where you left off" at the same step. Reduced motion shows final values at once and skips curve animation. |

## UX profiles (§10)

| Profile | Outcome | Label | Notes |
|---|---|---|---|
| Fast tapper (keeps every default, picks "About the same" and the second reason) | 16 / 100 | Back to the numbers | Gets points only for the Con Ed hold. Cannot skip the reflection screen. |
| Default accepter (keeps today's level every time, answers correctly) | 39 / 100 | Back to the numbers | The game never rewards staying put except where it is right (Con Ed). |
| Careful reader | 100 / 100 possible | Board favorite | All screens under 200 words. |
| Non-native English speaker | — | — | One word per idea (debt, debt level, firm value, tax benefit, cost of rising rates, transaction costs). "Spread" never appears; written as "charge … above the Treasury rate." Read-aloud check still needed by Brett. |
| Disengaged / grade-motivated | Low unless they read the curve | — | Answer order is shuffled per student; "always the first answer" does not work. Step 1 chart is visible, so step-1 points are easy to get (by design: it teaches reading the curve). |
| Highly engaged | 100 possible | Board favorite | Depth: breakdown table, do-nothing band, after-cost line, company data ⓘ. |
| Keyboard / screen reader | Full play possible | — | Arrow keys move the slider; Tab/Enter for buttons. Not tested with an actual screen reader. |

## Departures from the spec or brief (with reasons)

1. **Labels compare with the best possible move, not the safe choice** (spec §5). Brett's decision; doing nothing is correct in the Con Ed round. A correct hold gets "Right to hold."
2. **Tier 1 has three options, not four** (brief §4). "Moved a lot" had no clean answer in the engine.
3. **News flashes changed** from the brief's draft for Nike and Charter: both now change lender rates, because in the textbook's method (Lasher §14.4e) earnings news cannot move the best debt level.
4. **Slider extends to −10%** for companies with more cash than debt (Nike, Alphabet).
5. **Firm value uses EBIT × (1 − T) ÷ WACC** (brief), while Lasher p. 623 divides operating income by WACC. Changes levels, not the best debt level.
6. **Risk-free rate is the 10-year Treasury** (brief), while Lasher p. 623 uses short-term T-bills. Brett chose to keep the 10-year.
7. **No sound.** Web Audio is optional (§1); "juice" is visual (slider bump, live chart marker, count-ups, curve morph, news flash).
8. **Credit-rating strip under the chart from Round 1** (visual pass, Nov 25). It explains the kinks the moment students see them. It adds one more thing to read in the guided round; remove or delay it if play-testing shows overload (spec §4, progressive disclosure).
9. **Name field on the start page**, so the screenshot identifies the student (as in Leverage Legends).

## Still unverified or limited

- **Transaction costs** come from 1990–94 data (LLRZ 1996). Fees have likely fallen. **Buyback costs are not included**; no source found.
- **Charter's EBIT** includes only about 6 weeks of Cox earnings, while its debt includes all of Cox's. The model rates Charter CCC (real-world about BB+) because it charges today's rate on all debt.
- **Nike's EBIT** sign on net interest ($0.05B) not confirmed; effect under 2%.
- **Yahoo's Charter market cap** ($26.4B) does not match any share count found; the build uses 148.05M shares × $135.87.
- **The model says Nike, Delta and Alphabet should hold 63–68% debt.** Real levels are about 0–15%. Mango's debrief line addresses this.
- **Contrast** was chosen to pass AA (light text on dark navy, dark text on cream) but not machine-measured.
- **Screen reader** behavior not tested with VoiceOver/TalkBack.

## Publishing (§14), not done yet

Merge to `main`, upload to decisionfish.com as `fnb230-mod13-mangos-millions.html`, replace the OneDrive copy in `2. Areas > Coding`, and add an entry to the Notion "Educational Games & Simulations" page.
