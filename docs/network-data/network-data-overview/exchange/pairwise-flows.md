# Pairwise Flows

## Overview

Pairwise flow metrics measure the directional value moving from one tagged entity to another, for example from Coinbase to Binance. Each metric covers a specific ordered pair of entities and includes value that moves indirectly through untagged intermediary wallets, not only direct transfers between the two entities. Fund flow analysts and researchers use these metrics to track capital movement between exchanges without tracing individual transaction chains themselves.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Metric</td><td>Assets</td><td>1 day, 1 hour</td><td>Native units, USD, transfer count</td><td><code>/timeseries/asset-metrics</code></td><td><a href="https://coverage.coinmetrics.io/search-results?query=FlowFrom_%2A">🔗</a></td></tr></tbody></table>

## Metrics

Each supported ordered entity pair emits three metrics, named with the pair's entity codes in place of `{EntityA}` and `{EntityB}`:

<table data-full-width="true"><thead><tr><th width="360">Metric</th><th>Description</th><th>Frequency</th><th>Coverage</th></tr></thead><tbody><tr><td><code>FlowFrom{EntityA}To{EntityB}Ntv</code></td><td>Native-unit value attributed as flowing from EntityA to EntityB, including value routed through untagged intermediary wallets.</td><td>1d, 1h</td><td>🔗</td></tr><tr><td><code>FlowFrom{EntityA}To{EntityB}USD</code></td><td>USD value of the same flow, derived from the Ntv metric and the asset's reference rate.</td><td>1d, 1h</td><td>🔗</td></tr><tr><td><code>FlowTfrFrom{EntityA}To{EntityB}Cnt</code></td><td>Expected number of transfers attributed to this flow. An exact integer for direct entity-to-entity transfers, and a fractional expectation for value routed through untagged wallets.</td><td>1d, 1h</td><td>🔗</td></tr></tbody></table>

As of the current release, supported pairs cover six major centralized exchanges (all ordered pairs among them) on USDC on Ethereum, computed from January 2026 onward. Coverage is expected to expand to more assets as more exchange endpoints are tagged for them.

{% hint style="info" %}
**Conventions.** Decimals are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the interval start.
{% endhint %}

## Methodology

Each pairwise flow combines two attribution paths over the metric's interval.

### Direct transfers

A transfer sent directly from an address belonging to the source entity to an address belonging to the destination entity is counted in full, with an exact integer transfer count.

### Through-user attribution

Value that passes through one or more untagged wallets before reaching the destination entity is attributed back to a source entity using a haircut method (Moser, Böhme & Breuker, 2014). When an untagged wallet forwards value onward, each source's share of that outgoing value is proportional to the source's share of the wallet's total available funds at that point:

$$
\text{share}_{\text{source}} = \frac{\text{value received from source}}{\text{closing balance} + \text{total outflow}}
$$

This keeps attribution conservative in two ways. A source's attributed flow can never exceed what it actually sent, since attribution is capped per entity pair. And because closing balances are never negative, a wallet's denominator is always at least its total outflow, so attribution can only be diluted across multiple destinations, never inflated.

Each supported pair has an independently configured maximum hop depth: direct pairs only match tagged-to-tagged transfers, while other pairs also follow chains of untagged wallet-to-wallet hops (source, then one or more intermediary wallets, then destination) up to that pair's configured depth.

Every tagged address, whether an exchange, a lending protocol, an ETF, a layer-2 bridge, or another tagged category, acts as a boundary that attribution cannot pass through. This keeps flow from being misattributed through a different known entity that happens to sit along the path.

### Transfer counts

The transfer count metric is an exact integer for direct transfers and a fractional expected count for through-user attribution: each wallet-to-destination deposit contributes the source's attributed share at that hop.

### Hourly metrics and lookback

Multi-hop chains can span more than one hour, since an intermediary wallet may hold funds for a period before forwarding them. The 1-hour metrics account for this using a trailing lookback window so these chains are still attributed correctly, while only deposits landing inside the target hour are counted toward that hour's value. Each deposit is counted in exactly one interval, though its source attribution can reach back across the lookback window.

## Accessing the Data

