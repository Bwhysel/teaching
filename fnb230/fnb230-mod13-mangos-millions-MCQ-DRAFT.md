# M&M: Mango's Millions — two-tier questions (DRAFT for Brett's review)

Drafted by Claude after the engine run, Nov 25, 2026 (decision 6, option B). Brett reviewed: all fine. Rounds 1, 2 and 5 revised the same day for small/big move sizes; Brett approved Round 1's revised correct answer (Nov 25); Rounds 2 and 5 revisions not yet reviewed.

> **Update, Nov 25:** Tier 1 was dropped (Brett: the slider bet already captures direction and size). Only the **Tier 2 "Why?"** question is used, worth 5 points, no partial credit. Tier 1 lines below are kept for reference only.

**Format (every round):** shown after the reveal.
- **Tier 1:** "After the news, what happened to the best debt level?" — More debt / Less debt / About the same.
  - *Departure from brief §4:* the brief's fourth option ("moved a lot") is dropped. In the engine, Nike (+12 points) and Alphabet (+13 points) move by about the same amount, and Delta's curve is nearly flat from 30% to 62% after the news, so "a lot" has no clean answer. Size of the move shows in the reveal instead.
- **Tier 2:** "Why?" — one correct reason, three wrong ones. Each wrong reason targets a specific misconception (noted in *italics*; not shown to students).
- **Scoring:** both tiers right = 5 points. Tier 1 right, tier 2 wrong = 2 points (brief §9: tier 1 shows the student read the result; tier 2 shows understanding). Tier 1 wrong = 0. Feedback always says when tier 1 is right but tier 2 is wrong.
- Answer order is shuffled on screen.

Vocabulary used throughout: debt, debt level, firm value, tax benefit, cost of rising rates, transaction costs, lenders, shareholders.

---

## Round 1 — Nike (guided) · small increase
**News:** Stock market jitters spread. Investors now demand a higher return for owning stocks. The market risk premium rises from 4.4% to 4.9%. What lenders charge stays the same.
**Engine:** MRP 4.41% → 4.91%. Best debt level 63% → 66%.

**Tier 1:** More debt ✓ · Less debt · About the same

