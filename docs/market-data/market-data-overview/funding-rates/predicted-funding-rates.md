---
description: /timeseries/market-funding-rates-predicted
---

# Predicted Funding Rates

## Definition

Funding rates are a mechanism used by exchanges to keep the price of perpetual futures contracts aligned with the underlying spot market price. Unlike traditional futures, perpetual futures have no expiration date, which means they can deviate from the spot price indefinitely. The funding rate system addresses this by facilitating periodic payments between long and short position holders. These payments incentivize traders to take positions that bring perpetual futures prices closer to the underlying spot price.

Many exchanges report two different funding rates. The realized funding rate represents the actual funding rate calculated over the previous funding interval that is used in determining the funding payment. The predicted funding rate is the current estimate of what the funding rate will be at the end of the current funding interval. Some exchanges refer to the predicted funding rate as the real-time funding rate or the next funding rate.

Coin Metrics uses the term "funding rate" to refer to the realized funding rate that typically updates once every 8 hours for most exchanges, and the term "predicted funding rate" to refer to the funding rate that represents the estimated funding rate at the end of the current funding interval that updates in real-time. For more information on the realized funding rate, please see [Market Funding Rates](funding-rates.md).

## Details

The calculation and interpretation of the predicted funding rate is identical to the realized funding rate, except that the predicted funding rate updates in real-time. At the end of a funding interval, the predicted funding rate converges to the realized funding rate.

## API Endpoints

Funding rates can be accessed using the `timeseries/market-funding-rates-predicted` endpoint.

{% openapi src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/market-funding-rates-predicted" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endopenapi %}

{% tabs %}
{% tab title="Shell" %}
```
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-funding-rates-predicted?start_time=2023-01-01&paging_from=start&markets=deribit-XRP_USDC-PERPETUAL-future&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/market-funding-rates-predicted?start_time=2023-01-01&paging_from=start&markets=deribit-XRP_USDC-PERPETUAL-future&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_market_funding_rates_predicted(
        markets=["binance-BTCUSDT-future"], limit_per_market=5
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

## Example

A sample of the funding rates data from the `binance-BTCUSDT-future` market from our [`/timeseries/market-funding-rates`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketFundingRates) API endpoint is provided below.

```
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "time": "2025-03-21T20:18:00.000000000Z",
      "rate_predicted": "0.00005393",
      "database_time": "2025-03-21T20:18:10.143209000Z",
      "rate_time": "2025-03-22T00:00:00.000000000Z"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2025-03-21T20:19:00.000000000Z",
      "rate_predicted": "0.00005442",
      "database_time": "2025-03-21T20:19:35.864430000Z",
      "rate_time": "2025-03-22T00:00:00.000000000Z"
    }
  ]
}
```

* **`market`**: The id of the market. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets.
* **`time`**: The exchange-reported time in ISO 8601 date-time format with nanoseconds precision.
* **`rate_predicted`**: The predicted funding rate expressed as a percentage over the period. For example, if the predicted funding rate is 0.10%, expressed as an 8 hour rate and calculated over the past 8 hours, the `rate_predicted`is `0.0010`.
* **`database_time`**: The timestamp when the data was saved in the database in ISO 8601 date-time format with nanoseconds precision.
* **`rate_time` :** The timestamp representing the end of the current funding interval. The predicted funding rate is a real-time estimate of what the realized funding rate will be at this timestamp.&#x20;

## Frequently Asked Questions

### What is the sampling frequency of the predicted funding rates?

The predicted funding rate is sampled once a minute for all listed instruments on the exchanges in our coverage universe.

## Availability

### Availability by Market

{% embed url="https://coverage.coinmetrics.io/market-funding-rates-predicted-v2" %}

### Availability by Exchange

| Exchange | Start Date |
| -------- | ---------- |
| Binance  | 2024-11-06 |
| Bybit    | 2023-01-27 |
| Deribit  | 2023-01-16 |
| OKEx     | 2025-01-13 |
