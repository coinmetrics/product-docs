---
description: /timeseries/asset-metrics
---

# Asset Metrics Overview

Our Asset metrics include our Network Data time series metrics and certain Market Data metrics that are aggregated at the asset-level (e.g., Reference Rates/Prices and Trusted Volume).

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

### Network Data

Our Network Data asset-metrics are typically daily metrics, but some metrics for some assets available in one block frequencies.

* Daily network data metrics are computed at 00:00 UTC time for the previous 24 hour interval.
* Block-by-block metrics are calculated each block. The data returned by the response will vary based on the `min_confirmations` parameter, which specifies the desired number of blocks behind the chain tip for the response

### Market Data

We have several Market Data metrics aggregated at the asset level, most notably our Reference Rates (asset prices). These asset metrics are typically available in daily (UTC and NY close), hourly, minute-by-minute and one second frequencies.

### Asset Coverage

Asset Metrics availability by asset can be found by selecting an asset in our [CM data coverage tool](https://coverage.coinmetrics.io/assets).

### Endpoint Response

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

The **Asset Metrics** endpoint returns time series data for each asset and metric requested. The response is formatted as follows:

<table data-header-hidden><thead><tr><th width="338.5">Field</th><th>Description</th></tr></thead><tbody><tr><td>Field</td><td>Description</td></tr><tr><td>asset</td><td>Asset</td></tr><tr><td>time</td><td><a href="../access-our-data/api.md#timestamps">Timestamp</a></td></tr><tr><td>{MetricID}</td><td>Metric ID data (as identified in the hundreds of asset-metrics that follow) for the specific asset and timestamp</td></tr><tr><td>{MetricID}-status</td><td>Status for metrics that require human review (e.g., on-chain exchange supply and flows); responses include "flash" for when a metric is just computed and not reviewed, "reviewed" for when a metric has been manually reviewed, and "revised" if a metric has been revised since its first publication</td></tr><tr><td>{MetricID}-status-time</td><td>Date of last human review for metrics that require periodic review (e.g., on-chain exchange supply and flows)</td></tr></tbody></table>


### Examples

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=PriceUSD,FlowInGEMUSD&frequency=1d&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=PriceUSD,FlowInGEMUSD&frequency=1d&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_asset_metrics(
        assets=["btc", "eth"], metrics="PriceUSD", limit_per_asset=5
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
