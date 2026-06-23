#!/usr/bin/env python3
"""
gitbook_metric_documentation_generator.py – Generate GitBook-style Markdown docs for Coin Metrics
metrics, including live API examples pulled with the Coin Metrics Python client.

Usage Example
------------
python scripts/market/gitbook_metric_documentation_generator.py \
    --metric-pattern "open_interest_reported_*" \
    --endpoint /timeseries/asset-metrics \
    --endpoint /timeseries/exchange-metrics \
    --endpoint /timeseries/exchange-asset-metrics \
    --endpoint /timeseries/exchange-pair-metrics \
    --endpoint /timeseries/pair-metrics \
    --example-metric open_interest_reported_future_usd \
    --example-frequency 1d \
    --example-asset btc \
    --example-exchange binance \
    --example-exchange-asset binance-btc \
    --example-exchange-pair binance-btc-usd \
    --example-pair btc-usd \
    --output open_interest_reported_documentation.md

Key features
------------
• Reads metric metadata JSON and filters by repeatable --metric-pattern globs.  
• Builds a GitBook-friendly Markdown scaffold (Overview … FAQ).  
• Inserts a rich Metrics table (Metric, Description, Frequency, Coverage).  
• Fetches real data samples (≤ 3 rows) for selected endpoints via the CM API client.  
• Authenticates with --api-key or the CM_API_KEY environment variable.  
• Prints progress messages so users know what’s happening.
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import os
import pathlib
import sys
import urllib.parse
from typing import Any, Dict, List, Optional, Tuple

import pandas as pd  # noqa: F401 – required by CoinMetricsClient internals
from coinmetrics.api_client import CoinMetricsClient

# ----------------------------------------------------------------------------- #
# Constants & mappings
# ----------------------------------------------------------------------------- #

METRICS_PATH = pathlib.Path("/workspaces/data-tools/data/resources/metrics.json")

_DOC_URLS: Dict[str, str] = {
    "/timeseries/asset-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesAssetMetrics",
    "/timeseries/exchange-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesExchangeMetrics",
    "/timeseries/exchange-asset-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesExchangeAssetMetrics",
    "/timeseries/exchange-pair-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesExchangePairMetrics",
    "/timeseries/market-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesMarketMetrics",
    "/timeseries/pair-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesPairMetrics",
    "/timeseries/institution-metrics": "https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesInstitutionMetrics",
}

# endpoint → (client-method, entity-param, CLI-attr, limit-kwarg)
_ENDPOINT_CALL: Dict[str, Tuple[str, str, str, str]] = {
    "/timeseries/asset-metrics": (
        "get_asset_metrics",
        "assets",
        "example_asset",
        "limit_per_asset",
    ),
    "/timeseries/exchange-metrics": (
        "get_exchange_metrics",
        "exchanges",
        "example_exchange",
        "limit_per_exchange",
    ),
    "/timeseries/exchange-asset-metrics": (
        "get_exchange_asset_metrics",
        "exchange_assets",
        "example_exchange_asset",
        "limit_per_exchange_asset",
    ),
    "/timeseries/exchange-pair-metrics": (
        "get_exchange_pair_metrics",
        "exchange_pairs",
        "example_exchange_pair",
        "limit_per_exchange_pair",
    ),
    "/timeseries/market-metrics": (
        "get_market_metrics",
        "markets",
        "example_market",
        "limit_per_market",
    ),
    "/timeseries/pair-metrics": (
        "get_pair_metrics",
        "pairs",
        "example_pair",
        "limit_per_pair",
    ),
    "/timeseries/institution-metrics": (
        "get_institution_metrics",
        "institutions",
        "example_institution",
        "limit_per_institution",
    ),
}

PLACEHOLDER = (
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
)

# ----------------------------------------------------------------------------- #
# Helper functions
# ----------------------------------------------------------------------------- #

def log(msg: str) -> None:
    """Simple console logger."""
    print(f"[gitbook-gen] {msg}")


def load_metrics(path: pathlib.Path = METRICS_PATH) -> List[Dict[str, Any]]:
    log(f"Loading metrics metadata from {path}")
    try:
        data = json.loads(path.read_text())
    except FileNotFoundError:
        sys.exit(f"Error: file '{path}' not found.")
    except json.JSONDecodeError as exc:
        sys.exit(f"Error: invalid JSON in '{path}': {exc}")
    log("Loaded metrics metadata")
    return data if isinstance(data, list) else [data]


def select_metrics(
    metrics: List[Dict[str, Any]], patterns: List[str]
) -> List[Dict[str, Any]]:
    """
    Filter metrics by glob patterns, preserving original order from the JSON.
    """
    log(f"Filtering metrics with patterns: {patterns}")
    selected = [
        m
        for m in metrics
        if any(fnmatch.fnmatchcase(m.get("short_form", ""), p) for p in patterns)
    ]
    log(f"Selected {len(selected)} metric(s)")
    return selected


def escape_pipes(text: str) -> str:
    return text.replace("|", "\\|")


def format_frequency(raw_freq: Any) -> str:
    if isinstance(raw_freq, list):
        return ", ".join(map(str, raw_freq))
    return "" if raw_freq is None else str(raw_freq)


def coverage_link(short_form: str) -> str:
    url = (
        "https://coverage.coinmetrics.io/search-results?query="
        + urllib.parse.quote_plus(short_form)
    )
    return f"[🔗]({url} \"Open coverage search for {short_form}\")"


def metrics_table_md(metrics: List[Dict[str, Any]]) -> str:
    header = "| Metric | Description | Frequency | Coverage |\n|---|---|---|---|"
    rows = [
        f"| `{m.get('short_form','')}` | {escape_pipes(m.get('description',''))} | "
        f"{format_frequency(m.get('frequencies'))} | {coverage_link(m.get('short_form',''))} |"
        for m in metrics
    ]
    return "\n".join([header, *rows])

# ----------------------------------------------------------------------------- #
# Coverage section helper
# ----------------------------------------------------------------------------- #

def coverage_section_md(patterns: List[str]) -> str:
    """
    Generate a GitBook embed for the coverage search based on given metric patterns.
    """
    if not patterns:
        return PLACEHOLDER
    embeds = []
    for p in patterns:
        query = urllib.parse.quote_plus(p)
        embeds.append(f"{{% embed url=\"https://coverage.coinmetrics.io/search-results?query={query}\" %}}")
    return "\n\n".join(embeds)

# ----------------------------------------------------------------------------- #
# Example fetching helpers
# ----------------------------------------------------------------------------- #

def fetch_example_list(
    client: CoinMetricsClient,
    method_name: str,
    entity_param: str,
    entity_value: str,
    metric: str,
    limit_kw: str,
    frequency: str,
) -> str:
    """Return a fenced JSON code block with ≤ 3 observations using the native API list response."""

    log(
        f"Fetching example via {method_name} "
        f"({entity_param}={entity_value}, metric={metric}, {limit_kw}=3, frequency={frequency})"
    )
    method = getattr(client, method_name)
    try:
        resp = method(
            metrics=[metric],
            paging_from="end",
            frequency=frequency,
            **{entity_param: entity_value, limit_kw: 3},
        )
        rows: List[Dict[str, Any]] = resp.to_list()
    except Exception as exc:
        log(f"⚠️  API request failed: {exc}")
        return f"API request failed: {exc}"

    snippet = json.dumps(rows[:3], indent=2)
    return f"```json\n{snippet}\n```"


def examples_section_md(
    endpoints: List[str],
    metric: Optional[str],
    cli_ns: argparse.Namespace,
    client: Optional[CoinMetricsClient],
) -> str:
    if not (metric and client):
        return PLACEHOLDER

    blocks: List[str] = []
    for ep in endpoints:
        method_name, entity_param, cli_attr, limit_kw = _ENDPOINT_CALL[ep]
        value: str | None = getattr(cli_ns, cli_attr)
        if not value:
            log(f"Skipping {ep}: no example value provided for {entity_param}")
            continue
        frequency = cli_ns.example_frequency
        block = fetch_example_list(
            client,
            method_name,
            entity_param,
            value,
            metric,
            limit_kw,
            frequency,
        )
        singular_entity = entity_param.rstrip("s")
        nice_name = ep.split("/")[-1].replace("-", " ").title()
        url = (
            f"https://api.coinmetrics.io/v4{ep}"
            f"?{entity_param}={value}"
            f"&metrics={metric}"
            f"&{limit_kw}=3"
            f"&frequency={frequency}"
            f"&api_key=YOUR_API_KEY"
        )
        blocks.append(
            f"### Example for {nice_name}\n\n"
            f"A sample of the `{metric}` metric for the {singular_entity} `{value}` from our `{ep}` API endpoint is provided below. "
            f"You can view this example in your browser [here]({url}).\n\n"
            f"{block}"
        )

    return "\n\n".join(blocks) if blocks else PLACEHOLDER

# ----------------------------------------------------------------------------- #
# Markdown assembly
# ----------------------------------------------------------------------------- #
def endpoints_section_md(endpoints: List[str]) -> str:
    """
    Generate a section listing API endpoints for metrics.
    """
    if not endpoints:
        return PLACEHOLDER

    header = "The metrics are served through the following endpoints:"
    items = "\n".join(f"* [{ep}]({_DOC_URLS[ep]})" for ep in endpoints)
    return f"{header}\n\n{items}"


def build_document(markdown_pieces: Dict[str, str]) -> str:
    """Stitch together all sections into one Markdown string."""
    order = [
        "# Overview",
        "# Metrics",
        "# Data Sources and Methodology",
        "# Coverage",
        "# API Endpoints",
        "# Examples",
        "# Frequently Asked Questions",
    ]
    return "\n\n".join(f"{title}\n\n{markdown_pieces[title]}" for title in order)


def write_output(markdown: str, dest: str) -> None:
    if dest == "-":
        print(markdown)
    else:
        path = pathlib.Path(dest)
        path.write_text(markdown, encoding="utf-8")
        log(f"✅ Wrote Markdown to {path.resolve()}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate GitBook-style Markdown for Coin Metrics metrics."
    )

    parser.add_argument(
        "--metric-pattern",
        action="append",
        required=True,
        help="Glob matched against metric short_form (repeatable).",
    )
    parser.add_argument(
        "-e",
        "--endpoint",
        action="append",
        required=True,
        choices=list(_DOC_URLS.keys()),
        help="Timeseries endpoint to document (repeatable).",
    )
    parser.add_argument("--example-metric", help="Metric short_form to fetch live API examples for.")
    parser.add_argument(
        "--example-frequency",
        default="1d",
        help="Frequency for example data (e.g., '1d', '1h').",
    )
    parser.add_argument("--example-asset")
    parser.add_argument("--example-exchange")
    parser.add_argument("--example-exchange-asset")
    parser.add_argument("--example-exchange-pair")
    parser.add_argument("--example-market")
    parser.add_argument("--example-pair")
    parser.add_argument("--example-institution")
    parser.add_argument(
        "--api-key", help="Coin Metrics API key (else use CM_API_KEY env var)."
    )
    parser.add_argument(
        "-o",
        "--output",
        default="metrics_selected.md",
        help="Destination file path (use '-' for stdout).",
    )

    return parser.parse_args()


def main() -> None:
    args = parse_args()
    all_metrics = load_metrics()
    selected_metrics = select_metrics(all_metrics, args.metric_pattern)
    if not selected_metrics:
        sys.exit("No metrics matched the given --metric-pattern values.")
    metrics_md = metrics_table_md(selected_metrics)
    client: CoinMetricsClient | None = None
    if args.example_metric:
        api_key = args.api_key or os.getenv("CM_API_KEY")
        if not api_key:
            sys.exit(
                "ERROR: Provide --api-key or set CM_API_KEY environment variable to fetch live examples."
            )
        log("Authenticating Coin Metrics client …")
        client = CoinMetricsClient(api_key)
    coverage_md = coverage_section_md(args.metric_pattern)
    endpoints_md = endpoints_section_md(args.endpoint)
    examples_md = (
        examples_section_md(args.endpoint, args.example_metric, args, client)
        if client
        else PLACEHOLDER
    )
    doc_md = build_document(
        {
            "# Overview": PLACEHOLDER,
            "# Metrics": metrics_md,
            "# Data Sources and Methodology": PLACEHOLDER,
            "# Coverage": coverage_md,
            "# API Endpoints": endpoints_md,
            "# Examples": examples_md,
            "# Frequently Asked Questions": PLACEHOLDER,
        }
    )
    write_output(doc_md, args.output)


if __name__ == "__main__":
    main()
