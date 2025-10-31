# FAQs

This page contains frequently asked questions about Coin Metrics data products, organized by category for easy navigation.

## Quick Navigation

- [General](#general)
- [Network Data](#network-data)
- [Market Data](#market-data)
- [Prices](#prices)
- [Indexes](#indexes)
- [Reference Data](#reference-data)

---

## General

<details>

<summary>What metric naming conventions does Coin Metrics use?</summary>

In general, we use snake case (ex: snake\_case) when naming our metrics in which each space is placed by an underscore (\_) character, and the first letter of each word is written in lowercase.

The order of terms is ordered from the most general to most specific and ends with the unit used, if applicable. For example, the order of terms in the metric `volume_reported_future_perpetual_usd_1d` is ordered such that the `volume` term is first and all subsequent terms are modifiers to what type of volume the metric represents.

Some metrics are naturally represented as an aggregation (such as a sum or mean) over a time interval (such as a block, an hour, or day). If the metric represents an aggregation over a time interval, the interval is appended as a suffix to the metric name. If the metric represents a value at a point in time, there is no suffix. Please see the frequently asked question ["What timestamp conventions does Coin Metrics use?"](#what-timestamp-conventions-does-coin-metrics-use).

The exception to this convention is that all Network Data Pro metrics use upper camel case (ex: CamelCase) in which names omit spaces and the separation of words is indicated by a single capitalized letter. The first word is also capitalized. Network Data Pro metrics used the upper camel case naming convention prior to our adoption of the snake case naming convention for all other metrics, so we maintain the upper camel case naming convention for Network Data Pro metrics for consistency and backwards compatibility.

If a frequency or time interval is added to the metric name, it follows the following conventions:

* **`s`:** seconds
* **`b`:** blocks
* **`m`:** minutes
* **`h`:** hours
* **`d`:** days
* **`w`:** weeks
* **`mo`:** months
* **`q`:** quarters
* **`y`:** years

</details>

<details>

<summary>What timestamp conventions does Coin Metrics use?</summary>

We use two timestamp conventions for our data types: point-in-time and beginning-of-interval.

For any data type where the value represents a measurement at a point in time, we set the timestamp to that specific point in time. This is referred to as the "point-in-time" timestamp convention. We use this timestamp convention for any data type that represents a discrete event (such as a trade or order book update) or any data type that represents the snapshot of the state of something (such as an open interest snapshot or order book snapshot). For instance, if the `time` for a trade is `2021-08-04 23:56:00.356749000`, that means that the trade was executed exactly at that timestamp.

For any data type that represents a summary statistic over an interval of time, we set the timestamp to the beginning of the time interval. This is referred to as the "beginning-of-interval" timestamp convention. Summary statistics can include transformations such as sum, mean, median, and count. Our candles is an example of a data type that follows this convention because it represents the open, high, low, close, and volume over an interval of time such as a day. For instance, if the `time` for a daily candle is `2021-08-04 00:00:00.000000000`, that means the candle represents the daily interval from `2021-08-04 00:00:00.000000000` to `2021-08-04 23:59:59.999999999`, inclusive. Here we represent `00:00:00.000000000` as the beginning of the day according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

The following API endpoints serve data using the point-in-time convention:

* `/timeseries/market-trades`
* `/timeseries/market-openinterest`
* `/timeseries/market-liquidations`
* `/timeseries/market-funding-rates`
* `/timeseries/market-funding-rates-predicted`
* `/timeseries/market-orderbooks`
* `/timeseries/market-quotes`
* `/timeseries/market-contract-prices`
* `/timeseries/market-implied-volatility`
* `/timeseries/market-greeks`
* `/timeseries/index-levels`
* `/timeseries/index-constituents`
* Any metric in `/timeseries/asset-metrics`, `/timeseries/exchange-metrics`, `/timeseries/exchange-asset-metrics`, `/timeseries/pair-metrics`, `/timeseries/institution-metrics` , `/timeseries/market-metrics` with `snake_case` naming convention and without an interval suffix, such as `open_interest_reported_future_usd`

The following API endpoints serve data using the beginning-of-interval convention:

* `/timeseries/pair-candles`
* `/timeseries/market-candles`
* Any metric in `/timeseries/asset-metrics` with upper camel case (ex: `UpperCamelCase`) naming convention
* Any metric in `/timeseries/asset-metrics`, `/timeseries/exchange-metrics`, `/timeseries/exchange-asset-metrics`, `/timeseries/pair-metrics`, `/timeseries/institution-metrics`, `/timeseries/market-metrics` with `snake_case` naming convention and with an interval suffix, such as `volume_reported_future_perpetual_usd_1d`

</details>

<details>

<summary>What asset ticker naming conventions does Coin Metrics use?</summary>

Coin Metrics assigns a unique ticker symbol for each asset in our coverage universe using the following naming convention: `parentasset[_fullname][_network][_chain]`, where the `fullname`, `network`, and `chain` are optional. Market data and aggregated network data are assigned to the `parentasset` ticker, where aggregated network data consists of data from individual network or chain-specific forms of an asset.

To understand our naming convention, we first introduce some important context surrounding the two primary considerations regarding unique ticker symbols.

First, what is thought as a singular asset may actually exist in various forms across multiple layer one and layer two blockchains. From the perspective of the blockchain ledger, each form resides on a separate blockchain, and Coin Metrics collects and produces data for each form independently. To differentiate between the specific form, Coin Metrics appends the blockchain ticker as a suffix to the asset ticker. For example, Tether (`usdt`) exists on Tron, Ethereum, Solana, and several other blockchains. To track the network activity of each form, Coin Metrics uses `usdt_tron`, `usdt_eth`, and `usdt_sol` tickers, respectively.

Centralized exchanges, however, do not typically differentiate between different forms of an asset. They will allow users to deposit several forms of an asset and credit users internally with a generic parent form of the asset. Trading then occurs using the generic form of the asset, and all market data collected by Coin Metrics is assigned to the parent ticker.

Returning to the Tether example, a centralized exchange may allow a user to deposit the ERC-20 form of Tether, which resides on Ethereum, as well as the TRC-20 form of Tether, which resides on Tron. Regardless of which form a user deposits, the user is credited with a generic parent form of Tether which is traded on all markets on the centralized exchange. Therefore, market data such as trades are assigned to the parent asset `usdt`.

Coin Metrics also aggregates data from individual forms of an asset to the parent asset for certain metrics. Therefore, metrics under the parent asset `usdt` represent an aggregation across `usdt_tron`, `usdt_eth`, and the other individual forms of Tether.

Second, some assets may share the same display ticker as another asset. To resolve these ticker conflicts, Coin Metrics ensures that each asset ticker in our coverage universe is unique by appending the full name of the asset as a suffix to the asset ticker. For example, both Starcoin and Starchain share the same display ticker of `stc`. Coin Metrics resolves this ticker conflict by assigning the tickers `stc_starcoin` and `stc_starchain`, respectively.

</details>

<details>

<summary>What market naming conventions does Coin Metrics use?</summary>

Coin Metrics refers to a market as a specific pair or instrument on a specific exchange.

For spot markets, we use the `{exchange}-{base}-{quote}-spot` naming convention like `coinbase-btc-usd-spot`. The base and quote both use our harmonized asset tickers.

For futures markets, we use the `{exchange}-{symbol}-future` naming convention like `binance-BTCUSDT-future`. The symbol is the exchange-reported symbol.

For option markets, we also use the `{exchange}-{symbol}-option` naming convention like `deribit-BTC-15OCT21-60000-C-option`. The symbol is the exchange-reported symbol.

We use exchange-reported symbol for our derivative markets because of the difficulty in establishing a standard naming convention. Exchanges may list multiple different contracts that trade the same underlying but with different contract specifications. And exchanges may list exotic derivative contracts that do not conform to standard contracts. In general, exchanges are constantly experimenting with different contract specifications. To prevent any confusion in which contract we are referencing, we adopt the exchange-reported symbol. More metadata about our markets such as the contract specifications, price and amount precision, and fees can be found through our `/reference-data/markets` endpoint.

For decentralized exchange liquidity pools, we use the the `{exchange}-{pool_config_id}-{base}-{quote}-spot` naming convention.

The `pool_config_id` is needed since for some decentralized exchanges like Uniswap v3, multiple pools can exist for a single base and quote asset pair with different pool configurations such as different fees. More metadata about our liquidity pools can also be found through our `/catalog/markets` endpoint.

The `pool_config_id` usually takes an integer value that represents the order in which a pool was created. For convenience, we also create a synthetic aggregated market where we set the `pool_config_id` to `agg` so that users can pull candles data that is aggregated across all pools.

</details>

[⬆️ Back to top](#faqs)

---

## Network Data

<details>

<summary>How do I see full Stablecoin Universe Market Cap?</summary>

Coin Metrics provides several metrics for determining market capitalization.

**Current Market Cap (CapMrktCurUSD):** This metric is available at both the _asset\_network (USDC\_ETH)_ and _aggregate asset (USDC)_ levels. It is based on Coin Metrics Reference Rates and the _Supply Current_ (SplyCur) metric. These values represent the total market cap of all tokens on a network at the specified level.

To view the _aggregated stablecoin market cap_ for a specific asset, use the _asset_ level for this metric. (ex. USDC.CapMrktCurUSD)

**Estimated Market Cap (CapMrktEstUSD):** This metric is available at the _asset_ level and is calculated using Coin Metrics Reference Rates combined with a self-reported supply figure from the project. Supply data is sourced via CoinGecko at the _asset_ level

For Comparison of  **Stablecoin Market Cap** and **Estimated Market Cap** Universe please see this [Chart](https://charts.coinmetrics.io/formulas?id=11271). For the universe included in the aggregation see the Formula builder by clicking <img src="../../.gitbook/assets/Screenshot 2025-10-17 at 7.43.25 PM.png" alt="" data-size="line"> on the right side.&#x20;

https://charts.coinmetrics.io/formulas?id=11271

</details>

<details>

<summary>Why don't you have Coinbase deposits/withdrawals (on-chain flows) supply data?</summary>

We don't have on-chain metrics for Coinbase addresses because they don't reuse addresses. At this time, no data providers can get an accurate measurement on their on-chain activity.

That said, we do offer full market data coverage for Coinbase through our Market Data Feed if you would like visibility into their trading volume.

</details>

<details>

<summary>Do your aggregate exchange deposit/withdrawal and supply (on-chain flows) metrics include any Coinbase flows?</summary>

Our aggregate on-chain exchange metrics (eg. FlowOutExInclUSD or FlowOutExInclUSD) do include some Coinbase cold storage addresses. However, relative to the inputs from other constituent exchanges the the impact on the total aggregate flows is minimal.

</details>

<details>

<summary>Why is your Current Supply (SplyCur) of XLM different from the supply reported on Stellar's Dashboard? (https://dashboard.stellar.org)</summary>

This difference is due to how we treat the 55 billion tokens that the Stellar Development Foundation "burned", or more accurately, rendered un-spendable. They sent the tokens to an address that cannot sign transactions. The public key that can sign for it has a weight set to 0, which makes transactions invalid. Since they technically still exist on the ledger, our Current Supply (SplyCur) includes them.

</details>

<details>

<summary>What is the latency of block-by-block network data?</summary>

The end-to-end latency for BTC BBB metrics is at most 54 seconds with a median of 14 seconds and an average of 20 seconds. For ETH BBB, this is at most 31 seconds with a median of 5 seconds.

</details>

<details>

<summary>Why does your Market Capitalization metrics differ so heavily from other data providers?</summary>

Generally, there is a great deal of inconsistency in the market with respect to Market Capitalization calculations. As a result, we have several Market Capitalization metrics. Our metric labeled [Market Cap](../../network-data/network-data-overview/market/market-capitalization.md) uses the [Current Supply](../../network-data/network-data-overview/supply/current-supply.md) (sum of all native units ever created and currently visible on the ledger) in its formulation. Unlike some other data providers, it does not exclude illiquid supply held in escrow or foundation accounts. Our [Free Float Market Cap](../../network-data/network-data-overview/market/market-capitalization.md#e), however, does exclude native units held by company insiders, controlling investors and long term strategic holders.

Another way to think about our Market Cap is to equate it to the Fully Diluted Market Cap, while other many other market caps metrics use reported or an approximation of circulating supply - similar to our Free Float supply, but often not using reported, not on-chain data to validate the approximations.

</details>

<details>

<summary>Do you have metrics for total blockchain size?</summary>

No, but we do have a metric for [Sum Block Size (in bytes)](../../network-data/network-data-overview/network-usage/blocks.md#blksizebyte) (BlkSizeByte), which you can sum up to get blockchain size. You can also use our runningTotal function in our Formula Builder to show the size over time.

![https://charts.coinmetrics.io/formulas/#1178](../../.gitbook/assets/BTC_Total_Blockchain_Size_\(in_bytes\).png)

</details>

<details>

<summary>Do you have metrics for total transactions?</summary>

No, we don't have total transactions, but we have [Tx Cnt](../../network-data/network-data-overview/transactions/transactions.md#txcnt) (TxCnt or Transactions per interval), which you can sum up to get total transactions. You can also use our runningTotal function in our Formula Builder to show total transactions over time.

![https://charts.coinmetrics.io/formulas/#1179](../../.gitbook/assets/BTC_Total_Transaction_Count.png)

</details>

<details>

<summary>How can you calculate total transfer value on the Ethereum Blockchain (ETH + other ERC20s)?</summary>

You can calculate this manually by summing the [transfer value](../../network-data/network-data-overview/transactions/transfers.md) for ETH and ERC20s. You can all use our charting tool to create a stacked view of all ERC20s' Transfer Values, or our formula builder to create an aggregate.

![https://charts.coinmetrics.io/network-data/#1181](../../.gitbook/assets/ETH_ERC20_Xfer_Val_\(USD\).png)

</details>

<details>

<summary>What is the best source for daily volume for Tether-Omni, Tether-ERC20, USDC and DAI?</summary>

We have a [Trusted Volume](../../market-data/market-data-overview/volume/volume_trusted.md) metric in Network Data Pro for stablecoins (USDT, USDC, DAI, PAX, BUSD, TUSD, etc.), which represents the volume for these assets on the most trusted exchanges (a subset of our coverage universe).

We also have trading volume that occurs on centralized exchanges for every market in our coverage universe available via our Market Data feed.

One note: Centralized exchanges do not differentiate between Tether-Omni, Tether-ERC20, and Tether-TRON markets. They lump all the variants of Tether into one tradeable asset. So it's not possible to break out the trading volume of the different variants of Tether on centralized exchanges.

</details>

<details>

<summary>Is there a way to approximate the number of users for a specific blockchain?</summary>

You can use the "[Address Count with Balance](../../network-data/network-data-overview/addresses/address-balances.md)" metrics to approximate this, although you should keep in mind that users may have multiple addresses and certain addresses (e.g., custodian or exchange addresses) may represent multiple users. For day to day use, you can use our active addresses metrics. We provide aggregate [active address metrics](../../network-data/network-data-overview/addresses/active-addresses.md#active-addresses) (AdrActCnt) as well as aggregates for [receiving](../../network-data/network-data-overview/addresses/) and [sending](../../network-data/network-data-overview/addresses/active-addresses.md#adractsent) addresses (AdrActRecCnt and AdrActSentCnt).

</details>

<details>

<summary>Do you have a metric for the number of days BTC is held between transactions?</summary>

Since the BTC network uses a UTXO-based data model, we can calculate the number of days BTC is held between transactions by looking at unspent transaction outputs. Our [UTXOAgeMean](../../network-data/network-data-overview/network-usage/utxos.md#utxoagemean) metric calculates the average number of days a UTXO-based asset is held between transactions, whereas our [UTXOAgeMed](../../network-data/network-data-overview/network-usage/utxos.md#utxoagemed) calculates the median.

It's important to note that these metrics are only calculable for UTXO-based networks, so they won't work for account based networks such as Ethereum.

</details>

<details>

<summary>Why does your FeeTotNtv metric for BTC slightly differ from other data providers?</summary>

This discrepancy is likely the result of using differing timestamps. We use the median block timestamp for BTC, while many other providers calculate this using the miner timestamp.

</details>

<details>

<summary>How are your aggregated Exchange Flows calculated?</summary>

Exchange flows are estimated using the [common-input-ownership heuristic](https://en.bitcoin.it/wiki/Common-input-ownership_heuristic), which assumes that addresses that are inputs to the same transaction share an owner. This technique is precise, but requires at least one seed address for every exchange, limiting coverage to a predetermined universe of exchanges. The heuristic is also broken by [CoinJoins](https://en.bitcoin.it/wiki/CoinJoin) and [peeling chains](https://en.bitcoin.it/wiki/Privacy#Change_address_detection). You can find a bit more context around these methodologies in this [research piece](https://coinmetrics.io/following-flows-ii-where-do-miners-sell/).

</details>

<details>

<summary>How are your aggregated Miner Flows calculated?</summary>

Miner flows are estimated by basing clustering on an address's distance in hops from the coinbase transaction. Addresses that have received a coinbase reward, or 0-hop addresses, are assumed to belong to mining pools. 1-hop addresses that have received payment from a 0-hop address are tagged as belonging to miners. This heuristic is less precise than the common-input-ownership heuristic, but roughly [mirrors the structure](https://braiins.com/blog/when-and-why-bitcoin-miners-sell-btc) of mining pool wallets and provides better coverage. You can find a bit more context around these methodologies in this [research piece](https://coinmetrics.io/following-flows-ii-where-do-miners-sell/).

</details>

<details>

<summary>What are the exchanges that serve as constituents for your Trusted Volume metric?</summary>

Our trusted volume metric is an aggregation of the reported volume from exchanges that we consider the most accurate and trustworthy. The full list of constituent exchanges included in our Trusted Volume is [here](https://coinmetrics.io/special-insights/trusted-exchange-framework-2-1/).

</details>

<details>

<summary>Is there a way to calculate ETH staking yield metrics with your Consensus Layer metrics?</summary>

A validator's expected annual percentage return (APR) from staking rewards accumulated on the Consensus Layer, assuming perfect performance and uptime, can be estimated with the formula below based on protocol parameters ([source for derivation](https://eth2book.info/altair/part2/incentives/issuance#validator-rewards)):

$$
2940.21 \div \, \sqrt[]{ValidatorActOngCnt}
$$

For example, with 423,000 active validators as of September 9, 2022 this comes out to a 4.52% expected return on a validator's 32 ETH effective balance. The expected annual protocol issuance can also be calculated from the following formula ([source for derivation](https://eth2book.info/altair/part2/incentives/issuance#overall-issuance)):

$$
940.87 \times \, \sqrt[]{ValidatorActOngCnt}
$$

With 423,000 active validators this comes out to 611,927 ETH issued per year.

After The Merge, validators will also receive user priority transaction fees on the Execution Layer – sometimes referred to as 'tips' – for proposing blocks. The magnitude of this additional source of yield can be inferred from the existing FeePrioTotNtv metric on the Execution Layer. Using a [30-day moving average of tips paid per block](https://charts.coinmetrics.io/formulas/#4308), we can estimate the impact of tips to the validator APR from CL awards above.

**First**, finding the average tips paid per block, which fluctuates greatly depending on the demand for Ethereum blockspace:

$$
sma(FeePrioTotNtv / BlkCnt, 30)
$$

This comes out to 0.07 ETH over the last 30 days.

**Next**, from the equation above we can find the yearly per-validator expected ETH reward from participating on the Consensus Layer with a specified number of active validators:

$$
940.87 \times \sqrt[]{ValidatorActOngCnt} \div ValidatorActOngCnt
$$

​This comes out to an average 1.45 ETH in yearly rewards with 423,000 active validators.

**Then**, with 2,629,800 chances to propose blocks on the Consensus Layer each year, the average number of times a validator will get the opportunity to propose a block (and collect tips) can be found from:

$$
(1/ValidatorActOngCnt) \times (2,629,800)
$$

​This comes to 6.22 with 423,000 active validators (assuming they all have an equal 32 ETH effective balance there is a 1 in _ValidatorActOngCnt_ chance of being selected to propose at a given slot on the CL).

**Finally**, taking this all together:

$$
100\times(((32 +1.45 + (0.07\times6.22))/32) - 1)
$$

​This comes out to 5.89%, an increase of roughly 140 basis points to the APR from Consensus Layer rewards.

However, it is important to note that the information above is purely an expected and theoretical yield given the current number of validators and historical demand for Ethereum blockspace. In practice, individual validator returns will vary by chance as well as performance. We anticipate releasing realized staking yield metrics that take into account validators' actual observed performance.

To learn more, make sure to check out the Validator Economics section of our [Mapping out The Merge report.](https://coinmetrics.io/special-insights/ethereum-merge/)

</details>

<details>

<summary>What asset ticker naming conventions does Coin Metrics use?</summary>

Coin Metrics assigns a unique ticker to each asset in our coverage universe. However, what might be considered as one asset can actually exist in various forms and across multiple networks. The naming convention we use must consider a number of situations.

* An asset may be represented by tokens on more than one layer one network. For instance, Tether exists on 16 different networks, such as Ethereum, Solana, and Tron. Similarly, an asset may also exist on multiple versions of a layer two network deployed across multiple layer one networks.
* An asset may undergo a contract upgrade to enable new features or address security flaws. This involves deploying a new smart contract to create a new token. Existing holders of the old token can exchange their old tokens for new tokens. Both new and old versions of an asset can exist simultaneously.
* An asset may begin its existence as a token represented as a smart contract on a network but then migrate to being represented as a native asset on another network or as a smart contract on another network. Both forms of the asset can exist simultaneously.
* Centralized exchanges allow users to deposit various forms of an asset. Users are then credited with a generic form of the asset and are able to trade the generic form of the asset on the exchange. For instance, an exchange may allow users to deposit Tether tokens on the Ethereum network and Tether tokens on the Solana network. Users would be credited with generic Tether and trade generic Tether. Centralized exchanges do not have one set of markets for Tether tokens on Ethereum and a separate set of markets for Tether tokens on Solana.
* Units of an asset may be bridged from a Layer 1 network (L1) to a Layer 2 network (L2) or another Layer 1 network through a blockchain bridge. A blockchain bridge can be a centralized entity or a smart contract that allows units of an asset on a Layer 1 network to be locked and an equivalent amount of the asset to be issued on a Layer 1 or 2 network. Sometimes the asset that is bridged is referred to as a wrapped version of the asset.
* For some assets, there is no industry-wide convention on the ticker. A centralized exchange may decide to use a ticker to refer to a specific asset that differs from another centralized exchange. Multiple assets may also share the same ticker.

We assign assets into four different levels: project, layer one network, layer two network, and contract. They follow a hierarchy.

* Project: Represents the asset across all networks and contract instances. This is the broadest classification. Data collected from centralized exchanges are assigned to assets at the project level.
* Layer One Network: Represents the asset on a specific layer one network, encompassing all contract instances and layer two networks on that network. Network data is assigned to this level.
* Layer Two Network: Represents the asset on a specific layer two network, encompassing all the contract instances on the layer two network. Network data is also assigned to this level.&#x20;
* Contract: Represents the asset at the individual smart contract level on a specific network. This is the lowest level of classification. Data from decentralized exchanges is assigned to this level.

<figure><img src="../../.gitbook/assets/cm-asset-ticker-conventions.png" alt=""><figcaption></figcaption></figure>

We use an asset ticker naming convention that generalizes to the situations described above:

{% code overflow="wrap" %}
```
asset[_fullName][_contractVersion][>bridgedFromNetwork|>wrappedFromNetwork][#bridgeUsed|#wrappedContractAddress][_network|_layer2Network.layer1Network|_bridgedToNetwork]
```
{% endcode %}

Each component in brackets are optional components.

* `[_fullName]`: If a ticker conflict exists, we append the full name of the asset immediately after the asset, to make the ticker unique.
* `[_contractVersion]`: If an asset is at the contract level and has multiple smart contract implementations, we append the contract version to uniquely identify each contract level asset. The contract version is a sequential integer starting with 1.&#x20;
* `[>bridgedFromNetwork|>wrappedFromNetwork]`: If an asset is a bridged asset, we append the network from which the asset is bridged from using `>bridgedFromNetwork`. If an asset is a wrapped asset, we append the network from which the asset originally existed using `>wrappedFromNetwork`.
* `[#bridgeUsed|#wrappedContractAddress]`: If the asset is a bridged asset, we append the bridge that was used using `#bridgeUsed`. If the asset is a wrapped asset, then we append the wrapped contract address using `#wrappedContractAddress`.
* `[_network|_layer2Network.layer1Network|_bridgedToNetwork]`: If the asset represents the asset on a specific network, we append the network using `_network`. If the asset represents a bridged asset using `_bridgedToNetwork`. Please note that `_bridgedToNetwork` takes the naming convention of `layer2Network.layer1Network` like `base.eth` if the bridged to network is a layer 2 network.

</details>

<details>

<summary>Why are their multiple versions of the same asset, such as usdt and usdt_eth and usdt_sol?</summary>

What is typically thought of as one asset can actually exist in various forms and across multiple networks. Coin Metrics will append the network as a suffix to the asset ticker to indicate the asset on a specific asset. For instance, Tether exists as an ERC-20 token on Ethereum as well as a Solana Token on Solana, and we assign the tickers `usdt_eth` and `usdt_sol` to these tokens, respectively.

Using Tether as an example, we refer to the ticker `usdt` as the project level asset, and we refer to the tickers `usdt_eth` and `usdt_sol` as network level assets.

Network data that is specific to an asset on a specific network, such as a swap that occurs on a decentralized exchange, is assigned to network level asset tickers. Network data that can be aggregated across multiple networks is assigned to the project level asset. Market data is also assigned to the project level asset.

For a more complete description of our asset ticker naming conventions, please see [What asset ticker naming conventions does Coin Metrics use?](#what-asset-ticker-naming-conventions-does-coin-metrics-use)

</details>

<details>

<summary>Can the daily number of unique buyers be derived from DEX swaps data?</summary>

Each DEX swap served via the _market-trades_ endpoint is associated with 3 different Ethereum addresses:

* **Initiator** is the Ethereum address which submitted the transaction, as a result of which the swap occurred
* **Sender** is the Ethereum address that invoked the liquidity pool smart contract's function for swapping
* **Beneficiary** is the Ethereum address credited with the output tokens upon the completion of a swap

The swap _beneficiary_ address can be used to approximate the number of unique buyer addresses over a given timeframe.

</details>

[⬆️ Back to top](#faqs)

---

## Market Data

<details>

<summary>How do I see what exchanges are supported?</summary>

CM Market Data Feed provides access to historical and real-time data from over 50 of spot and derivatives crypto exchanges.

Our most up-to-date exchange coverage can be viewed in our [Coverage Tool](https://coverage.coinmetrics.io/exchanges). Our coverage tool displays the total number of spot, futures and options markets, as well as the range of history available.

The available exchanges can be found by querying our [`/reference-data/exchanges`](https://docs.coinmetrics.io/api/v4/#tag/Reference-Data/operation/getReferenceDataExchanges) endpoint and the metrics available for each exchange can be found by querying our [`/catalog-v2/exchange-metrics`](https://docs.coinmetrics.io/api/v4/#tag/Catalog-v2/operation/getCatalogV2ExchangeMetrics) and [`/catalog-v2/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#tag/Catalog-v2/operation/getCatalogV2ExchangeAssetMetrics) API endpoints.

Market data for these exchanges is served through our [market data endpoints](../../market-data/market-data-overview/).

</details>

<details>

<summary>Can you explain your historical data coverage?</summary>

When we collect data from a new exchange, our general approach is to always collect the maximum history possible for every single instrument. The available history depends on the specific exchange and data type. For a given data type, some exchanges allow us to get the complete history, some exchanges allow us to get a short window of history, and some exchanges do not allow us to get any history.

Our trades history for Bitcoin begins when it began trading on Mt.Gox in July 2010, so we have over 10 years of trades history. We also have full historical trades data from several other early exchanges such as Bitstamp, TheRockTrading, Bitfinex, and Kraken.

</details>

<details>

<summary>How does Coin Metrics ensure high levels of data quality and data integrity?</summary>

Coin Metrics utilizes a multifaceted approach to ensure high levels of data quality and data integrity. We carefully curate our exchange coverage universe, employ a market data collection system with high levels of redundancy and resiliency, use a robust system of logging and monitoring that alerts staff members in real-time to any anomalies, and our software releases are governed by a series of SOC 2-compliant policies that include extensive testing prior to release. For certain critical data types, such as our Reference Rates, we employ regular human review to screen for data quality issues. Each of these facets is described in more detail below.

* **Exchange coverage universe**: While there are over 800 digital asset exchanges in existence, Coin Metrics has curated our exchange coverage universe to include only high quality exchanges with legitimate trading activity. The presence of fake volume and wash trading is widely acknowledged in the industry, and Coin Metrics has independently confirmed the findings of several prominent researchers who have studied this problem. When deciding whether to include an exchange in our coverage universe, we consult a series of qualitative and quantitative features that are described in our [Market Selection Framework](../../index-data/coin-metrics-bletchley-indexes-cmbi/cmbi-market-selection-framework.md) and our [Trusted Volume Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework/). We also consult feedback from our institutional user base. The exchanges in our coverage universe are widely recognized by market participants and researchers who have studied the fake volume problem to be of high quality.
* **Market data collection system**: Our market data collection system is engineered to have high levels of redundancy and resiliency. We collect data from exchanges using two instances of each application each located in an independent data center. For certain data types, we collect data from an exchange's HTTP endpoint and websocket endpoint simultaneously as an added redundancy measure. CM utilizes multiple proxy servers to ensure that rate limits imposed by some exchanges do not impact data collection. Each server that hosts our market data collection system has local database storage as a fault tolerant measure in case of a failure in our primary database. These measures ensure high levels of availability for our market data collection applications and that no observations are missed.
* **Multiple data centers**: Coin Metrics utilizes two geographically-separated and vendor-independent data centers. Each data center contains an independent and complete collection of the infrastructure and applications needed to collect, process, and serve our data. In the case of failure of one of the data centers, our API will automatically failover to use our secondary data center with no action needed to be taken by our users.
* **Internal monitoring**: A dedicated internal team of data quality and site reliability engineers monitor logs and telemetry from our servers, databases, and applications in real-time using a suite of dashboards and automated alerts. We also have dedicated monitoring to detect interruptions of service from an exchange, incidents reported by an exchange, or breaking changes to their API. This monitoring allows us to take swift corrective or mitigating action if necessary.
* **External monitoring**: Coin Metrics maintains a dedicated external monitoring application that continuously polls our API endpoints to detect for interruptions in the data or unexpected responses from our API. This monitoring application allows us to continuously test the health of the entire pipeline of our systems from the perspective of our users. It is deployed in an external environment that is independent from our data centers so that it would not be affected in case of any degraded performance in our systems. Our internal team of data quality and site reliability engineers monitor the alerts generated by this application and take swift corrective or mitigating action if necessary.
* **Deployment process**: Our deployment process is governed by a series of SOC 2-compliant policies that include code reviews, extensive testing, manual review and quality control of historical values, and approvals prior to release. We received our SOC 2 Type 1 certification from Deloitte in August 2021 in the areas of security, availability, and processing integrity and have maintained this certification for every year.
* **Human review**: For certain critical data types, we employ regular human review to detect anomalies and assess the quality of our data. For instance, our Reference Rates are reviewed by a dedicated staff member every day, 365 times a year, at 16:00 New York time. Our Reference Rates and other critical data types are checked for several issues, including timeliness, data anomalies, sufficient data inputs, and a comparison against external sources.

</details>

<details>

<summary>Is there a way to pull data for multiple markets (such as all the markets for a particular exchange) in one API call?</summary>

Yes! All of our endpoints that accept the `markets` parameter will accept wildcards like `exchange-*` or `exchange-*-spot` or `*-future` or `*-option`. The wildcards will match any market which fits this pattern so users do not need to specify every individual market when querying data for multiple markets. The `markets` parameter will also accept a comma-separated string of individual markets.

</details>

<details>

<summary>Is there a way to pull data for trading volume across a specific exchange or asset?</summary>

We have pre-calculated volume metrics that represent total volume by asset, by exchange, by pair, or by exchange-asset pair. Please take a look at the following volume metrics below.

{% content-ref url="../../market-data/market-data-overview/volume/" %}
[volume](../../market-data/market-data-overview/volume/)
{% endcontent-ref %}

</details>

<details>

<summary>When a new asset or market is listed, how long does it take for the market to be present in our market data-related data types?</summary>

Generally, for many critical data types, Coin Metrics will support a new asset or market the moment that it is listed on an exchange. All of our derivatives-related data types are available immediately with no delay. There are some spot market-related data types which require some manual steps that often involve human review to ensure that we are mapping exchange-reported tickers to our tickers appropriately. For these data types, there will be a short delay between when the market is listed and when it is visible through our API.

Coin Metrics has the ability to make the short delay extremely short or to eliminate the delay entirely on a one-off basis for new assets or markets that are considered important. A more complete description of which data types are available immediately with no delay and which are available with a short delay follows below.

#### **Data types available immediately with no delay**:

* The presence of the market and its associated metadata served through **`/catalog/markets`** and **`/catalog-all/markets`**&#x20;
* The presence of the market and its associated metadata served through **`/catalog-v2/market-*`**, **`/catalog-all-v2/market-*`**&#x61;nd  **`/reference-data/markets`**
* Trades served through **`/timeseries/market-trades`** and **`/timeseries-stream/market-trades`**
* Streaming order book served through **`/timeseries-stream/market-orderbooks`**
* Streaming quotes served through **`/timeseries-stream/market-quotes`**
* Futures candles served through **`/timeseries/market-candles`**
* Futures open interest served through **`/timeseries/market-openinterest`** and `/timeseries-stream/market-openinterest`
* Futures liquidations served through **`/timeseries/market-liquidations`** and **`/timeseries-stream/market-liquidations`**
* Futures funding rates served through **`/timeseries/market-funding-rates`**&#x20;
* Futures predicted funding rates served through **`/timeseries/market-funding-rates-predicted`**
* Futures and options order book snapshots served through **`/timeseries/market-orderbooks`**
* Futures and options quote snapshots served through **`/timeseries/market-quotes`**
* Futures and options contract prices served through **`/timeseries/market-contract-prices`**
* Options implied volatility served through **`/timeseries/market-implied-volatility`**
* Options greeks through **`/timeseries/market-greeks`**

#### **Data types available with a short delay:**

* The presence of the new asset served through **`/catalog-v2/asset-metrics`**, **`/catalog-all-v2/asset-metrics`**&#x61;nd  **`/reference-data/assets`**
* Spot candles served through **`/timeseries/market-candles`**
* Reference Rates served through metric **`ReferenceRate`** served through **`/timeseries/asset-metrics`**
* Market-data related metrics such as reported volume served through **`/timeseries/asset-metrics`**, **`/timeseries/pair-metrics`**, **`/timeseries/exchange-metrics`**, **`/timeseries/exchange-asset-metrics`**, and **`/timeseries/market-metrics`**

</details>

<details>

<summary>How do I interpret the value of your volume metrics like volume_reported_spot_usd_1d?</summary>

Coin Metrics calculates several volume metrics (and other metrics) at different levels of aggregation. Volume metrics are available at the asset, pair, exchange, and exchange-asset levels. This allows our users to query the volume for the different entities that exist in the cryptoasset domain.

We use our markets as the entity with the lowest level of aggregation. A market is defined as a specific listed instrument or pair on a specific exchange, like `coinbase-btc-usd-spot`.

* For our volume metrics served through `/timeseries/asset-metrics`, the volume for a given asset (like `btc`) represents the sum of the volume from markets where the asset is either the base or quote.
* For our volume metrics served through `/timeseries/pair-metrics`, the volume for a given pair (like `btc-usd`) represents the sum of the volume from markets that contain the given pair.
* For our volume metrics served through `/timeseries/exchange`, the volume for a given exchange (like `coinbase`) represents the sum of the volume from all markets on the given exchange.
* For our volume metrics served through `/timeseries/exchange-assets`, the volume for a given exchange-asset (like `coinbase-btc`) represents the sum of the volume from all markets on the given exchange where the given asset is either the base or quote.

Our other metrics are also aggregated using similar logic described above.

Our volume metrics are calculated by summing the candles volume in U.S. dollars from individual markets. Some small adjustments are made to address outliers and to prevent double-counting.

Based on our experience in maintaining a persistent data connection with many exchanges over several years, we have found that certain exchanges have a tendency to publish outliers in their reported data which represent data quality errors. Including such outliers in our reported volume metrics would result in inaccurate values. Therefore, we exclude ZB.com, LBank, and LocalBitcoins from being included in our volume metrics.

We also exclude Binance Aggregate's (`binance_aggregate`) futures markets to prevent double-counting, as its data is identical to Binance's futures except it is reported at a different level of aggregation. We also exclude any Uniswap v3 Ethereum  aggregate markets (any market with the `agg` from our volume metrics, such as `uniswap_v3_eth-agg-weth-usdt_eth-spot`) to prevent double-counting, as these markets represent an aggregation of individual pools containing the same pair of assets.

</details>

<details>

<summary>Are the volume metrics like volme_reported_spot_usd_1d double counted?</summary>

Our volume metrics for assets and exchange-assets represents the sum of the volume from all markets where the given asset is either the base or quote. For example, the volume for market `coinbase-btc-usdt-spot` will be included in both the volume for `btc` and `usdt` because `btc` is the base asset of the market and `usdt` is the quote asset of the market. Some users have asked whether this represents double counting of volume.

This is a convention that we use that is widely adopted by other data providers. The reasoning behind our choice can be best illustrated using a simple example.

Suppose the world consists of only one market, `coinbase-btc-usdt-spot` and two assets, `btc` and `usdt`. A trader purchases `btc`by selling `usdt` in a transaction worth $100 U.S. dollars. If we only included markets where the given asset is the base currency, then the volume for `btc` would be $100 but the volume for `usdt` would be $0.

In reality, both $100 worth of `btc` and $100 worth of `usdt` were exchanged. So we report the volume for both `btc` and `usdt` to be $100.

</details>

<details>

<summary>Why do pair candles not include volume?</summary>

Our pair candles are calculated from our CM Reference Rates with 1 second frequency, not from all trades from markets that contain this particular pair. Therefore, since the underlying data only includes price, volume is not calculated. We understand this can be a limitation to some users and plan on adding volume in a future release.

</details>

<details>

<summary>Why are pair candles calculated from CM Reference Rates instead of trades?</summary>

We use our CM Reference Rates with 1 second frequency as the underlying data to calculate our pair candles to ensure that our pair candles represent a robust price that is resistant to outliers and anomalies. If we used trades data from all markets that contain a pair, the data would likely be adversely affected by flash crashes and outliers that may occur on a single market. These outliers and anomalies would show up in either the open, high, low, or close prices. Our CM Reference Rates are resistant to these outliers.

</details>

<details>

<summary>Why are some of the values null for market metrics liquidity_depth_*_percent_*_volume_*?</summary>

Our liquidity depth metrics such as `liquidity_depth_1_percent_bid_volume_usd` and `liquidity_depth_1_percent_ask_volume_units` are designed to measure the sum of all orders on a given side of the order book for a given percent away from the midprice in units of U.S. dollars or in native units.

Exchanges differ in the amount of order book depth provided through their API. Some exchanges offer the full book depth while others only expose part of the order book such as the top 20 levels. We provide these limitations in our FAQ [**Are there any limitations to the order book depth provided by each exchange?**](https://docs.coinmetrics.io/market-data/market-data-overview/market-order-book#are-there-any-limitations-to-the-order-book-depth-provided-by-each-exchange)**.**

In calculating our liquidity depth metrics, we were forced to decide how to represent metric values when the reported order book depth is insufficient to calculate the depth for a given percent away from midprice. In these situations, we decided to represent this as a null value so that it is transparent to the user.

Please note that for markets with high liquidity, even exchanges with relatively large order book depth of say 5,000 levels will only consist of prices less than 1 percent away from midprice. Therefore, it is common for many exchanges to have metrics with null values unless the exchange reports full order book depth. &#x20;

</details>

<details>

<summary>How do I interpret the volume for futures markets and convert volume to U.S. dollars?</summary>

By convention, the volume for futures markets is measured in contract units. Each futures market has unique contract specifications that define the notional value of one contract. Let us use the following response from our `/timeseries/market-trades` endpoint for market `cme-BTCN4-future` as an example.&#x20;

```
{
  "data": [
    {
      "market": "cme-BTCN4-future",
      "time": "2024-06-18T18:12:45.681120000Z",
      "coin_metrics_id": "17187343656811203891752105",
      "amount": "2",
      "price": "65385",
      "database_time": "2024-06-18T18:12:46.361963000Z",
      "side": "sell"
    }
  ]
}
```

The `"amount": "2"` means that two contracts of `cme-BTCN4-future` were exchanged in this trade. The amount for other data types such as quotes, order books, candles, open interest, and liquidations are similarly in contract units.

According to the contract specifications for this futures market, one contract is equal to 5 BTC of notional value. This can be seen in our `/reference-data/markets` endpoint.

```
{
  "data": [
    {
      "market": "cme-BTCN4-future",
      "exchange": "cme",
      "type": "future",
      "base": "btc",
      "quote": "usd",
      "pair": "btc-usd",
      "symbol": "BTCN4",
      "size_asset": "btc",
      "margin_asset": "usd",
      "contract_size": "5",
      "tick_size": "5",
      "listing": "2024-01-26T22:30:00.000000000Z",
      "expiration": "2024-07-26T15:00:00.000000000Z",
      "order_amount_min": "1",
      "order_amount_max": "100",
      "order_price_increment": "5.0",
      "order_price_min": "0"
    }
  ]
}
```

The `"contract_size": "5"` and `"size_asset": "btc"` define the contract size. The contract size is unique to each futures market and other markets may have different contract size.

To convert a futures market volume in contract units to U.S. dollars, the following formula can be used: `[amount in contract units] * [contract size] * [U.S. dollar price of contract size asset]`.&#x20;

</details>

<details>

<summary>How do I reproduce the CME volume figures published on CME's website?</summary>

CME publishes [daily volume figures for their futures and option contracts](https://www.cmegroup.com/markets/cryptocurrencies/bitcoin/bitcoin.volume.html). Here we explain the methodology CME uses, how it differs from Coin Metrics' methodology, and how to reproduce the figures using our `/timeseries/market-trades` endpoint.

CME's published volume figures include the futures contract itself, such as `cme-BTCM5-future`, as well as any calendar spread where the future is the short leg or long leg, such as `cme-BTCM5-BTCN5-future`. Therefore, users should query all three types of futures contracts using a markets parameter such as `markets=cme-BTCN5*-future,cme-*BTCN5-future`.

The time period that CME uses is from 17:00 to 16:00 America/Chicago time, and the timestamp they assign to the volume observation is the end-of-day timestamp. Therefore, to reproduce the published volume figure on `2025-06-05` , users should query all trades from `start_time=2025-06-04T17:00:00Z`, `end_time=2025-06-05T16:00:00Z` with `timezone=America/Chicago`.

Finally, CME's published volume figures include both the CME Globex venue, their electronic trading platform, and PNT Clearport, which represents OTC transactions that are negotiated outside of CME's electronic order book and later submitted to CME for clearing. Coin Metrics collects data from Globex only.

</details>

<details>

<summary>What is the difference between the closing price of a CME futures contract from Coin Metrics's candles and the figure published on CME's website?</summary>

Coin Metrics's candles are derived from trades data using a consistent methodology that is applied to all exchanges. The close price in the candle is extracted from the last trade in the candle's interval. The published closing price on CME's website is based on the [CME Bitcoin Futures Daily Settlement Procedure](https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457318016/Bitcoin#CME-Bitcoin-Futures-Daily-Settlement-Procedure) which represents a different methodology based on whether a future is a lead month, second month, or back month contract.

</details>

<details>

<summary>When is the data for Data Quality collected and reviewed?</summary>

The data sampled for the Data Quality scores are representative as of the end of the previous quarter. In other words, Q1 results will reflect data collected as of the end of the previous year's Q4, and Q3 results will reflect data collected as of the end of Q2 of that year.

</details>

<details>

<summary>Would you consider including ____ as part of the criteria?</summary>

We welcome any feedback on how to improve the trusted framework. Note that the ability to add criteria to the framework depends on if this data is publicly available.

</details>

<details>

<summary>Does the trusted exchange framework include futures exchanges?</summary>

Yes. However, we only assess the data quality score for spot exchanges. The lack of data quality score does not count against a futures exchange's overall score, but it does disqualify them from being included in the [trusted spot volume](https://coverage.coinmetrics.io/search-results?query=volume\_trusted\_spot\_usd\_1d) metric.

</details>

<details>

<summary>Is there a certain score level that separates trustworthy from not?</summary>

It depends on the use case, which features are most important to the user, and the threshold that a user is willing to accept. Generally, we consider A to be excellent, B to be good, C to be average, and D to be subpar. The threshold Data Quality score to be included in the trusted volume metric is B or better. See also: Why are certain subscores assigned different weights?

</details>

<details>

<summary>Why are certain subscores assigned different weights?</summary>

These weights and overall scores reflect a holistic average of an exchange's overall capabilities. However, we acknowledge that an exchange's trustworthiness depends on the use-case, i.e. as a custodian, data provider, and so on. We generally recommend users to focus on the sub scores they find most useful for their use-case.

</details>

<details>

<summary>How should we interpret the scores?</summary>

See the Grading Scale section.

</details>

<details>

<summary>Can the list of trusted exchanges be accessed via the API?</summary>

Yes. They can be accessed by using the [constituent-snapshots](https://docs.coinmetrics.io/api/v4/#tag/Constituent-Snapshots/operation/getConstituentSnapshotsAssetMetrics) endpoint. Sample request:

[https://api.coinmetrics.io/v4/constituent-snapshots/asset-metrics?metric=volume\_trusted\_spot\_usd\_1d\&api\_key=\<your\_key>](https://api.coinmetrics.io/v4/constituent-snapshots/asset-metrics?metric=volume\_trusted\_spot\_usd\_1d\&api\_key=%3Cyour\_key%3E)

</details>

<details>

<summary>What's the difference between the Market Selection Framework and Trusted Exchange Framework?</summary>

The "Trusted Exchange" framework assesses exchanges for presence of organic trade volume, using features such as fake volume tests and regulatory features. It informs which exchanges make up our "trusted volume" calculation and the trusted exchanges for datonomy. It can inform the starting point for which exchanges should be considered when selecting the market (which includes asset pairs and spot/futures) constituents for reference rates.

The Market Selection Framework assesses exchange-asset-pair markets to input for CM reference rates. This framework may use exchange-specific features that overlap with the trusted exchange framework but it produces a separate output. This framework is not an input to datonomy.

</details>

<details>

<summary>Why was ____ exchange given this score?</summary>

We are happy to elaborate deeper as to why exchanges are assigned their scores. Please reach out to us at info@coinmetrics.io.

</details>

[⬆️ Back to top](#faqs)

---

## Prices

<details>

<summary>How do you calculate the CM Reference Rates?</summary>

The CM Prices are collectively governed by rules-based methodologies described in [Coin Metrics Prices Methodology](../../market-data/methodologies/coin-metrics-prices-methodology.md) which describes our Market Selection Framework, a systematic method of producing a unique set of constituent markets for each asset, our data sources, calculation algorithm, and contingency rules..

{% content-ref url="../../market-data/methodologies/coin-metrics-prices-methodology.md" %}
[coin-metrics-prices-methodology.md](../../market-data/methodologies/coin-metrics-prices-methodology.md)
{% endcontent-ref %}

</details>

<details>

<summary>Is there a difference between the metrics ReferenceRate and ReferenceRateUSD?</summary>

`ReferenceRate` and `ReferenceRateUSD` are identical. When we added reference rates quoted in other currencies like `ReferenceRateEUR`, we also added `ReferenceRateUSD` and preserved `ReferenceRate` for backward compatibility.

</details>

<details>

<summary>Why do you use non-USDT-USD pairs to calculate the USDT-USD price?</summary>

The market convention for stablecoins is to use stablecoins as the quote currency. As such, there are only a few usdt-usd markets and the markets that do exist are very thinly traded. We can use other markets that are more active such as btc-usdt markets to derive a price for btc-usd and btc-usdt, which can be used to derive a usd-usdt price. Both the btc-usd and btc-usdt markets have high levels of volume, so the quality of our prices are improved compared to relying on only the usd-usdt markets.

</details>

<details>

<summary>What is the expected latency for the 1s frequency of Reference Rates served through your websocket API?</summary>

Our typical calculation latency is approximately 60 ms. A small amount of time is also required for normal network latency depending on the geographic location of your client relative to our servers.

</details>

<details>

<summary>When pulling ReferenceRateUSD and ReferenceRateEUR along with other metrics (like PriceUSD or FeeMeanNTV), the reference rates are updated with data up to the current date while other metrics are only updated to yesterday's date. Why are these data fields assigned different dates?</summary>

We use two different timestamp conventions for our metrics. Some metrics, like `PriceUSD`, use the "start-of-interval" timestamp, which represents the beginning of a time interval. The majority of our network data metrics represent a summary statistic over a daily time interval.

For example, suppose our `FeeMeanNTV` metric, which represents mean fees over an interval of a day, has a timestamp of `2020-12-10 00:00:00`. The `FeeMeanNtv` value represents the mean of fees that occurred from `2020-12-10 00:00:00` to `2020-12-10 23:59:99.999999`.

Other metrics, like `ReferenceRate` (and many other data types like trades, open interest and order book), use the "point-in-time" timestamp convention, where timestamp is set to the specific timestamp of the measurement or event. This is because we want to generate a price at a specific point in time.

When you compare something that uses the "point-in-time" convention with something that uses the "start-of-interval" convention, it can seem like the "start-of-interval" timeseries is lagged or is potentially missing data. I can assure that this is not the case, but we certainly understand your confusion here since the different values are delivered via the same `timeseries/asset-metrics` endpoint.

For more information, please see [What timestamp conventions does Coin Metrics use?](#what-timestamp-conventions-does-coin-metrics-use)

</details>

<details>

<summary>What is the difference between your Reference Rates and a volume-weighted average price?</summary>

Our CM Reference Rates utilize volume-weighted median, time-weighted average, and inverse price variance-weighted median techniques.

ReferenceRate with frequency 1h or 1d use a 61 minute calculation window that is partitioned into 1 minute intervals. The volume-weighted median price for each 1 minute interval is calculated and then a time-weighted average price is calculated using a custom weight function that applies more weight to intervals close to the calculation time.

ReferenceRate with frequency 1m or 1s or 200ms extract the most recent trade from our set of constituent markets and calculate a weighted median where half the weight is calculated from volume measured over the previous 60 minutes and half the weight is calculated from inverse price variance of trades over the previous 60 minutes.

The CM Prices are collectively governed by rules-based methodologies described in [Coin Metrics Prices Methodology](../../market-data/methodologies/coin-metrics-prices-methodology.md) which describes our Market Selection Framework, a systematic method of producing a unique set of constituent markets for each asset, our data sources, calculation algorithm, and contingency rules.

{% content-ref url="../../market-data/methodologies/coin-metrics-prices-methodology.md" %}
[coin-metrics-prices-methodology.md](../../market-data/methodologies/coin-metrics-prices-methodology.md)
{% endcontent-ref %}

</details>

<details>

<summary>What do the frequency parameters 1d and 1d-ny-close mean?</summary>

Our CM Prices are served through our [/timeseries/asset-metrics](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesAssetMetrics) API endpoint, and this endpoint supports a frequency parameter that can take several values, including `1d` and `1d-ny-close`.

The `1d` frequency represents a daily frequency that ends at 00:00:00 in the UTC timezone and the `1d-ny-close` represents a daily frequency that ends at 16:00:00 in the America/New\_York timezone. These timestamps are not altered for weekends or holidays.

Please also see our FAQ on [What timestamp conventions does Coin Metrics use?](#what-timestamp-conventions-does-coin-metrics-use) for more information.

</details>

<details>

<summary>Why does the candles closing price differ from the ReferenceRate metric or PriceUSD metric or an index value?</summary>

The difference is due to different timestamp conventions. Candles and `PriceUSD` use the beginning-of-interval timestamp convention while `ReferenceRate` and index values use the point-in-time timestamp convention.

For more discussion on these timestamp conventions, please see the frequently asked question [What timestamp conventions does Coin Metrics use?](#what-timestamp-conventions-does-coin-metrics-use).

</details>

[⬆️ Back to top](#faqs)

---

## Indexes

<details>

<summary>How are the CMBI Single Asset Index and CMBI Multi Asset Index levels calculated?</summary>

The price inputs for our indexes are informed by our reference rates methodologies.  We have methodologies for both hourly rates and real-time rates. Our hourly and daily levels use our Hourly Reference Rates methodology and our 15 second levels use our Real-Time Reference Rates methodology. Links to the methodology documents are listed below.&#x20;

* [Coin Metrics Prices Policies](../../market-data/methodologies/coin-metrics-prices-policies.md)
* [Coin Metrics Prices Methodology](../../market-data/methodologies/coin-metrics-prices-methodology.md)

</details>

<details>

<summary>What's the difference between your reference rate and a single-asset index for the same asset?</summary>

The calculation methodology for reference rates and single asset indexes are identical and they both represent the price for a specific asset. However, the constituent markets used in the calculation can be different because our indexes require a higher consideration for investability. Additionally, single asset indexes are administered under different policies that are specific for indexes, such as additional reporting requirements and policies for dealing with corporate actions like hard forks and airdrops.&#x20;

Single asset indexes tend to select markets from regulated U.S.-based exchanges, while a reference rate for the same asset evaluates a larger pool of global constituent markets. You can learn more about our [Market Selection Framework](../../market-data/methodologies/coin-metrics-prices-methodology.md#data-inputs) which selects high quality constituent markets for our reference rates. Our indexes then use these markets and excludes certain markets to enhance the investability of the index. &#x20;

Our single asset indexes are linked to investable financial products, so there is a stricter change and consultation process in the case of any methodology changes. Single asset indexes also have a different revision policy than our reference rates since trades or fund accounting may have occurred around printed levels, whereas we occasionally conduct recalculations of limited portions of reference rates history to increase the quality of the rates. &#x20;

</details>

<details>

<summary>Is there an index equivalent of the metric AssetEODCompletionTime? When should I expect an end-of-day index value to be published?</summary>

Completion timing is less relevant for indexes as the publishing time for index values is largely deterministic. Blockchain metrics must wait a few blocks for finality and are impacted by non-deterministic block mining times. The index rates for end-of-day values (New York, Singapore, or UTC) are computed at 5 minutes past the hour and usually available within a minute.&#x20;

</details>

<details>

<summary>What are the constituent exchanges included in the CMBI Bitcoin Index, along with details such as the domicile, regulation and legal compliance?</summary>

| **Exchange**    | **Domicile**           | **NY Bit License**   | **Money Service Business** | **Broker Dealer** |
| --------------- | ---------------------- | -------------------- | -------------------------- | ----------------- |
| Coinbase        | Delaware Corporation   | Yes                  | Yes                        | Yes               |
| Kraken          | Delaware Corporation   |                      | Yes                        |                   |
| Bitstamp (USA)  | Delaware Corporation   | Yes                  | Yes                        |                   |
| Gemini          | New York Trust Company | Yes                  | Yes                        |                   |

You can find the latest constituent markets in our [fact sheet](https://cmbi-indexes.coinmetrics.io/cmbibtc).

</details>

<details>

<summary>What are the criteria considered for an exchange to become a constituent exchange?</summary>

Please refer to our [Market Selection Framework](../../market-data/methodologies/coin-metrics-prices-methodology.md#data-inputs) for more information.

</details>

<details>

<summary>The methodology states that the index does not utilize data from over-the-counter markets or derivatives platforms but may do so in the future. What are the factors in determining whether to utilize data from the over-the-counter markets or derivative platforms?</summary>

This clause in the methodology provides us with future optionality. Given the current market structure, our expectation is that spot markets with transparent pricing will retain meaningful trading volume, and we will not have to select over-the-counter or derivatives markets. That being said, there is a non-zero chance that over-the-counter or derivatives markets may become more dominant (similar to gold in which the primary market is the London Bullion Market, an over-the-counter market), in which case the Coin Metrics Oversight Committee, after considering all available information, may determine that these markets serve as the best venues to derive index pricing from.

</details>

[⬆️ Back to top](#faqs)

---

## Reference Data

<details>

<summary>How do you classify the assets?</summary>

Digital asset classifications are based on the primary use of the asset and its parent protocol, as defined by the project creators and what is widely observed in the market.  This is fundamentally different from classifying based on the technical architecture of how a protocol is designed or what rights a particular asset provides to its holders (e.g., governance voting). Assets classified within a sub-sector may exist on blockchains with different design choices, such as "Proof of Stake" vs. "Proof of Work". Some may leverage a 'parent' or 'Layer 1' blockchain, while others are hosted on their own blockchain. Each asset aims to facilitate a primary use-case, and the technical implementations are a means of facilitating that use-case.

As digital assets become eligible for classification, MSCI will initiate an independent review process. A determination of use-case and Taxonomy classification will be made using a mosaic approach with the support of a variety of data sources.  This analysis will be documented and presented to an MSCI committee of senior researchers for review and approval before final classification decisions are made by MSCI and implemented for distribution.

</details>

<details>

<summary>How often is the taxonomy structure reviewed?</summary>

MSCI will, at minimum, review the taxonomy structure annually.  This review will include input from the datonomy Advisory Board members and commentary from market participants. MSCI may decide to perform ad-hoc reviews of the datonomy structure on an as-needed basis.

</details>

<details>

<summary>What is the datonomy Advisory Board and who is on it?</summary>

The datonomy Advisory Board is Co-Chaired by MSCI, Goldman Sachs and Coin Metrics with membership open to select industry participants and experts on an invitation basis as agreed to by the Co-Chairs. The Advisory Board provides expert Input that MSCI may use as a source of information in connection with administering the Taxonomy, including information and insight with respect to industry trends, technologies and any other information relating to the Taxonomy. The Advisory Board members will also review and provide feedback on asset coverage universe, asset classifications, consultations, and Taxonomy structure evolution on an as-needed basis.



***

</details>

[⬆️ Back to top](#faqs)

