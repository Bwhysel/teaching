# Game Brief: M&M: Mango's Millions (FNB 230 Module 13)

**Status:** First build done, November 25, 2026 (see §17 and `fnb230-mod13-mangos-millions-BUILD-REPORT.md`). Awaiting Brett's play-test. Where this brief and §17 disagree, §17 is current.
**Read first:** `GAME_DESIGN_SYSTEM.md` (attach the full file). This brief covers only what is specific to this game. Section numbers in brackets, such as [§5], refer to the design system.
**Output file:** `fnb230-mod13-mangos-millions.html` [§14].
**Title:** "M&M: Mango's Millions." The second meaning of M&M (Modigliani and Miller) is revealed in the debrief, not on the start page. Write the title as plain text; do not style it like the candy brand's logo.

---

## 1. Learning objectives

From the Module 13 SLOs (Brett, Nov 24, 2026). Confirm against the Module 13 agenda slides [§4 Pedagogy].

1. Summarize how the value of a firm is calculated and may depend on the capital structure.
2. Paraphrase the Miller-Modigliani Independence Hypothesis and its relevance to capital structure strategy.
3. Illustrate the effect of taxation in MM Theory and how this may explain why certain mergers and acquisitions occur at high premiums.
4. Estimate the optimal capital structure using levered beta.

**Mapping to game moments**

| SLO | Game moment | Built here or left to assignments |
|---|---|---|
| 1 | Every round: firm value moves as the student sets the debt level; the reveal shows where the change came from (tax benefit vs. cost of rising rates) | Built here (feel and breakdown) |
| 2 | Debrief only: "If there were no taxes and no bankruptcy costs, the curve would be flat and no debt level would beat another." | Feel only; the paraphrase itself is left to assignments |
| 3 | Tax benefit line in every reveal; the Alphabet tax-hike round | Built here; the M&A premium link is left to the Module 13 Assignment (LBO question) |
| 4 | The engine uses levered beta at every debt level; students see ke rise as they add debt | Feel built here; the calculation is left to the Module 13 Assignment (Queens Quality question) |

---

## 2. Setting and narrative

The student is a new CFO advisor sent to five real, recognizable companies. At each one, the board asks one question: "Can you make our shareholders richer by changing how much we borrow?" Then the news changes, and the student has to decide whether to change the plan.

Cultural relevance [§3]: Con Edison and Spectrum (Charter) send bills to most BMCC students' homes; Nike and Delta are everyday brands; Alphabet is Google and YouTube.

Start page: narrative, stakes, and Mango only. No learning objectives listed [§2].

---

## 3. Companies and round order

Rounds run in this order. Round 1 is the guided round [§4 UX].

| Round | Company | Profile | Target outcome of the news flash |
|---|---|---|---|
| 1 (guided) | Nike | Moderate debt, consumer brand | More debt |
| 2 | Delta Air Lines | Capital-heavy, cyclical | Less debt |
| 3 | Con Edison | Regulated utility, already high debt | No change |
| 4 | Charter Communications (Spectrum) | Very high debt after the Cox merger (closed Aug 2026) | Pay down most debt |
| 5 | Alphabet | Almost no net debt, very large taxable income | Extreme change: much more debt |

**Let the numbers decide.** The targets above are goals, not facts. After the engine is built, run each scenario. If a news flash does not produce its target outcome with real inputs, report it and propose a different flash or company pairing. Do not tune inputs to force the outcome. The set must keep at least one "more," one "less," one "no change," one "pay down most," and one "extreme" round.

---

## 4. Round structure (every round)

1. **Set the debt level now.** The student sees the company's current debt level and a debt slider. The value chart for the current assumptions is visible. The student picks a debt level. Moving from the current level has a cost (see §6), so staying put is a real choice.
2. **Breaking news.** An invented but plausible news flash changes **one** assumption. Mango gives one line of context, not the answer.
3. **Bet.** With the updated chart **hidden**, the student sets the slider to where they think the new best debt level is. This is the prediction.
4. **Reveal.** The new chart animates in. The result counts up [§4 UX]: net value created by the student's move, compared with the best possible move. The breakdown shows tax benefit, cost of rising rates, and transaction costs.
5. **Explain (two-tier MCQ).** Tier 1: what happened to the best debt level (moved toward more debt / less debt / stayed about the same / moved a lot). Tier 2: why (pick the reason). Correct tier 1 with wrong tier 2 must be visible in feedback.

