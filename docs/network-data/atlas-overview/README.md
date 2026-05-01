# Atlas Overview

Atlas is a blockchain search tool designed to standardize and simplify raw blockchain data. It provides a uniform way to query data from various blockchain full nodes using the double-entry accounting format, thereby bridging the underlying intricacies of different blockchain data models. The basis of Atlas is our Universal Blockchain Data Model (UBDM).

#### **Community Availability**

Atlas data is available through our community frontend and api with limited access and capabilities. The community data is available via HTTP API only and is limited to 1,000 API requests per 10 minutes per IP address. All of our Atlas specification data is available through our professional API with higher rate limits.

The search window for community users is limited to the last 30 days. Get the Coin Metrics Atlas Pro visualization key to view the entire history.

## Atlas Asset Coverage

Coverage for ATLAS v2 can be found on our coverage page:

{% embed url="https://coverage.coinmetrics.io/atlas-v2" %}

## Accounts

Accounts in the UBDM can be **User Accounts**, which are addresses that belong to network participants, or **Virtual Accounts**, which denote things like new asset issuance (inflation) and fees. These Virtual Accounts serve to balance transactions and blocks.

### Virtual Accounts

#### Issuance Account

Protocols like Bitcoin subsidize network security for a period of time by issuing new assets to successful miners in so-called _coinbase transactions._ Since new units sent to miners create an imbalance in the ledger, the virtual Issuance Account is debited with every new coinbase transaction. There have been instances where, due to miner error, part of the funds that would have been otherwise fully claimed by a miner are inadvertently locked and irredeemable. In such circumstances, the Issuance Account is credited when units are permanently locked in, or burned.

#### Fees Account

For certain protocols, like Bitcoin, transactions are composed of inputs and outputs. Users pay fees to miners for including their transactions in a block, but that fee is not showcased in the transaction's output list. As a result, there is an imbalance between inputs and outputs (the difference of which being the miner fees), which is only settled when a block containing the transaction is mined. To account for this imbalance, a virtual Fee Account is credited when users pay fees and debited when miners claim these fees by mining a block.

### Non-Transactional Debits and Credits

Even though the overwhelming majority of debits and credits take place within a transaction, some protocols have balance updates that occur outside of transactions (for example, Ethereum blocks rewards are credited implicitly, outside of any transaction). There are also unusual circumstances where a block may carry additional credits and debits so that the ledger can be accurately balanced. For example, the irregular ledger update following Ethereum's notorious DAO hack required us to append additional credits and debits to that block in order for the irregular ledger change to be accounted for.

## Timestamps: Miner Timestamp vs. Consensus Timestamp

The UBDM accounts for two different types of timestamps: miner-reported and consensus.

### Miner Timestamps

The miner timestamp is exactly as it sounds - the timestamp put in the block header by the miner. Most UTXO-based chains do not guarantee that the miner timestamps are accurate or even have to follow the same order as the height. A timestamp for Bitcoin is considered valid if it is greater than the median timestamp of the previous 11 blocks, and less than the network-adjusted time + 2 hours (network-adjusted time is the median of the timestamps returned by all nodes connected to the miner). As a result, block 1 could have a timestamp younger than block 2, which complicates any analysis that requires the correct ordering of transactions.

### Consensus Timestamp

To provide accurate ordering, we employ the concept of a Consensus Timestamp, which has the property of providing the same or partial order over blocks as height (i.e., a block's Consensus Timestamp is always greater than or equal to its parent's). This provides a uniform time series that accurately reflects the ordering of transactions.

## Chain Sequencing

The global sequence number denotes the ordering of a transaction's updates relative to all other balance updates that have taken place up until that point. For example, the very first credit to the miner of the genesis block (the first block to be confirmed in the ledger) for the chain has a `chain_sequence_number` of 0. The operations in the transactions immediately after that, be it a credit or a debit, would have the `chain_sequence_number` of 1. In many ways, this is analogous to the block height (for the block ordering), but we take it a step further with the UBDM and apply the ordering to all operations that have ever taken place.

## Transaction Sequencing

The transaction sequence number serves to order and match sets of credits and debits inside a transaction. If in a single transaction, Alice sent Bob 1 token, then Bob sent Charlie 1 token we would have the following order of events.

{% hint style="info" %}
`transaction_sequence_number=0`

Alice debited by 1 token, Bob credited by 1 token

`transaction_sequence_number=1`

Bob debited by 1 token, Charlie credited by 1 token
{% endhint %}

Beyond ordering, transaction sequence numbers can be used to apply the concepts of sender and receiver because within the same transaction sequence number, _senders_ are the accounts that were debited whereas _receivers_ are the accounts that were credited.

Credits and debits inside a transaction are grouped by transaction sequence number in ascending order and applied to each transaction atomically to reflect the order in which credits and debits occurred in the asset.

### Application to UTXO Transactions

UTXO transactions (used in Bitcoin and derivative assets) are comprised of 2 parts:

