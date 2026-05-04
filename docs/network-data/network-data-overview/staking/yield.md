# Yield

## Contents

* [Staking Yield Metrics](yield.md#staking-yield-metrics)
* [Validator Yield Metrics](yield.md#validator-yield-metrics)
* [Delegator Yield Metrics](yield.md#delegator-yield-metrics)

## Staking Yield Metrics <a href="#staking-yield-metrics" id="staking-yield-metrics"></a>

### Definition

Annual real and nominal percentage rates and yields for active stakers. A staker is an account that has staked native assets to participate in network consensus.

| Name                                 | MetricID          | Unit          | Interval      |
| ------------------------------------ | ----------------- | ------------- | ------------- |
| Nominal staking rate of stakers (%)  | StakingAPRNominal | Dimensionless | 1 day, 1 hour |
| Real staking yield of stakers (%)    | StakingAPYReal    | Dimensionless | 1 day, 1 hour |
| Nominal staking yield of stakers (%) | StakingAPYNominal | Dimensionless | 1 day, 1 hour |

### Details

* A real staking rate is adjusted to the network's inflation rate.
* APR metrics are calculated without taking compounding into account. APY metrics take compounding into account **for chains where this is available**. Otherwise the two should be identical.
* Hourly APR Metrics are annualized based on a 24h rolling period

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/StakingAPRNominal" %}

## Validator Yield Metrics <a href="#validator-yield-metrics" id="validator-yield-metrics"></a>

### Definition

Annual real and nominal percentage rates and yields for active validators. A validator is a staker account that has staked native assets and validates blocks in the network's consensus algorithm.

| Name                                    | MetricID            | Unit          | Interval      |
| --------------------------------------- | ------------------- | ------------- | ------------- |
| Nominal staking rate of validators (%)  | ValidatorAPRNominal | Dimensionless | 1 day, 1 hour |
| Real staking yield of validators (%)    | ValidatorAPYReal    | Dimensionless | 1 day, 1 hour |
| Nominal staking yield of validators (%) | ValidatorAPYNominal | Dimensionless | 1 day, 1 hour |

### Details

* A real staking rate is adjusted to the network's inflation rate.
* APR metrics are calculated without taking compounding into account. APY metrics take compounding into account **for chains where this is available**. Otherwise the two should be identical.
* Hourly APR Metrics are annualized based on a 24h rolling period

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/ValidatorAPRNominal" %}

## Delegator Yield Metrics <a href="#delegator-yield-metrics" id="delegator-yield-metrics"></a>

### Definition

Annual real and nominal percentage rates and yields for active validators. A delegator is a staker account that has entrusted its staked native assets to a validator to participate in network consensus.

| Name                                    | MetricID            | Unit          | Interval      |
| --------------------------------------- | ------------------- | ------------- | ------------- |
| Nominal staking rate of delegators (%)  | DelegatorAPRNominal | Dimensionless | 1 day, 1 hour |
| Real staking yield of delegators (%)    | DelegatorAPYReal    | Dimensionless | 1 day, 1 hour |
| Nominal staking yield of delegators (%) | DelegatorAPYNominal | Dimensionless | 1 day, 1 hour |

### Details

* A real staking rate is adjusted to the network's inflation rate.
* APR metrics are calculated without taking compounding into account. APY metrics take compounding into account **for chains where this is available**. Otherwise the two should be identical.
* Hourly APR Metrics are annualized based on a 24h rolling period

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/DelegatorAPRNominal" %}
