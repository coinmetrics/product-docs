---
description: How to write a Coin Metrics release note, and the template to copy.
---

# Release Notes — Authoring Template

This page defines **how we write release notes** so that a single entry can be
surfaced in two places at once:

* the **global "What's New" feed** (every release, all products), and
* the **per-product changelog** on each product overview page (only that
  product's releases).

Write each release **once**, tag it, and it can appear in every relevant view.
Never copy the same release into two places by hand — tag it instead.

***

## Tagging axes

Every entry is classified on three axes plus one optional flag. Keep the values
to the controlled vocabulary below so the views stay consistent and can later be
generated automatically.

| Axis | Required | Allowed values |
|---|---|---|
| **Product line** | Yes (≥1) | `Market Data Feed`, `Market Data Pro`, `Network Data Pro`, `ATLAS`, `Indexes`, `CM Prices`, `Reference Data` |
| **Surface / tool** | Yes (≥1) | `API`, `Coverage`, `Charts`, `Dashboards`, `Cloud Delivery`, `Python/R Client`, `Google Sheets` |
| **Change type** | Yes (1) | `New`, `Enhancement`, `Coverage Expansion`, `Deprecation`, `Breaking Change`, `Fix` |
| **Action Required** | Optional | Add when subscribers must migrate or change integrations before a date |

A release that spans multiple products (e.g. a new API field available to MDF,
NDP, and Indexes) lists **all** affected product lines. That is what lets the
same entry show up in three product changelogs while being written once.

***

## Writing guidelines

* **Title** — start with a verb describing the change from the user's point of
  view: *"Added…", "Expanded…", "Released…", "Deprecated…", "Fixed…"*. Name the
  thing affected, not the internal project.
* **First sentence** — what changed and who it's for. A subscriber should be able
  to decide "do I care?" from this line alone.
* **Links** — always link to the relevant doc page (`"mention"` style) and, where
  relevant, the [Coverage](https://coverage.coinmetrics.io) page for the metric
  or asset.
* **Long lists** — put asset/metric lists inside a collapsible `<details>` block
  so the feed stays scannable.
* **Breaking changes** — state the action and the deadline in **bold** in the
  first sentence, and tag `Action Required`.

***

## Template (copy this)

```markdown
{% update date="YYYY-MM-DD" %}
## <Verb + what changed>

<!-- tags: product=[Network Data Pro]; surface=[API, Coverage]; type=Coverage Expansion; action_required=false -->

<One-to-two sentence summary: what changed, who it affects, and why it matters.>
For details see the [<doc page>](path/ "mention") page and the
[coverage page](https://coverage.coinmetrics.io/...).

<details>

<summary>Assets Added:</summary>

* `SYMBOL` - Full Name

</details>
{% endupdate %}
```

The `<!-- tags: ... -->` HTML comment is invisible in the rendered GitBook page
but is machine-readable. It is what a future generation script reads to fan a
single entry out into each tagged product changelog. Until that automation
exists, the comment still documents scope for whoever maintains the page.

***

## Worked examples

### Single-product coverage expansion (most common today)

```markdown
{% update date="2026-06-22" %}
## Expanded Exchange Flows to New Stablecoins

<!-- tags: product=[Network Data Pro]; surface=[API, Coverage]; type=Coverage Expansion; action_required=false -->

Released exchange flow metrics at the 1d and 1h frequency for four stablecoin
assets on Ethereum. For details on the supported metrics refer to the
[exchange](exchange/ "mention") page, and for coverage refer to the
[coverage page](https://coverage.coinmetrics.io/asset-metrics-v2/FlowInExNtv).

<details>

<summary>Assets Added:</summary>

* `DAI` - Dai
* `USDE_ETH` - Ethena USDe ETH

</details>
{% endupdate %}
```

### Cross-product API enhancement (written once, three product tags)

```markdown
{% update date="2026-06-30" %}
## Added `page_size` Pagination Control to Timeseries Endpoints

<!-- tags: product=[Market Data Feed, Network Data Pro, Indexes]; surface=[API, Python/R Client]; type=Enhancement; action_required=false -->

The `/timeseries/*` endpoints now accept a `page_size` parameter, letting clients
tune response size for large pulls. Available across Market Data, Network Data,
and Index timeseries. See the [API Reference](https://docs.coinmetrics.io/api/v4).
{% endupdate %}
```

### Breaking change / deprecation (action required)

```markdown
{% update date="2026-07-15" %}
## Deprecating Catalog V1 Endpoints — Migrate by 2026-10-01

<!-- tags: product=[Market Data Feed, Network Data Pro, Indexes, Reference Data]; surface=[API]; type=Deprecation; action_required=true -->

**Catalog V1 endpoints will be retired on 2026-10-01. Migrate to Catalog V2
before that date to avoid disruption.** All affected integrations should follow
the [Catalog V1 to V2 migration guide](../access-our-data/api/catalog-v1-v2-migration.md).
{% endupdate %}
```
