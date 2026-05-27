---
description: /blockchain-v2/{asset}/accounts/{account}/balance-updates
---

# Account Balance

The account balance endpoint allows users to query balance-updates and counter-parties by account with a single request. The endpoint will include full account transaction history and counter-party data.

| Field                             | Description                                                                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account                           | Counterparty account for the transaction that occurred ([Account](accounts.md) as described in the Atlas overview)                                                                                             |
| account\_creation\_height         | Block height at creation of account                                                                                                                                                                            |
| change                            | Balance change after this update                                                                                                                                                                               |
| previous\_balance                 | Balance of the account prior to the application of this update                                                                                                                                                 |
| new\_balance                      | Balance of the account after this update                                                                                                                                                                       |
| transaction\_sequence\_number     | Order of this update inside the transaction that contains it                                                                                                                                                   |
| n\_debits                         | Number of debits                                                                                                                                                                                               |
| n\_credits                        | Number of credits                                                                                                                                                                                              |
| previous\_debit\_height           | Block height of the last debit                                                                                                                                                                                 |
| previous\_credit\_height          | Block height of the last credit                                                                                                                                                                                |
| previous\_chain\_sequence\_number | Orders balance updates inside a single transaction to distinguish between serial and parallel balance updates.                                                                                                 |
| sub\_account                      | Sub-account value depends on the asset. Bitcoin value is set to be the reference of the unspent output (concatenation of txHash + offset) Other assets will show values like FREE, FROZEN, STAKED, LOCKED, etc |
| stale                             | Indicator if the block is stale                                                                                                                                                                                |
| block\_hash                       | Hash of that block (unique per block)                                                                                                                                                                          |
| height                            | Height of that block (number of confirmed blocks since Genesis block)                                                                                                                                          |
| consensus\_time                   | [Consensus timestamp](../atlas-overview/#timestamps-miner-timestamp-vs.-consensus-timestamp); always increases monotonically                                                                                   |
| txid                              | Hash of transaction (transaction ID)                                                                                                                                                                           |
| credit                            | Indicator whether the balance update is a credit or debit of the account                                                                                                                                       |
| total\_received                   | Total amount received                                                                                                                                                                                          |
| total\_sent                       | Total amount sent                                                                                                                                                                                              |
| denomination                      | The denomination of the balance update. Only present for assets that support multiple denominations, and only when the denomination differs from the asset's default. See [Multi-Denomination Assets](balance-updates.md#multi-denomination-assets). |

## Multi-Denomination Assets

Certain Atlas assets track activity across many independent sub-tokens rather than a single fixed denomination. For these assets, the `denomination` field in each balance update identifies the specific sub-token the update applies to. The sub-token is identified by its contract address.

When `denomination` is absent from a balance update, the update's denomination is the asset's default (its symbol, e.g. `btc`).

### Morpho Vault Assets

Morpho Vault assets (`MORPHO_VAULTS_ETH`, `MORPHO_VAULTS_BASE`, `MORPHO_VAULTS_ARB`, `MORPHO_VAULTS_AVAXC`, `MORPHO_VAULTS_OP`) aggregate ERC-4626 vault token activity across all MetaMorpho vaults deployed on the respective chain. Each vault is an independent ERC-20 token with its own contract address and decimal precision.

For these assets:

- The `denomination` field contains the vault's contract address as a lowercase 40-character hex string (no `0x` prefix).
- The `change`, `new_balance`, and `previous_balance` values are expressed in the vault's own share token units (scaled by that vault's decimals).
- Balances across different denominations are not directly comparable because each vault's share token represents a different underlying asset.

**Example:** The steakUSDC vault on Ethereum (`0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB`) appears as denomination `beef01735c132ada46aa9aa4c54623caa92a64cb` in balance updates for `MORPHO_VAULTS_ETH`.

### Filtering by Denomination

The account balance endpoint accepts a `denominations` query parameter — a comma-separated list of denomination values — to return only balance updates for specific sub-tokens:

```
/blockchain-v2/{asset}/accounts/{account}/balance-updates?denominations={vault_contract_address}
```

For example, to retrieve only balance updates for the steakUSDC vault on Ethereum:

```
/blockchain-v2/morpho_vaults_eth/accounts/{account}/balance-updates?denominations=beef01735c132ada46aa9aa4c54623caa92a64cb
```
