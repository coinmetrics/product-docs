---
description: /profile/networks
---

# Network Profiles

## **Definition**

The network profiles provide a descriptive overview of a network.

## Details

For more information on the network profiles see the[ profiles overview](./).

## Endpoint Response

The **`profile/networks`** endpoint returns a profile for each asset.  The response is formatted as follows:

| Field                            | Description                                                                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `full_name`                      | Network Name                                                                                                                                                                         |
| `network`                        | Network symbol                                                                                                                                                                       |
| `overview`                       | Description of key features and an overview of how the network solves the problem for which it was created.                                                                          |
| `consensus_mechanism`            | The protocols, algos, incentives and ideas that allow a network of nodes to agree on the state of a blockchain (if omitted, then the asset may not have its own consensus mechanism) |
| `hashing_algorithm`              | The algorithm leveraged by the network to perform its hashing operations.                                                                                                            |
| `transaction_finality`           | Network threshold after which transactions are considered final (listed in time and block/slot numbers) or no                                                                        |
| `available_clients`              | A list of the node clients available for the network                                                                                                                                 |
| `smart_contract_deployment`      | Networks smart contract capabilities and if  they be deployed in a permissionless fashion or in a permissioned model.                                                                |
| `foundation`                     | Name of the foundation supporting development of the network                                                                                                                         |
| `founding_team_identity`         | Indicates wether or not the identity of the founding team is known                                                                                                                   |
| `repository`                     | Links to relevant github repositories as well as their name.                                                                                                                         |
| `transaction_visibility`         | Transactions visible on chain or hidden (either fully or partially)                                                                                                                  |
| native\_fee\_token               | Name of the token in which fees are paid on the network                                                                                                                              |
| `significant_historical_changes` | Significant historical changes that have occurred in the network.                                                                                                                    |
| `upgrade_history`                | Upgrades that the network has undergone.                                                                                                                                             |
| `rollup_info`                    | If the network is a rollup (e.g.: layer-2), the type of rollup it is as well as the state validation type                                                                            |
| `modular_or_monolithic`          | Indicates wether the blockchain architecture is monolithic or modular.                                                                                                               |
| `network_scaling_solution`       | Boolean value if the network serves as a scaling solution for another network or not.                                                                                                |
| `chain_explorers`                | List of public chain explorers                                                                                                                                                       |

## Example

A sample of the network profile response for  `btc` is  shown below.

```json
{
    "data": [
        {
            "full_name": "Bitcoin",
            "network": "btc",
            "modular_or_monolithic": "Monolithic",
            "overview": "The Bitcoin network is a decentralized digital currency system that enables peer-to-peer transactions without the need for intermediaries. It uses a proof-of-work consensus mechanism to secure its blockchain, ensuring high levels of security and immutability. Designed primarily as a store of value and medium of exchange, Bitcoin has paved the way for the global cryptocurrency movement while emphasizing decentralization and robustness.",
            "consensus_mechanism": "Proof-of-Work",
            "hashing_algorithm": "SHA256d",
            "transaction_finality": "No Fixed Finality Threshold",
            "available_clients": [
                "Bitcoin Core"
            ],
            "smart_contract_deployment": "Permissionless",
            "foundation": [
                "Bitcoin Core: A primary group of developers who maintain and release client software to validate blocks and improve the bitcoin wallet experience."
            ],
            "founding_team_identity": "Unknown",
            "repository": [
                {
                    "github_repository": "Bitcoin Core",
                    "github_url": "github.com/bitcoin/bitcoin"
                }
            ],
            "transaction_visibility": "Visible",
            "native_fee_token": "BTC",
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
                    "date": "2014",
                    "details": "Bitcoin XT- Forked to increase transaction count per second"
                },
                {
                    "date": "2016",
                    "details": "Bitcoin Classic - Forked to increase block size"
                },
                {
                    "date": "2016",
                    "details": "Bitcoin Unlimited - Forked to create variable block sizes"
                },
                {
                    "date": "2017",
                    "details": "Bitcoin Cash - Forked after Segregated Witness upgrade to speed up transaction times"
                },
                {
                    "date": "2017",
                    "details": "Bitcoin Gold - Forked to adjust algorithm to return to GPU Proof-of-Work mining and disincentivize specialized technology investment"
                },
                {
                    "date": "2018",
                    "details": "Bitcoin-Satoshi's Vision - Forked from Bitcoin Cash to increase block size"
                }
            ],
            "rollup_info": [
                {
                    "rollup_type": "N/A",
                    "state_validation": "N/A"
                }
            ],
            "network_scaling_solution": "false",
            "type_of_network": "Blockchain",
            "chain_explorers": [
                "https://blockchair.com/bitcoin",
                "https://mempool.space/",
                "https://btc.com/",
                "https://explorer.coinex.com/btc",
                "https://live.blockcypher.com/btc/"
            ]
        }
    ]
}
```

## Release History
