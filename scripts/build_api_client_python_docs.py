#!/usr/bin/env python3
"""Build the api-client-python GitBook space.

This orchestrator wraps Sphinx so that the MyST-Markdown + RST sources in
``submodules/api-client-python/docs/source`` are rendered to GitBook-native
Markdown under ``spaces/api-client-python/docs``.

It deliberately leaves the submodule untouched. Instead, it:

1. Stages the submodule's ``docs/source`` tree into ``.docs-build/source``.
2. Runs the submodule's ``_generate_groups.py`` to (re)create the per-endpoint
   reference pages, with its module-level ``REPO_ROOT`` and ``OUTPUT_DIR``
   monkey-patched to the staged paths so nothing is written into the submodule
   working tree.
3. Drops in an overlay ``conf.py`` that re-exports the submodule conf and
   appends ``sphinx_markdown_builder`` to ``extensions``.
4. Invokes ``sphinx-build -b markdown`` against the staged source.
5. Post-processes the generated Markdown:
   - rewrites ``.html`` links to ``.md``
   - strips residual ``{toctree}`` and ``{eval-rst}`` fences
   - converts ``{grid-item-card}`` blocks to GitBook-friendly bullet lists
   - rewrites ``_static/images/...`` references to ``.gitbook/assets/...``
   - copies image assets into ``spaces/api-client-python/docs/.gitbook/assets``

The committed ``SUMMARY.md`` and ``.gitbook.yaml`` are left in place; only
the rendered content pages are overwritten.
"""

from __future__ import annotations

import argparse
import importlib.util
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Iterable, List


REPO_ROOT = Path(__file__).resolve().parents[1]
SUBMODULE_ROOT = REPO_ROOT / "submodules" / "api-client-python"
SUBMODULE_DOCS_SOURCE = SUBMODULE_ROOT / "docs" / "source"
SUBMODULE_CHANGELOG = SUBMODULE_ROOT / "CHANGELOG.md"

STAGING_ROOT = REPO_ROOT / ".docs-build" / "api-client-python"
STAGED_SOURCE = STAGING_ROOT / "source"
STAGED_BUILD = STAGING_ROOT / "build"

OUTPUT_ROOT = REPO_ROOT / "spaces" / "api-client-python" / "docs"
OUTPUT_ASSETS = OUTPUT_ROOT / ".gitbook" / "assets"

# Files in OUTPUT_ROOT that are committed by hand and must survive a clean
# rebuild. Everything else under OUTPUT_ROOT is owned by this script.
PRESERVED_PATHS = {
    "SUMMARY.md",
    ".gitbook.yaml",
    ".gitbook",
}

GROUP_PAGES = [
    ("catalog-v2", "Catalog v2"),
    ("timeseries", "Time Series"),
    ("reference-data", "Reference Data"),
    ("security-master", "Security Master"),
    ("taxonomy", "Taxonomy"),
    ("asset-profiles", "Asset Profiles"),
    ("constituents", "Constituents"),
    ("blockchain-data", "Blockchain Data"),
    ("blockchain-metadata", "Blockchain Metadata"),
]

# Source-relative path -> output-relative path. Pages not listed are emitted
# at the same relative location (with name normalisation underscore->dash).
PAGE_RENAMES = {
    "index.md": "README.md",
    "user-guide/index.md": "user-guide/README.md",
    "reference/api_client.md": "reference/README.md",
    "reference/coinmetricsclient.md": "reference/coinmetricsclient.md",
    "reference/data_collection.md": "reference/data-collection.md",
    "reference/parallel_data_collection.md": "reference/parallel-data-collection.md",
    "reference/cm_stream.md": "reference/cm-stream.md",
    "reference/exceptions.md": "reference/exceptions.md",
    "releases/changelog.md": "releases/changelog.md",
}

# Generated group pages are nested under reference/coinmetricsclient/.
for slug, _label in GROUP_PAGES:
    PAGE_RENAMES[f"reference/groups/{slug}.md"] = f"reference/coinmetricsclient/{slug}.md"


# ---------------------------------------------------------------------------
# Staging
# ---------------------------------------------------------------------------


def _wipe(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)