* Inputs (debits) which list the previously unspent outputs spent by this transaction\\
* Outputs (credits) which list the newly created unspent outputs by this transaction

Since UTXO transactions are applied atomically, all credits and debits have `tx_sequence_number` of 0.

Taking this transaction that pays a fee of 0.25 BTC as an example, we have:

| Inputs               | Outputs                 |
| -------------------- | ----------------------- |
| 50 BTC from 1NA7M... | 105 BTC to 1P3CK...     |
| 50 BTC from 1J27C... | 44.75 BTC to 1NA7Mop... |
| 50 BTC from 1DJ8d... |                         |

```javascript
{  
"transaction_hash": "418b84d7649055411d8be4e241376a93825c1d6248a304ae693060b3007a43f2",  
"balance_updates": [{ 
     "change": "-50.00000000", 
      "account": "1NA7Mopi9b4YhuWSBrB7D4W5XsTY53N1zY", 
      "new_balance": "0.00000000", 
      "previous_balance": "50.00000000", 
      "previous_n_debits": "0", 
      "previous_n_credits": "1", 
      "transaction_sequence_number": "0", 
      "chain_sequence_number": "156700", 
      "previous_credit_height": "35892", 
      "account_creation_height": "35892" 
      }, 
      { 
      "change": "-50.00000000", 
      "account": "1J27CLhDGmm3qBSiVcGxoE3evoSECUREYj", 
      "new_balance": "0.00000000", 
      "previous_balance": "50.00000000", 
      "previous_n_debits": "0", 
      "previous_n_credits": "1", 
      "transaction_sequence_number": "0", 
      "chain_sequence_number": "156701", 
      "previous_credit_height": "13316", 
      "account_creation_height": "13316" 
      }, 
      { 
      "change": "-50.00000000",
      "account": "1DJ8d8gVU5VFGpSjr2AzwS9Jtg5YnyfWQD", 
      "new_balance": "0.00000000", 
      "previous_balance": "50.00000000", 
      "previous_n_debits": "0", 
      "previous_n_credits": "1", 
      "transaction_sequence_number": "0", 
      "chain_sequence_number": "156702", 
      "previous_credit_height": "24451", 
      "account_creation_height": "24451" 
      }, 
      { 
      "change": "105.00000000", 
      "account": "1P3CKNyDEMRKHTDTLPqesYKSzPCo1QUCQK", 
      "new_balance": "555.00000000", 
      "previous_balance": "450.00000000", 
      "previous_n_debits": "1", 
      "previous_n_credits": "2", 
      "transaction_sequence_number": "0", 
      "previous_debit_height": "48243", 
      "chain_sequence_number": "156703", 
      "previous_credit_height": "47494", 
      "account_creation_height": "47041" 
      }, 
      { 
      "change": "44.74000000", 
      "account": "1NA7Mopi9b4YhuWSBrB7D4W5XsTY53N1zY", 
      "new_balance": "44.74000000", 
      "previous_balance": "0.00000000", 
      "previous_n_debits": "1", 
      "previous_n_credits": "1", 
      "transaction_sequence_number": "0", 
      "previous_debit_height": "48890", 
      "chain_sequence_number": "156704", 
      "previous_credit_height": "35892", 
      "account_creation_height": "35892" 
 }, 
 { 
 "change": "0.26000000", 
 "account": "FEES", 
 "new_balance": "0.00000000", 
 "previous_balance": "-0.26000000", 
 "previous_n_debits": "11", 
 "previous_n_credits": "49523", 
 "transaction_sequence_number": "0", 
 "previous_debit_height": "48890", 
 "chain_sequence_number": "156705", 
 "previous_credit_height": "48889", 
 "account_creation_height": "0" 
 } 
 ] 
}
```

## API Endpoints

The Atlas API endpoints are located under the common `/blockchain-v2` prefix. There are four primary data sets returned by the Atlas endpoints:

* [Accounts](accounts.md) `/blockchain-v2/{asset}/accounts`
* [Blocks](blocks/) `/blockchain-v2/{asset}/blocks`
* [Transactions](transactions/) `/blockchain-v2/{asset}/transactions`
* [Balance Updates](balance-updates.md) `/blockchain-v2/{asset}/balance-updates`

These endpoints (with no additional query parameters) return the full list of accounts, blocks, transactions, or balance updates for the asset queried with fields listed in each relevant section that follows. The result can also be filtered for specific accounts or transactions, or for specific start/end times, heights, and chain sequence numbers.

So if you want a list of balance updates for a specific set of Bitcoin accounts, you'd use the `/blockchain-v2/btc/balance-updates` endpoint with the `accounts=` parameter.

### Full Entity Endpoints

There are also two additional endpoints that can be used to get a:

* Single full Block with all Transactions `/blockchain-v2/{asset}/blocks/block_hash`
* Single full Transaction with all Balance Updates `/blockchain-v2/{asset}/transactions/transaction_hash`

