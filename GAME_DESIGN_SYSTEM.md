# BMCC Learning Game Design System

### `GAME_DESIGN_SYSTEM.md` — Read this before building any game.

---

## Purpose

This document defines the invariant standards for a suite of single-session, browser-based learning games for BMCC finance and business courses. Every game is different. This spec captures only what must be consistent across all of them.

When a standard conflicts with a game's specific needs, flag the conflict and ask — don't override silently.

---

## How to Start a New Game

1. Attach this file to your Agent session. Do not summarize it — give Agent the full file.
2. Write a short brief: learning objectives, a rough setting idea, a rough mechanic idea.
3. Agent proposes narrative, mechanic, and how each objective maps to a game moment. Confirm before any code is written.
4. Agent builds, tests, and reports. See Section 11.

---

## 1. Non-Negotiable Technical Constraints

- **Single HTML file.** No external dependencies, no CDN links, no separate CSS or JS files.
- **No Excel, no external tools.** All calculation happens in the game.
- **Mobile-first.** Designed for a phone screen; must also work on laptop.
- **System sans-serif fonts only.** `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **No frameworks.** Vanilla HTML/CSS/JS unless the game brief explicitly specifies otherwise.
- **Score submission via screenshot.** Results page must display a clean, legible score summary suitable for a Brightspace submission.
- **Web Audio API** is available for sound if the game calls for it — not required.
- **Tunable numbers in one place.** Every number a teacher might change (returns, prices, costs, timers, unlock rounds, tip prices) lives in one constants block at the top of the file.

---

## 2. Invariant Structure

Every game has exactly these three layers:

**Start page** — Establishes narrative, stakes, and character. No learning objectives listed. Role-appropriate framing only.

**Game** — One or more rounds or scenes. Structure varies by game. See Section 4.

**Results page** — Shows final score, a short performance comment, and screenshot/submission instructions. Percentage display optional. No grade language.

A game may have more than one **stage** (for example, one per module). See Section 6.

---

## 3. Design Philosophy

These are principles, not rules. Apply judgment.

**Discovery before instruction.** Students should encounter the concept through play before it's named. Don't front-load definitions.

**Fun is load-bearing.** Engagement is not decoration. If a mechanic isn't fun, it isn't working.

**Cultural relevance is specific, not gestural.** Settings, names, and scenarios should reflect BMCC students' actual lives: NYC neighborhoods, service and retail work, real financial pressures. Avoid generic "urban" shorthand.

**Mistakes are informative.** Feedback on wrong answers explains, doesn't shame. Tone stays steady throughout.

**Minimal UI clutter.** Cut instructional text ruthlessly. If a student can figure it out by playing, don't explain it.

**Confusing is not the same as hard.** Unprepared students get lost in reading and decoding; prepared students get bored by easy decisions. Cut the first without cutting the second. Scaffold the screen, not the decision.

**The rule you teach must be the rule that wins.** The best possible strategy must follow the rule the debrief names. If the optimal path breaks the rule, change the mechanic, not the debrief.

**Story and mechanics must match.** If the story says "credit card," the mechanics must treat it like a credit card (for example, debt does not vanish when the business fails).

**Math must be verified.** Before finalizing any game with calculation, run a full computational simulation of all rounds and every choice path. Grep-based QC is not sufficient.

**Humor is specific.** Jokes earn their place through the narrative, not despite it. Forced humor is worse than none.

**Plain English, one word per idea.** Write the way a native speaker talks to a student who reads English as a second language. No idioms ("tops you up," "does not check the weather," "get loud about it"), no odd comparisons ("moves harder"), no stiff phrasing ("Everyone gets different luck"). Pick one word for each idea and use it everywhere: if the forecast says "return," the chart, the partner and the debrief say "return" too. Use "debt" on screen, and say once up front what kind of debt it is (for example, credit card debt). Read every visible line aloud before handoff.

**Use the course's own terms.** When the module slides or the textbook name a concept, use that exact term in the game (for example, "Trade-Off Model," "Independence Hypothesis," "benefit of debt," "credit spread"), so students can connect the game to their reading, the lecture and the assignment. Define each term in plain English the first time it appears, then use it the same way everywhere. Plain English governs the sentences around the terms, not the terms themselves. Don't invent a paraphrase for a concept the course already names. If the game needs a term the course doesn't use, list it in the build report. (First used in Mango's Millions.)

---

## 4. State-of-the-Art Design Principles

### Pedagogy

- **Cognitive load:** manage how much students hold at once; don't front-load rules.
- **Desirable difficulties:** retrieval practice and generation (figuring it out yourself) beat re-reading.
- **Situated cognition:** concepts stick better when embedded in authentic contexts.
- **Transfer:** design for students to apply the concept elsewhere, not just perform it here.
- **Formative feedback:** immediate, specific, explanatory — not just right/wrong.
- **Module objectives first:** map every module SLO to a game moment. Take SLOs from the module's agenda slides ("By the end of this Module…"), not only the syllabus topic list. State plainly which SLOs the game builds a feel for and which it leaves to assignments (usually the calculations).

### UX

- **Onboard by doing:** the first interaction teaches the mechanic, not a tutorial screen.
- **Guided first round:** Mango walks students through the first round in three short numbered steps, then steps back.
- **Progressive disclosure:** reveal complexity as students are ready for it. Unlock one new move per round, and introduce each with one line from Mango. Show a chart or gauge only from the round it starts to matter.
- **Tooltips that work on phones:** use a tap-to-open ⓘ button (44px target), not hover. Laptop hover labels are a bonus, not a substitute.
- **Recognition over recall:** show options; don't require students to generate answers from nothing.
- **Reduce friction:** every tap should feel purposeful; dead taps erode trust.
- **Graceful errors:** wrong paths should inform, not confuse or strand.
- **Reading budget:** aim for about 200 words or fewer per decision screen and no more than two phone screens of scrolling. Show a choice's description only when it is selected. Measure this in testing.
- **Debrief format:** one-line rule, then a two-column "What you did / What it's called" list. No paragraphs of new terms.
- **Neutral starting state:** before a student chooses, no option should look chosen (no highlighted line, no preselected gauge). If a control must start somewhere (a slider), the Run button asks the student to choose first ("Choose your mix first.").
- **Show only real choices:** if an option is not available this round (for example, the app during a lease), leave it off the chart and the comparison. Compare with what the student could actually have done.
- **Charts end where the choice ends:** a line stops where it stops being possible (for example, at the last item in stock), instead of going flat. Label lines on the chart itself rather than in a separate key.
- **Whole dollars on game screens.** Keep cents only on the receipt, which is the score students submit.
- **Explain information where the decision is made:** put supporting numbers on the option they inform (for example, likely buyers for a lease's months on the lease button), not in a general line elsewhere.
- **Reveal with suspense:** results count up in order (0, 1, 2… or 0%, +1%…), slowing near the end, not random flicker. With reduced motion, show the result at once.
- **Guided first round goes away:** the first-round hint disappears once the student makes a choice.

### Fun

- **Flow:** calibrate challenge to skill — too easy is boring, too hard is frustrating.
- **Meaningful choice:** decisions should feel consequential, not arbitrary. Let students choose amounts, not only fixed steps, when the lesson is about "how much."
- **Feedback richness ("juice"):** visual and/or audio response makes actions satisfying.
- **Narrative investment:** students should care about the character or outcome, not just the score.
- **Variability:** rounds should feel distinct, not repetitive.
- **Clear goal:** students should always know what they're working toward.

---

## 5. Scoring

Default scale: **5 or 10 points per decision**, based on demonstrated understanding.

- Award full points for correct reasoning, not just correct answers where applicable.
- Partial credit is allowed but must be explicitly justified in the game brief.
- Total score and percentage are shown on results page. Threshold labels (e.g., "Thriving," "Surviving") are game-specific.

**Simulation games** may score by outcome (ending cash, profit) instead of points, if the brief says so and the best outcome comes from following the taught rule.

- **Labels compare with the safe choice,** so doing nothing is never rewarded as skill. Example: Legend (near the best) / Rising star (beat the safe choice) / Played it safe (matched it) / Learned the hard way (below it, or went broke).
- **Report the best, the safe-choice, and the worst outcome** in the debrief so students can place their result.
- **Going broke ends the run.** Show the debrief anyway, then offer to play again. No silent restarts or forgiven debt.
- **Games with random results** (see Section 6): compare the student with the best strategy *in the same random results*, so the comparison is about choices. The receipt names the best strategy in plain words and what it would have made ("In your seasons, that would have made $2,510"). Known limitation: an outcome-based label can still reward a lucky gamble, so grade on completion or reflection, not on the label.
- **Screenshot help:** the "take a screenshot" line has an ⓘ with steps for iPhone, Android, Windows, Mac and Chromebook.

---

## 6. Optional Mechanics Toolkit

These patterns are available but must be explicitly opted into in the game brief.

**Non-punitive timer**
Rewards fast correct answers (intuition bonus) without punishing slow ones. Scoring: correct answer = base points; correct answer within timer window = base + bonus; wrong answer or timeout = 0. No point deductions. Connects to System 1 / System 2 framing.

**Scene-based identification**
Student reads a mini-scene, identifies the statement containing a nudge or bias, then names the associated concept. Distinct from quiz or classification formats. Core principle: students identify and explain, not just classify.

**Two-player / Zoom mode**
Supports live classroom or synchronous online play. Mechanics and scoring must work in both solo and paired modes. Define in brief.

**Paid tips (value of information)**
Mango sells a narrower, always-true forecast for a price, one per round. Tune so tips barely move the distribution of outcomes: the best and worst possible results stay the same, buying every tip does worse than understanding the rule, and buying tips only when the forecast is unclear does best. Verify by simulation.

*In games with random results* (first used in Leverage Legends): the tip is a sharper forecast that can still miss ("I'm usually close, but not always right"). Once bought, Mango's forecast replaces the forecast box and the chart band. Her bubble gives one piece of advice in the game's own terms plus a one-line reason with numbers ("Sit this one out. You need about +6% to cover the debt and the partner. +4% doesn't."). She says how she got the forecast (resale comps, a foot-traffic count) once, in round 1. Her advice must never contradict the rule the game teaches. The price may scale with what is at stake (for example, 10% of the stake), and Mango's purchase is a real item at about that price. Tune the price by simulation so the rule above still holds.

**Random results** (first used in Leverage Legends)
Each round's result is drawn from a normal distribution. The forecast shows the likely result (the mean) and a 1-in-10 low and 1-in-10 high (10th and 90th percentiles); results outside that range happen 1 time in 5, and the copy says the forecast can miss. Draw all results when a run starts and save them, so reloading cannot reroll. Offer a "sit out" choice so a weak forecast is a real decision; sitting out may carry a known cost (for example, storage while closed). Any counterparty that prices a deal (such as a partner) uses the same forecast the student has, so the taught rule is always right. The pause screen fires on the first big swing in any round, not a fixed round.

**Multi-stage games across modules**
One stage per module, played in different weeks. Students can start any stage from the start page. A student who continues gets a head start from their **best** earlier result (saved on the device, so replaying can't lower it). In games with random results, use the **latest** result instead, so replaying until lucky does not pay. Students without a saved result start at a floor, and anyone who did worse than the floor is topped up, so skipping never pays. Make each stage's swings larger than the head start, and judge each stage's label on that stage's own profit.

_Add new patterns here as they are established across two or more games._

---

## 7. Mango 😼

Mango is the Brooklyn Bodega Cat. Mango appears in every game but **plays a different role in each one** — unreliable mascot, coworker, bank rep, advisor, etc. Do not assume Mango is always wrong or always right.

**Invariant Mango rules:**

- New York attitude. Snarky, not mean.
- When Mango's advice is wrong, the tell must be clear and somewhat obvious — not a gotcha.
- Wrong advice should be labeled with the associated informal fallacy or bias (game-appropriate label, not academic jargon).
- Mango's role and reliability level are defined per game in the brief.
- Mango is never cruel to the student.
- There needs to be obvious tells when Mango is being unhelpful in emoji 😼 vs. 😺, and in text, e.g. exaggeration or incongruity.
- Once or twice Mango can say she's not in the mood to help or just purrs.
- Mention on the front page that Mango can help, in a way that is true to her role in this game (for an unreliable Mango: "...if she's in the mood"; for a paid advisor: "Always right, never free").
- Mango's lines stay short: one or two sentences, no idioms a non-native speaker would miss.

---

## 8. Reflection Moments

Every game must include **at least one moment** where the student is asked to sit with a result before moving on. This is not a quiz question. It is a pause — a beat — where the consequence of a decision is made visible and the student is given a moment to register it.

Implementation varies: a modal, a held screen, an animated result, a character reaction. The form should fit the narrative.

The reflection moment must not be skippable by fast tapping. If it appears after a delay, tapping "Next" during the delay should open it, not cancel it.

In games with random results, trigger it on the first big swing (for example, the stake falls by a quarter, or the student sat out a round where all debt would have fallen that much), whichever round that is.

---

## 9. Scenario Research Discipline

Every game scenario must be based on a **verifiable real-world practice**. Fabricated or assumed practices cause rework.

Before drafting scenarios:

1. Research each practice.
2. Confirm it is real and current.
3. If a practice cannot be verified, replace it — do not approximate.

Document sources in the game brief. List any number that is still unverified (for example, a rent figure) in the build report.

---

## 10. Student UX Profiles

Simulate behavior across all of these profiles before declaring a game complete.

| Profile                          | Behavior                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| **Fast tapper**                  | Taps through without reading. Does the game still make sense? Does scoring still work?    |
| **Default accepter**             | Picks an option and accepts every suggested amount. Does a default lead somewhere bad without warning? |
| **Careful reader**               | Reads everything. Is any text confusing, condescending, or too long?                      |
| **Non-native English speaker**   | Are instructions clear without idiom-heavy language? Are key terms defined in context?    |
| **Disengaged / grade-motivated** | Just wants the points. Can they game the system without learning anything? If so, fix it. |
| **Highly engaged / competitive** | Wants to master it. Is there enough depth to reward them?                                 |
| **Keyboard / screen-reader user** | Can every control, including sliders, be used without a mouse, without losing focus?      |

For each profile, report the outcome (score or cash) and the label they receive.

---

## 11. Unit Test Battery

Run before handoff. Auto-remediate all failures before reporting results.

- [ ] Scoring logic: all point values correct across all rounds
- [ ] Simulation: every choice path enumerated; best, safe-choice, and worst outcomes reported; best path follows the taught rule
- [ ] Random results (if used): thousands of simulated runs with every strategy on the same results; the taught rule beats every simple strategy on average and never goes broke; tip rules hold; label shares reported for each student profile
- [ ] Timer logic (if used): bonus awarded correctly; no negative scores possible
- [ ] Screen flow: every path from start to results is reachable; no dead ends
- [ ] Mango: wrong-advice tells present and legible; fallacy labels render correctly
- [ ] Reflection moment: fires correctly; cannot be skipped unintentionally, including by fast tapping
- [ ] Results page: score displays correctly; screenshot instructions present
- [ ] Accessibility: tap targets ≥ 44px; contrast passes AA; no content lost if fonts don't load; keyboard focus kept after each change
- [ ] Reading load: words per decision screen and phone screens of scrolling measured at 360px
- [ ] Layout: no sideways scrolling at 320px and 360px
- [ ] Single-file validation: no external dependencies; loads offline
- [ ] Edge cases: rapid tapping (a tip is charged once; a double tap plays one round), back-navigation, reload mid-game (same results, no rerolling), reduced motion
- [ ] Multi-stage (if used): continuing, starting fresh, and returning the next week on the same device all start with the right cash

---

## 12. Per-Game Brief Template

The spec stays constant. The brief captures only what changes:

- Learning objectives (from the module agenda slides and the syllabus)
- Proposed setting and narrative
- Core decision mechanic
- How each objective maps to a game moment, and which objectives are left to assignments
- Mango's role and reliability level for this game
- Optional mechanics opted in (from Section 6)
- Scenario research notes and sources
- Any deliberate departures from this spec, with rationale

**Keep the brief in sync with the build.** If the game is redesigned, update the brief or mark it as outdated at the top. A stale brief will mislead the next Agent session.

---

## 13. Handoff Instructions for VS Code Agent

1. Read `GAME_DESIGN_SYSTEM.md` fully before writing any code.
2. Read the per-game brief fully before writing any code. If the brief and the current HTML file disagree, ask which one is current.
3. Flag any conflict between the brief and the spec before proceeding.
4. Build the game as a single HTML file.
5. Run the full unit test battery (Section 11). Auto-remediate all failures.
6. Simulate all UX profiles (Section 10). Note any issues.
7. Report: test results, profile simulation findings, any spec departures made and why, and any numbers still unverified.

---

## 14. Publishing

1. File name: `course-modNN-short-name.html` (for example, `fnb230-mod11-12-leveragelegends.html`).
2. Commit to the `teaching` GitHub repository, in the course folder (for example, `fnb230/`), and merge to `main`.
3. Upload the file to decisionfish.com under the same name, so existing links and QR codes keep working.
4. Replace the copy in OneDrive at `2. Areas > Coding`.

---

_Last updated: November 26, 2026 (added "Use the course's own terms" after Mango's Millions). Previously November 22, 2026 (Leverage Legends redesign: random results, plain English, publishing to `teaching`). Update this file when a new invariant pattern is established across two or more games; patterns marked "first used in" come from one game so far._
