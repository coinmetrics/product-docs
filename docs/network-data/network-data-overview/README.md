# Network Data Pro Overview

Network Data Pro (NDP) provides insightful, aggregate network data metrics for a wide-variety of cryptoasset networks. We run blockchain nodes to collect and harmonize information from dozens of blockchains.

Our Network Data Pro metrics are aggregated at the asset level.

## Network Data Asset Coverage

Coin Metrics calculates Network Data Pro metrics for over 200 assets. A high-level view of our asset coverage can be found in the [CM Coverage Tool](https://coverage.coinmetrics.io/asset-metrics-v2/PriceUSD).

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/PriceUSD" %}

\
The specific asset availability for each metric can be found by:

* querying our [`/catalog-v2/asset-metrics`](https://api.coinmetrics.io/v4/catalog-v2/asset-metrics) API endpoint **or**
* selecting a metric from our [Asset Metrics Coverage Page ](https://coverage.coinmetrics.io/asset-metrics-v2?)(Products = Network Data)

Similarly you can also view the metrics available for a particular asset by viewing our [Asset Coverage Page](https://coverage.coinmetrics.io/assets-v2) (select the asset of interest).

## Data Available at Asset Level

Network Data Pro metrics are available at the asset level through the [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesAssetMetrics) API endpoint.

Details on the specific metrics are described in the pages linked in this section.

## Change Log

{% updates format="full" %}
{% update date="2025-11-10" %}
## Added New Assets to ND Metrics

<details>

<summary>New Assets Added</summary>

arb\_arb.eth\
audio\_eth\
axs\_eth\
band\_eth\
chz\_eth\
eurs\_eth\
ftm\_eth\
gbpt\_eth\
gho\_eth\
grt\_eth\
gyen\_eth\
idrt\_eth\
musd\_metamask\_eth\
rad\_eth\
rlusd\
rlusd\_eth\
sdai\_eth\
slp\_eth\
susde\_eth\
susdf\_eth\
toke\_eth\
usd0\
usd0\_eth\
usd1\
usd1\_eth\
usdcv\_eth\
usdf\_eth\
usdg\
usdg\_eth\
usds\
usds.e\_arb.eth\
usdx\_eth\
xidr\_eth\
xsgd\_eth

</details>
{% endupdate %}

{% update date="2025-12-03" %}
## Added xStocks on Solana to ND Metrics

Added xStocks on Solana to Network Data Metrics.

<details>

<summary>xStocks on Solana added:</summary>

* AAPLX\_SOL - Apple xStock on Solana
* AMZNX\_SOL - Amazon xStock on Solana
* COINX\_SOL - Coinbase xStock on Solana
* CRCLX\_SOL - Circle xStock on Solana
* GOOGLX\_SOL - Alphabet xStock on Solana
* HOODX\_SOL - Robinhood xStock on Solana
* MAX\_MASTERCARDXSTOCK\_SOL - Mastercard xStock on Solana
* MSFTX\_SOL - Microsoft xStock on Solana
* MSTRX\_SOL - MicroStrategy xStock on Solana
* NVDAX\_SOL - NVIDIA xStock on Solana
* QQQX\_SOL - Nasdaq xStock on Solana
* SPYX\_SOL - SP500 xStock on Solana
* TSLAX\_SOL - Tesla xStock on Solana

</details>
{% endupdate %}

{% update date="2025-12-08" %}
## Added CapMrktEstUSD for 85 New Asset

Added Estimated Market Cap for 85 new assets to fill out top 500 by market cap.

<details>

<summary>Estimated market cap added to the following assets:</summary>

0g\
2z\
ab\
alch\
aleo\
apepe\
aster\
ath\
ausd\
avnt\
b\
bard\
bera\
bfusd\
bianrensheng\
bio\
bmx\
bnsol\
cheems\
dbr\
deep\
drift\
eigen\
fartcoin\
ff\
fluid\
folks\
frxeth\
giggle\
gomining\
grass\
h\
hsk\
hype\
ip\
kaia\
kaito\
kite\
kmno\
kta\
lbtc\
lseth\
merl\
met\_meteora\
meta\_metadao\
meth\
moca\
mon\_monad\
morpho\
move\
myx\
npc\
nxpc\
pengu\
pippin\
pnut\
prove\
pump\
qubic\
recall\
red\
river\
s\
sahara\
sky\_sky\
snek\
solvbtc\
soso\
spx\
strx\
syrup\
toshi\
ub\
uds\
usdr\
useless\
vana\
virtual\
vsn\
wal\
wbeth\
wlfi\
xpl\
zano\
zbcn

</details>
{% endupdate %}

{% update date="2026-01-05" %}
## Expand CapMrktEstUSD to new Assets

Added estimated market cap to new assets

<details>

<summary>Estimated Market Cap added to the following assets:</summary>

1. a
2. adi
3. beat
4. cusd
5. dog
6. fbtc
7. frxusd
8. icnt
9. lit
10. me
11. moodeng
12. pieverse
13. prime
14. rlp
15. sdai
16. soon
17. stable
18. wsol
19. xpr

</details>
{% endupdate %}

{% update date="2026-01-08" %}
## Added Real Time Exchange Flows for ERC20s

Added block by block support for Exchange flow metrics for USDC\_ETH & PYUSD\_ETH. For details on Exchange Flow metric coverage please refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv). For details on exchange metrics please refer to the [exchange](exchange/ "mention")documentation page.
{% endupdate %}

{% update date="2026-01-12" %}
## $FLOW asset categorized as experimental

All `flow` assets and metrics have been categorized as experimental due to ongoing issues with reliably of the nodes. This imacts the `flow`, `flow_evm` and `flow_native` tickers.
{% endupdate %}

{% update date="2026-01-19" %}
## Released Exchange Flows for USDT\_ETH

Relesaed exchange flows for the usdt\_eth asset at the 1d frequency. For details on the supported metrics please refer to the [exchange](exchange/ "mention")page. For details on Exchange Flow metric coverage please refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv).
{% endupdate %}
{% endupdates %}