**Tier 2 — Why?**
- ✓ Shareholders now demand a higher return, so debt is a little cheaper by comparison. A small move toward more debt pays off.
- ✗ When stocks get riskier, every company should borrow less. *(Misconception: reacting to market mood instead of the company's own trade-off.)*
- ✗ Lenders cut the rates they charge Nike. *(Misconception: misreading which assumption changed.)*
- ✗ A higher risk premium makes the tax benefit of debt bigger. *(Misconception: the tax benefit is tax rate × debt (Lasher Eq. 14.21); the risk premium doesn't enter it.)*

---

## Round 2 — Delta · small decrease
**News:** Recession fears hit airlines. Lenders raise Delta's credit spread by 25% at every debt level. (A credit spread is the extra rate lenders charge above the Treasury rate.)
**Engine:** spreads ×1.25. Best debt level 68% → 66%.

**Tier 1:** More debt · Less debt ✓ · About the same

**Tier 2 — Why?**
- ✓ Rates now climb a bit faster as Delta borrows, so the cost of rising rates catches up with the tax benefit a little sooner.
- ✗ Higher rates mean more interest to deduct, so the tax benefit grows and Delta should borrow more. *(Misconception: the tax benefit is tax rate × debt; the interest rate cancels out. Higher rates only raise the cost side.)*
- ✗ In a recession, a company should borrow more to get through it. *(Misconception: mixing up needing cash with the best mix of debt and equity.)*
- ✗ The tax rate went down. *(Misconception: misreading which assumption changed.)*

---

## Round 3 — Con Edison ("do nothing" round) · no change
**News:** A loud headline about a regulatory review. Con Ed's business risk barely changes.
**Engine:** beta +10%. Best debt level 39% → 39%.

**Tier 1:** More debt · Less debt · About the same ✓

**Tier 2 — Why?**
- ✓ The news barely changed the balance between the tax benefit and the cost of rising rates, and moving would cost money.
- ✗ Bad news always means a company should cut its debt. *(Misconception: reacting to the headline instead of the numbers.)*
- ✗ Utilities should always borrow as much as they can because their earnings are steady. *(Misconception: steady earnings mean unlimited debt.)*
- ✗ Higher risk always means much less debt. *(Misconception: in this model, a small rise in business risk barely moves the best level, and a rise in beta alone can even nudge it toward more debt.)*

---

## Round 4 — Charter (Spectrum) · big decrease
**News:** Cord-cutting speeds up and fiber competition grows. Lenders double what they charge Charter at every debt level.
**Engine:** spreads ×2. Best debt level 39% → 14% (Charter starts at 84%).

**Tier 1:** More debt · Less debt ✓ · About the same

**Tier 2 — Why?**
- ✓ At Charter's debt level, the cost of rising rates is far bigger than the tax benefit, even after the cost of issuing new stock.
- ✗ Charter should keep its debt because paying it down is too expensive. *(Misconception: overweighting transaction costs; here the gain is many times the cost.)*
- ✗ Cord-cutting cuts Charter's earnings, so it has less income to protect from taxes. *(Misconception: the news changed lender rates, not earnings, in this round.)*
- ✗ Big companies can always carry more debt than small ones. *(Misconception: size, not the trade-off, decides the best debt level.)*

**Reflection moment (brief §11):** held screen on this reveal.

---

## Round 5 — Alphabet · big increase
**News:** Congress restores the 35% corporate tax rate. Alphabet's tax rate goes from about 17% to 35%.
**Engine:** tax rate 16.8% → 35%. Best debt level 68% → 88% (Alphabet starts at −4%, more cash than debt).

**Tier 1:** More debt ✓ · Less debt · About the same

**Tier 2 — Why?**
- ✓ A higher tax rate makes the tax benefit of each dollar of debt bigger, so more debt pays off before rising rates catch up.
- ✗ Higher taxes leave the company less cash, so it should borrow less. *(Misconception: confusing cash flow with the value of the tax benefit.)*
- ✗ Alphabet has so much cash that it never needs debt. *(Misconception: debt is only for companies that need cash.)*
- ✗ Higher taxes push interest rates up. *(Misconception: misreading which assumption changed.)*

---

## Open items for Brett
1. Is 2 of 5 points the right partial credit for tier 1 only?
2. Are these the misconceptions you see most in FNB 230? Replace any that don't match your students.
3. Debrief: add one line on what the model leaves out (flexibility, signaling, rating targets), since it says these companies should borrow far more than they do?

---

## Current "Why?" options (Nov 26, lengths evened out; Brett approved)

The correct answer is never the longest option. Order is shuffled on screen.

**Nike**
- ✓ Shareholders now demand a higher return, so debt is a little cheaper by comparison, and a bit more debt pays off.
- ✗ When investors get nervous about stocks, every company should borrow less, because debt makes its stock even riskier.
- ✗ Lenders cut the rates they charge Nike at every debt level, so borrowing more became cheaper and added more value to Nike.
- ✗ A higher risk premium makes each dollar of interest save more tax, so the tax benefit of debt grows.

**Delta**
- ✓ Delta's credit spread is higher at every debt level, so the cost of rising rates catches up with the tax benefit sooner.
- ✗ Higher rates mean more interest to deduct, so the tax benefit grows faster than the cost, and Delta should borrow more.
- ✗ In a recession, a company should borrow more money to get through the slow months, even if lenders charge more.
- ✗ The tax rate went down, so each dollar of debt saves less tax, and Delta should borrow a little less than before.

**Con Edison**
- ✓ The news barely changed the balance between the tax benefit and the cost of rising rates, and moving would cost money.
- ✗ Bad news about a company always means it should cut its debt right away, before lenders start charging it more for every dollar.
- ✗ Utilities should always borrow as much as they can, because steady earnings mean lenders never raise their rates.
- ✗ Higher business risk always means a company should hold much less debt, no matter how small the change in risk is.

**Charter**
- ✓ With its credit spread doubled, Charter's cost of rising rates far outweighs its tax benefit, even after the cost of issuing stock.
- ✗ Charter should keep its debt, because issuing new stock to pay it down would cost more than all the value it adds back.
- ✗ Losing customers cuts Charter's earnings, so it has less income to protect from taxes, and the tax benefit shrinks.
- ✗ Big companies like Charter can always carry more debt than small ones, so its debt level was already about right.

**Alphabet**
- ✓ A higher tax rate makes each dollar of debt save more tax, so more debt pays off before rising rates catch up.
- ✗ Higher taxes leave Alphabet with less cash after taxes, so it should borrow less to keep its interest payments safe.
- ✗ Alphabet has so much cash that it never needs to borrow, so a change in the tax rate cannot affect its best debt level.
- ✗ Higher taxes push up interest rates and credit spreads for every company, so borrowing more becomes too expensive.
