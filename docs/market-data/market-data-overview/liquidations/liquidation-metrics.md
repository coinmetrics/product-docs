# Liquidation Metrics

The reported liquidation metrics are a sum of all reported volume in native units or U.S. Dollars of buy or sell orders that were used to close short positions under liquidation for a specific market in our coverage universe.

## Metrics

<table><thead><tr><th width="165">Name</th><th width="355">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Liquidation Buy Orders (Units), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_5m">liquidations_reported_future_buy_units_5m</a></td><td>Native Units</td><td>5m</td></tr><tr><td>Reported Liquidation Buy Orders (Units), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_1h">liquidations_reported_future_buy_units_1h</a></td><td>Native Units</td><td>1h</td></tr><tr><td>Reported Liquidation Buy Orders (Units), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_1d">liquidations_reported_future_buy_units_1d</a></td><td>Native Units</td><td>1d</td></tr><tr><td>Reported Liquidation Buy Orders (USD), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_5m">liquidations_reported_future_buy_usd_5m</a></td><td>USD</td><td>5m</td></tr><tr><td>Reported Liquidation Buy Orders (USD), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_1h">liquidations_reported_future_buy_usd_1h</a></td><td>USD</td><td>1h</td></tr><tr><td>Reported Liquidation Buy Orders (USD), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_1d">liquidations_reported_future_buy_usd_1d</a></td><td>USD</td><td>1d</td></tr><tr><td>Reported Liquidation Sell Orders (Units), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_5m">liquidations_reported_future_sell_units_5m</a></td><td>Native Units</td><td>5m</td></tr><tr><td>Reported Liquidation Sell Orders (Units), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_1h">liquidations_reported_future_sell_units_1h</a></td><td>Native Units</td><td>1h</td></tr><tr><td>Reported Liquidation Sell Orders (Units), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_1d">liquidations_reported_future_sell_units_1d</a></td><td>Native Units</td><td>1d</td></tr><tr><td>Reported Liquidation Sell Orders (USD), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_5m">liquidations_reported_future_sell_usd_5m</a></td><td>USD</td><td>5m</td></tr><tr><td>Reported Liquidation Sell Orders (USD), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_1h">liquidations_reported_future_sell_usd_1h</a></td><td>USD</td><td>1h</td></tr><tr><td>Reported Liquidation Sell Orders (USD), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_1d">liquidations_reported_future_sell_usd_1d</a></td><td>USD</td><td>1d</td></tr></tbody></table>

## **API Endpoints**

Liquidation metrics can be accessed using these endpoints:

* `timeseries/exchange-metrics`
* `timeseries/exchange-asset-metrics`
* `timeseries/pair-metrics`

and by passing in the `liquidation_reported_*` metrics in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/exchange-metrics?exchanges=binance&metrics=liquidations_reported_future_sell_usd_1d&limit_per_exchange=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/exchange-metrics?exchanges=binance&metrics=liquidations_reported_future_sell_usd_1d&limit_per_exchange=1&api_key=<your_key>
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_exchange_metrics(
        exchanges=["binance"], metrics=['liquidations_reported_future_sell_usd_1d'], frequency='1d', limit_per_market=1
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc&metrics=liquidations_reported_future_sell_usd_1d&limit_per_exchange_asset=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc&metrics=liquidations_reported_future_sell_usd_1d&limit_per_exchange_asset=1&api_key=<your_key>
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_exchange_asset_metrics(
        exchanges=["binance-btc"], metrics=['liquidations_reported_future_sell_usd_1d'], frequency='1d', limit_per_market=1
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/pair-metrics?pairs=btc-usd&metrics=liquidations_reported_future_sell_usd_1d&limit_per_pair=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/pair-metrics?pairs=btc-usd&metrics=liquidations_reported_future_sell_usd_1d&limit_per_pair=1&api_key=<your_key>
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
        pairs=["btc-usd"], metrics=['liquidations_reported_future_sell_usd_1d'], frequency='1d', limit_per_market=1
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

## Details

Our reported liquidations metric is an aggregation of the reported liquidations from an exchange.

## Examples

A sample of the daily reported liquidation buy orders for the Binance BTCUSDT futures market is shown below:

| market                 | time                | liquidations\_reported\_future\_buy\_units\_1d |
| ---------------------- | ------------------- | ---------------------------------------------- |
| binance-BTCUSDT-future | 2022-01-01 00:00:00 | 84.918                                         |
| binance-BTCUSDT-future | 2022-01-02 00:00:00 | 80.595                                         |
| binance-BTCUSDT-future | 2022-01-03 00:00:00 | 74.007                                         |
| binance-BTCUSDT-future | 2022-01-04 00:00:00 | 109.399                                        |

* market. The IDs of the markets.
* time. The time in ISO 8601 date-time format.
* liquidations\_reported\_future\_buy\_units\_1d. The reported volume of liquidation buy orders in native units.

## Release History

* Release Version. Market Data Feed 2.6 (July 2022)
