# Documentation Testing Guide

This repository includes a comprehensive testing suite for documentation quality, structure, and correctness.

## 🚀 Quick Reference

```bash
# First time only: build Docker image
make docker-build

# Run tests
make docker-test

# Auto-fix markdown formatting
make docker-format

# View results
open test-reports/index.html
```

All test output appears in your terminal and results are saved to `test-reports/`.

## Overview

The testing suite validates:

- **Markdown formatting** (markdownlint-cli2)
- **Spelling and prose quality** (Vale)
- **Link validity** (lychee)
- **Code sample syntax** (custom Python validator)
- **GitBook structure** (custom Python validator)
- **Metrics documentation coverage** (custom Python validator)
- **Secrets detection** (Gitleaks)

All tests run in a Docker container with all tools pre-installed - no local installation required.

### Detailed Test Catalog

#### 1. Markdown Linting (markdownlint-cli2)

Validates markdown formatting and style consistency:
- Runs all enabled rules from `.markdownlint.json`
- Currently disabled rules: MD013 (line length), MD033 (inline HTML), MD041 (first line heading)
- Catches common issues: multiple blank lines, missing blank lines around lists, inconsistent heading styles

#### 2. Spelling and Style Checking (Vale)

Checks prose quality and spelling across multiple style guides:
- **Style packages**: Vale, Microsoft, Google, write-good, proselint, Readability
- **Minimum alert level**: suggestion (includes all warnings and errors)
- **Custom vocabulary**: Uses CoinMetrics-specific terms from `.vale/styles/config/vocabularies/`
- Catches: passive voice, unclear wording, jargon, spelling errors, readability issues

#### 3. Link Validation (lychee)

Validates all links in markdown files with two modes:

