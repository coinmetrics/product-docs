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
    _strip_grids_in_tree(STAGED_SOURCE)
    _strip_toctrees_in_tree(STAGED_SOURCE)
    _convert_admonitions_in_tree(STAGED_SOURCE)
    _write_overlay_conf(STAGED_SOURCE / "conf.py")


def _patch_index_toctree(index_path: Path) -> None:
    """Point the landing toctree at the staged ``releases/changelog`` page."""
    text = index_path.read_text()
    text = text.replace("releases/CHANGELOG", "releases/changelog")
    index_path.write_text(text)


# Matches a sphinx-design ``::::{grid}`` block (4 colons) wrapping one or
# more ``:::{grid-item-card}`` (3 colons) entries. The grid is rendered by
# pydata-sphinx-theme as visual landing cards, but in GitBook it would just
# duplicate the navigation already shown in the left sidebar (see
# SUMMARY.md), so we drop the entire block at the source-text level before
# Sphinx parses it.
_GRID_BLOCK_RE = re.compile(
    r"\n?^::::\{grid\}[^\n]*\n.*?^::::\s*$",
    re.DOTALL | re.MULTILINE,
)


def _strip_grids_in_tree(root: Path) -> None:
    """Remove every ``{grid}`` block from Markdown files under ``root``."""
    for md in root.rglob("*.md"):
        text = md.read_text()
        new_text = _GRID_BLOCK_RE.sub("", text)
        if new_text != text:
            md.write_text(new_text)


# Matches a MyST ``{toctree}`` directive. ``sphinx_markdown_builder`` lowers
# these to bullet lists in the rendered output, which duplicates the GitBook
# left sidebar driven by SUMMARY.md. Strip them at the source so the
# rendered pages stay focused on prose + autodoc reference content.
_TOCTREE_BLOCK_RE = re.compile(
    r"\n?^```\{toctree\}.*?^```\s*$",
    re.DOTALL | re.MULTILINE,
)


def _strip_toctrees_in_tree(root: Path) -> None:
    """Remove every ``{toctree}`` block from Markdown files under ``root``."""
    for md in root.rglob("*.md"):
        text = md.read_text()
        new_text = _TOCTREE_BLOCK_RE.sub("", text)
        if new_text != text:
            md.write_text(new_text)


# After stripping grid and toctree blocks, some pages are left with section
# headings (``## Explore the Docs``) that no longer have any body. Remove
# such empty sections so they do not show up as blank entries in the
# rendered output.
#
# The match is intentionally restrictive: we only strip a heading whose body
# is empty *and* whose next heading is at the same or shallower level. That
# preserves the common pattern of an H2 that introduces a group of H3s
# without any prose of its own (e.g. the ``## Transport and client errors``
# header in reference/exceptions.md).
_HEADING_RE = re.compile(r"^(?P<hashes>#{1,6})\s+([^\n]+)$", re.MULTILINE)


def _strip_empty_sections(text: str) -> str:
    while True:
        headings = list(_HEADING_RE.finditer(text))
        if not headings:
            return text
        removed = False
        for idx, match in enumerate(headings):
            level = len(match.group("hashes"))
            if level < 2:
                continue
            body_start = match.end() + 1  # skip newline after heading
            if idx + 1 < len(headings):
                next_match = headings[idx + 1]
                next_level = len(next_match.group("hashes"))
                body = text[body_start:next_match.start()]
            else:
                next_level = 0  # treat EOF as "shallower" so trailing
                                # empty sections are also stripped
                body = text[body_start:]
            if next_level > level:
                # The next heading is a child of this one, so this heading
                # is acting as a section label even if it has no prose.
                continue
            if body.strip():
                continue
            # Strip the heading line and the blank lines that follow.
            text = text[: match.start()] + text[
                next_match.start() if idx + 1 < len(headings) else len(text):
            ]
            removed = True
            break
        if not removed:
            return text


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
for code in ("toc.not_included", "myst.xref_missing", "ref.doc", "toc.excluded"):
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

    # Replace the upstream group renderer with one that skips the
    # ``.. autosummary::`` table at the top. The autosummary table is a
    # condensed TOC of every method on the page and duplicates both the
    # GitBook right-hand anchor list and the per-method headings emitted
    # below it by ``.. automethod::``. Dropping it keeps the page focused on
    # the actual reference content.
    class_name = module.CLASS_NAME

    def _render_group_no_autosummary(group) -> str:  # type: ignore[no-untyped-def]
        underline = "=" * len(group.label)
        header = (
            f"{group.label}\n{underline}\n\n"
            f".. currentmodule:: coinmetrics.api_client\n\n"
        )
        auto_methods = "\n".join(
            f".. automethod:: {class_name}.{name}" for name in group.methods
        )
        return header + auto_methods + "\n"

    module._render_group = _render_group_no_autosummary
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