Target time per round: 2 to 3 minutes. Keep each decision screen at or under about 200 words [§4 UX].

**Progressive disclosure [§4 UX]**
- Round 1: debt slider and value chart only. Mango walks through three short numbered steps, then steps back.
- Round 2: add the breakdown (tax benefit vs. cost of rising rates).
- Round 3: add the transaction-cost line on the chart (the "do nothing" round).
- Rounds 4 and 5: everything visible.

---

## 5. Engine (textbook framing)

Follow the course textbook, Chapter 14 (Sections 14.4c to 14.4e): MM with taxes, the benefit of debt (TB), and the Trade-Off Model, where bankruptcy risk shows up as rising required returns. Do not use full APV with a separate distress-cost line.

For each debt ratio w (debt / total value), on a grid from 0% to 90% in 1% steps:

1. **Unlevered beta** from the company's current beta and current market D/E: `bU = bL_current / (1 + (1 - T) * D/E)` (Hamada).
2. **Levered beta:** `bL(w) = bU * (1 + (1 - T) * w / (1 - w))`.
3. **Cost of equity:** `ke(w) = rf + bL(w) * MRP`.
4. **Cost of debt:** Damodaran synthetic rating. Interest coverage = EBIT / interest → rating → default spread → `kd(w) = rf + spread`. Interest depends on kd and on the dollar debt, which depends on firm value, so solve by iteration at each w until it converges.
5. **WACC:** `ka(w) = w * kd(w) * (1 - T) + (1 - w) * ke(w)`.
6. **Firm value:** `V(w) = EBIT * (1 - T) / ka(w)` (no-growth perpetuity, as in the textbook).
7. **Breakdown for the reveal:**
   - Tax benefit = T × D(w) (textbook Eq. 14.21)
   - Cost of rising rates = Tax benefit − (V(w) − V(0))
   - Transaction costs (see §6)
8. **Net value created by a move** from w_old to w_new = V(w_new) − V(w_old) − transaction costs.

**Open issue to raise before building:** model V at the current debt level will not equal the company's market enterprise value. Propose one of these to Brett and wait for his choice: (a) scale EBIT so model V matches market EV at the current debt level, or (b) report all results as changes from the current value, not as levels.

---

## 6. Transaction costs (asymmetric)

A recapitalization changes both debt and equity:
- **Levering up:** issue debt and buy back stock.
- **Levering down:** issue stock (or use cash) and retire debt.

Use two rates, each applied to the dollar amount of debt moved:
- `COST_UP` (levering up)
- `COST_DOWN` (levering down), higher than `COST_UP`, because issuing equity is the most expensive step.

**Research required [§9]:** find and cite typical underwriting spreads for investment-grade bonds and for seasoned equity offerings, plus typical buyback costs. Set both rates from those sources and list them as assumptions on screen. If no source can be verified, report it; do not approximate.

---

## 7. Inputs and data

**Snapshot rule:** all market inputs come from one snapshot date, shown on screen ("Data as of …"). Betas are Yahoo Finance 5-year monthly betas for all five companies. Pull current values from Yahoo and the latest 10-Q / 10-K on the build date, and record each source in the build report.

Preliminary values found Nov 25, 2026. **All must be verified at build.**