**Internal Links** (offline mode):
- Validates relative file paths within the repository
- Checks anchor links (#sections) exist in target files
- Fast validation without network requests

**External Links** (online mode):
- Checks HTTP/HTTPS URLs for accessibility
- Configured with 3 retries and 20-second timeout
- Excludes localhost and 127.0.0.1
- Uses realistic user agent to avoid bot blocking

#### 4. Code Sample Syntax Validation (validate_code_samples.py)

Validates syntax of code blocks in markdown files:

**Supported languages**:
- **Python**: AST parsing for syntax errors
- **JavaScript**: esprima parser validation
- **Shell/Bash/Zsh**: bash -n syntax checking
- **R**: Rscript parse validation
- **SQL**: Basic structure validation

**Features**:
- Automatically detects language from code fence tags
- Skips validation for code blocks with "skip-validate" comment
- Reports line numbers and specific syntax errors
- Generates JUnit XML for CI integration

#### 5. GitBook Structure Validation (validate_gitbook.py)

Performs 9 comprehensive checks on GitBook structure:

1. **`.gitbook.yaml` file loads** - Ensures YAML is valid and parseable
2. **No duplicate redirect keys** - Checks for duplicate entries in redirects section
3. **Redirect targets exist** - Verifies all redirect destinations point to real files
4. **SUMMARY.md files exist** - Confirms all files referenced in table of contents exist
5. **No orphaned markdown files** - Finds files not included in SUMMARY.md
6. **Referenced images exist** - Validates all image references point to actual files
7. **No unused images** - Identifies orphaned images in `.gitbook/assets/`
8. **Metrics documented** - Checks that metrics from `coinmetrics/resources/metrics.json` are documented
9. **URL slugs map to files** - Verifies `url_slug_doc` fields in metrics.json point to existing files

**Note**: Metrics checks (8 & 9) require GitLab authentication and are skipped if credentials are unavailable locally.

#### 6. Secrets Detection (Gitleaks)

Scans documentation and code samples for accidentally leaked secrets:

**Detects**:
- **API keys**: Generic API keys, service-specific keys (AWS, Google, Stripe, etc.)
- **Authentication tokens**: Bearer tokens, OAuth tokens, JWT secrets
- **Passwords and credentials**: Database passwords, private keys, SSH keys
- **High-entropy strings**: Randomly generated secrets that match entropy patterns

**Features**:
- 200+ built-in detection patterns from Gitleaks
- Custom rules for Coin Metrics API key formats
- Scans current files only (not git history) for fast execution
- JSON output for easy integration with reporting
- `.gitleaksignore` file for handling false positives

**False Positive Handling**:
- Common placeholders (YOUR_API_KEY, EXAMPLE_KEY) are automatically ignored
- Use `.gitleaksignore` to exclude specific detected strings
- Allowlist patterns in `.gitleaks.toml` for documentation examples

#### 7. Report Generation (generate_report.py)

Consolidates all test results:
- **JUnit XML** (`test-reports/junit.xml`) - Machine-readable format for GitLab CI
- **Interactive HTML Report** (`test-reports/index.html`) - Human-readable with:
  - Severity distribution charts
  - Top 10 most problematic files
  - Most common rule violations
  - Searchable and filterable issue list
  - Dark mode support
  - Copy-to-clipboard for quick fixes

## Quick Start

### Build the Docker Image (First Time Only)

```bash
make docker-build
```

This builds a Docker image with all testing tools pre-installed.

### Run Tests

```bash
# Full test suite
make docker-test

# Quick tests (skip external link checking)
make docker-test-quick

# Verbose output
make docker-test VERBOSE=1
```

Test results are saved to `test-reports/` and you can view the HTML report in your browser.

## How the Docker Image is Built

The Docker image is **built automatically** in the CI pipeline on every commit:

1. When you push a commit, the `build-docs-test` job runs first
2. It builds the Docker image with all testing tools pre-installed
3. The image is tagged and pushed to the GitLab registry
4. The `test_documentation` job then uses this freshly built image

**You don't need to manually build or push the Docker image** - it happens automatically!

### Tool Versions

The Docker image includes the following testing tools (see `Dockerfile` for exact versions):

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 20-slim | Base runtime for JavaScript tools |
| **markdownlint-cli2** | latest (npm) | Markdown formatting and style validation |
| **Vale** | v3.0.0 | Spelling and prose quality checking |
| **lychee** | v0.21.0 | Link validation (internal and external) |
| **Gitleaks** | v8.21.2 | Secrets and API key detection |
| **Python** | 3.x (system) | Runtime for custom validation scripts |
| **R** | r-base (system) | R code syntax validation |
| **Bash** | System default | Shell script syntax validation |

**Python Dependencies** (from `requirements.txt`):
- `PyYAML>=6.0.1` - YAML parsing for .gitbook.yaml
- `markdown-it-py>=3.0.0` - Markdown parsing utilities
- `esprima>=4.0.1` - JavaScript syntax validation
- `junit-xml>=1.9` - JUnit XML report generation
- `requests>=2.31.0` - HTTP requests for metrics validation

The Docker image is built for both `amd64` and `arm64` architectures, automatically detecting and installing the appropriate binaries for Vale and lychee.

## Running Tests

All commands use Docker (no local tool installation needed):

```bash
# Full test suite
make docker-test

# Quick test suite (skip external link checking)
make docker-test-quick

# Verbose mode
make docker-test VERBOSE=1

# Individual tests
docker run --rm -v $(pwd):/workspace docs-test make lint
docker run --rm -v $(pwd):/workspace docs-test make spell
docker run --rm -v $(pwd):/workspace docs-test make check-code
docker run --rm -v $(pwd):/workspace docs-test make check-structure
docker run --rm -v $(pwd):/workspace docs-test make check-secrets
```

## Auto-Fixing Formatting Issues

Some markdown formatting issues can be fixed automatically using markdownlint-cli2's --fix flag:

```bash
# Auto-fix formatting issues in Docker
make docker-format

# View what changed
git diff
```

**What gets auto-fixed:**
- Extra blank lines (MD012)
- Missing blank lines around lists (MD032)
- Inconsistent list marker styles (MD004)
- Trailing whitespace (MD009)
- And other objective formatting rules

**What doesn't get auto-fixed:**
- Spelling errors (Vale)
- Broken links (lychee)
- Code syntax errors
- Content-related issues requiring manual review

**Best practices:**
1. Run `make docker-format` to auto-fix issues
2. Review changes with `git diff` before committing
3. Run `make docker-test` to verify all issues are resolved
4. Manually fix any remaining issues that couldn't be auto-corrected

**Note:** Auto-formatting is a convenience tool, not a replacement for careful review. Always check the changes to ensure they're appropriate.

## Understanding Test Results

### Test Reports Location

All test reports are saved to `test-reports/`:

- `markdownlint.txt` - Markdown linting issues
- `vale.json` - Spelling and style issues
- `lychee-internal.json` - Internal link issues
- `lychee-external.json` - External link issues
- `code-validation.xml` - Code syntax issues (JUnit XML)
- `gitbook-validation.xml` - GitBook structure issues (JUnit XML)
- `gitleaks.json` - Secrets detection results (JSON)
- `junit.xml` - Consolidated JUnit XML for CI
- `index.html` - Human-readable HTML report

### Viewing HTML Report

Open the consolidated report in your browser:

```bash
open test-reports/index.html  # macOS
xdg-open test-reports/index.html  # Linux
```

### Exit Codes

- `0` - All tests passed
- `1` - One or more tests found issues

Note: In CI, tests run with `allow_failure: true`, so they won't block merges but will report issues.

## Common Issues and Fixes

### Markdown Formatting Issues

**Quick fix:** Many markdown formatting issues can be auto-fixed with `make docker-format`. See the "Auto-Fixing Formatting Issues" section above for details.

Below are examples of common issues and how they're fixed:

#### Issue: Line too long (MD013)

**Example:**
```
docs/network-data/README.md:45 MD013/line-length Line length [Expected: 120; Actual: 145]
```

**Fix:**
Break the line into multiple lines (aim for 120 characters max):

```markdown
<!-- Before -->
This is a very long line that exceeds the 120 character limit and needs to be broken up into multiple lines for better readability.

<!-- After -->
This is a very long line that exceeds the 120 character limit and needs to be
broken up into multiple lines for better readability.
```

#### Issue: Multiple blank lines (MD012)

**Example:**
```
docs/index-data/README.md:23 MD012/no-multiple-blanks Multiple consecutive blank lines
```

**Fix:**
Remove extra blank lines (use only one blank line between sections).

#### Issue: Missing blank line before list (MD032)

**Example:**
```
docs/market-data/README.md:67 MD032/blanks-around-lists Lists should be surrounded by blank lines
```

**Fix:**
Add a blank line before and after lists:

```markdown
<!-- Before -->
Here's a list:
- Item 1
- Item 2

<!-- After -->
Here's a list:

- Item 1
- Item 2
```

### Spelling and Style Issues (Vale)

#### Issue: Unknown word

**Example:**
```
docs/api/README.md:12 Vale.Spelling Unknown word: 'blockchain'
```

**Fix Option 1:** If it's a valid technical term, add it to the vocabulary:

```bash
echo "blockchain" >> .vale/styles/config/vocabularies/CoinMetrics/accept.txt
```

**Fix Option 2:** If it's a typo, correct the spelling in the document.

#### Issue: Passive voice suggestion

**Example:**
```
docs/tutorials/README.md:45 write-good.Passive 'was created' may be passive voice
```

**Fix:**
Rewrite in active voice when possible:

```markdown
<!-- Before -->
The index was created by Coin Metrics.

<!-- After -->
Coin Metrics created the index.
```

### Link Issues

#### Issue: Broken internal link

**Example:**
```
Broken link: docs/old-page.md (File not found)
```

**Fix:**
Update the link to point to the correct file or remove it if obsolete.

#### Issue: Broken external link

**Example:**
```
Broken link: https://example.com/old-api (404 Not Found)
```

**Fix:**
Update the URL or remove the link if the resource no longer exists.

#### Issue: Anchor not found

**Example:**
```
Broken link: docs/api/README.md#missing-section (Anchor not found)
```

**Fix:**
Ensure the heading exists in the target file or update the anchor:

```markdown
## Missing Section

Content here...
```

### Code Sample Issues

#### Issue: Python syntax error

**Example:**
```
FAIL: docs/tutorials/python-example.md:25:python
  Error: Line 3: invalid syntax
```

**Fix:**
Correct the Python syntax in the code block:

````markdown
<!-- Before -->
```python
def example()
    print("Missing colon")
```

<!-- After -->
```python
def example():
    print("Fixed!")
```
````

#### Issue: Intentional incomplete examples

If you have intentionally incomplete code examples for illustration, you have two options:

**Option 1:** Don't use a language tag:

````markdown
```
# This won't be validated
incomplete code here...
```
````

**Option 2:** Ensure the code is syntactically valid even if simplified:

````markdown
```python
# Simplified but valid
def example():
    pass  # Implementation details omitted
```
````

### GitBook Structure Issues

#### Issue: Duplicate redirect keys

**Example:**
```
FAIL: Duplicate redirect keys found: old-page, deprecated-api
```

**Fix:**
Remove duplicate entries in `docs/.gitbook.yaml`:

```yaml
redirects:
  old-page: network-data/README.md
  # old-page: market-data/README.md  # Remove duplicate
```

#### Issue: Redirect target not found

**Example:**
```
FAIL: Redirect 'old-api' points to non-existent file: api/v1/README.md
```

**Fix:**
Update the redirect target in `docs/.gitbook.yaml` to an existing file:

```yaml
redirects:
  old-api: api/v2/README.md  # Updated path
```

#### Issue: File in SUMMARY.md doesn't exist

**Example:**
```
FAIL: File referenced in SUMMARY.md does not exist: tutorials/new-guide.md
```

**Fix:**
Either create the missing file or remove the reference from `docs/SUMMARY.md`.

#### Issue: Orphaned markdown file

**Example:**
```
WARN: 42 orphaned markdown files not in SUMMARY.md
  - tutorials/draft-article.md
  - guides/old-content.md
```

**Fix:**
Add the files to `docs/SUMMARY.md` or move them to a `drafts/` folder if they're work-in-progress.

#### Issue: Referenced image doesn't exist

**Example:**
```
FAIL: Referenced image does not exist: .gitbook/assets/missing-diagram.png
```

**Fix:**
Add the missing image or update the markdown reference.

#### Issue: Unused images

**Example:**
```
INFO: 15 unused images in .gitbook/assets/
  - .gitbook/assets/old-screenshot.png
```

**Fix (optional):**
Remove unused images to reduce repository size:

```bash
rm docs/.gitbook/assets/old-screenshot.png
```

#### Issue: Metrics not documented

**Example:**
```
INFO: 450/500 metrics found in documentation
INFO: 50 metric(s) not found in documentation
  - AdrAccCnt
  - BlkCnt
  ...
```

**About this check:**
The validation script fetches `metrics.json` from the `coinmetrics/resources` repository and checks if each metric's `short_form` (e.g., "AdrAccCnt") is mentioned somewhere in the documentation.

**In CI/CD:**
The check runs automatically using `CI_JOB_TOKEN` to access the private `resources` repository. No configuration needed.

**For local testing:**
If you want to run this check locally, you need to provide GitLab credentials:

1. Create a GitLab Personal Access Token:
   - Go to GitLab → User Settings → Access Tokens
   - Create a token with `read_api` scope
   - Copy the token

2. Set the environment variable in your terminal:
   ```bash
   export GITLAB_TOKEN="your_token_here"
   ```

3. Run the validation:
   ```bash
   # Direct Python execution
   python scripts/validate_gitbook.py
   
   # Or via Docker (token is automatically passed to container)
   make docker-test
   ```

**Note:** If no GitLab token is available locally, the metrics check will be skipped with a "SKIPPED" message. This is expected behavior and won't prevent you from running other validations. The Makefile automatically passes `GITLAB_TOKEN` and `CI_JOB_TOKEN` to the Docker container when running `make docker-test`.

**Fix:**
Add documentation for missing metrics in the appropriate markdown files under `docs/`.

### Secrets Detection Issues (Gitleaks)

#### Issue: False positive - documentation placeholder detected

**Example:**
```
FAIL: API key detected in docs/tutorials/api-guide.md:42
  Secret: YOUR_API_KEY_HERE
```

**Fix Option 1:** Add to `.gitleaksignore`:
```bash
echo "YOUR_API_KEY_HERE" >> .gitleaksignore
```

**Fix Option 2:** Update `.gitleaks.toml` allowlist if it's a pattern:
```toml
[allowlist]
regexes = [
  # ... existing patterns ...
  '''YOUR_SPECIFIC_PATTERN''',
]
```

#### Issue: Real secret detected

**Example:**
```
ERROR: API key detected in docs/examples/code-sample.md:15
  Secret: ak_live_1234567890abcdef
```

**Fix:**
1. **Immediately rotate the exposed secret** - change it in your production system
2. Remove the secret from the file
3. Update documentation to use placeholder instead:
   ```markdown
   <!-- Bad -->
   api_key = "ak_live_1234567890abcdef"
   
   <!-- Good -->
   api_key = "YOUR_API_KEY_HERE"
   ```
4. Check git history to ensure secret wasn't committed:
   ```bash
   git log -p -- docs/examples/code-sample.md
   ```
5. If secret was committed, consider using tools like `git-filter-repo` to remove it from history

#### Issue: High-entropy string in legitimate code

**Example:**
```
WARN: Potential secret detected in docs/technical/hash-examples.md:88
  Secret: 5f4dcc3b5aa765d61d8327deb882cf99
```

**Fix:**
If this is a legitimate example (like a hash or UUID), add the specific string to `.gitleaksignore`:
```bash
echo "5f4dcc3b5aa765d61d8327deb882cf99" >> .gitleaksignore
```

**Note:** Only ignore if you're absolutely certain it's not a real secret!

## Configuration Files

### Markdown Linting (.markdownlint.json)

Customize markdown rules:

```json
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}
```

Current configuration disables:
- `MD013` - Line length checking (no maximum line length enforced)
- `MD033` - Inline HTML allowed
- `MD041` - First line doesn't need to be a top-level heading

### Vale (.vale.ini)

Adjust spelling and style checking:

```ini
StylesPath = .vale/styles
MinAlertLevel = suggestion
Vocab = CoinMetrics

Packages = Microsoft, Google, write-good, proselint, Readability

[*.md]
BasedOnStyles = Vale, Microsoft, Google, write-good, proselint, Readability
```

Current configuration uses 6 style packages:
- `Vale` - Core Vale rules
- `Microsoft` - Microsoft Writing Style Guide
- `Google` - Google Developer Documentation Style Guide
- `write-good` - Grammar and readability checks
- `proselint` - Prose linting
- `Readability` - Readability metrics

### Link Checking (lychee.toml)

Configure link validation:

```toml
# Exclude patterns
exclude = [
  "localhost",
  "127.0.0.1"
]

# Network settings
max_retries = 3
timeout = 20
max_concurrency = 10
user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"

# Check behavior
include_verbatim = true

# Cache for faster repeated runs
cache = true
```

Configuration notes:
- Excludes localhost and local IP addresses from checking
- 3 retries with 20-second timeout per link
- Uses realistic user agent to avoid bot blocking
- Caching enabled for faster repeated runs

### Secrets Detection (.gitleaks.toml)

Configure Gitleaks secret detection:

```toml
[extend]
# Use Gitleaks' default ruleset (200+ built-in patterns)
useDefault = true

# Custom rules for Coin Metrics specific patterns
[[rules]]
id = "coinmetrics-api-key"
description = "Coin Metrics API Key"
regex = '''(?i)(api[_-]?key\s*[=:]\s*['"]?[a-zA-Z0-9]{15,30}['"]?)'''

[allowlist]
description = "Global allowlist for false positives"
regexes = [
  # Common placeholder patterns in documentation
  '''(?i)(YOUR[_-]?API[_-]?KEY|API[_-]?KEY[_-]?HERE)''',
  '''<API_KEY>''',
]
paths = [
  # Skip test report files
  '''test-reports/''',
]
```

Configuration notes:
- Extends Gitleaks default rules (200+ patterns)
- Custom rules can be added for specific API key formats
- Allowlist supports regex patterns and file paths
- Scans files only (not git history) for speed

### False Positive Management (.gitleaksignore)

Add specific detected secrets that are safe to ignore:

```
# Format: one secret string per line
# Only add strings you're absolutely certain are not real secrets

# Example placeholders
YOUR_API_KEY_HERE
example-key-12345
```

**Warning:** Be extremely careful when adding entries. Only ignore strings that are:
- Documentation placeholders
- Public example keys from official documentation
- Test fixtures that contain no real credentials

## CI/CD Integration

Tests run automatically in GitLab CI on every commit.

### Automated Docker Build

The Docker image is built automatically in CI. You don't need to build or push it manually.

### GitLab CI Pipeline

The pipeline has three stages:

1. **Build Stage** - Builds the Docker image with all testing tools and layer caching
2. **Test Stage** - Runs the full test suite using the freshly built image
3. **Update Docs Stage** - Manual job to sync tutorial docs from `cm_demo_assets` repository

Configuration in `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - test
  - update_docs

build-docs-test:
  image: docker:27.0.3
  stage: build
  services:
    - docker:27.0.3-dind
  before_script:
    - docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
  script:
    # Pull previous image for cache (speeds up builds)
    - docker pull $CI_REGISTRY_IMAGE/docs-test:latest || true
    # Build with layer caching
    - docker build --cache-from $CI_REGISTRY_IMAGE/docs-test:latest -t $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_SHA -t $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_REF_SLUG -t $CI_REGISTRY_IMAGE/docs-test:latest .
    # Push all tags to registry
    - docker push $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_REF_SLUG
    - docker push $CI_REGISTRY_IMAGE/docs-test:latest
  tags:
    - svc-docker

test_documentation:
  stage: test
  image: $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_SHA
  script:
    - make test
  artifacts:
    when: always
    reports:
      junit: test-reports/junit.xml
    paths:
      - test-reports/
    expire_in: 30 days
  allow_failure: true
  tags:
    - svc-docker

update_tutorials:
  stage: update_docs
  image: alpine:latest
  script:
    # Syncs tutorial markdown and assets from cm_demo_assets repository
    # Creates merge request automatically if changes detected
  when: manual
  tags:
    - svc-docker
```

**Pipeline Features:**
- **Layer caching**: Pulls previous image to speed up Docker builds
- **Multi-tag strategy**: Tags images with commit SHA, branch name, and latest
- **Automatic testing**: Tests run on every commit
- **Non-blocking**: Tests marked as `allow_failure: true` (report issues but don't block merges)
- **30-day artifacts**: Test reports retained for historical analysis
- **Manual tutorial sync**: `update_tutorials` job runs on-demand to sync external content

### Viewing Results in GitLab

1. Go to your merge request
2. Click on the "Test Results" tab
3. View detailed results by clicking on failed tests
4. Download the HTML report from the artifacts

## Troubleshooting

### Docker image not found

Build the Docker image locally:
```bash
make docker-build
```

### Docker permission errors

On Linux, you may need to run Docker with sudo or add your user to the docker group:
```bash
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect
```

### Test reports not appearing

Ensure you're running from the repository root directory where the `test-reports/` folder will be created.

### "Cannot connect to Docker daemon"

Make sure Docker is running:
```bash
# macOS
open -a Docker

# Linux
sudo systemctl start docker
```

## Contributing

When adding new documentation:

1. Run `make docker-test-quick` locally before committing
2. Fix any issues reported
3. Commit and push
4. Check CI test results in your merge request

## Getting Help

- Check this guide for common issues
- Review test reports in `test-reports/index.html`
- Run tests with `VERBOSE=1` for detailed output

