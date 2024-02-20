# Contents

* [Active Supply Percent](active-supply.md#splyactpct)
* [Active Supply with Address Balance >= $X USD](active-supply.md#splyactusd)
* [Active Supply with Address Balance >= X Native Units](active-supply.md#splyactusd)
* [Supply Held By Smart Contracts](active-supply.md#splycont)

# Val in Addrs w/ Bal ≥ X% of Current Supply <a href="#splyactpct" id="splyactpct"></a>

## Definition

The sum of all native units being held in addresses whose balance was at least X% of the current supply of native units as the end of that day. Only native units are considered (e.g., an address with less than X ETH but with more than X in ERC-20 tokens would not be considered).

## Dictionary

<table data-header-hidden><thead><tr><th>Name</th><th width="160">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Category</td><td>Subcategory</td><td>Type</td><td>Unit</td><td>Interval</td></tr><tr><td>Val in Addrs w/ Bal ≥ .00000001% of Current Supply</td><td>SplyAdrBal1in10B</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr><tr><td>Val in Addrs w/ Bal ≥ .0000001% of Current Supply</td><td>SplyAdrBal1in1B</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr><tr><td>Val in Addrs w/ Bal ≥ .000001% of Current Supply</td><td>SplyAdrBal1in100M</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr><tr><td>Val in Addrs w/ Bal ≥ .00001% of Current Supply</td><td>SplyAdrBal1in10M</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td><tr><td>Val in Addrs w/ Bal ≥ .0001% of Current Supply</td><td>SplyAdrBal1in1M</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr><tr><td>Val in Addrs w/ Bal ≥ .001% of Current Supply</td><td>SplyAdrBal1in100K</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr><tr><td>Val in Addrs w/ Bal ≥ .01% of Current Supply</td><td>SplyAdrBal1in10K</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr><tr><td>Val in Addrs w/ Bal ≥ .1% of Current Supply</td><td>SplyAdrBal1in1K</td><td>Supply</td><td>Addresses with Balance</td><td>Sum</td><td>Native units</td><td>1 day</td></tr></tr></tbody></table>



## Details

* The supply used is SplyCur
* The comparison is done using greater than or equal comparison (an address owning exactly 1/10,000,000,000th of the supply counts towards SplyAdrBal1in10B)
* For a day D, balances are taken at the end of that day.
* Only native units are taken into account, not L2 tokens.

## Asset-Specific Details

* For XRP, escrows are taken into account.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

## Release History

* Released in the version 4.0 of Network Data Pro

## **Availability for Assets**

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyAdrBal1in10B" %}

# Val in Addrs w/ Bal ≥ $X (native units)<a href="#splyactusd" id="splyactusd"></a>

## Definition

The sum of all native units being held in addresses whose balance was $1 or greater at the end of that day. Only native units are considered (e.g., an address with less than X ETH but with more than X in ERC-20 tokens would not be considered).

## Dictionary

| Name                         | MetricID       | Category | Subcategory            | Type | Unit         | Interval |
| ---------------------------- | -------------- | -------- | ---------------------- | ---- | ------------ | -------- |
| Val in Addrs w/ Bal ≥ $1 USD | SplyAdrBalUSD1 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ $10 USD | SplyAdrBalUSD10 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ $100 USD | SplyAdrBalUSD100 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ $1K USD | SplyAdrBalUSD1k | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ $10K USD | SplyAdrBalUSD10K | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ $100K USD | SplyAdrBalUSD100K | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |

## Details

* This metric breaks down the supply of an asset by the USD balance of addresses owning it.
* For a day D, balances are taken at the end of that day, the price used it the close price for that day too.
* Only native units are taken into account, not L2 tokens.
* The comparison is done using greater than or equal comparison (an address owning exactly $1 counts towards SplyAdrBalUSD1).

## Asset-Specific Details

* For Ripple, escrows are taken into account.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

## Release History

* Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyAdrBalUSD1" %}

# Val in Addrs w/ Bal ≥ X (native units) <a href="#splyactntv" id="splyactntv"></a>

## Definition

The sum of all native units being held in addresses whose balance was X native unit or greater at the end of that day. Only native units are considered (e.g., an address with less than X ETH but with more than X in ERC-20 tokens would not be considered).

| Name                                   | MetricID       | Category | Subcategory            | Type | Unit         | Interval |
| -------------------------------------- | -------------- | -------- | ---------------------- | ---- | ------------ | -------- |
| Val in Addrs w/ Bal ≥ .001 (native units) | SplyAdrBalNtv0.001 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ .01 (native units) | SplyAdrBalNtv0.001 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ .001 (native units) | SplyAdrBalNtv0.1 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ 1 (native units) | SplyAdrBalNtv1 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ 10 (native units) | SplyAdrBalNtv10 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ 100 (native units) | SplyAdrBalNtv100 | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ 1K (native units) | SplyAdrBalNtv1K | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ 10K (native units) | SplyAdrBalNtv10K | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Val in Addrs w/ Bal ≥ 100K (native units) | SplyAdrBalNtv100K | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |

## Details

* This metric breaks down the supply of an asset by the balance of addresses owning it.
* Only native units are taken into account, not L2 tokens.
* The comparison is done using greater than or equal comparison (an address owning exactly 1 native unit counts towards SplyAdrBalNtv1).

## Asset-Specific Details

* For Ripple, escrows are taken into account.
* This metric is not available for assets that have full privacy, like Monero and Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

## Release History

Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyAdrBalNtv1" %}


# Supply Held by Smart Contracts <a href="#splycont" id="splycont"></a>

## Definition

The sum of all native units being held by smart contracts.

| Name                                          | MetricID    | Category | Subcategory            | Type | Unit         | Interval |
| --------------------------------------------- | ----------- | -------- | ---------------------- | ---- | ------------ | -------- |
| Supply Held by Smart Contracts (native units) | SplyContNtv | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |
| Supply Held by Smart Contracts (USD) | SplyContUSD | Supply   | Addresses with Balance | Sum  | Native units | 1 day    |

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyContNtv" %}


# API Endpoints

Address with Balance Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyAdrBal*` and `SplyCont*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyAdrBal1in100K&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyAcSplyAdrBal1in100Kt1d&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyAdrBal1in100K", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
