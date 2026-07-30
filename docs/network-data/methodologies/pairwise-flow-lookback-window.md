# Pairwise Flow Lookback Window

Pairwise flow metrics (`FlowFrom{EntityA}To{EntityB}Ntv`, `FlowFrom{EntityA}To{EntityB}USD`, and `FlowTfrFrom{EntityA}To{EntityB}Cnt`) measure the value moving from one tagged entity to another, including value that travels indirectly through untagged intermediary wallets rather than as a single direct transfer. Because those indirect journeys can span more than one interval, the metrics are computed over a **24-hour trailing lookback window**.

This page explains how that window affects the timing of attributed flows, and why pairwise flow metrics for a given interval will not always reconcile one-to-one with single-entity flow metrics such as withdrawals (`FlowOut*`) and deposits (`FlowIn*`) for that same interval. This behavior is structural and correct.

## Why a lookback window is needed

A pairwise flow is rarely a single transfer. Value often leaves the source entity, sits in one or more untagged intermediary wallets, and only later arrives at the destination entity:

```
EntityA → wallet₁ → wallet₂ → EntityB
```

An intermediary wallet may hold funds for minutes or hours before forwarding them onward. If each interval were computed in isolation, any chain that started in one interval and finished in the next would be split apart and the flow would be missed.

To capture these multi-interval journeys, the attribution graph is built over a 24-hour trailing lookback window. Transfers from earlier in that window are used to establish where value came from (its provenance), even though they occurred before the interval being computed.

## How flows are dated

Each destination deposit is attributed to the interval in which it **arrives at the destination**, not the interval in which it originally left the source. The lookback window is used only to reconstruct the provenance of that arriving value.

As a result:

* A transfer that leaves EntityA late on one day and completes its journey into EntityB the following day is counted in the **following day's** pairwise flow.
* Every deposit is counted in exactly one interval, so value is never double-counted across intervals, even though its source attribution can reach back across the lookback window.

## Reconciling with single-entity flow metrics

Because pairwise flows are dated to when value arrives at the destination, they will not line up exactly, interval by interval, with the source entity's own outflow metrics.

For example, `FlowFromEntityAToEntityB` on a given day can include value that left EntityA (and was therefore recorded in EntityA's withdrawals, `FlowOut`) on the **previous** day. Comparing the two metrics for the same single day will show a discrepancy, and that discrepancy is expected.

This is a direct and unavoidable consequence of attributing multi-hop flows to when they complete their journey. It cannot be removed without also dropping legitimate flows whose journeys cross an interval boundary, which would understate the true value moving between entities.

{% hint style="info" %}
**Key takeaway.** Pairwise flow metrics are dated to when value arrives at the destination and are computed over a 24-hour trailing lookback. Small timing differences against a source entity's withdrawal metrics are expected and reflect multi-hop journeys that span interval boundaries, not an error in the data.
{% endhint %}

### Update & Review History

<table><thead><tr><th width="124.48046875">Date</th><th>Updates</th><th data-type="users" data-multiple>Updated By</th><th data-type="users" data-multiple>Reviewed By</th></tr></thead><tbody><tr><td>2026-07-18</td><td>New page</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></tbody></table>