{% tabs %}
{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_asset_metrics(
        assets="usdc",
        metrics=["FlowFromCBSToBNBNtv", "FlowFromCBSToBNBUSD", "FlowTfrFromCBSToBNBCnt"],
        frequency="1d",
    ).to_dataframe()
)
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=usdc&metrics=FlowFromCBSToBNBNtv,FlowFromCBSToBNBUSD,FlowTfrFromCBSToBNBCnt&frequency=1d&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/asset-metrics",
    params={
        "assets": "usdc",
        "metrics": "FlowFromCBSToBNBNtv,FlowFromCBSToBNBUSD,FlowTfrFromCBSToBNBCnt",
        "frequency": "1d",
        "api_key": "YOUR_API_KEY",
    },
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics).

## Examples

REVIEWER: no live examples generated in this draft. This session's fetch ran with `--no-live` because no API key was configured, so catalog rows and example JSON must be regenerated before publishing (see Reviewer Notes).

## Coverage

REVIEWER: the embed below uses the standard metric-family wildcard pattern, but that pattern assumes an underscore-separated metric stem (as in `volume_reported_%2A`) and these metric names have no underscore after `FlowFrom`. Verify the actual coverage search query or dedicated coverage page before publishing.

{% embed url="https://coverage.coinmetrics.io/search-results?query=FlowFrom_%2A" %}

## Limitations

* Scoped narrowly at launch: computed only for USDC on Ethereum, and only from January 2026 onward.
* Attribution requires both entities in a pair to have tagged addresses for the asset in question. Coverage expands as more exchange endpoints are tagged for additional assets.
* Attribution is aggregate within the computation window: transfer ordering inside a window is not used to assert that a specific deposit caused a specific later withdrawal.

## Reviewer Notes

* [ ] Proposed `SUMMARY.md` entry: `* [Pairwise Flows](network-data/network-data-overview/exchange/pairwise-flows.md)`, added under the existing "Exchange" section alongside Deposits, Withdrawals, and Net Flows.
* [ ] `live fetch disabled (--no-live): catalog metadata and live examples omitted.` (fetch tool warning — `CM_API_KEY` was not present in `data-tools/.env` during this session). Before publishing: add a key, rerun the fetch tool, and fill in the Metrics catalog rows (per-pair descriptions/coverage) and the Examples section with live JSON.
* [ ] Coverage query pattern needs verification: the standard `{family}_%2A` wildcard assumes an underscore after the family stem (as used by `volume_reported_%2A`); these metric names (`FlowFromCBSToBNBNtv`, etc.) don't have one after `FlowFrom`. Confirm the working coverage search query, or find/request a dedicated coverage page, before publishing.
* [ ] The published spec download (`docs.coinmetrics.io/api/static/openapi.yaml`) was unreachable from this session (proxy error) and the repo fallback path in `data-tools` doesn't exist; params/doc_url above were generated instead from the OpenAPI spec vendored in the `knowledge-base` repo's `api-client-python` submodule. Confirm this matches the currently published spec.
* [ ] Confirm the complete, currently-activated list of entity pairs and their public ticker codes against `reference-data/catalog-v2` before publishing (this draft names Coinbase, Binance, Bybit, Kraken, OKEx, and KuCoin as the six exchanges, all ordered pairs, based on the reviewed commit's activation config). Note that the same commit also registered metric names for a couple of additional pairs and for aggregate exchange/lending categories that were **not** activated for customers, and those should not be documented as available.
* [ ] SME to review the Methodology section (haircut formula, boundary/hop-depth description) for accuracy and to confirm it's appropriately external-facing.
* [ ] Source file paths (internal, for SME reference only): `factory/src/main/kotlin/io/coinmetrics/metrics/Erc20PairwiseFlowMetrics.kt`, `factory/src/main/kotlin/io/coinmetrics/metrics/PairwiseFlowAttribution.kt`, `factory/src/main/resources/pairwise_flow_relationships.yaml`, `resources/src/main/resources/metrics.json`, `factory/src/main/resources/customer_available_metrics.yaml` (all in the `network-data` repo, commit `2b9f6d11e5d0ff60c566fbc191138c4f347d3faf`, "ND-8138: Implement pairwise flows").
* [ ] Confirm whether existing `FlowIn*`/`FlowTfrIn*` deposit metrics (documented in `deposits.md`) and this new pairwise family should cross-link under `## Related` once this page is otherwise finalized.