def stage_source() -> None:
    """Copy the submodule docs source into the staging root."""
    if not SUBMODULE_DOCS_SOURCE.is_dir():
        raise SystemExit(
            f"Cannot find submodule docs source at {SUBMODULE_DOCS_SOURCE}. "
            "Did you run `git submodule update --init --recursive`?"
        )
    _wipe(STAGING_ROOT)
    STAGING_ROOT.mkdir(parents=True)
    shutil.copytree(SUBMODULE_DOCS_SOURCE, STAGED_SOURCE)

    # Bring in the CHANGELOG so the toctree entry "releases/CHANGELOG"
    # resolves. The Sphinx myst-parser does not need a file extension on
    # toctree references, so we expose the changelog at releases/changelog.md
    # and patch the toctree below.
    releases_dir = STAGED_SOURCE / "releases"
    releases_dir.mkdir(exist_ok=True)
    if SUBMODULE_CHANGELOG.is_file():
        shutil.copy2(SUBMODULE_CHANGELOG, releases_dir / "changelog.md")

    _patch_index_toctree(STAGED_SOURCE / "index.md")
    _convert_grids_in_tree(STAGED_SOURCE)
    _convert_admonitions_in_tree(STAGED_SOURCE)
    _write_overlay_conf(STAGED_SOURCE / "conf.py")


def _patch_index_toctree(index_path: Path) -> None:
    """Point the landing toctree at the staged ``releases/changelog`` page."""
    text = index_path.read_text()
    text = text.replace("releases/CHANGELOG", "releases/changelog")
    index_path.write_text(text)


# Matches a sphinx-design ``::::{grid}`` block (4 colons) wrapping one or more
# ``:::{grid-item-card}`` (3 colons) entries. ``sphinx_markdown_builder``
# does not know how to render either directive, so we lower them to plain
# Markdown bullet lists *before* Sphinx parses them. Doing the conversion at
# the source-text level (rather than post-processing the rendered output)
# preserves the card titles and ``:link:`` targets, which the markdown
# builder otherwise drops on the floor.
_GRID_BLOCK_RE = re.compile(
    r"^::::\{grid\}[^\n]*\n(?P<body>.*?)^::::\s*$",
    re.DOTALL | re.MULTILINE,
)
_GRID_ITEM_DIRECTIVE_RE = re.compile(
    r":::\{grid-item-card\}\s+(?P<title>[^\n]+)\n(?P<body>.*?):::",
    re.DOTALL,
)


def _convert_grid_block(match: re.Match[str]) -> str:
    """Lower a ``{grid}`` directive to a plain Markdown bullet list."""
    items: List[str] = []
    for item in _GRID_ITEM_DIRECTIVE_RE.finditer(match.group(0)):
        title = item.group("title").strip()
        body_text = item.group("body")
        link = ""
        body_lines: List[str] = []
        in_options = True
        for line in body_text.splitlines():
            stripped = line.strip()
            if in_options and stripped.startswith(":link:"):
                link = stripped.split(":", 2)[-1].strip()
                continue
            if in_options and stripped.startswith(":link-type:"):
                continue
            if in_options and stripped.startswith(":") and stripped.endswith(":"):
                # Other sphinx-design options like ``:gutter: 3`` -- skip.
                continue
            if stripped:
                in_options = False
            body_lines.append(line)
        description = " ".join(
            line.strip() for line in body_lines if line.strip()
        )
        if link and "://" not in link and not link.endswith(".md"):
            # ``:link-type: doc`` references are extension-less; add ``.md`` so
            # the markdown builder leaves them alone (it would otherwise try
            # to resolve them as RST cross-references).
            link = f"{link}.md"
        title_md = f"[**{title}**]({link})" if link else f"**{title}**"
        if description:
            items.append(f"- {title_md} -- {description}")
        else:
            items.append(f"- {title_md}")
    if not items:
        return ""
    return "\n".join(items) + "\n"


def _convert_grids_in_tree(root: Path) -> None:
    """Apply ``_convert_grid_block`` to every Markdown file under ``root``."""
    for md in root.rglob("*.md"):
        text = md.read_text()
        new_text = _GRID_BLOCK_RE.sub(_convert_grid_block, text)
        if new_text != text:
            md.write_text(new_text)


