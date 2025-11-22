# Documentation Testing Guide

This repository includes a comprehensive testing suite for documentation quality, structure, and correctness.

## 🚀 Quick Reference

```bash
# First time only: build Docker image
make docker-build

# Run tests
make docker-test

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

All tests run in a Docker container with all tools pre-installed - no local installation required.

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
```

## Understanding Test Results

### Test Reports Location

All test reports are saved to `test-reports/`:

- `markdownlint.txt` - Markdown linting issues
- `vale.json` - Spelling and style issues
- `lychee-internal.json` - Internal link issues
- `lychee-external.json` - External link issues
- `code-validation.xml` - Code syntax issues (JUnit XML)
- `gitbook-validation.xml` - GitBook structure issues (JUnit XML)
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

## Configuration Files

### Markdown Linting (.markdownlint.json)

Customize markdown rules:

```json
{
  "default": true,
  "MD013": { "line_length": 120 },
  "MD033": false,
  "MD041": false
}
```

### Vale (.vale.ini)

Adjust spelling and style checking:

```ini
StylesPath = .vale/styles
MinAlertLevel = suggestion
Vocab = CoinMetrics

[*.md]
BasedOnStyles = Vale, write-good
```

### Link Checking (lychee.toml)

Configure link validation:

```toml
exclude = [
  "localhost",
  "127.0.0.1",
  "^file://",
]

max_retries = 3
timeout = 20
```

## CI/CD Integration

Tests run automatically in GitLab CI on every commit.

### Automated Docker Build

The Docker image is built automatically in CI. You don't need to build or push it manually.

### GitLab CI Pipeline

The pipeline has two stages:

1. **Build Stage** - Builds the Docker image with all testing tools
2. **Test Stage** - Runs the full test suite using the freshly built image

Configuration in `.gitlab-ci.yml`:

```yaml
build-docs-test:
  stage: build
  image: docker:27.0.3
  services:
    - docker:27.0.3-dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE/docs-test:$CI_COMMIT_SHA

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
```

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
- Ask in #documentation channel for assistance

