# Candidate Market Guidelines

## Introduction

Coin Metrics evaluates markets traded on digital asset exchanges as potential input data sources for the CMBI Benchmarks. In this document, a market refers to a specific traded asset pair on a specific exchange. Only spot markets are considered. It produces a unique set of candidate selected markets for each index in the coverage universe.

Coin Metrics formally defines a cryptoasset as any digital asset that exhibit the following characteristics:

1. The use of a distributed ledger to allow remote peer-to-peer transfer of native units of the cryptoasset
2. The state of the distributed ledger is maintained by distributed consensus and does not require a central authority or trusted intermediary to function
3. Ownership of native units of the cryptoasset can be proven by cryptography

Provided these requirements are met, the cryptoasset can be issued on any underlying blockchain architecture and use any distributed consensus mechanism.

Markets that are approved are added to a list of constituent markets (the "Constituent Markets"). A separate list of Constituent Markets is maintained for each of the indexes in the coverage universe.

A candidate market can be nominated for inclusion and an existing constituent market can be nominated for exclusion by any member of the public. Public nominations for inclusion or exclusion of a market should be submitted in writing to cmbi-support@coinmetrics.io.

## Other Documents

The CMBI Benchmarks are collectively governed by policies described in [CMBI Index Policies](https://docs.coinmetrics.io/index-data/policies-and-charters/cmbi-index-policies), which outline the administration, oversight, conflicts of interest, significant changes and terminations, recalculations, internal controls, complaints, record retention, and compliance policies.

The CMBI Benchmarks are supervised by the [CMBI Governance Committee Charter](https://docs.coinmetrics.io/index-data/policies-and-charters/governance-committees), which defines the roles and responsibilities of the Oversight Committee and the Index Committee.

## Eligibility Criteria

### Trusted Exchange Framework

Active exchanges are assessed and scored via the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework/). An exchange is eligible for inclusion if it satisfies all the following criteria:

1. Grade and Regulatory Compliance scores of at least B-
2. Data Quality score of at least B
   1. A Data Quality score of B or above qualifies an exchange to be included in Coin Metrics' “trusted volume” universe.
3. Exchanges with an API Quality score of D are ineligible for consideration

### Market Eligibility

#### Base Asset

The base asset for eligible markets is restricted to the underlying asset of the benchmark.  Markets whose base asset differs from the underlying asset are not considered.

#### Quote Asset

For BTC and ETH, eligible quote assets are limited to U.S. Dollar (USD).  No other quote currencies are considered. For all other cryptoassets (excluding BTC and ETH), markets must be quoted in U.S. Dollars (USD), USD Coin (USDC), or Tether (USDT).&#x20;

{% include "../../.gitbook/includes/the-initial-universe-of-eli....md" %}

### Liquidity Assessment

The observation window for the Liquidity Assessment is the previous 180 days. The data inputs for the assessment are sourced from Coin Metrics’ Market Data Feed.&#x20;

Each market must further satisfy tests examining the following liquidity characteristics.

#### Slippage

For each eligible market, we take the average of its bid and ask slippage, then take the natural log.  Finally we take the median to aggregate this score for each eligible market.

$$
avgSlip_i =0.5 * slippage_{ask} +0.5*slippage_{bid},
$$

$$
slippage_i = median(log(avgSlip_i))
$$

#### Bid-Ask Spread

For each eligible market, we take the cubic-root of _liquidity\_bid\_ask\_spread\_percent\_1d_. We take the median to aggregate this score for each eligible market.

$$
spread_i = median(bidAskSpread_i^{1/3})
$$

#### Volume

Daily trading volume (in native units) is totaled over the observation window. The volume score is determined by the natural log of a market’s total volume.

$$
volume_i = log(sum(volume))
$$

#### Trade Size

Trade size is determined by daily volume (in native units) divided by the daily number of trades. Higher trade sizes can indicate institutional volume on an exchange. Size is scored as the median of trade size.

$$
size_i = median(\frac{volume}{numTrades})
$$



Liquidity scores are standardized by computing their z-score. A final grading metric is calculated as a composite function of the standardized variables in Section 3.3. For BTC and ETH, eligible USD-quoted markets whose median volume exceeds the 180-day median across all USD markets are selected.

\
Markets quoted in USD are preferred. If an underlying asset has three or fewer USD-quoted markets with sufficient liquidity, then its whitelisted markets are supplemented with stablecoin pairs until there are five whitelisted markets.

## Review of Constituents

Proposed changes to constituent markets must be reviewed by the Index Committee and the Oversight Committee at least quarterly. The Oversight Committee has final approval over changes to constituent markets.\
