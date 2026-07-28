# Pairwise Flows

## Overview

Pairwise flow metrics measure the directional value moving from one tagged entity to another, for example from Coinbase to Binance. Each metric covers a specific ordered pair of entities and includes value that moves indirectly through untagged intermediary wallets for up to two hops, not only direct transfers between the two entities. These metrics can be used to track capital movement between exchanges.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th></tr></thead><tbody><tr><td>Metric</td><td>Assets</td><td>1 day, 1 hour</td><td>Native units, USD, transfer count</td><td><code>/timeseries/asset-metrics</code></td></tr></tbody></table>

## Metrics

Each supported ordered entity pair emits three metrics, named with the pair's entity codes in place of `{EntityA}` and `{EntityB}`:

<table data-full-width="true"><thead><tr><th width="360">Metric</th><th>Description</th><th>Frequency</th><th>Coverage</th></tr></thead><tbody><tr><td><code>FlowFrom{EntityA}To{EntityB}Ntv</code></td><td>Native-unit value attributed as flowing from EntityA to EntityB, including value routed through untagged intermediary wallets for up to two hops.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/asset-metrics-v2/FlowFromCBSToBNBNtv">🔗</a></td></tr><tr><td><code>FlowFrom{EntityA}To{EntityB}USD</code></td><td>USD value of the same flow, derived from the Ntv metric and the asset's reference rate.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/asset-metrics-v2/FlowFromCBSToBNBUSD">🔗</a></td></tr><tr><td><code>FlowTfrFrom{EntityA}To{EntityB}Cnt</code></td><td>Expected number of transfers attributed to this flow, emitted as a whole transfer count. Direct entity-to-entity transfers contribute exact counts and value routed through untagged wallets contributes a fractional expected count; the two are summed and rounded to the nearest whole transfer, with any positive value below one rounded up to one.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/asset-metrics-v2/FlowTfrFromCBSToBNBCnt">🔗</a></td></tr></tbody></table>

As of the current release, supported pairs cover six major centralized exchanges — **30 ordered pairs** among them — on USDC on Ethereum. Each pair emits the three metrics above, for **90** metrics in total. The data spans from genesis up to the present. See [Supported pairs](#supported-pairs) for the entity codes and pair matrix.

## Methodology

Each pairwise flow combines two attribution paths over the metric's interval.

### Direct transfers

A transfer sent directly from an address belonging to the source entity to an address belonging to the destination entity is counted in full, with an exact integer transfer count. Transfers with a negative native-unit amount are included when summing flow values, but they do not contribute to the transfer count.

### Through-user attribution

Value that passes through one or more untagged wallets before reaching the destination entity is attributed back to a source entity using a haircut method (Moser, Böhme & Breuker, 2014). When an untagged wallet forwards value onward, each source's share of that outgoing value is proportional to the source's share of the wallet's total available funds at that point:

$$
\text{share}_{\text{source}} = \frac{\text{value received from source}}{\text{closing balance} + \text{total outflow}}
$$

This keeps attribution conservative in two ways. A source's attributed flow can never exceed what it actually sent, since attribution is capped per entity pair. And because closing balances are never negative, a wallet's denominator is always at least its total outflow, so attribution can only be diluted across multiple destinations, never inflated.

Each supported pair has an independently configured maximum hop depth: direct pairs only match tagged-to-tagged transfers, while other pairs also follow chains of untagged wallet-to-wallet hops (source, then one or more intermediary wallets, then destination) up to that pair's configured depth.

Every tagged address, whether an exchange, a lending protocol, an ETF, a layer-2 bridge, or another tagged category, acts as a boundary that attribution cannot pass through. This keeps flow from being misattributed through a different known entity that happens to sit along the path.

### Transfer counts

Direct transfers contribute an exact integer count, while through-user attribution contributes a fractional expected count in which each wallet-to-destination deposit adds the source's attributed share at that hop. The direct and through-user counts are summed, and the emitted metric is rounded to the nearest whole transfer (ties rounded up), except that any positive value below one is rounded up to one so a small but real attributed flow is never reported as zero.

### Lookback window

Multi-hop chains can span more than one interval, since an intermediary wallet may hold funds for a period before forwarding them. Both the 1-hour and 1-day metrics account for this using a trailing lookback window so these chains are still attributed correctly, while only deposits landing inside the target interval are counted toward that interval's value. Each deposit is counted in exactly one interval, though its source attribution can reach back across the lookback window.

For more information, see [Pairwise Flow Lookback Window](../../../methodologies/pairwise-flow-lookback-window.md).

## Accessing the Data

{% tabs %}
{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_asset_metrics(
        assets="usdc_eth",
        metrics=["FlowFromCBSToBNBNtv", "FlowFromCBSToBNBUSD", "FlowTfrFromCBSToBNBCnt"],
        frequency="1d",
    ).to_dataframe()
)
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=usdc_eth&metrics=FlowFromCBSToBNBNtv,FlowFromCBSToBNBUSD,FlowTfrFromCBSToBNBCnt&frequency=1d&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/asset-metrics",
    params={
        "assets": "usdc_eth",
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

## Supported pairs

Pairwise flow metrics are available for every ordered pair among the following six exchanges. Self-pairs (an exchange to itself) are not included.

| Exchange | Code |
| -------- | ---- |
| Binance  | BNB  |
| Bybit    | BIT  |
| Coinbase | CBS  |
| Kraken   | KRK  |
| KuCoin   | KCN  |
| OKX      | OKX  |

Metric names use these codes in place of `{EntityA}` and `{EntityB}`. For example, Coinbase to Binance native units is `FlowFromCBSToBNBNtv`.

The grid below shows every supported direction. Rows are the source exchange; columns are the destination. A filled cell is an available ordered pair.

<table data-full-width="true"><thead><tr><th></th><th>BNB</th><th>BIT</th><th>CBS</th><th>KRK</th><th>KCN</th><th>OKX</th></tr></thead><tbody><tr><td><strong>BNB</strong></td><td></td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr><tr><td><strong>BIT</strong></td><td>●</td><td></td><td>●</td><td>●</td><td>●</td><td>●</td></tr><tr><td><strong>CBS</strong></td><td>●</td><td>●</td><td></td><td>●</td><td>●</td><td>●</td></tr><tr><td><strong>KRK</strong></td><td>●</td><td>●</td><td>●</td><td></td><td>●</td><td>●</td></tr><tr><td><strong>KCN</strong></td><td>●</td><td>●</td><td>●</td><td>●</td><td></td><td>●</td></tr><tr><td><strong>OKX</strong></td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td></td></tr></tbody></table>