# MyST admonition directives -> GitBook hint blocks. ``sphinx_markdown_builder``
# silently drops most admonitions ("unknown node type: <tip: ...>"), so we
# convert them to GitBook's native ``{% hint %}`` markup before Sphinx sees
# them. The mapping covers the standard MyST directives that share semantics
# with GitBook's four hint styles.
_ADMONITION_STYLES = {
    "tip": "info",
    "note": "info",
    "hint": "info",
    "important": "info",
    "attention": "warning",
    "caution": "warning",
    "warning": "warning",
    "danger": "danger",
    "error": "danger",
    "seealso": "info",
}
_ADMONITION_RE = re.compile(
    r"^```\{(?P<kind>"
    + "|".join(_ADMONITION_STYLES.keys())
    + r")\}\s*\n(?P<body>.*?)^```\s*$",
    re.DOTALL | re.MULTILINE,
)


def _convert_admonition(match: re.Match[str]) -> str:
    style = _ADMONITION_STYLES[match.group("kind")]
    body = match.group("body").rstrip()
    return f'{{% hint style="{style}" %}}\n{body}\n{{% endhint %}}'


def _convert_admonitions_in_tree(root: Path) -> None:
    """Apply ``_convert_admonition`` to every Markdown file under ``root``."""
    for md in root.rglob("*.md"):
        text = md.read_text()
        new_text = _ADMONITION_RE.sub(_convert_admonition, text)
        if new_text != text:
            md.write_text(new_text)


def _write_overlay_conf(conf_path: Path) -> None:
    """Replace the staged conf.py with an overlay that adds the markdown builder.

    ``sys.path`` is set up so the staged conf can still import the submodule's
    Python package for autodoc. We also disable the ``primary_sidebar_end``
    HTML-only option, which is harmless under the markdown builder but emits
    a warning.
    """
    overlay_template = '''"""Overlay Sphinx configuration for the GitBook markdown build.

This file is generated by scripts/build_api_client_python_docs.py. It re-uses
the upstream configuration from the api-client-python submodule and only adds
``sphinx_markdown_builder`` so the same source tree can be rendered as
GitBook-friendly Markdown.
"""

from __future__ import annotations

import os
import sys

SUBMODULE_SOURCE = __SUBMODULE_SOURCE__
SUBMODULE_ROOT = __SUBMODULE_ROOT__

# Allow autodoc to import the coinmetrics package directly from the submodule.
sys.path.insert(0, SUBMODULE_ROOT)
sys.path.insert(0, SUBMODULE_SOURCE)

# Re-export the upstream Sphinx config (project, extensions, autodoc options,
# myst extensions, intersphinx mappings, ...).
from conf import *  # noqa: F401,F403,E402

# The markdown builder is additive: it consumes the same parsed doctree the
# HTML builder would, including autodoc / sphinx-design / eval-rst output.
extensions = list(globals().get("extensions", []))
if "sphinx_markdown_builder" not in extensions:
    extensions.append("sphinx_markdown_builder")

# Belt-and-suspenders: the HTML theme options carry pydata-sphinx-theme keys
# that the markdown builder does not understand. Keep them but make the
# fallback explicit.
html_theme = globals().get("html_theme", "alabaster")

# Suppress noisy "toctree contains reference to nonexisting document"
# warnings for upstream pages we have not staged (e.g. examples.md).
suppress_warnings = list(globals().get("suppress_warnings", []))
for code in ("toc.not_included", "myst.xref_missing", "ref.doc"):
    if code not in suppress_warnings:
        suppress_warnings.append(code)

# GitBook hint blocks use ASCII double quotes inside ``{%% hint style="info" %%}``,
# so disable Sphinx's smart-quote transform that would otherwise rewrite them
# to curly Unicode quotes.
smartquotes = False
'''
    overlay = (
        overlay_template
        .replace("__SUBMODULE_SOURCE__", repr(str(SUBMODULE_DOCS_SOURCE)))
        .replace("__SUBMODULE_ROOT__", repr(str(SUBMODULE_ROOT)))
    )
    conf_path.write_text(overlay)


# ---------------------------------------------------------------------------
# Group page generation
# ---------------------------------------------------------------------------


