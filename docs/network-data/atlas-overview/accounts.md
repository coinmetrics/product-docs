---
description: /blockchain-v2/{asset}/accounts
---

# Accounts

The **Account** endpoint returns a list of accounts, which have the following fields:

| Field                             | Description                                                                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| account                           | [Account](accounts.md) as described in the Atlas overview                                                                                       |
| type                              | Account type (UTXO, Virtual, Account)                                                                                                           |
| balance                           | Current account balance in native units                                                                                                         |
| n\_debits                         | Number of debits                                                                                                                                |
| n\_credits                        | Number of credits                                                                                                                               |
| creation\_height                  | Block height at creation of account                                                                                                             |
| creation\_block\_hash             | Block hash at creation of account                                                                                                               |
| creation\_time                    | Block time at creation of account                                                                                                               |
| creation\_chain\_sequence\_number | The positioning of the account creation transaction relative to all other transactions that have taken place on this chain                      |
| last\_chain\_sequence\_number     | The positioning of the last transaction that took place for this account relative to all other transactions that have taken place on this chain |
| last\_debit\_height               | Block height of the last debit                                                                                                                  |
| last\_credit\_height              | Block height of the last credit                                                                                                                 |
| denomination                      | The denomination of the balance update. Only present for assets that support multiple denominations, and only when the denomination differs from the asset's default. See [Multi-Denomination Assets](balance-updates.md#multi-denomination-assets). |

## Multi-Denomination Assets

Certain Atlas assets track activity across many independent sub-tokens rather than a single fixed denomination. For these assets, the `denomination` field in each balance update identifies the specific sub-token the update applies to. The sub-token is identified by its contract address.

When `denomination` is absent from a balance update, the update's denomination is the asset's default (its symbol, e.g. `btc`).

### Morpho Vault Assets

Morpho Vault assets (`MORPHO_VAULTS_ETH`, `MORPHO_VAULTS_BASE`, `MORPHO_VAULTS_ARB`, `MORPHO_VAULTS_AVAXC`, `MORPHO_VAULTS_OP`) aggregate ERC-4626 vault token activity across all MetaMorpho vaults deployed on the respective chain. Each vault is an independent ERC-20 token with its own contract address and decimal precision.

For these assets:

- The `denomination` field contains the vault's contract address as a lowercase 40-character hex string (no `0x` prefix).
- The `balance` fields are expressed in the vault's own share token units (scaled by that vault's decimals).
- Balances across different denominations are not directly comparable because each vault's share token represents a different underlying asset.

**Example:** The steakUSDC vault on Ethereum (`0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB`) appears as denomination `beef01735c132ada46aa9aa4c54623caa92a64cb` in balance updates for `MORPHO_VAULTS_ETH`.