These endpoints do not support any query parameters and return full block info and full transaction info. The objects returned are the same as those without the full prefix with **additional JSON fields**.

### New Async API Endpoints

{% embed url="https://youtu.be/yRwQce7g9TE?feature=shared" %}
Async API
{% endembed %}

If you need to download large amounts of data, i.e. more than 100k rows, we recommend using the "[Blockchain Explorer Job API](https://docs.coinmetrics.io/api/v4/#tag/Blockchain-Explorer-Job)", also known as Async API.

## Change Log

{% updates format="full" %}
{% update date="2026-05-01" %}
## Added Stellar Token Support

Added Atlas support for 10 Stellar-based tokens, including major stablecoins and tokenized real-world assets. For full asset coverage details refer to the [coverage page](https://coverage.coinmetrics.io/atlas-v2).

<details>

<summary>Tokens Added</summary>

* BENJI\_XLM - [REVIEW: not in currency.json]
* CETES\_XLM - [REVIEW: not in currency.json]
* CRDYX\_XLM - [REVIEW: not in currency.json]
* EURC\_XLM - [REVIEW: not in currency.json]
* PYUSD\_XLM - [REVIEW: not in currency.json]
* SPXUX\_XLM - [REVIEW: not in currency.json]
* TESOURO\_XLM - [REVIEW: not in currency.json]
* USDC\_XLM - [REVIEW: not in currency.json]
* USTRY\_XLM - [REVIEW: not in currency.json]
* WTGXX\_XLM - [REVIEW: not in currency.json]

</details>
{% endupdate %}

{% update date="2026-03-23" %}
## Added US Treasury Tokens

Added support for US Treasury tokens on ETH + OUSG\_XRP

<details>

<summary>Tokens Added</summary>

* USTB\_ETH - Superstate Short Duration US Government Securities Fund On Ethereum
* WTGXX\_ETH - WisdomTree Government Money Market Digital Fund On Ethereum
* USDY\_ETH - Ondo US Dollar Yield on Ethereum
* JTRSY\_ETH - Janus Henderson Anemoy Treasury Fund On Ethereum
* JAAA\_ETH - Janus Henderson Anemoy AAA CLO Fund Token On Ethereum
* OUSG\_ETH - Ondo Short-Term U.S. Government Bond Fund On Ethereum
* OUSG\_XRP - Ondo Short-Term U.S. Government Bond Fund On XRP Ledger

</details>
{% endupdate %}

{% update date="2026-03-18" %}
## Added Tokenized Treasury and Money Market Fund Tokens

Added support for four additional tokenized Real World Asset tokens on Ethereum.

<details>

<summary>Tokens Added</summary>

* BENJI\_ETH - Franklin OnChain U.S. Government Money Fund on Ethereum
* FDIT\_ETH - Fidelity Digital Interest Token on Ethereum
* TBILL\_ETH - OpenEden T-Bills on Ethereum
* VBILL\_ETH - VanEck Treasury Fund on Ethereum

</details>
{% endupdate %}

{% update date="2026-03-11" %}
## Added AstraZeneca xStock on Ethereum

Added support for AZNX\_ETH (AstraZeneca xStock on Ethereum).
{% endupdate %}

{% update date="2026-02-27" %}
## Added xStock Tokenized Equities on Ethereum

Added support for ~80 Backed Finance xStock tokenized equities on Ethereum.

<details>

<summary>xStock tokens added:</summary>

* AAPLX\_ETH - Apple xStock on Ethereum
* ABBVX\_ETH - AbbVie xStock on Ethereum
* ABTX\_ETH - Abbott xStock on Ethereum
* ACNX\_ETH - Accenture xStock on Ethereum
* AMBRX\_ETH - Ambarella xStock on Ethereum
* AMDX\_ETH - AMD xStock on Ethereum
* AMZNX\_ETH - Amazon xStock on Ethereum
* APPX\_ETH - Appian xStock on Ethereum
* AVGOX\_ETH - Avago xStock on Ethereum
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
* LINX\_ETH - LinkedIn xStock on Ethereum
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
* XOMX\_ETH - ExxonMobil xStock on Ethereum

</details>

{% endupdate %}

{% update date="2026-02-18" %}
## Added SoFi USD on Ethereum

Added support for SOFID\_ETH (SoFi USD on Ethereum).
{% endupdate %}

{% update date="2026-02-10" %}
## Added XRP Token Support to Atlas

Added support for five XRP-based tokens to Atlas (blockchain-v2 endpoints).

<details>

<summary>XRP tokens added:</summary>

* EURCV\_XRP - Euro Coin V on XRP Ledger
* RLUSD\_XRP - Ripple USD on XRP Ledger
* TBILL\_XRP - T-Bill Token on XRP Ledger
* USDC\_XRP - USD Coin on XRP Ledger
* XSGD\_XRP - XSGD on XRP Ledger

</details>
{% endupdate %}
{% endupdates %}
