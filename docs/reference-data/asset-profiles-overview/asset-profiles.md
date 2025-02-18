---
description: /profile/assets
---

# Asset Profiles

## **Definition**

The asset profiles provide a descriptive overview of an asset.

## Details

For more information on the asset profiles see the [profiles overview](./).

## Endpoint Response

The **`profile/assets`** endpoint returns a profile for each asset.  The response is formatted as follows:

| Field                               | Description                                                                                                                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`                             | Asset symbol                                                                                                                                                                                                                                            |
| `full_name`                         | Asset name                                                                                                                                                                                                                                              |
| `description`                       | Description of key features                                                                                                                                                                                                                             |
| `overview`                          | Description of key features and an overview of how the asset solves the problem for which it was created.                                                                                                                                               |
| `token_purpose`                     | A list of the main purposes for the asset. For example if the token is a fee token on a network, or if it is a stablecoin or governance token.                                                                                                          |
| project\_tea`m`                     | Name of the project team supporting the asset                                                                                                                                                                                                           |
| `foundation`                        | Name of the foundation supporting the asset                                                                                                                                                                                                             |
| `website`                           | Link to project website (if omitted, then no official website for the project was found)                                                                                                                                                                |
| `whitepaper_url`                    | Link to whitepaper URL (if omitted, then no official whitepaper URL was found)                                                                                                                                                                          |
| `creation_date`                     | Genesis block or first included block                                                                                                                                                                                                                   |
| `token_generation_event_supply`     | Total supply of the token minted at genesis                                                                                                                                                                                                             |
| `supply_cap`                        | The max number of coins programmed to exist in the lifetime of a cryptoasset (if omitted, then supply is uncapped/unlimited/infinite)                                                                                                                   |
| `initial_supply_token_distribution` | Overview of the initial allocation of tokens if available. Includes the receiving entity as well as the amount received.                                                                                                                                |
| `vesting_schedule`                  | Overview of vesting schedules disclosed by the project. Includes the entity who has a vesting schedule, the cliff as well as the total unlock time.                                                                                                     |
| `new_token_issuance_recipient`      | Recipient of newly issued tokens if available. If tokens are distributed to a set type of recipients like miners or validators, those will be listed here.                                                                                              |
| `issuing_networks`                  | Which networks is the asset natively issued on (i.e.: not bridged or wrapped)                                                                                                                                                                           |
| `bridged_networks`                  | Which network is the asset bridged to. This includes bridging to other chains via wrapping (e.g.: btc is bridged to ethereum via wrapping as wbtc)                                                                                                      |
| `issuance_schedule_changes`         | Any changes that have occurred to the issuance schedule of the asset.                                                                                                                                                                                   |
| `significant_historical_changes`    | Any significant historical changes that have occurred with the asset or project.                                                                                                                                                                        |
| `upgrade_history`                   | Upgrades that have been made to the asset or project.                                                                                                                                                                                                   |
| `blog_updates`                      | Link to the blog where the project posts updates.                                                                                                                                                                                                       |
| `project_github_repository`         | Link to relevant github repositories for the project.                                                                                                                                                                                                   |
| `asset_regulation`                  | If the project is regulated, how it is regulated (Indirectly vs Directly). Indirect regulation could be via something like an ETP (e.g.: BTC spot ETF)  while directly is if any clear regulatory guidance has been provided (e.g.: via MICA in the EU) |
| `asset_regulated_products`          | Which regulated products have been released for the asset (e.g.: ETPs and ETFs)                                                                                                                                                                         |
| `etp_custodians`                    | Who are the known custodians for the underlying asset for ETPs.                                                                                                                                                                                         |

## Example

A sample of the asset profile response for  `btc` is  shown below.

```json
{
    "data": [
        {
            "asset": "btc",
            "full_name": "Bitcoin",
            "description": "Bitcoin is a peer-to-peer network that facilitates transfers between network participants without any central authority.",
            "overview": "Bitcoin (BTC) is a value transfer token and the first peer-to-peer cryptocurrency operating without central authority. Using blockchain technology, it maintains a distributed ledger of transactions, validated by miners through a Proof-of-Work mechanism. In Proof-of-Work, miners exert computational energy to race to propose a block to the network. Miners who successfully add a block to the chain are rewarded with newly issued BTC and fees from transactions in the block. Transactions follow an Unspent Transaction Output or UTXO model to individually track the smallest unit of BTC. The smallest unit is equal to 1.0 x 10-8 BTC or 1 satoshi. Key features of the network include a fixed supply of 21 million BTC that is issued at a decreasing rate every four years, cryptographic security, and support for second-layer solutions like the Lightning Network.",
            "creation_date": "2009-01-01",
            "token_purpose": [
                "Store of Value Token",
                "Fee Token"
            ],
            "project_team": "Bitcoin Core Developers",
            "website": "https://bitcoin.org/en/",
            "whitepaper_url": "https://bitcoin.org/bitcoin.pdf",
            "token_generation_event_supply": "N/A",
            "supply_cap": "21000000",
            "initial_supply_token_distribution": [
                {
                    "initial_supply_allocation": "N/A",
                    "initial_supply_distribution": "N/A"
                }
            ],
            "vesting_schedule": [
                {
                    "vesting_schedule_allocation": "N/A",
                    "vesting_schedule_cliff": "N/A",
                    "vesting_schedule_total_unlock_time": "N/A"
                }
            ],
            "new_token_issuance_recipient": [
                "Miner"
            ],
            "issuing_networks": [
                "Bitcoin"
            ],
            "bridged_networks": [
                "Ethereum",
                "Lightning Network",
                "Stax",
                "BOB Network",
                "Arbitrum",
                "OP Mainnet",
                "Base",
                "Worldchain",
                "Avalanche C-Chain",
                "Kava",
                "Osmosis",
                "Polygon PoS"
            ],
            "issuance_schedule_changes": "Bitcoin issuance rewards halve every 210,000 blocks or about 4 years. BTC issuance began at 50 BTC per block and is currently at 3.125 BTC per block. The latest halving was at block 840,000 with the next halving at block 1,050,000.",
            "significant_historical_changes": [
                {
                    "date": "2008-10-31",
                    "details": "BTC Whitepaper published"
                },
                {
                    "date": "2009-01-03",
                    "details": "First BTC Block:'Chancellor on brink of second bailout for banks'"
                },
                {
                    "date": "2010-05-22",
                    "details": "BTC Pizza Transaction"
                },
                {
                    "date": "2010-07-18",
                    "details": "MtGox is announced"
                },
                {
                    "date": "2010-07-25",
                    "details": "Consensus change to follow chain with most work"
                },
                {
                    "date": "2010-08-15",
                    "details": "Overflow block is reorged out after Satoshi releases fix and adivses to the re-org"
                },
                {
                    "date": "2010-12-12",
                    "details": "Final post from Satoshi on bitcointalk.org"
                },
                {
                    "date": "2011-06-19",
                    "details": "MtGox is hacked"
                },
                {
                    "date": "2011-08-19",
                    "details": "First Bitcoin Improvement Proposal (BIP)"
                },
                {
                    "date": "2012-04",
                    "details": "BIP-16 P2SH"
                },
                {
                    "date": "2012-11-29",
                    "details": "First BTC halving"
                },
                {
                    "date": "2013-01-31",
                    "details": "First ASICs are shipped"
                },
                {
                    "date": "2013-09",
                    "details": "144k BTC from Silk Road are confiscated"
                },
                {
                    "date": "2014-02-07",
                    "details": "Mt. Gox halts BTC withdrawals declares bankruptcy by end of month"
                },
                {
                    "date": "2014-03-19",
                    "details": "OP_RETURN is introduced"
                },
                {
                    "date": "2015-02",
                    "details": "Lightning Whitepaper is published"
                },
                {
                    "date": "2016-02-03",
                    "details": "BIP2 which defines the BIP process"
                },
                {
                    "date": "2016-07-10",
                    "details": "Second halving"
                },
                {
                    "date": "2017-07-20",
                    "details": "BIP 91 (SegWit) activation is locked in"
                },
                {
                    "date": "2017-08-24",
                    "details": "SegWit goes live"
                },
                {
                    "date": "2018-09",
                    "details": "CVE-2018-17144 is discovered that would have allowed attackers to crash bitcoin nodes and exceed the 21 million coin limit"
                },
                {
                    "date": "2020-05-16",
                    "details": "Thid bitcoin halving"
                },
                {
                    "date": "2024-01-10",
                    "details": "First Bitcion Spot ETFs approved in the USA"
                },
                {
                    "date": "2024-04-20",
                    "details": "Fourth bitcoin halving"
                }
            ],
            "upgrade_history": [
                {
                    "date": "2011-08-19",
                    "details": "First Bitcoin Improvement Proposal (BIP)"
                },
                {
                    "date": "2012-04",
                    "details": "BIP-16 P2SH"
                },
                {
                    "date": "2012-11-29",
                    "details": "First BTC halving"
                },
                {
                    "date": "2016-02-03",
                    "details": "BIP2 which defines the BIP process"
                },
                {
                    "date": "2016-07-10",
                    "details": "Second halving"
                },
                {
                    "date": "2017-07-20",
                    "details": "BIP 91 (SegWit) activation is locked in"
                },
                {
                    "date": "2017-08-24",
                    "details": "SegWit goes live"
                },
                {
                    "date": "2020-05-16",
                    "details": "Thid bitcoin halving"
                },
                {
                    "date": "2024-04-20",
                    "details": "Fourth bitcoin halving"
                }
            ],
            "blog_updates": "N/A",
            "project_github_repository": [
                "https://github.com/bitcoin"
            ],
            "asset_regulation": "Indirectly",
            "asset_regulated_products": [
                "Bitcoin Spot ETFs"
            ],
            "etp_custodians": [
                "Coinbase Custody Trust Company, LLC",
                "Fidelity Digital Asset Services, LLC",
                "Gemini Trust Company, LLC",
                "Bitgo Trust Company, Inc.",
                "Komainu (Jersey) Limited"
            ]
        }
    ]
}
```

## Release History

* **Version 1.0 on January 30, 2023**: Release of initial version of the asset profiles
