# Price

### Contents

* [Price, BTC](price.md#btc-denominated-closing-price)
* [Price, USD](price.md#usd-denominated-closing-price)

## BTC Denominated Closing Price

### Definition

The price of the asset denominated in Bitcoin units.

| Name                  | MetricID | Unit | Interval      |
| --------------------- | -------- | ---- | ------------- |
| BTC Denominated Price | PriceBTC | BTC  | 1 day, 1 hour |

### Details

* This metric is available in both daily and block frequencies. The daily frequency represents the price as of the end of the day in UTC time. The block frequency represents the price at the time the block was added to the blockchain.\\
* This metric is identical to `ReferenceRateBTC` but with different timestamp conventions. Please see the frequently asked questions below for more information on this topic.\\
* This price is computed using our CM Reference Rates. Please see our CM Prices Overview for more information on methodology and policies.

### Example

A sample of the `PriceBTC` metric for Ethereum with daily frequency is shown below:

```
{
  "data" : [ {
    "asset" : "eth",
    "time" : "2023-03-18T00:00:00.000000000Z",
    "PriceBTC" : "0.06538140200862749"
  }, {
    "asset" : "eth",
    "time" : "2023-03-19T00:00:00.000000000Z",
    "PriceBTC" : "0.06392540140433825"
  }, {
    "asset" : "eth",
    "time" : "2023-03-20T00:00:00.000000000Z",
    "PriceBTC" : "0.062418493975669356"
  }, {
    "asset" : "eth",
    "time" : "2023-03-21T00:00:00.000000000Z",
    "PriceBTC" : "0.06407211604389325"
  }, {
    "asset" : "eth",
    "time" : "2023-03-22T00:00:00.000000000Z",
    "PriceBTC" : "0.06357608845321447"
  }
}
```

A sample of the `PriceBTC` metric for Ethereum with block frequency is shown below:

```
{
  "data" : [ {
    "block_hash" : "cf604b220ea0f3fba67244573f33a36919b6cf2ff7ea210a86377d229bb9b0d8",
    "parent_block_hash" : "152ca610b2f68643c43dd82dcdb79519ee26f490cf29c14456ac23f9489eaa1b",
    "height" : "16890992",
    "asset" : "eth",
    "time" : "2023-03-23T15:01:35.000000000Z",
    "PriceBTC" : "0.06447664"
  }, {
    "block_hash" : "7f279840f5f4cf23a7a6c880531f1dd2858b2a6ad220dc7123600c064c700db9",
    "parent_block_hash" : "cf604b220ea0f3fba67244573f33a36919b6cf2ff7ea210a86377d229bb9b0d8",
    "height" : "16890993",
    "asset" : "eth",
    "time" : "2023-03-23T15:01:47.000000000Z",
    "PriceBTC" : "0.0644538"
  }, {
    "block_hash" : "2051a0dba9018764e8469f4f5de4845c5c7333e34b84e258f088f6b7ceb5369e",
    "parent_block_hash" : "7f279840f5f4cf23a7a6c880531f1dd2858b2a6ad220dc7123600c064c700db9",
    "height" : "16890994",
    "asset" : "eth",
    "time" : "2023-03-23T15:01:59.000000000Z",
    "PriceBTC" : "0.0644743"
  }, {
    "block_hash" : "fb45b96b4527c535a957754ef81b603e878da31d05f20010497914177cd0c2b0",
    "parent_block_hash" : "2051a0dba9018764e8469f4f5de4845c5c7333e34b84e258f088f6b7ceb5369e",
    "height" : "16890995",
    "asset" : "eth",
    "time" : "2023-03-23T15:02:11.000000000Z",
    "PriceBTC" : "0.06449479"
  }, {
    "block_hash" : "e5f672e9accdcedc0c319de63037a25102b47efdfd794bf4e3e5124bcc20b8c4",
    "parent_block_hash" : "fb45b96b4527c535a957754ef81b603e878da31d05f20010497914177cd0c2b0",
    "height" : "16890996",
    "asset" : "eth",
    "time" : "2023-03-23T15:02:23.000000000Z",
    "PriceBTC" : "0.06443347"
  }
}
```

* **`asset`**: The ID of the asset.\\
* **`time`**: The reference rate time in ISO 8601 date-time format.\\
* **`PriceBTC`**: The published reference rate value in Bitcoin units.\\
* **`block_hash`**: The hash of the block.\\
* **`parent_block_hash`**: The hash of the parent block.\\
* **`height`**: The block height.

### Release History

* Released in the version 1.0 release of NDP

### Availability for Assets

Please see our Coin Metrics Coverage below for our asset coverage universe.

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PriceBTC" %}

## USD Denominated Closing Price

### Definition

The price of the asset denominated in U.S. Dollars.

| Name                          | MetricID | Unit | Interval              |
| ----------------------------- | -------- | ---- | --------------------- |
| USD Denominated Closing Price | PriceUSD | USD  | 1 day, 1block, 1 hour |

### Details

* This metric is available in both daily and block frequencies. The daily frequency represents the price as of the end of the day in UTC time. The block frequency represents the price at the time the block was added to the blockchain.\\
* This metric is identical to `ReferenceRate` and `ReferenceRateUSD` but with different timestamp conventions. Please see the frequently asked questions below for more information on this topic.\\
* This price is computed using our CM Reference Rates. Please see our CM Prices Overview for more information on methodology and policies.

### Example

A sample of the `PriceUSD` metric for Bitcoin with daily frequency is shown below:

```
{
  "data" : [ {
    "asset" : "btc",
    "time" : "2023-03-18T00:00:00.000000000Z",
    "PriceUSD" : "26985.7359915254"
  }, {
    "asset" : "btc",
    "time" : "2023-03-19T00:00:00.000000000Z",
    "PriceUSD" : "28185.2043319696"
  }, {
    "asset" : "btc",
    "time" : "2023-03-20T00:00:00.000000000Z",
    "PriceUSD" : "27834.3361090006"
  }, {
    "asset" : "btc",
    "time" : "2023-03-21T00:00:00.000000000Z",
    "PriceUSD" : "28172.7950558153"
  }, {
    "asset" : "btc",
    "time" : "2023-03-22T00:00:00.000000000Z",
    "PriceUSD" : "27341.5571297487"
  }
}
```

A sample of the `PriceUSD` metric for Bitcoin with block frequency is shown below:

```
{
  "data" : [ {
    "block_hash" : "000000000000000000061ade334ac0403c9473001639a16d4ff93bb822d30e92",
    "parent_block_hash" : "00000000000000000003c4583ecf8f90eefc404e8fb42e035649b7ed3010936d",
    "height" : "782143",
    "asset" : "btc",
    "time" : "2023-03-23T13:33:46.000000000Z",
    "PriceUSD" : "27520.25"
  }, {
    "block_hash" : "000000000000000000063ca1e45712d631ae9daa0bca98fd2d42229471d5abd6",
    "parent_block_hash" : "000000000000000000061ade334ac0403c9473001639a16d4ff93bb822d30e92",
    "height" : "782144",
    "asset" : "btc",
    "time" : "2023-03-23T13:36:23.000000000Z",
    "PriceUSD" : "27493.35"
  }, {
    "block_hash" : "000000000000000000040f8e246619bea33b4e22a4f797daa78ef721c727885f",
    "parent_block_hash" : "000000000000000000063ca1e45712d631ae9daa0bca98fd2d42229471d5abd6",
    "height" : "782145",
    "asset" : "btc",
    "time" : "2023-03-23T13:48:09.000000000Z",
    "PriceUSD" : "27404.86"
  }, {
    "block_hash" : "0000000000000000000391940aa48790413a38ec3834d299a05eaaa797f2336b",
    "parent_block_hash" : "000000000000000000040f8e246619bea33b4e22a4f797daa78ef721c727885f",
    "height" : "782146",
    "asset" : "btc",
    "time" : "2023-03-23T13:49:45.000000000Z",
    "PriceUSD" : "27384.94"
  }, {
    "block_hash" : "000000000000000000006b582725ac8e609305e3b5643afe0a92205220cf7fa6",
    "parent_block_hash" : "0000000000000000000391940aa48790413a38ec3834d299a05eaaa797f2336b",
    "height" : "782147",
    "asset" : "btc",
    "time" : "2023-03-23T14:20:06.000000000Z",
    "PriceUSD" : "27463"
  }
}
```

* **`asset`**: The ID of the asset.\\
* **`time`**: The reference rate time in ISO 8601 date-time format.\\
* **`PriceUSD`**: The published reference rate value in U.S. Dollars.\\
* **`block_hash`**: The hash of the block.\\
* **`parent_block_hash`**: The hash of the parent block.\\
* **`height`**: The block height.

### Release History

* Released in the version 1.0 release of NDP

### Availability for Assets

Please see our Coin Metrics Coverage below for our asset coverage universe.

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PriceUSD" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Price*`  in the `metrics` parameter.

{% swagger path="/timeseries/asset-metrics" method="get" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PriceUSD&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PriceUSD&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="PriceUSD", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
