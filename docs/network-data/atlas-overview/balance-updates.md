---
description: /blockchain-v2/{asset}/balance-updates
---

# Balance Updates

Balance updates represent the change in the balance of an account. If the change is greater-or-equal to 0, it is considered a credit. Otherwise, it is considered a debit. In certain circumstances, there can be 0-valued balance updates (used to represent 0 fee transactions, for example, which were frequent in Bitcoin's early history).

The **Balance Updates** endpoint returns a list of accounts, which have the following fields:

| Field                                                                      | Description                                                                                                                                                       |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| block\_hash                                                                | Hash of block containing the transaction affecting the balance                                                                                                    |
| height                                                                     | Height of the block containing the transaction affecting the balance                                                                                              |
| consensus\_time                                                            | [Consensus timestamp](../atlas-overview/#chain-sequencing); always increases monotonically                                                                        |
| chain\_sequence\_number                                                    | Global [sequence number ](../atlas-overview/#chain-sequencing)or ordering of this update relative to all other updates recorded on the ledger up until this point |
| account                                                                    | [Account](../on-chain-data/atlas-overview.md#accounts) receiving a balance change                                                                                 |
| account\_creation\_height                                                  | Block height at account creation                                                                                                                                  |
| change                                                                     | Balance change after this update                                                                                                                                  |
| previous\_balance                                                          | Balance of the account prior to the application of this update                                                                                                    |
| new\_balance                                                               | Balance of the account after this update                                                                                                                          |
| [transaction\_sequence\_number](../atlas-overview/#transaction-sequencing) | Order of this update inside the transaction that contains it                                                                                                      |
| previous\_n\_debits                                                        | Number of times this account has been debited prior to this update                                                                                                |
| previous\_n\_credits                                                       | Number of times this account has been credited prior to this update                                                                                               |
| transaction\_hash                                                          | Hash of the transaction containing the balance update                                                                                                             |
| previous\_debit\_height                                                    | Block height of the last debit from this account (null if no prior debit)                                                                                         |
| previous\_credit\_height                                                   | Block height of the last credit from this account (null if no prior credit)                                                                                       |
| previous\_chain\_sequence\_number                                          | The positioning of the last transaction that took place for this account relative to all other transactions that have taken place on this chain                   |
| denomination                                                               | The denomination of the balance update. Only present for assets that support multiple denominations, and only when the denomination differs from the asset's default. See [Multi-Denomination Assets](README.md#multi-denomination-assets). |

## Multi-Denomination Assets

Certain Atlas assets track activity across many independent sub-tokens rather than a single fixed denomination. For these assets, the `denomination` field in each balance update identifies the specific sub-token the update applies to.

When `denomination` is absent from a balance update, the update's denomination is the asset's default (its symbol, e.g. `btc`).

### Morpho Vault Assets

Morpho Vault assets (`MORPHO_VAULTS_ETH`, `MORPHO_VAULTS_BASE`, `MORPHO_VAULTS_ARB`, `MORPHO_VAULTS_AVAXC`, `MORPHO_VAULTS_OP`) aggregate ERC-4626 vault token activity across all MetaMorpho vaults deployed on the respective chain. Each vault is an independent ERC-20 token with its own contract address and decimal precision.

For these assets:

- The `denomination` field contains the vault's contract address as a lowercase 40-character hex string (no `0x` prefix), e.g. `a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`.
- The `change`, `new_balance`, and `previous_balance` values are expressed in the vault's own share token units (scaled by that vault's decimals).
- Balances across different denominations are not directly comparable because each vault's share token represents a different underlying asset.

### Filtering by Denomination

The balance updates endpoint accepts a `denominations` query parameter — a comma-separated list of denomination values — to return only balance updates for specific sub-tokens:

```
/blockchain-v2/{asset}/balance-updates?denominations={vault_contract_address}
```

For example, to retrieve only balance updates for a single Morpho vault on Ethereum:

```
/blockchain-v2/morpho_vaults_eth/balance-updates?denominations=a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
```
