# Bid-Ask Spread Percent

## Definition

Spread, one of the most common measures of liquidity and transaction costs, is the difference between the price that buyers are bidding at and the price that sellers are asking for. A large spread indicates disagreement between market participants on price and lends to inefficiencies in the market.

<table><thead><tr><th width="187">Name</th><th width="308">MetricID</th><th width="140">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Liquidity Bid/Ask Spread Percentage, 1 Min</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_bid_ask_spread_percent_1m">liquidity_bid_ask_spread_percent_1m</a></td><td>Dimensionless</td><td>1m</td></tr><tr><td>Liquidity Bid/Ask Spread Percentage, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_bid_ask_spread_percent_1h">liquidity_bid_ask_spread_percent_1h</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Bid/Ask Spread Percentage, 1 Day</td><td><a href="../../liquidity/liquidity_bid_ask_spread_percent_1d/">liquidity_bid_ask_spread_percent_1d</a></td><td>Dimensionless</td><td>1d</td></tr></tbody></table>

## Details

Spread is normally calculated using the prices listed at the top of the book— that is, comparing the highest bidding price and the lowest asking price. There are many variations on spread in the literature, such as an effective spread that only uses market candle data and taking into account a degree of orderbook depth. However, here we stick to the classical formulation of spread.

Spread, the difference between the quote asset’s ask and bid price, can be presented raw or as a percentage of a reference price. Typically this reference price is the midpoint between the bid and asking price. Here we represent it as a percentage of the mid price.

We offer the bid-ask spread over 1m, 1h, and 1d intervals. Each of these metrics represents the average bid-ask spread over the interval of time.

## API Endpoints

Liquidity bid-ask spread metrics can be accessed using the following endpoints:

* `timeseries/market-metrics`

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/market-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot&metrics=liquidity_bid_ask_spread_percent_1h&frequency=1h&limit_per_market=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot&metrics=liquidity_bid_ask_spread_percent_1h&frequency=1h&limit_per_market=1&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_market_metrics(
        markets=["coinbase-btc-usd-spot"], metrics=['liquidity_bid_ask_spread_percent_1h'], frequency='1h', limit_per_market=1
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}


## Examples

A sample of the daily bid-ask spread for the `coinbase-btc-usd-spot` market is shown below:

```
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2023-04-30T00:00:00.000000000Z",
      "liquidity_bid_ask_spread_percent_1d": "0.00581714797972098"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2023-05-01T00:00:00.000000000Z",
      "liquidity_bid_ask_spread_percent_1d": "0.007762221844825188"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2023-05-02T00:00:00.000000000Z",
      "liquidity_bid_ask_spread_percent_1d": "0.007638642427878028"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2023-05-03T00:00:00.000000000Z",
      "liquidity_bid_ask_spread_percent_1d": "0.008122796665005141"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2023-05-04T00:00:00.000000000Z",
      "liquidity_bid_ask_spread_percent_1d": "0.007612002413638571"
    }
  ]
}
```

* **`market`**: The IDs of the market.\\
* **`time`**: The time in ISO 8601 date-time format.\\
* **`liquidity_bid_ask_spread_percent_1d`**: The daily average spread between the bid-ask price, represented as a percentage of the mid price.

## Frequenty Asked Questions

### What units are the bid-ask spread metrics in?

The values are in percent units. For example, if the value is 0.0076, it should be interpreted as 0.0076%.

## Release History

* **Release Version. Market Data Feed v2.8 on May 2023**.
