# Trusted Volume

## Definition

The sum of all volume from the spot markets of a set of trusted exchanges in units of U.S. dollars.[\
](https://docs.coinmetrics.io/info/metrics/volume\_trusted\_spot\_usd\_1d)

<table><thead><tr><th width="193">Name</th><th width="169">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Trusted Spot Volume</td><td><a href="https://coverage.coinmetrics.io/asset-metrics/volume_trusted_spot_usd_1d">volume_trusted_spot_usd_1d</a></td><td>Volume</td><td>Spot</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Trusted Spot Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/asset-metrics/volume_trusted_spot_usd_1h">volume_trusted_spot_usd_1h</a></td><td>Volume</td><td>Spot</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

## Details

Our trusted volume metric is an aggregation of the reported volume from exchanges that we consider the most accurate and trustworthy. The full list of constituent exchanges included in our Trusted Volume can be found [here](https://coinmetrics.io/special-insights/trusted-exchange-framework)

## API Endpoints

Trusted Spot Volume can be accessed using the `timeseries/asset-metrics` or `timeseries/pair-metrics` endpoints by passing `volume_trusted_spot_usd_1d` or `volume_trusted_spot_usd_1h` into the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=volume_trusted_spot_usd_1d&frequency=1d&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=volume_trusted_spot_usd_1d&frequency=1d&pretty=true&api_key=<your_key>').json()
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
        assets=["btc"], metrics="volume_trusted_spot_usd_1d", limit_per_asset=5
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/pair-metrics?assets=btc&metrics=volume_trusted_spot_usd_1d&frequency=1d&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/pair-metrics?assets=btc&metrics=volume_trusted_spot_usd_1d&frequency=1d&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_pair_metrics(
        assets=["btc"], metrics="volume_trusted_spot_usd_1d", limit_per_asset=5
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

## Chart

![Trusted volume as a portion of total volume](../../.gitbook/assets/BTC\_Trusted\_and\_Non-Trusted\_Volume.png)

## Examples

A sample of the daily trusted volumes data for Bitcoin is shown below:

| assets | time                | volume\_trusted\_spot\_usd\_1d |
| ------ | ------------------- | ------------------------------ |
| btc    | 2020-09-21 00:00:00 | 44395555400                    |
| btc    | 2020-09-22 00:00:00 | 60004540100                    |
| btc    | 2020-09-23 00:00:00 | 45919134800                    |

* asset. The IDs of the asset.
* time. The reference rate time in ISO 8601 date-time format.
* volume\_trusted\_spot\_usd\_1d. The trusted volume value in units of U.S. dollars.

## Release History

* Release Version. Market Data Feed v2.2 - Jan 21, 2021 rollout (not a separate MDF version)

## Interpretation

Fake trading volume is a persistent problem on crypto exchanges. With little regulatory oversight, it can be difficult to determine whether reported volume numbers are accurate or exaggerated. At Coin Metrics, we’ve taken a data driven approach to the problem and offer a trusted volume metric, derived from the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework), to help identify legitimate trading volume. Our trusted volume metric is an aggregation of the reported volume from exchanges that we consider the most accurate and trustworthy. This is based on a combination of both quantitative and qualitative features. The current set of trusted volume metrics consider spot markets only and do not include futures or options markets.

## See Also

* [Trusted Volume Framework](https://coinmetrics.io/q3-refresh-of-trusted-spot-volume-framework/)
* [Reported Spot Volume](volume\_reported\_spot\_usd\_1d.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_trusted_spot_usd_1d" %}