# Autodoc emits headings like ``### *class* coinmetrics._x.Foo(arg1, arg2)``
# or ``#### Foo.bar(arg=1)``. To match the pydata-sphinx-theme look, where the
# fully-qualified signature is rendered in a monospace box, we wrap the
# signature portion in backticks. The kind keywords ``*class*`` /
# ``*exception*`` / ``*property*`` are kept as italics outside the backticks
# so they still read as labels rather than code.
_AUTODOC_KIND_HEADING_RE = re.compile(
    r"^(?P<hashes>#{2,5})\s+"
    r"(?P<kind>\*(?:class|exception|function|method|staticmethod|classmethod|"
    r"abstractmethod|property|attribute|data)\*)\s+"
    r"(?P<sig>[\w\.][^\n]*?)\s*$",
    re.MULTILINE,
)
_AUTODOC_PLAIN_HEADING_RE = re.compile(
    # Headings whose entire payload is a Python identifier path optionally
    # followed by a parenthesised signature -- these are also autodoc method
    # rows (``#### Foo.bar(arg=1)`` or ``#### Foo.bar``). We require either a
    # dotted name or a parenthesised argument list so we do not mangle plain
    # prose section headers like ``## Endpoints``.
    r"^(?P<hashes>#{2,5})\s+"
    r"(?P<sig>[A-Za-z_]\w*(?:\.\w+)+(?:\([^\n]*\))?|[A-Za-z_]\w*\([^\n]*\))\s*$",
    re.MULTILINE,
)


def _unescape_sig(sig: str) -> str:
    """Drop the ``\\*`` / ``\\_`` escapes the markdown builder injects.

    These escapes are needed in plain Markdown so ``**kwargs`` does not
    render as bold, but inside a code span they would render literally.
    """
    return sig.replace("\\*", "*").replace("\\_", "_")


def _wrap_kind_heading(match: re.Match[str]) -> str:
    sig = _unescape_sig(match.group("sig"))
    return f"{match.group('hashes')} {match.group('kind')} `{sig}`"


def _wrap_plain_heading(match: re.Match[str]) -> str:
    sig = match.group("sig")
    # Leave headings that already use code spans (``#### `Foo.bar```) alone.
    if sig.startswith("`"):
        return match.group(0)
    sig = _unescape_sig(sig)
    return f"{match.group('hashes')} `{sig}`"


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

    # Drop section headings whose body was removed by earlier processing
    # (e.g. ``## Explore the Docs`` after the grid block beneath it was
    # stripped from the source). Done before the autodoc-heading rewrites
    # below so we do not match against a heading that is about to be
    # wrapped in backticks.
    text = _strip_empty_sections(text)

    # Wrap autodoc signature headings in backticks so the fully-qualified
    # class / function / method name renders in a monospace face, matching
    # the pydata-sphinx-theme look. Only apply to the reference tree -- the
    # narrative pages have ordinary headings we should not touch.
    try:
        rel_to_root = path.relative_to(OUTPUT_ROOT).as_posix()
    except ValueError:
        rel_to_root = ""
    if rel_to_root.startswith("reference/"):
        text = _AUTODOC_KIND_HEADING_RE.sub(_wrap_kind_heading, text)
        text = _AUTODOC_PLAIN_HEADING_RE.sub(_wrap_plain_heading, text)

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
