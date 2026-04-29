# Proposed Deletions

Files proposed for removal from the knowledge-base repository. These should be reviewed internally before deletion — some may need to be preserved for auditing or posterity.

---

## Reference Rates Methodology Pages

**Reason:** Content was deprecated and consolidated into `market-data/methodologies/coin-metrics-prices-methodology.md`. These 3 files are already orphaned (not in SUMMARY.md) so users cannot navigate to them from the live site.

**Additional note:** Deleting these would also resolve the 1 remaining GitBook validation FAIL — `hourly-reference-rates-methodology.md` references a missing image (`market-data/.gitbook/assets/image.png`) that no longer exists.

| File | Notes |
|---|---|
| `docs/market-data/market-data-overview/reference-rates-overview/README.md` | Section landing page, superseded |
| `docs/market-data/market-data-overview/reference-rates-overview/hourly-reference-rates-methodology.md` | Also has a broken image reference |
| `docs/market-data/market-data-overview/reference-rates-overview/real-time-reference-rates-methodology.md` | |

---

## Orphaned Files — Pending Review

The following files are orphaned (not in SUMMARY.md and not a redirect target) and may be candidates for deletion, but require further review to determine intent.

| File | Notes |
|---|---|
| `docs/reference-data/methodologies/README (1).md` | **Confirmed exact duplicate** of `docs/reference-data/methodologies/README.md` (identical MD5: `15b4e5af3f460438b716f1c30f801c0d`) — safe to delete |
| `docs/network-data/README.md` | See detailed analysis below — surface or delete decision required |
| `docs/network-data/deprecated/mempool-monitor.md` | Explicitly in a `deprecated/` folder |
| `docs/network-data/deprecated/mempool-monitor-time-series-deprecated/mempool-monitor-deprecated.md` | Explicitly in a `deprecated/` folder |
| `docs/.gitbook/includes/ndp-metric-basics.md` | GitBook content snippet (partial) — may be intentionally excluded from nav |
| `docs/.gitbook/includes/the-initial-universe-of-eli....md` | GitBook content snippet (partial) — may be intentionally excluded from nav |

**Note:** `docs/market-data/market-data-overview/market-metadata/market-metadata.md` was previously listed here but is in fact reachable — it is the target of a `.gitbook.yaml` redirect (`market-data-timeseries/market-metadata`). It has been removed from this list.

---

## `docs/network-data/README.md` — Surface or Delete?

This file is orphaned and currently unreachable. Visiting `/network-data` on the live site auto-redirects to `/network-data/network-data-overview` (the first child page in SUMMARY.md) rather than rendering this file.

**The active equivalent** is `docs/network-data/network-data-overview/README.md`, which is the live, maintained section landing page. It has a live coverage tool embed, Catalog API links, and an actively updated change log (last entry April 2026).

**What `network-data/README.md` has that the overview does not:**

- A static table of **11 legacy assets with historical coverage windows** (e.g. QTUM covered 2017-07-06 to 2017-09-12, AION, LRC, VET, ZIL, ICX, etc.) — these are assets where NDP coverage ended and the dates are documented explicitly. This information does not appear anywhere in the live docs.
- Links organized by **metric category** (addresses, economics, exchange, fees-and-revenue, market, mining, network-usage, supply, transactions, wallets) using GitBook `content-ref` blocks — but these all point to `../../asset-metrics/...` paths that no longer exist in the current structure, so they would be broken if the page were surfaced.

**Recommendation options:**
1. **Delete** — the legacy asset coverage table is the only unique content, and it describes fully deprecated assets. The broken `content-ref` links would need to be fixed before surfacing.
2. **Salvage the coverage table** — extract the 11-row legacy asset table and add it as a note in `network-data-overview/README.md` before deleting this file.
3. **Surface as landing page** — fix the broken links and add to SUMMARY.md, so `/network-data` shows a proper intro instead of redirecting.

---

## Unused Assets — Reference Rates & Prices Methodology PDFs (Deletion Candidates)

**24 files** — these are orphaned PDFs and images related to Reference Rates and CM Prices methodology, which has been consolidated into the live page `market-data/methodologies/coin-metrics-prices-methodology.md`. These are not considered part of the CMBI index family and are candidates for deletion.

