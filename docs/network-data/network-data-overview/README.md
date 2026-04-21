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
{% update date="2026-04-16" %}
## Added BUIDL\_SOL to Network Data Metrics

Added metrics support for BlackRock's BUIDL tokenized money market fund on Solana (`buidl_sol`). For full asset coverage details refer to the [coverage page](https://coverage.coinmetrics.io/assets-v2).
{% endupdate %}

{% update date="2026-04-02" %}
## Added Huobi Exchange Flows for ETH

Released exchange flow metrics for ETH on the Huobi (HTX) exchange. For details on the supported metrics please refer to the [exchange](exchange/ "mention") page. For details on Exchange Flow metric coverage please refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv).
{% endupdate %}

{% update date="2026-04-02" %}
## Added New Assets to ND Metrics

Added the following assets to Network Data metrics:

<details>

<summary>New Assets Added</summary>

* APR - aPriori
* DMC - DeLorean
* OBOL
* PRO
* SSV - SSV Network
* TUT
* ZEREBRO

</details>
{% endupdate %}

{% update date="2026-04-01" %}
## Added xStocks on Ethereum to ND Metrics

Added Network Data metrics for xStock tokenized equities on Ethereum. For full asset coverage details refer to the [coverage page](https://coverage.coinmetrics.io/assets-v2).

<details>

<summary>xStock tokens on Ethereum added:</summary>

* AAPLX\_ETH - Apple xStock on Ethereum
* ABBVX\_ETH - AbbVie xStock on Ethereum
* ABTX\_ETH - Abbott xStock on Ethereum
* ACNX\_ETH - Accenture xStock on Ethereum
* AMBRX\_ETH - Ambarella xStock on Ethereum
* AMDX\_ETH - AMD xStock on Ethereum
* AMZNX\_ETH - Amazon xStock on Ethereum
* APPX\_ETH - Appian xStock on Ethereum
* AVGOX\_ETH - Avago xStock on Ethereum
* AZNX\_ETH - AstraZeneca xStock on Ethereum
* BACX\_ETH - Bank of America xStock on Ethereum
* BMNRX\_ETH - Bowman xStock on Ethereum
* BRK.BX\_ETH - Berkshire Hathaway xStock on Ethereum
* BTBTX\_ETH - Bit Digital xStock on Ethereum
* BTGOX\_ETH - Bitgold xStock on Ethereum
* CMCSAX\_ETH - Comcast xStock on Ethereum
* COINX\_ETH - Coinbase xStock on Ethereum
* COPXX\_ETH - ConocoPhillips xStock on Ethereum
* CRCLX\_ETH - Circle xStock on Ethereum
* CRMX\_ETH - Salesforce xStock on Ethereum
* CRWDX\_ETH - CrowdStrike xStock on Ethereum
* CSCOX\_ETH - Cisco xStock on Ethereum
* CVXX\_ETH - CVS xStock on Ethereum
* DFDVX\_ETH - DeFi Dev xStock on Ethereum
* DHRX\_ETH - Danaher xStock on Ethereum
* GLDX\_ETH - Gold ETF xStock on Ethereum
* GMEX\_ETH - GM xStock on Ethereum
* GOOGLX\_ETH - Alphabet xStock on Ethereum
* GSX\_ETH - Goldman Sachs xStock on Ethereum
* HDX\_ETH - Home Depot xStock on Ethereum
* HONX\_ETH - Honeywell xStock on Ethereum
* HOODX\_ETH - Robinhood xStock on Ethereum
* IBMX\_ETH - IBM xStock on Ethereum
* IEMGX\_ETH - iShares Emerging Markets ETF xStock on Ethereum
* IJRX\_ETH - iShares Small Cap ETF xStock on Ethereum
* INTCX\_ETH - Intel xStock on Ethereum
* IWMX\_ETH - iShares Russell 2000 ETF xStock on Ethereum
* JNJX\_ETH - Johnson & Johnson xStock on Ethereum
* JPMX\_ETH - JPMorgan xStock on Ethereum
* KOX\_ETH - Coca-Cola xStock on Ethereum
* KRAQX\_ETH - Kraken xStock on Ethereum
* LINX\_ETH - Linkedin xStock on Ethereum
* LLYX\_ETH - Lilly xStock on Ethereum
* MAX\_MASTERCARDXSTOCK\_ETH - Mastercard xStock on Ethereum
* MCDX\_ETH - McDonald's xStock on Ethereum
* MDTX\_ETH - Medtronic xStock on Ethereum
* MRKX\_ETH - Merck xStock on Ethereum
* MRVLX\_ETH - Marvell xStock on Ethereum
* MSFTX\_ETH - Microsoft xStock on Ethereum
* MSTRX\_ETH - MicroStrategy xStock on Ethereum
* NFLXX\_ETH - Netflix xStock on Ethereum
* NVDAX\_ETH - NVIDIA xStock on Ethereum
* NVOX\_ETH - Novo Nordisk xStock on Ethereum
* OPENX\_ETH - OpenAI xStock on Ethereum
* ORCLX\_ETH - Oracle xStock on Ethereum
* PALLX\_ETH - Palladium ETF xStock on Ethereum
* PEPX\_ETH - PepsiCo xStock on Ethereum
* PFEX\_ETH - Pfizer xStock on Ethereum
* PGX\_ETH - Procter & Gamble xStock on Ethereum
* PLTRX\_ETH - Palantir xStock on Ethereum
* PMX\_ETH - Philip Morris xStock on Ethereum
* PPLTX\_ETH - PPL xStock on Ethereum
* QQQX\_ETH - Nasdaq 100 ETF xStock on Ethereum
* SCHFX\_ETH - Schwab International ETF xStock on Ethereum
* SLVX\_ETH - Silver ETF xStock on Ethereum
* SPYX\_ETH - S&P 500 ETF xStock on Ethereum
* STRCX\_ETH - Strategy xStock on Ethereum
* TBLLX\_ETH - T-Bill xStock on Ethereum
* TMOX\_ETH - Thermo Fisher xStock on Ethereum
* TONXX\_ETH - TON xStock on Ethereum
* TQQQX\_ETH - 3x Nasdaq ETF xStock on Ethereum
* TSLAX\_ETH - Tesla xStock on Ethereum
* UNHX\_ETH - UnitedHealth xStock on Ethereum
* VTIX\_ETH - Viti xStock on Ethereum
* VTX\_ETH - Vertex xStock on Ethereum
* VX\_ETH - Vega xStock on Ethereum
* WMTX\_WALMARTXSTOCK\_ETH - Walmart xStock on Ethereum
* WTGXX\_ETH - WisdomTree Government Money Market Digital Fund on Ethereum
* XOMX\_ETH - ExxonMobil xStock on Ethereum

</details>
{% endupdate %}

{% update date="2026-03-31" %}
## Expanded CapMrktEstUSD to 150+ New Assets

Added estimated market cap to over 150 new assets.

<details>

<summary>Estimated Market Cap added to the following assets:</summary>

a2z\
a8\
ace\_fusionist\
acs\
act\
acx\
aero\
aevo\
aixbt\
allo\
arty\
awe\
b3\
ban\
bananas31\
babydoge\
beamx\
bigtime\
blast\
bluai\
blue\
bmt\
camp\
carv\
cat\
cati\
cetus\
cgpt\
chillguy\
clanker\
cloud\
cookie\
coq\
cow\
cspr\
cta\
cxt\
degen\
dogs\
dolo\
dood\
duck\
dym\
ela\
elizaos\
ept\
era\
es\
f\
fhe\
fitfi\
flock\
fort\
g\
giga\
goat\
gps\
griffain\
gtai\
gun\
haedal\
high\
hippo\
hmstr\
home\
house\
hpos10i\
htx\
hyper\
init\
io\
j\
kas\
kernel\
lat\
linea\
lista\
lmwr\
lrds\
manta\
mavia\
melania\
memefi\
mew\
michi\
mmt\
mubarak\
naka\
navx\
neirocto\
nil\
nom\_nomina\
ntrn\
obt\
one\_harmony\
open\_openledger\
parti\
planck\
polyx\
ponke\
prcl\
puffer\
rdnt\
resolv\
rez\
rss3\
saga\
sapien\
saros\
sca\
sfund\
shell\
sign\
solv\
somi\
sonic\
soph\
spa\
sqd\
sto\
swarms\
sweat\
swell\
sxt\
syn\
synd\
taiko\
time\
token\
towns\
trump\
trust\
turbo\
usual\
uxlink\
vanry\
velo\_velodromefinance\
vic\
vine\
vinu\
vvv\
wct\
well\
win\_wink\
wmtx\
xan\
xch\
xion\
xter\
yb\
zbt\
zeus\
zig\
zkc\
zora\
zrx

</details>
{% endupdate %}

{% update date="2026-03-16" %}
## Added XRP Token Metrics

Added Network Data metrics support for tokens on the XRP Ledger. For full asset coverage details refer to the [coverage page](https://coverage.coinmetrics.io/assets-v2).

<details>

<summary>XRP tokens added:</summary>

* EURCV\_XRP - EUR CoinVertible on XRP
* OUSG\_XRP - Ondo Short-Term U.S. Government Bond Fund on XRP
* RLUSD\_XRP - Ripple USD on XRP
* TBILL\_XRP - OpenEden T-Bill on XRP
* USDC\_XRP - USD Coin on XRP
* XSGD\_XRP - XSGD on XRP

</details>
{% endupdate %}

{% update date="2026-03-10" %}
## Extended Economically Active Addresses to BTC

Extended the `AdrActUSD1Cnt` metric to Bitcoin, capturing addresses that transacted at least 1 USD in a single transfer. This metric was previously available for Ethereum and Solana. For full details refer to the [documentation](https://docs.coinmetrics.io/network-data/network-data-overview/addresses/active-addresses#economically-active-addresses). For full coverage details refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/AdrActUSD1Cnt).
{% endupdate %}

{% update date="2026-02-24" %}
## Added Economically Relevant Addresses

Added a new metric for Ethereum and Solana that captures the count of economically relevant addresses, defined as any address that transacted at least 1 USD in a single transfer - **`AdrActUSD1Cnt`**. For full details and examples refer to the [documentation](https://docs.coinmetrics.io/network-data/network-data-overview/addresses/active-addresses#economically-active-addresses). For full coverage details refer to the coverage page [here](https://coverage.coinmetrics.io/asset-metrics-v2/AdrActUSD1Cnt).
{% endupdate %}

{% update date="2026-02-17" %}
## Release Hourly Exchange and ETF Flow Metrics

Expanded our exchange flow and BTC ETF coverage with hourly flows metrics for all existing assets and exchanges/ETFs. For the full list of exchange please refer to our [Exchange coverage](exchange/#on-chain-exchange-coverage) and for a full coverage of our ETF coverage please refer to our [ETF Coverage](exchange-traded-fund/#on-chain-etf-coverage). For details on asset coverage for Exchange Flows and ETF Flows metric please refer to our coverage page ([Exchanges](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv), [ETFs](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInEtfNtv))
{% endupdate %}

{% update date="2026-01-19" %}
## Released Exchange Flows for USDT\_ETH

Released exchange flows for the usdt\_eth asset at the 1d frequency. For details on the supported metrics please refer to the [exchange](exchange/ "mention")page. For details on Exchange Flow metric coverage please refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv).
{% endupdate %}

{% update date="2026-01-12" %}
## $FLOW asset categorized as experimental

All `flow` assets and metrics have been categorized as experimental due to ongoing issues with reliably of the nodes. This imacts the `flow`, `flow_evm` and `flow_native` tickers.
{% endupdate %}

{% update date="2026-01-08" %}
## Added Real Time Exchange Flows for ERC20s

Added block by block support for Exchange flow metrics for USDC\_ETH & PYUSD\_ETH. For details on Exchange Flow metric coverage please refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv). For details on exchange metrics please refer to the [exchange](exchange/ "mention")documentation page.
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

{% update date="2025-11-19" %}
## Release Exchange Flows for USDC & PYUSD on Ethereum

Added Exchange flow metrics for USDC\_ETH and PYUSD\_ETH at the daily frequency. For details on Exchange Flow metric coverage please refer to the [coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv). For details on exchange metrics please refer to the [exchange](exchange/ "mention")documentation page.
{% endupdate %}

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
{% endupdates %}

