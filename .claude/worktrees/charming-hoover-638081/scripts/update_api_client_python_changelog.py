#!/usr/bin/env python3
"""Keep ``spaces/api-client-python/docs/releases/changelog.md`` in sync with
upstream ``api-client-python`` releases.

Background
----------
The Python API client lives in a separate GitLab project pulled in here as
the ``submodules/api-client-python`` git submodule. Every code change in
that repo requires upstream approval before merging, and the package
version is a deploy-time timestamp (e.g., ``2026.4.30.17``). That makes
its own ``CHANGELOG.md`` painful to keep current, so this knowledge-base
repo has taken ownership of the rendered changelog at
``spaces/api-client-python/docs/releases/changelog.md`` (see
``scripts/build_api_client_python_docs.py``: ``REPO_CHANGELOG``).

This script is the watchdog for that hand-maintained file. It:

1. Inspects the upstream default branch (no submodule update required) to
   find the most recent ``Release version X`` commit and lists every
   non-release commit between that release and the previous one.
2. Reads the top-most ``## <version>`` heading in the in-repo changelog.
3. If the two versions match, exits 0 silently -- nothing to do.
4. Otherwise, writes a stub entry to the in-repo changelog and exits 0.
   The companion CI job (``update_python_api_client_changelog`` in
   ``.gitlab-ci.yml``) is responsible for committing the diff and
   opening an MR that mentions @victoreram.

The script is intentionally side-effect-light (single file mutation, no
git commands besides a single ``ls-remote`` / ``log`` against a shallow
clone) so it can be unit-tested and rerun safely.

Note for future contributors (including AI agents): when refining the
auto-generated stub into a polished entry, follow the wording rules
embedded as an HTML comment near the top of
``spaces/api-client-python/docs/releases/changelog.md``. In short: lead
each bullet with the user-visible impact, then describe the change; do
not include internal ticket identifiers (``PLAT-``, ``MD-``,
``CYBERSEC-``); endpoint additions can simply name the new endpoints.
"""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import List, Optional, Tuple


REPO_ROOT = Path(__file__).resolve().parents[1]
CHANGELOG_PATH = (
    REPO_ROOT / "spaces" / "api-client-python" / "docs" / "releases" / "changelog.md"
)
DEFAULT_REMOTE = "https://gitlab.com/coinmetrics/data-delivery/api-client-python.git"
DEFAULT_BRANCH = "master"

RELEASE_SUBJECT_RE = re.compile(
    r"^Release version (?P<version>\d+\.\d+\.\d+\.\d+)(?:\s+\[skip ci\])?\s*$"
)
TOP_HEADING_RE = re.compile(r"^## (?P<version>\d+\.\d+\.\d+\.\d+)\s*$", re.MULTILINE)


def _run(cmd: List[str], cwd: Optional[Path] = None) -> str:
    result = subprocess.run(
        cmd,
        cwd=str(cwd) if cwd else None,
        check=True,
        text=True,
        capture_output=True,
    )
    return result.stdout


def _authenticated_remote(remote: str, token: Optional[str]) -> str:
    """Inject an OAuth token into the HTTPS remote, if provided.

    Mirrors the auth pattern used by the ``rebuild_python_api_client_docs``
    job: a CI variable holds a deploy/read token for the upstream repo.
    """
    if not token:
        return remote
    if remote.startswith("https://oauth2:"):
        return remote
    if remote.startswith("https://"):
        return remote.replace("https://", f"https://oauth2:{token}@", 1)
    return remote


def fetch_release_info(
    remote: str, branch: str, token: Optional[str]
) -> Tuple[str, str, List[str]]:
    """Return ``(latest_version, latest_sha, work_subjects)``.

    ``work_subjects`` is the list of non-release commit subjects between
    the latest release and the previous one (newest first). It can be
    empty for back-to-back release commits.
    """
    auth_remote = _authenticated_remote(remote, token)
    with tempfile.TemporaryDirectory() as tmp:
        clone_dir = Path(tmp) / "api-client-python"
        # Shallow clone is enough; we only need the latest few release
        # commits. ``--filter=blob:none`` further trims download size:
        # we never need file contents, only commit metadata.
        _run(
            [
                "git",
                "clone",
                "--filter=blob:none",
                "--no-checkout",
                "--single-branch",
                "--branch",
                branch,
                "--depth",
                "200",
                auth_remote,
                str(clone_dir),
            ]
        )
        log = _run(
            ["git", "log", "--pretty=format:%H%x09%s", branch],
            cwd=clone_dir,
        )

    entries: List[Tuple[str, str]] = []
    for line in log.splitlines():
        if not line.strip():
            continue
        sha, subject = line.split("\t", 1)
        entries.append((sha, subject))

    latest_version: Optional[str] = None
    latest_sha: Optional[str] = None
    work_subjects: List[str] = []
    for sha, subject in entries:
        match = RELEASE_SUBJECT_RE.match(subject)
        if match:
            if latest_version is None:
                latest_version = match.group("version")
                latest_sha = sha
                continue
            # Hit the previous release -- stop accumulating work subjects.
            break
        if latest_version is not None:
            work_subjects.append(subject)

    if latest_version is None or latest_sha is None:
        raise SystemExit(
            f"No 'Release version X' commits found in the last 200 commits of "
            f"{remote}@{branch}; bump --depth in fetch_release_info."
        )
    return latest_version, latest_sha, work_subjects