def regenerate_group_pages() -> None:
    """Run the upstream ``_generate_groups.py`` against the staged tree.

    The upstream script writes RST files to its own ``groups`` directory and
    derives ``REPO_ROOT`` from ``__file__``. We import it as a module and
    overwrite both module-level constants so it operates on the staged tree
    without touching the submodule.
    """
    src = STAGED_SOURCE / "reference" / "_generate_groups.py"
    if not src.is_file():
        raise SystemExit(f"Missing {src}; staging step did not complete.")

    spec = importlib.util.spec_from_file_location("_acp_generate_groups", src)
    if spec is None or spec.loader is None:
        raise SystemExit(f"Could not load {src}")
    module = importlib.util.module_from_spec(spec)
    # ``@dataclass`` looks up ``cls.__module__`` in ``sys.modules`` while
    # processing the class body, so the module must be registered before
    # exec_module runs.
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)

    # Override the upstream constants so the script reads from the real
    # submodule and writes into the staged source tree.
    module.REPO_ROOT = SUBMODULE_ROOT
    module.API_CLIENT_PATH = SUBMODULE_ROOT / "coinmetrics" / "api_client.py"
    module.OUTPUT_DIR = STAGED_SOURCE / "reference" / "groups"
    module.main()


# ---------------------------------------------------------------------------
# Sphinx build
# ---------------------------------------------------------------------------


def run_sphinx() -> None:
    _wipe(STAGED_BUILD)
    STAGED_BUILD.mkdir(parents=True)
    cmd = [
        sys.executable,
        "-m",
        "sphinx",
        "-b",
        "markdown",
        "-q",
        str(STAGED_SOURCE),
        str(STAGED_BUILD),
    ]
    print("$ " + " ".join(cmd))
    result = subprocess.run(cmd, cwd=str(REPO_ROOT))
    if result.returncode != 0:
        raise SystemExit(f"sphinx-build exited with {result.returncode}")


# ---------------------------------------------------------------------------
# Output assembly
# ---------------------------------------------------------------------------


def reset_output() -> None:
    """Remove generated files from OUTPUT_ROOT but keep committed shell."""
    if not OUTPUT_ROOT.exists():
        OUTPUT_ROOT.mkdir(parents=True)
        return
    for entry in OUTPUT_ROOT.iterdir():
        if entry.name in PRESERVED_PATHS:
            continue
        if entry.is_dir():
            shutil.rmtree(entry)
        else:
            entry.unlink()


def collect_outputs() -> None:
    """Move/rename generated Markdown files into ``OUTPUT_ROOT``."""
    if not STAGED_BUILD.is_dir():
        raise SystemExit(f"Sphinx build directory missing: {STAGED_BUILD}")

    for src in STAGED_BUILD.rglob("*.md"):
        rel = src.relative_to(STAGED_BUILD).as_posix()
        target_rel = PAGE_RENAMES.get(rel)
        if target_rel is None:
            target_rel = rel.replace("_", "-")
            # Drop the staged "groups/" subdirectory if it leaks through.
            if target_rel.startswith("reference/groups/"):
                target_rel = target_rel.replace(
                    "reference/groups/", "reference/coinmetricsclient/", 1
                )
        target = OUTPUT_ROOT / target_rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, target)


def copy_assets() -> None:
    """Mirror static images into the GitBook assets folder."""
    src_dir = SUBMODULE_DOCS_SOURCE / "_static" / "images"
    if not src_dir.is_dir():
        return
    OUTPUT_ASSETS.mkdir(parents=True, exist_ok=True)
    for image in src_dir.iterdir():
        if image.is_file():
            shutil.copy2(image, OUTPUT_ASSETS / image.name)


# ---------------------------------------------------------------------------
# Post-processing
# ---------------------------------------------------------------------------


_RESIDUAL_TOCTREE_RE = re.compile(
    r"^```\{toctree\}.*?^```\s*$",
    re.DOTALL | re.MULTILINE,
)
_RESIDUAL_EVAL_RST_RE = re.compile(
    r"^```\{eval-rst\}.*?^```\s*$",
    re.DOTALL | re.MULTILINE,
)
_STATIC_IMAGE_RE = re.compile(r"_static/images/")

# ``sphinx_markdown_builder`` rewrites every cross-reference to use a ``.md``
# extension, including the intersphinx links that resolve to external HTML
# documentation. Detect and fix the external ones.
_INTERSPHINX_HOSTS = (
    "docs.python.org",
    "pandas.pydata.org",
    "numpy.org",
)
_INTERSPHINX_RE = re.compile(
    r"(\]\(https?://(?:" + "|".join(re.escape(h) for h in _INTERSPHINX_HOSTS) + r")[^)\s]*?)\.md(?=[)#])"
)