| Company | Market cap | Debt | Beta (5Y monthly) | Tax rate | EBIT | Notes |
|---|---|---|---|---|---|---|
| Nike | ~$53–56B | ~$11.1B (Q1 FY27) | ~1.05 | verify | verify | |
| Delta | ~$52.6B | net debt ~$15.3B (EV − market cap) | ~1.31 (Yahoo) | ~19% | verify | |
| Con Edison | ~$44B | ~$27.8B | ~0.22–0.26 | ~15–22% | verify (operating income ~$3.4B) | Low beta means very low ke; check the curve looks sensible |
| Charter | ~$15–21B (share count changed with merger; use 10-Q cover) | principal ~$108.6B, cash ~$0.6B (Sep 30, 2026) | ~0.70 | ~22% | verify | Q3 had a large non-cash impairment; use EBIT before impairment and say so |
| Alphabet | ~$3.5–4.2T | ~$90B | ~1.25 | ~18% | verify (operating income ~$138B TTM) | Large cash balance; decide gross vs. net debt and apply the same rule to all five |

**Other inputs (verify and cite):**
- `rf`: current 10-year U.S. Treasury yield on the snapshot date.
- `MRP`: Damodaran's implied equity risk premium (latest monthly update).
- Spread table: Damodaran's synthetic rating table for large non-financial firms (latest January update).

All of these live in one constants block at the top of the file [§1].

---

## 8. News flashes (invented, plausible)

Brett chose invented news so the game stays usable year after year. Each flash changes **one** assumption. Label them on screen as hypothetical news. The mechanism behind each must be real [§9].

| Round | Company | Draft flash | Assumption changed |
|---|---|---|---|
| 1 | Nike | A turnaround steadies earnings | Business risk (unlevered beta) ↓ |
| 2 | Delta | Recession fears hit airlines, and lenders widen spreads | Credit curve steeper (spreads ↑ at every rating) |
| 3 | Con Edison | A loud headline about a regulatory review that barely changes risk | Business risk slightly ↑ |
| 4 | Charter | Cord-cutting speeds up and fiber competition grows | Business risk ↑ (and/or EBIT ↓; pick one) |
| 5 | Alphabet | Congress raises the corporate tax rate sharply | Tax rate ↑ |

Size each shock so the target outcome holds after transaction costs (see §3, "let the numbers decide").

---

## 9. Scoring

Simulation game, scored by outcome plus explanation [§5].

- **Steps 1 and 3 (debt choices):** score by net value created as a share of the best possible net value created in that situation (after transaction costs). Thresholds set by simulation.
- **Step 5 (two-tier MCQ):** 5 points; tier 1 and tier 2 both correct for full points. Partial credit for tier 1 only (justification: tier 1 shows the student read the result; tier 2 shows understanding).
- **Results page:** total score, round-by-round net value, short comment, screenshot instructions with the ⓘ steps [§5].

**Spec conflict to resolve with Brett before building:** [§5] says "Labels compare with the safe choice, so doing nothing is never rewarded as skill." In this game, doing nothing is the correct move in the Con Edison round, and staying near the current level may be right in other rounds once transaction costs apply. Proposed fix: compare each choice with the **best possible move** in that round, not with doing nothing, so staying put earns full credit only when it is actually best. Confirm before building.

---

## 10. Mango 😼

**Role:** advisor and explainer. Reliable. She explains hard ideas in plain English with New York attitude. She never gives away the bet.

- Tone: teasing but on the student's side. Snarky, never mean [§7]. When a student is wrong, she teases the market, not the student, then explains.
- Writes like a person: short, natural, grammatical sentences. No broken English, no slogans, no idioms a non-native speaker would miss [§3, §7].
- Once or twice she says she's not in the mood or just purrs [§7].
- Front page line, true to her role, for example: "Mango knows this stuff. She'll explain, but she won't make your call."
- Debrief reveal line (draft): "Those other M&M? Modigliani and Miller. Two economists who won Nobel Prizes for the idea you just played."
- Sample lines (Brett approved the tone):
  - Before a bet: "Listen, tax rates just went up. Every dollar of interest saves you more now. You do the math on what that means for debt. I'll wait. 😼"
  - After a wrong call: "Ehh, you went left and the curve went right. Happens to Wall Street guys every day. Here's what you missed: higher taxes make the tax shield worth more, so the best debt level moves to the right. You'll get the next one."

Because Mango is reliable in this game, the "wrong-advice tell" rule [§7] applies only to the not-in-the-mood moments.

---

## 11. Reflection moment [§8]