def read_top_changelog_version(path: Path) -> Optional[str]:
    if not path.is_file():
        return None
    text = path.read_text()
    match = TOP_HEADING_RE.search(text)
    return match.group("version") if match else None


def render_stub_entry(version: str, sha: str, work_subjects: List[str]) -> str:
    """Render the placeholder entry that gets prepended to the changelog.

    Format mirrors the rest of the file (``## <version>`` then a single
    ``### Changed`` section) so the diff is small and easy to refine in
    review. The HTML comment is a clear flag for reviewers that this was
    machine-generated and needs human triage before merging.
    """
    lines = [
        f"## {version}",
        "",
        f"<!-- Auto-generated stub for upstream commit {sha[:7]}; refine before merging. -->",
        "",
        "### Changed",
        "",
    ]
    if work_subjects:
        for subject in work_subjects:
            lines.append(f"- {subject}")
    else:
        lines.append("- Internal release; no user-facing changes detected.")
    lines.append("")
    return "\n".join(lines)


def prepend_entry(changelog_path: Path, entry: str) -> None:
    text = changelog_path.read_text()
    # Insert immediately after the top-level ``# Changelog`` heading and
    # its trailing blank line. This keeps the H1 anchored at line 1 and
    # the new entry as the new top section.
    header_match = re.match(r"(# Changelog\s*\n+)", text)
    if not header_match:
        raise SystemExit(
            f"{changelog_path} does not start with a '# Changelog' heading; "
            "refusing to prepend without a known anchor."
        )
    header = header_match.group(1)
    body = text[len(header):]
    changelog_path.write_text(header + entry + "\n" + body)


def parse_args(argv: List[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--remote",
        default=os.environ.get("API_CLIENT_PYTHON_REMOTE", DEFAULT_REMOTE),
        help=(
            "Upstream HTTPS remote to inspect. Defaults to the public "
            "GitLab URL; override via $API_CLIENT_PYTHON_REMOTE for "
            "mirrors or testing."
        ),
    )
    parser.add_argument(
        "--branch",
        default=os.environ.get("API_CLIENT_PYTHON_BRANCH", DEFAULT_BRANCH),
        help="Default branch to inspect (default: master).",
    )
    parser.add_argument(
        "--token-env",
        default="PYTHON_API_CLIENT_READ_TOKEN",
        help=(
            "Name of the env var holding the OAuth token for the upstream "
            "repo. Same default as the rebuild_python_api_client_docs job."
        ),
    )
    parser.add_argument(
        "--changelog",
        type=Path,
        default=CHANGELOG_PATH,
        help="Path to the in-repo changelog file.",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help=(
            "Do not modify the changelog. Print the diagnosis and exit 0 "
            "if in-sync, exit 1 otherwise. Useful for read-only CI jobs."
        ),
    )
    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv if argv is not None else sys.argv[1:])
    token = os.environ.get(args.token_env)

    upstream_version, upstream_sha, work_subjects = fetch_release_info(
        args.remote, args.branch, token
    )
    local_version = read_top_changelog_version(args.changelog)

    print(f"Upstream latest release: {upstream_version} ({upstream_sha[:7]})")
    print(f"Changelog top entry:     {local_version}")

    if local_version == upstream_version:
        print("Changelog is up to date.")
        return 0

    if args.check:
        print(
            "Changelog is OUT OF SYNC: "
            f"upstream {upstream_version} not present.",
            file=sys.stderr,
        )
        return 1

    entry = render_stub_entry(upstream_version, upstream_sha, work_subjects)
    prepend_entry(args.changelog, entry)
    print(f"Prepended stub entry for {upstream_version} to {args.changelog}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
