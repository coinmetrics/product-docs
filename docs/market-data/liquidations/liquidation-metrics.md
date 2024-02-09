# Liquidation Metrics

The reported liquidation metrics are a sum of all reported volume in native units or U.S. Dollars of buy or sell orders that were used to close short positions under liquidation for a specific market in our coverage universe.

## Metrics

<table><thead><tr><th width="197">Name</th><th width="355">MetricID</th><th width="134">Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Liquidation Buy Orders (Units), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_5m">liquidations_reported_future_buy_units_5m</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>Native Units</td><td>5m</td></tr><tr><td>Reported Liquidation Buy Orders (Units), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_1h">liquidations_reported_future_buy_units_1h</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>Native Units</td><td>1h</td></tr><tr><td>Reported Liquidation Buy Orders (Units), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_1d">liquidations_reported_future_buy_units_1d</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>Native Units</td><td>1d</td></tr><tr><td>Reported Liquidation Buy Orders (USD), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_5m">liquidations_reported_future_buy_usd_5m</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>USD</td><td>5m</td></tr><tr><td>Reported Liquidation Buy Orders (USD), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_1h">liquidations_reported_future_buy_usd_1h</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>USD</td><td>1h</td></tr><tr><td>Reported Liquidation Buy Orders (USD), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_1d">liquidations_reported_future_buy_usd_1d</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Liquidation Sell Orders (Units), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_5m">liquidations_reported_future_sell_units_5m</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>Native Units</td><td>5m</td></tr><tr><td>Reported Liquidation Sell Orders (Units), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_1h">liquidations_reported_future_sell_units_1h</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>Native Units</td><td>1h</td></tr><tr><td>Reported Liquidation Sell Orders (Units), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_1d">liquidations_reported_future_sell_units_1d</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>Native Units</td><td>1d</td></tr><tr><td>Reported Liquidation Sell Orders (USD), 5 Min</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_5m">liquidations_reported_future_sell_usd_5m</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>USD</td><td>5m</td></tr><tr><td>Reported Liquidation Sell Orders (USD), 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_1h">liquidations_reported_future_sell_usd_1h</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>USD</td><td>1h</td></tr><tr><td>Reported Liquidation Sell Orders (USD), 1 Day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_1d">liquidations_reported_future_sell_usd_1d</a></td><td>Liquidations</td><td>Futures</td><td>Sum</td><td>USD</td><td>1d</td></tr></tbody></table>

## **API Endpoints**

Liquidation metrics can be accessed using these endpoints:

* `timeseries/exchange-metrics`
* `timeseries/exchange-asset-metrics`
* `timeseries/pair-metrics`

and by passing in the `liquidation_reported_*` metrics in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

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