def post_process_file(path: Path) -> None:
    text = path.read_text()
    original = text

    # Belt-and-suspenders: ``sphinx_markdown_builder`` consumes ``{toctree}``
    # and ``{eval-rst}`` blocks itself, but if anything slips through (for
    # example because the staged file failed to parse) we strip it here.
    text = _RESIDUAL_TOCTREE_RE.sub("", text)
    text = _RESIDUAL_EVAL_RST_RE.sub("", text)

    # Restore the correct extension on intersphinx URLs the markdown builder
    # mistakenly rewrote to ``.md``.
    text = _INTERSPHINX_RE.sub(r"\1.html", text)

    # The submodule's reference/coinmetricsclient.md toctree points at
    # ``groups/<slug>``. We relocate those generated pages under
    # ``coinmetricsclient/`` so they nest beneath their parent in the GitBook
    # sidebar, so rewrite the parent page's links to match.
    text = re.sub(r"\]\(groups/", "](coinmetricsclient/", text)

    # ``myst-parser`` strips the URL out of links whose target it cannot
    # resolve (e.g. references to documents we have not staged), leaving
    # ``[Label]()``. GitBook would render that as a broken link, so collapse
    # such patterns down to plain text.
    text = re.sub(r"\[([^\]]+)\]\(\)", r"\1", text)

    # The MyST sources reference logos as ``_static/images/...``. The static
    # tree is not copied into the GitBook output, so rewrite to the assets
    # path that GitBook understands. A leading slash makes the reference
    # absolute relative to the space root, which works from any depth.
    text = _STATIC_IMAGE_RE.sub("/.gitbook/assets/", text)

    # Rewrite intra-doc links that refer to the legacy (underscore or
    # ``index.md``) names of files we have renamed via PAGE_RENAMES.
    # We only need to rewrite the *trailing* portion of the link target so
    # we cover both same-directory references (``data_collection.md``) and
    # parent-relative ones (``reference/api_client.md``).
    #
    # Apply longer source names first so ``parallel_data_collection.md`` is
    # matched before ``data_collection.md`` (which is a suffix of it).
    rename_pairs = sorted(
        PAGE_RENAMES.items(),
        key=lambda item: len(Path(item[0]).name),
        reverse=True,
    )
    for src_rel, target_rel in rename_pairs:
        src_name = Path(src_rel).name
        target_name = Path(target_rel).name
        if src_name == target_name:
            continue
        # Anchor on a ``/`` or ``(`` so we don't slice into longer filenames
        # that happen to end with ``src_name`` (e.g. ``parallel_data_collection``
        # -> ``data_collection``).
        pattern = re.compile(
            r"(\]\((?:[^)#\s]*?[/(])?)" + re.escape(src_name) + r"(?=[)#])"
        )
        text = pattern.sub(lambda m, t=target_name: m.group(1) + t, text)
        # Same-directory bare references like ``](data_collection.md)``.
        text = re.sub(
            r"\]\(" + re.escape(src_name) + r"(?=[)#])",
            f"]({target_name}",
            text,
        )

    if text != original:
        path.write_text(text)


def post_process_outputs() -> None:
    for md in OUTPUT_ROOT.rglob("*.md"):
        if md.name == "SUMMARY.md":
            continue
        post_process_file(md)


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--keep-staging",
        action="store_true",
        help="Do not delete .docs-build after the build (useful for debugging).",
    )
    return parser.parse_args(list(argv))


def main(argv: Iterable[str]) -> int:
    args = parse_args(argv)

    print(f"Staging source from {SUBMODULE_DOCS_SOURCE} -> {STAGED_SOURCE}")
    stage_source()
    print("Regenerating per-endpoint group pages")
    regenerate_group_pages()
    print(f"Running sphinx-build (markdown) -> {STAGED_BUILD}")
    run_sphinx()
    print(f"Resetting {OUTPUT_ROOT} (preserving {sorted(PRESERVED_PATHS)})")
    reset_output()
    print("Copying generated Markdown into the GitBook space")
    collect_outputs()
    print("Copying static image assets")
    copy_assets()
    print("Post-processing generated Markdown for GitBook")
    post_process_outputs()

    if not args.keep_staging:
        _wipe(STAGING_ROOT)

    print(f"Done. Output at {OUTPUT_ROOT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
