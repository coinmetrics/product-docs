# Mempool Size 100% Alert

**Alert Definition**

Alerts if the mempool\_size has reached 300mb in size. This is equivalent to 90% of the default maximum BTC mempool size

**Dictionary**

| Name                    | AlertID                  | Category | Sub-category   | Type | Unit  | Interval |
| ----------------------- | ------------------------ | -------- | -------------- | ---- | ----- | -------- |
| Mempool Size 100% Alert | mempool\_size\_300mb\_hi | Alert    | Mempool Alerts | Sum  | bytes | Ad hoc   |

**Interpretation**

By default, the nodes of a cryptonetwork have a dedicated area to store unprocessed transactions, the mempool. Since mempools rely on local storage, their capacity to store unprocessed transactions must be limited. Otherwise, the mempool could be exploited by an attacker flooding it with transactions. If a mempool has reached 300MB, nodes may begin discarding transactions to free up space, which can cause disruptions.

This alert triggers if the mempool reaches a size of 300MB which is equivalent to 100% of that 300MB size. Please note, that depending on the configuration of any given node the actual size of the mempool can vary and can be larger or smaller. 300MB is the default and most common size for mempools.

This alert triggers when most nodes are likely to start dropping transactions from their mempool to free up space.

**Potential Root Causes**

There is increased activity on the network leading to a gowth in the mempool size.

There is an increase in large transactions, pushing the size of the mempool up.

The network has had a long time of not finding a new block leading to an increase in the size of the network

**Asset Coverage**

Bitcoin (BTC)