| Category | Files | Notes |
|---|---|---|
| **Coin Metrics Prices Methodology** | 7 | `coin-metrics-prices-methodology.pdf` plus 6 versioned/duplicate copies |
| **Reference Rates Methodology** | 5 | `reference-rates-methodology.pdf` plus 4 versioned copies |
| **RTRR Methodology** | 8 | `rtrr-methodology.pdf` plus 7 versioned copies (Real-Time Reference Rates) |
| **PMR Methodology** | 1 | `PMR_Methodology_2022_09_12.pdf` — single dated copy |
| **Reference Rates Oversight Committee Charter** | 1 | `reference-rates-oversight-committee-charter.pdf` |
| **Reference Rates Weight images** | 2 | `reference-rates-weights.png` and duplicate |
| **Total** | **24** | |

---

## Unused Assets — CMBI Index, Governance & Methodology PDFs (Requires Internal Review)

**Requires internal review before any deletion.** 138 of the 415 unused assets are PDFs related to CMBI index calculation, governance, and index methodology. These may need to be preserved for regulatory, audit, or posterity purposes even if no longer linked from the live docs.

| Category | Files | Notes |
|---|---|---|
| **CMBI Index Policies** | 7 | Includes `.docx.pdf` conversion and EU BMR audit version; spanning multiple years |
| **CMBI Governance Committees Charter** | 5 | Versions v1.1–v1.3 plus duplicates |
| **CMBI Fork Legitimacy Framework** | 4 | Versions v1.2–v1.4 plus duplicates |
| **CMBI Multi Asset Series Methodology** | 9 | Versions v1.3–v1.4 plus duplicates (mixed naming conventions) |
| **CMBI Single Asset Series Methodology** | 5 | Versions v1.10–v1.11 plus duplicates |
| **CMBI Total Market Series Methodology** | 5 | Versions v1.2–v1.4 plus duplicates |
| **CMBI Mining Index Methodology** | 3 | Versions v1.2–v1.3 plus duplicate |
| **CMBI Momentum Series Methodology** | 3 | Versions v1.2–v1.3 plus duplicate |
| **CMBI Adjusted Free Float Methodology** | 4 | Versions v1.1–v1.3 plus duplicate |
| **CMBI Ethereum Staking Methodology** | 6 | Multiple copies with filename typos and duplicates |
| **CMBI Mining Series Factsheets** | 21 | Full monthly archive (Jan–Dec + 2025 editions) |
| **CMBI Multi Asset Series Factsheets** | 22 | Full monthly archive |
| **CMBI Single Asset Series Factsheets** | 25 | Full monthly archive including "Automated" edition |
| **CMBI Total Market Series Factsheets** | 19 | Full monthly archive |
| **Total** | **138** | |

**Key questions for internal discussion:**
- Should versioned methodology PDFs be hosted in the docs repo, or moved to a dedicated document archive?
- Which version of each methodology is "current" — only the latest should remain linked if retained
- Factsheets represent a full monthly history — is this intentional archiving or accumulation?
- Any regulatory or audit requirement to retain older versions?

---

## Unused Images — Bulk Cleanup Candidate

`docs/.gitbook/assets/` contains **291 unused assets** in total (134 after excluding the CMBI index and Reference Rates PDFs above). These are candidates for bulk deletion but should be audited carefully — a script can generate the full list when ready.

### Breakdown of 134 Non-Index Unused Assets

| Category | Count | Description |
|---|---|---|
| Stale screenshots | 50 | macOS "Screen Shot YYYY-MM-DD" images from 2020–2022, 2 draft screenshots from late 2025, and 1 raw iPhone photo (`IMG_0992.jpg`) — leftovers from documentation authoring sessions where pages were later deleted or revised |
| Generic clipboard images | 22 | Files named `0.png`, `1.png`, `image (5).png` etc. — GitBook's auto-generated names for inline pasted images; content unknown without opening |
| Named on-chain metric charts | 38 | Chart exports of specific crypto metrics (BTC address cohorts, ETH gas fees, XRP address balances, MVRV, Realized Cap, exchange order book/deposit flows, etc.) — likely from deleted or heavily revised documentation pages |
| Principal Market Price samples | 6 | BTC and DOT PMP example images in multiple format/copy duplicates (`btc-pmp.png/.jpg`, `dot-pmp-sample.png` ×3) — likely from a now-consolidated prices methodology page |
| Miscellaneous PDFs & other | 5 | `DEFI_dex_data (2).pdf`, `chart-twap-1.pdf/.svg`, 2 DeFi screenshot PNGs, 2 LinkedIn banner images (`cm-linkedin-1584x396`), and `tiff_-_temp.png` |

---

*Last updated: 2026-04-29*