Proposed: the Charter round reveal. Hold the screen while the chart shows how much value a heavily indebted company loses when risk rises, and how expensive it is to get out (the levering-down cost). Mango says one line. Not skippable by fast tapping.

---

## 12. Visual and UX direction

Brett wants the chart and sliders to be **gorgeous** and to use current UX thinking, within the design system's limits (single file, no frameworks, no CDN, system fonts) [§1].

- Hand-built SVG chart: smooth value curve, a clear marker for the current debt level, the student's choice, and (after reveal) the best level. Label lines on the chart, not in a key [§4 UX].
- Animate the curve change on reveal; respect reduced motion.
- Large, touch-friendly custom slider (44px target), keyboard operable, with live value readout and haptic-style visual feedback ("juice") [§4 Fun].
- Breaking-news moment styled as a news alert or ticker.
- "Do nothing" band: after round 3 unlocks it, shade the range where moving costs more than it gains.
- Whole dollars on game screens [§4 UX]; values in billions with one unit word used everywhere.
- Plain English, one word per idea [§3]: use "debt," "debt level," "firm value," "tax benefit," "cost of rising rates," and "transaction costs" consistently.

---

## 13. Optional mechanics [§6]

None opted in. No random results, no paid tips, no timer, no multi-stage.

---

## 14. The rule the game teaches [§3]

"Add debt while the tax benefit is worth more than the rising cost of risk, and only move when the gain is bigger than the cost of moving."

The best strategy in simulation must follow this rule in every round. If it doesn't, change the mechanic, not the debrief.

---

## 15. Departures and open questions (resolve before code)

1. Safe-choice label rule vs. correct "do nothing" round (§9 above).
2. Model value vs. market enterprise value calibration (§5 above).
3. Gross vs. net debt rule, applied the same way to all five companies.
4. Name note: the game's numbers are in billions. Mango covers the gap once, for example: "I said millions. I was being modest. 😼"
5. Overlap with Leverage Legends (FNB 230 Modules 11–12): check that vocabulary matches ("debt," "return") and that this game doesn't repeat its mechanic.
6. Two-tier MCQ copy for each round: Brett to review before build.

---

## 16. Build report must include

Everything in [§13], plus:
- Every input with its value, source, and snapshot date.
- For each round: the current best debt level, the post-news best level, the do-nothing band, and whether the target outcome held.
- Any number still unverified (especially transaction-cost rates).

---

## 17. Decisions (Brett, Nov 25, 2026)

