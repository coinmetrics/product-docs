# Transaction Count

## Contents

* [Exchange Tx Cnt (TxExCnt)](transaction-count.md#txexcnt)

## Exchange Tx Cnt <a href="#txexcnt" id="txexcnt"></a>

### Definition

The sum count of transactions that involved any address belonging to an exchange, as a sender or recipient of a non-zero transfer of native units, in that interval. If a transaction involves multiple exchanges, it is only counted once.

| Name            | ID      | Unit         | Interval |
| --------------- | ------- | ------------ | -------- |
| Exchange Tx Cnt | TxExCnt | Transactions | 1 day    |

### Details

* Coinbase (i.e., miner reward) transactions are not counted.
* Only exchanges and their addresses that Coin Metrics has identified are included (i.e., not all exchanges and their addresses have been identified) so this metric should be thought of as a minimum potential value.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxExCnt" %}

## API Endpoints

Exchange Transaction Count metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `TxExCnt` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204414Z&X-Amz-Expires=172800&X-Amz-Signature=4f276cdbbe6e6a74330d81207f3b5964dda3faf8fd52501440d533444f0f0a4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxExCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxExCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="TxExCnt", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
