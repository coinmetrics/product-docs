# Slippage

## Definition

Price slippage is the difference between the quoted price of an asset and the execution price of a market order.

<table><thead><tr><th width="264">Name</th><th width="308">MetricID</th><th width="152">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Liquidity Slippage Percentage, $1K Ask</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_1K_ask_percent">liquidity_slippage_1K_ask_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $5K Ask</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_5K_ask_percent">liquidity_slippage_5K_ask_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $10K Ask</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_10K_ask_percent">liquidity_slippage_10K_ask_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $50K Ask</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_50K_ask_percent">liquidity_slippage_50K_ask_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $100K Ask</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_100K_ask_percent">liquidity_slippage_100K_ask_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $1M Ask</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_1M_ask_percent">liquidity_slippage_1M_ask_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $1K Bid</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_1K_bid_percent">liquidity_slippage_1K_bid_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $5K Bid</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_5K_bid_percent">liquidity_slippage_5K_bid_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $10K Bid</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_10K_bid_percent">liquidity_slippage_10K_bid_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $50K Bid</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_50K_bid_percent">liquidity_slippage_50K_bid_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $100K Bid</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_100K_bid_percent">liquidity_slippage_100K_bid_percent</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Liquidity Slippage Percentage, $1M Bid</td><td><a href="https://coverage.coinmetrics.io/market-metrics-v2/liquidity_slippage_1M_bid_percent">liquidity_slippage_1M_bid_percent</a></td><td>Dimensionless</td><td>1h</td></tr></tbody></table>

## Details

Price slippage is the difference, often represented as a percentage, between the quoted price of an asset and the execution price of a market order. There can be many causes for slippage, but the primary cause is the size of a trade with respect to the composition of the limit orderbook. The bid slippage metrics represent the price slippage of a sell order. And the ask slippage metrics represent the price slippage of a buy order.

Let’s say an investor wishes to purchase 1 BTC at the best ask price of $25,000 and they submit a market order. The top of the order book has a sell order at this price for 0.25 BTC, so .25 BTC is purchased at $25,000 per BTC. The next order in the orderbook is for 0.5 BTC, but at a price of $25,250. This is executed and 0.5 BTC is purchased at $25,250 per BTC. 0.75 BTC has now been purchased, and 0.25 BTC remain. The investor completes his order at the next offer in the orderbook, 0.5 BTC for $25,500. As only 0.25 BTC are needed to complete the 1 BTC purchase, the investor fills 0.25 BTC at the price of $25,500 per BTC. The effective execution price of this purchase is the average price of the individual orders, weighted by quantity:

### $$\frac{0.25\times\$25,000 + 0.5\times\$25,250 + 0.25\times\$25,500}{0.25 + 0.5 + 0.25} = \$25,250$$

The slippage is the percentage difference in the market price and this execution price:

$$\frac{\$25,250-\$25,000}{\$25,000} = 1\%$$

So this hypothetical purchase of 1 BTC incurred 1% slippage. If the trade size was different, then the slippage would change; that is, slippage is dependent on order size.

## API Endpoints

Liquidity slippage metrics can be accessed using the following endpoints:

* `timeseries/market-metrics`

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/market-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot&metrics=liquidity_slippage_1K_ask_percent&frequency=1h&limit_per_market=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot&metrics=liquidity_slippage_1K_ask_percent&frequency=1h&limit_per_market=1&api_key=<your_key>').json()
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
        markets=["coinbase-btc-usd-spot"], metrics=['liquidity_slippage_1K_ask_percent'], frequency='1h', limit_per_market=1
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}


## Examples

A sample of the liquidity slippage percentage for a $100K buy order on the `coinbase-btc-usd-spot` market is shown below:

```
{
  "data" : [ {
    "market" : "coinbase-btc-usd-spot",
    "time" : "2023-05-04T20:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent" : "0.038994542840022156"
  }, {
    "market" : "coinbase-btc-usd-spot",
    "time" : "2023-05-04T21:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent" : "0.02565041632600015"
  }, {
    "market" : "coinbase-btc-usd-spot",
    "time" : "2023-05-04T22:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent" : "0.023751750174591604"
  }, {
    "market" : "coinbase-btc-usd-spot",
    "time" : "2023-05-04T23:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent" : "0.012357077898177927"
  }, {
    "market" : "coinbase-btc-usd-spot",
    "time" : "2023-05-05T00:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent" : "0.004505088323999404"
  } ]
}
```

* **`market`**: The id of the markets.\\
* **`time`**: The time in ISO 8601 date-time format.\\
* **`liquidity_slippage_100K_ask_percent`**: The percent slippage of a $100K buy order executed at this time in this market.

## Release History

* **Release Version. Market Data Feed v2.8 on May 2023**.
