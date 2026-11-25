# M&M: Mango's Millions — engine inputs (draft)

**Snapshot date:** November 25, 2026. Gathered by Claude; not yet reviewed by Brett.

## Market-wide inputs

| Input | Value | Source |
|---|---|---|
| rf (10-year Treasury) | 4.85% | U.S. Treasury daily par yield curve, 11/25/2026 (home.treasury.gov) |
| MRP | 4.41% | Damodaran implied ERP, Nov 1, 2026 (trailing 12 month, adjusted payout), pages.stern.nyu.edu/~adamodar |
| Spread table | see below | Damodaran ratings.html, "large non-financial service firms," data as of January 2026 |

Damodaran synthetic rating table (interest coverage > lower bound → rating, spread):
−∞ D 19.00% · 0.20 C 16.00% · 0.65 CC 12.61% · 0.80 CCC 8.85% · 1.25 B− 5.09% · 1.50 B 3.21% · 1.75 B+ 2.75% · 2.00 BB 1.84% · 2.25 BB+ 1.38% · 2.50 BBB 1.11% · 3.00 A− 0.89% · 4.25 A 0.78% · 5.50 A+ 0.70% · 6.50 AA 0.55% · 8.50 AAA 0.40%

## Company inputs

Rules applied to all five:
- **Debt** = borrowings on the balance sheet (long-term debt incl. current portion, plus notes payable / commercial paper). Leases excluded.
- **Cash** = cash and equivalents plus short-term (current) marketable securities.
- **Net debt** = debt − cash (Brett, Nov 25).
- **EBIT** = trailing twelve months (TTM) operating income from the latest 10-Q / 10-K.
- **Tax rate** = effective rate from the last full fiscal year (10-K): income tax expense ÷ pretax income. Chosen over TTM because Charter's TTM rate is distorted by the Q3 2026 impairment.
- **Beta and market cap** = Yahoo Finance quote page, 5Y monthly beta, 11/25/2026.

| Company | Mkt cap | Debt | Cash | Net debt | Beta | Tax (FY) | EBIT (TTM) | Filing |
|---|---|---|---|---|---|---|---|---|
| Nike (NKE) | $54.45B | $7.89B | $8.37B | **−$0.48B** | 1.03 | 20.3% | $3.85B* | 10-Q Q1 FY27 (8/31/2026) |
| Delta (DAL) | $54.57B | $12.11B | $3.79B | $8.32B | 1.42 | 19.1% | $5.29B | 10-Q Q3 2026 |
| Con Edison (ED) | $44.68B | $27.49B | $0.10B | $27.39B | 0.22 | 22.1% | $3.39B | 10-Q Q3 2026 |
| Charter (CHTR) | see note | $107.05B | $0.57B | $106.48B | 0.73 | 22.7% | $12.33B† | 10-Q Q3 2026 |
| Alphabet (GOOGL) | $3,357B | $126.12B | $265.10B | **−$138.98B** | 1.23 | 16.8% | $156.98B | 10-Q Q3 2026 |

\* Nike reports no operating-income line; EBIT = pretax income ($3.90B TTM) less net interest ($0.05B, sign to confirm).
† Charter EBIT excludes the $6.33B Q3 2026 franchise impairment (non-cash). TTM includes only ~6 weeks of Cox (merger closed Aug 19, 2026), while debt includes all of Cox's.

Charter equity note: 10-Q cover shows 114.45M Class A shares (9/30/2026). Cox also holds ~33.6M Charter Holdings common units (exchangeable) and $6.0B of convertible preferred units. Yahoo's market cap ($26.37B) does not match either 114.45M or 148.05M × price; to resolve.

## Not yet sourced

- Transaction-cost rates (`COST_UP`, `COST_DOWN`): no source verified yet. Candidate: Lee, Lochhead, Ritter & Zhao (1996), "The Costs of Raising Capital," *Journal of Financial Research* 19(1): 59–74 (abstract: SEO direct costs average 7.1%). Table values not yet read.
- Buyback costs: no study found that measures repurchase commissions directly.
