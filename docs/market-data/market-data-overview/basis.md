# Basis

The basis is the annualized percent difference between the price of a theoretical futures contract and the price of its underlying spot market. Coin Metrics calculates this for several exchange-assets such as `binance-btc` and `ftx-eth`. We calculate four basis metrics at defined days to expiration.

## Definition

The annualized basis metrics measure the difference between the spot price and a futures price for a contract with given time to expiration. This difference is calculated as a percentage of the underlying spot price which we use our reference rates (using the calculation algorithm for frequencies 200ms, 1s, and 1m) to define, and annualized by the time to expiration.

![](https://lh6.googleusercontent.com/2Fesg0p\_Vl2StetkInrhLY3Wh5DWV9PuYXvsqa0qW78Y2kPsYaig5iY2qNY3Y4KsbGREGkqYelqOX91uhbGSzBcZYT0Ou1D1KCr7mjNgxcXxtl3z\_V1w3yzYeFk5wZXR1sAuLnAc)

<table><thead><tr><th>Name</th><th width="240">MetricID</th><th>Unit</th><th>Frequency</th></tr></thead><tbody><tr><td>Annualized Futures Basis, 30 day expiration</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_30d_exp">basis_annualized_30d_exp</a></td><td>USD</td><td>1d, 1h</td></tr><tr><td>Annualized Futures Basis, 60 day expiration</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_60d_exp">basis_annualized_60d_exp</a></td><td>USD</td><td>1d, 1h</td></tr><tr><td>Annualized Futures Basis, 90 day expiration</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_90d_exp">basis_annualized_90d_exp</a></td><td>USD</td><td>1d, 1h</td></tr><tr><td>Annualized Futures Basis, 120 day expiration</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_30d_exp">basis_annualized_120d_exp</a></td><td>USD</td><td>1d, 1h</td></tr></tbody></table>

## Methodology

We offer this calculation for various exchanges and assets in 30, 60, 90, and 120 day durations. The available contracts for an exchange and asset rarely ever align with the duration necessary and instead the target duration is calculated with a time adjusted weighting between the two contracts surrounding the target expiration. The target expiration is the time of the datapoint, t0, plus the indicated duration. For example if today was 2021-09-15 and we were creating a 30 day calculation then the target expiration would be 2021-10-15. In the case that the only futures contracts available for the asset and exchange combination were those with expirations on the last Friday of the month, we would use the contracts expiring on 2021-09-24 and 2021-10-29 as our two reference points. Please note that we currently utilized only quarterly contracts with expirations in March.

After defining the two contracts straddling the target expiration date, we find the basis between each contract and the spot price. Using the two contract’s basis we calculate the forward yield between the further dated contract and the nearer dated. This is the difference between the basis of each contract multiplied by their respective times to expiration, divided by the difference in their time to expiration.

![](https://lh5.googleusercontent.com/kkw\_dRSfoCw541IpaMgFjJwfVyILaqyZigwDK9urECRRXs6HgFpKKz0v14UM\_n7ZKqxoCPzkNqgHjFsLTm2f0PT4Lxb22nzYxVsSQCmjVAsnzQOWWMOUy1wNr85ZeTVgbyHwGVib)

Using this forward yield, we then calculate the target date’s basis by multiplying the front contract’s basis by the time to expiration and adding to it the forward yield multiplied by the difference between the front contract and the target expiration. We divide this by the total target duration to arrive at the basis for our target duration.

![](https://lh6.googleusercontent.com/YdRwj2culg3fD\_7\_O\_ucnVQZS08Fg7oOS7E5P9PZth-dblVdIOCy2t2cCb65uLidmDysepqpPCfqxdomkhg\_fW8ZZDp99iF0Au3h4KSIbPh2A8bIrFEFuLoY03Rut5iloV\_gPrVE)

We currently calculate these metrics for the following exchange-asset combinations:

okex-btc, okex-eth, kraken-eth, huobi-eth, kraken-btc, huobi-btc, ftx-eth, deribit-eth, ftx-btc, deribit-btc, cme-btc, cme-eth, bitmex-btc, binance-btc, binance-eth

## API Endpoints

Basis data can be accessed using the following endpoints:

* `timeseries/exchange-asset-metrics`

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?metrics=basis_annualized_30d_exp&exchange_assets=binance-btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?metrics=basis_annualized_30d_exp&exchange_assets=binance-btc&pretty=true&api_key=<your_key>').json()
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
        metrics="basis_annualized_30d_exp", 
        exchange_assets="binance-btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
