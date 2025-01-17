---
description: /blockchain-v2/{asset}/transactions/{transaction_hash}
---

# Full Transaction

Adding a `transaction_hash`to the prefix returns a full single transaction with all balance updates.

| Description                                  |                                                                                                                                                                                                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| block\_hash                                  | Hash of the block containing the transaction                                                                                                                                                                                                                   |
| height                                       | Height of the block containing the transaction                                                                                                                                                                                                                 |
| transaction\_hash                            | Hash of transaction                                                                                                                                                                                                                                            |
| consensus\_time                              | ​[Consensus timestamp](../../../atlas-overview/#consensus-timestamp); always increases monotonically                                                                                                                                                           |
| min\_chain\_sequence\_number                 | Starting [sequence number](../../../atlas-overview/#chain-sequencing) (global ordering of the first update in this transaction relative to all other updates recorded on the ledger up until that point) for the balance updates occurring in this transaction |
| max\_chain\_sequence\_number                 | Last [sequence number](../../../atlas-overview/#chain-sequencing) (global ordering of the last update in this transaction relative to all other updates recorded on the ledger up until that point) for the balance updates occurring in this transaction      |
| n\_balance updates                           | Number of balance updates                                                                                                                                                                                                                                      |
| amount                                       | Amount of the balance updates                                                                                                                                                                                                                                  |
| [balance\_updates](../../balance-updates.md) | Array of balance updates for that transaction                                                                                                                                                                                                                  |
