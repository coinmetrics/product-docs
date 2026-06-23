# Deposits

## Contents

* [ETF Deposits (FlowInXNtv, FlowInXUSD)](deposits.md#flowin)
* [ETF Deposit Count (FlowTfrInXCnt)](deposits.md#flowtfrin)

## ETF Deposits <a href="#flowin" id="flowin"></a>

### Definition

The sum of assets sent to an ETF that interval.

| Name                                                         | MetricID         | Unit         | Interval |
| ------------------------------------------------------------ | ---------------- | ------------ | -------- |
| ARK Invest Deposits (native units)                           | FlowInARKNtv     | Native units | 1 day    |
| ARK Invest Deposits (USD)                                    | FlowInARKUSD     | USD          | 1 day    |
| BlackRock Deposits (native units)                            | FlowInBLKNtv     | Native units | 1 day    |
| BlackRock Deposits (USD)                                     | FlowInBLKUSD     | USD          | 1 day    |
| Bitwise Deposits (native units)                              | FlowInBWSNtv     | Native units | 1 day    |
| Bitwise Deposits (USD)                                       | FlowInBWSUSD     | USD          | 1 day    |
| Exchange Traded Fund deposits, Including EtoE (native units) | FlowInEtfInclNtv | Native units | 1 day    |
| Exchange Traded Fund deposits, Including EtoE (USD)          | FlowInEtfInclUSD | USD          | 1 day    |
| Exchange Traded Fund Deposits (native units)                 | FlowInEtfNtv     | Native units | 1 day    |
| Exchange Traded Fund Deposits (USD)                          | FlowInEtfUSD     | USD          | 1 day    |
| Grayscale Deposits (native units)                            | FlowInGSCNtv     | Native units | 1 day    |
| Grayscale Deposits (USD)                                     | FlowInGSCUSD     | USD          | 1 day    |
| Invesco Deposits (native units)                              | FlowInINVNtv     | Native units | 1 day    |
| Invesco Deposits (USD)                                       | FlowInINVUSD     | USD          | 1 day    |
| Franklin Templeton Deposits (native units)                   | FlowInTMPNtv     | Native units | 1 day    |
| Franklin Templeton Deposits (USD)                            | FlowInTMPUSD     | USD          | 1 day    |
| VanEck Deposits (native units)                               | FlowInVANNtv     | Native units | 1 day    |
| VanEck Deposits (USD)                                        | FlowInVANUSD     | USD          | 1 day    |
| Valkyrie Deposits (native units)                             | FlowInVLKNtv     | Native units | 1 day    |
| Valkyrie Deposits (USD)                                      | FlowInVLKUSD     | USD          | 1 day    |
| WisdomTree Deposits (native units)                           | FlowInWDTNtv     | Native units | 1 day    |
| WisdomTree Deposits (USD)                                    | FlowInWDTUSD     | USD          | 1 day    |

### Details

* Native units are considered as sent to an ETF if they are sent to an address we identify as being owned by an ETF.
* USD flows are computed as FlowIn{ETF}Ntv \* PriceUSD

### Asset-Specific Details

* For Bitcoin, this metric excludes the effect of change outputs:
  * If a transaction sends 90 BTC to exchange A but also withdraws 50 BTC from it, the flow is +40 BTC, not +90 BTC and -50 BTC.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FlowInEtfInclNtv" %}

## ETF Deposit Count <a href="#flowtfrin" id="flowtfrin"></a>

### Definition

The sum count of transfers to any address belonging to an ETF in that interval. If the sender address also belongs to an ETF, the transfer is not counted.

<table><thead><tr><th>Name</th><th width="181">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>ARK Invest Deposit Count</td><td>FlowTfrInARKCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>BlackRock Deposit Count</td><td>FlowTfrInBLKCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Bitwise Deposit Count</td><td>FlowTfrInBWSCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Grayscale Deposit Count</td><td>FlowTfrInGSCCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Invesco Deposit Count</td><td>FlowTfrInINVCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Franklin Templeton Deposit Count</td><td>FlowTfrInTMPCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>VanEck Deposit Count</td><td>FlowTfrInVANCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Valkyrie Deposit Count</td><td>FlowTfrInVLKCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>WisdomTree Deposit Count</td><td>FlowTfrInWDTCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Exchange Traded Fund Deposits Count</td><td>FlowTfrToEtfCnt</td><td>Deposits</td><td>1 day</td></tr><tr><td>Exchange Traded Fund Deposits Count, incl EtoE</td><td>FlowTfrToEtfInclCnt</td><td>Deposits</td><td>1 day</td></tr></tbody></table>

### Details

* Coinbase (i.e., miner reward) transactions are not counted.

### Asset-Specific Details

* For UTXO-based protocols, this metric does not count change outputs:
  * If the input addresses belong to a given ETF, then the outputs belonging to the same ETF are not counted as transfers to that ETF

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FlowTfrInARKCnt" %}

## API Endpoints

ETF Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowIn*` and `FlowTfrIn*` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204413Z&X-Amz-Expires=172800&X-Amz-Signature=3445c0f15057bdba4449b8da2f8cfab81ba91c772f77058d13e3d3244494bc6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowInARKNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowInARKNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowInARKNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
