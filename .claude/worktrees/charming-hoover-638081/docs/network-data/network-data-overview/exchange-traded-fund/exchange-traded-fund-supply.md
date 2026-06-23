# Exchange Traded Fund Supply

## Contents

* [ETF Supply (SplyXNtv, SplyXUSD)](exchange-traded-fund-supply.md#splyex)

## ETF Supply <a href="#splyex" id="splyex"></a>

### Definition

The sum held by an ETF at the end of that interval.

| Name                                       | MetricID   | Unit         | Interval |
| ------------------------------------------ | ---------- | ------------ | -------- |
| ARK Invest Supply (native units)           | SplyARKNtv | Native units | 1 day    |
| ARK Invest Supply (USD)                    | SplyARKUSD | USD          | 1 day    |
| BlackRock Supply (native units)            | SplyBLKNtv | Native units | 1 day    |
| BlackRock Supply (USD)                     | SplyBLKUSD | USD          | 1 day    |
| Bitwise Supply (native units)              | SplyBWSNtv | Native units | 1 day    |
| Bitwise Supply (USD)                       | SplyBWSUSD | USD          | 1 day    |
| Exchange Traded Fund Supply (native units) | SplyEtfNtv | Native units | 1 day    |
| Exchange Traded Fund Supply (USD)          | SplyEtfUSD | USD          | 1 day    |
| Grayscale Supply (native units)            | SplyGSCNtv | Native units | 1 day    |
| Grayscale Supply (USD)                     | SplyGSCUSD | USD          | 1 day    |
| Invesco Supply (native units)              | SplyINVNtv | Native units | 1 day    |
| Invesco Supply (USD)                       | SplyINVUSD | USD          | 1 day    |
| Franklin Templeton Supply (native units)   | SplyTMPNtv | Native units | 1 day    |
| Franklin Templeton Supply (USD)            | SplyTMPUSD | USD          | 1 day    |
| VanEck Supply (native units)               | SplyVANNtv | Native units | 1 day    |
| VanEck Supply (USD)                        | SplyVANUSD | USD          | 1 day    |
| Valkyrie Supply (native units)             | SplyVLKNtv | Native units | 1 day    |
| Valkyrie Supply (USD)                      | SplyVLKUSD | USD          | 1 day    |
| WisdomTree Supply (native units)           | SplyWDTNtv | Native units | 1 day    |
| WisdomTree Supply (USD)                    | SplyWDTUSD | USD          | 1 day    |

### Details

* All wallets (hot and cold) are considered to count towards the supply held by an ETF.
* USD metrics computed as `Sply{ETF}Ntv * PriceUSD`.
* `SplyEtf*` includes the balances of all addresses we have flagged as being controlled by an ETF.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/SplyEtfNtv" %}

## API Endpoints

Exchange Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Sply{ETF}*` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204413Z&X-Amz-Expires=172800&X-Amz-Signature=3445c0f15057bdba4449b8da2f8cfab81ba91c772f77058d13e3d3244494bc6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyARKNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyARKNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyARKNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