| # | Question | Decision |
|---|---|---|
| 1 | Safe-choice label rule vs. correct "do nothing" round | This is a new sim; nothing carries over from Leverage Legends labels. Score each round against the **best possible move**. Spec departure from [§5] "labels compare with the safe choice"; log in build report. Label names to be written fresh. |
| 2 | Model V vs. market EV | No calibration. Show the formula's firm value with real reported inputs; **any** discrepancy from market EV is acceptable. Report each company's gap in the build report. |
| 3 | Gross vs. net debt | **Net debt** (debt minus cash), applied to all five companies. |
| 4 | "Millions" name note | **Dropped.** Mango does not comment on millions vs. billions. |
| 5 | Overlap with Leverage Legends | Checked: mechanic does not repeat (LL = random-results funding mix for a small business; M&M = deterministic value curve and prediction after news). Vocabulary: keep "debt"; use "shareholders" (not "partner"); keep "cost of rising rates" distinct from LL's "debt rate"; debrief maps "debt level" → Capital structure, as in LL. |
| 6 | Two-tier MCQ copy | Claude drafts both tiers **after** the engine run; Brett reviews and edits before build. |
| 7 | Neutral starting state [§4 UX] (added) | Slider **starts at the current debt level**; Confirm stays locked until the student touches the slider; keeping the current level requires a deliberate "Keep current level" tap. |
| — | Rating-table kinks | **Keep the kinks.** V(w) shows the steps from the Damodaran synthetic rating table; do not smooth. |
| — | Step-3 bet baseline | Measure the step-3 move (and its transaction cost) from **where the student left the slider in step 1**, compared with the best move available from that spot. |
| — | Engine-first check | Run all five curves (especially Alphabet and Con Edison) and show Brett before building any screens. |
| — | Companies with more cash than debt (Nike, Alphabet) | Extend the slider **below 0%** with a small "more cash than debt" zone, so net-cash companies start where they really are. |
| — | Charter equity count | Class A shares + Cox's 33.6M exchangeable Charter Holdings common units (148.05M shares). Cox's $6.0B convertible preferred excluded. Claude's call at Brett's request. |
| — | Engine method | **Brief's engine as written (option A)**: dollar debt = w × model firm value, solved by iteration. Most consistent with Lasher Ch. 14, §14.4e / Example 14-9, where k_d depends only on % debt. Damodaran-style fixed-value method rejected. Consequence: earnings news cannot move the best debt level; news flashes must change lender rates (spreads), tax rate, beta, rf, or MRP. |
| — | Risk-free rate | Keep the 10-year Treasury (4.85%), though Lasher p. 623 uses short-term T-bills. |
| — | News flashes (revised Nov 25 after engine run) | 1 Nike: lenders cut rates at every debt level (spreads ×0.7) → best level 63% → 75%. 2 Delta: lenders double airline spreads (×2) → 68% → 62%. 3 Con Ed: regulatory headline, beta +10% → 39% → 39%. 4 Charter: cord-cutting, lenders double spreads (×2) → 39% → 14% (from current 84%). 5 Alphabet: tax rate to 28% → 68% → 81% (from current −4%). All five targets hold. |
| — | Two-tier questions | Brett reviewed the draft (`fnb230-mod13-mangos-millions-MCQ-DRAFT.md`): all fine. Tier 1 = more / less / about the same (brief's "moved a lot" dropped; engine gives no clean answer). |
| — | Partial credit | Tier 1 only = **2 of 5** points. |
| — | Model limits | Add **one Mango line** in the debrief: real CFOs borrow less than this model says (room for bad years, credit rating). |
| — | Move sizes (Brett, Nov 25) | The set must include **small up, small down, and no change**, plus the brief's big moves. Revised flashes: 1 Nike **small up** — market risk premium 4.41% → 4.91% (63% → 66%); lender-rate cuts can't make a small move for Nike because of the rating kinks. 2 Delta **small down** — lenders charge 25% more (68% → 66%). 3 Con Ed **no change** (39%). 4 Charter **big down** — lenders double rates (39% → 14%). 5 Alphabet **big up** — tax rate restored to 35% (68% → 88%). |
| — | Tier 1 question dropped (Brett, Nov 25) | "Not sure we need a question for this. The student has sliders." The bet already records direction and size. Explain step = **one "Why?" question, 5 points**; no partial credit. Feedback still flags "right call, wrong reason" using the bet's direction. Supersedes decision 6's two-tier format and the 2-of-5 partial credit. |
| — | Student's role (Brett, Nov 26) | "CFO advisor" is not a real title. Student is **a new analyst in an investment bank's Capital Structure Advisory group** (real groups: Moelis, Raymond James, Baird). Results page is a **Board Performance Review** ("Capital Structure Advisory"), replacing the receipt. |
| — | Controls and Mango avatar (Brett, Nov 26) | Students **drag the vertical line on the chart** (or tap the chart) instead of using a slider. Mango's avatar shows **no mood emoji**. |
| — | Breakdown and Back (Brett, Nov 26) | Reveal **breakdown shown from Round 1** (Nike), introduced by Mango there. **Back button** lets students re-read earlier screens; scored choices stay locked. The phone/browser back gesture does the same instead of leaving the game. |
| — | Sandbox / tutorial (Brett, Nov 26) | Considered and **declined**: no lever-playing tutorial on a made-up company. Model exploration stays in class and the assignment. |
| — | Copy pass (Nov 26) | Removed AI-style phrasing ("where the top goes," "Sit with this one," "Five boardrooms. One question," "Headlines are loud"), idioms ("jitters," "cord-cutting," "borrowed big," "go to your head"), and the leftover word "slider." The rule now says "cost of rising rates" instead of the brief's "rising cost of risk," to keep one word per idea. |
| — | Model explorer (Brett, Nov 26; replaces the earlier "no sandbox" decision) | Optional **"How the model works"** button on the start screen and **"Explore the model"** on the board review. Sample company ($10B EBIT) with live curve, rating strip and Best marker; sliders for tax rate, what lenders charge, Treasury rate, market risk premium, and business risk (beta), each with one plain sentence. Directions checked against the engine (Treasury rate is mixed; beta raises the best level, with a note that real-world riskier firms borrow less). A "Modigliani and Miller's perfect world" switch flattens the curve (SLO 2). Unscored. |
| — | Jargon and explorer details (Brett, Nov 26) | **Use finance jargon when it is defined first.** "Credit spread" is defined in Delta's news ("the extra rate lenders charge above the Treasury rate") and used again for Charter; the explorer slider is "Credit spread." Explorer explanations appear as **one live line under the chart** for the slider last moved (screen readers get each slider's sentence on focus). Added **transaction-cost sliders** (cost to issue bonds, cost to issue stock) with the sample company at 20% debt today, the after-cost line and the do-nothing band. Checked: bond fees (0–3%) never change the band or the best move; stock fees widen the band above the best level (0% → 62%; 3% → 62–72%). Sentences say so. |
| — | Explorer sentences (Brett, Nov 26) | Live lines say only what each input is and why it matters, never its effect; students see the effect on the chart. Beta keeps a real-world note (riskier companies usually borrow less). The perfect-world note now asks "What happens to the curve?" instead of saying it goes flat. |
| — | Replays (Brett, Nov 26) | Deterministic results are acceptable; no per-student variation or attempt counter. |
| — | Explorer stages and spread units (Brett, Nov 26) | Tutorial opens on the textbook sequence: **1 Independence Hypothesis** (Lasher Fig. 14-11; no taxes, borrow at the Treasury rate, flat curve) → **2 MM with taxes** (Fig. 14-12; curve rises to 90%) → **3 Trade-off model** (Fig. 14-13). Sliders turn on by stage. **Credit spread slider shows basis points for a BBB rating** (111 bp default, Damodaran Jan 2026), not a multiplier. |
| — | Board question (Brett, Nov 26) | "Can you **create shareholder value** by changing how much we borrow?" replaces "make our shareholders richer" (start screen and every company card). Supported by Lasher p. 619: the value added by debt accrues to stockholders. |
| — | Explorer layout (Brett, Nov 26) | Sliders that cannot change the chart in the current stage sit at the bottom, dimmed (stage 1: tax, credit spread, both transaction costs; stage 2: credit spread). **Y-axis locked** to a range that fits all three stages at default inputs; it widens only if a setting pushes the curve past the edge, and resets with "Reset all inputs." |
| — | Deal toy and tutorial lines (Brett, Nov 26) | **Deal toy** above the board review for the round with the most firm value created (both moves): company legal name and ticker, recapitalization size (debt raised or retired, model dollars), debt from → to, firm value created, Capital Structure Advisory, student name, month. Skipped if no round created value; Mango says "Small deal. Still counts." under $1 billion. **Tutorial chart:** after-transaction-cost line removed; a gray dashed **starting line** (default inputs for the current stage) appears once any slider moves, next to the current curve. Do-nothing band kept. |
| — | Do-nothing band display (Brett, Nov 26) | Keep the name "do nothing." Legend swatch is a shaded rectangle, not a line. The band (and its legend entry) shows only when the region spans at least two debt levels; a single point is not drawn. Consequence: no band in Con Ed (its region is one point, 39%), so Con Ed's Mango line now introduces only the after-cost line, and Alphabet's line introduces the band (first real band: 68–79% before the news). |
| — | Wording (Brett, Nov 26) | Drop the word "band" on screen: legend says "Do nothing"; Alphabet's Mango line says "The gray area means do nothing." |
| — | Reset (Brett, Nov 26) | "Reset all inputs" restores the sliders and the axis but keeps the current theory step. |
