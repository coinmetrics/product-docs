# Transaction Count

## Contents

* ETF Tx Cnt (TxEtfCnt)

## ETF Tx Cnt <a href="#txexcnt" id="txexcnt"></a>

### Definition

The sum count of transactions that involved any address belonging to an exchange, as a sender or recipient of a non-zero transfer of native units, in that interval. If a transaction involves multiple exchanges, it is only counted once.

| Name                        | ID       | Unit         | Interval |
| --------------------------- | -------- | ------------ | -------- |
| Exchange Traded Fund Tx Cnt | TxEtfCnt | Transactions | 1 day    |

### Details

* Coinbase (i.e., miner reward) transactions are not counted.
* Only ETFs and their addresses that Coin Metrics has identified are included so this metric should be thought of as a minimum potential value.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/TxEtfCnt" %}

## API Endpoints

Exchange Transaction Count metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `TxEtfCnt` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204413Z&X-Amz-Expires=172800&X-Amz-Signature=3445c0f15057bdba4449b8da2f8cfab81ba91c772f77058d13e3d3244494bc6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxEtfCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxEtfCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="TxEtfCnt", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
