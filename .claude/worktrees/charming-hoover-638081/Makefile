.PHONY: help test test-quick lint spell check-links check-links-external check-code check-structure check-secrets report clean format docker-build docker-test docker-test-quick docker-format docs-python-client docs-python-client-check docs-python-client-clean docker-docs-python-client docker-docs-python-client-check

# Docker image name
DOCKER_IMAGE ?= docs-test

# Pinned base image for the api-client-python docs build. Must match the
# `image:` field of the verify_python_api_client_docs / rebuild jobs in
# .gitlab-ci.yml so local rebuilds and CI render byte-identical output.
DOCS_PYTHON_IMAGE ?= python:3.11-slim@sha256:6d85378d88a19cd4d76079817532d62232be95757cb45945a99fec8e8084b9c2

# Verbose mode: make test VERBOSE=1
VERBOSE ?= 0

# Redirect output based on verbose mode
ifeq ($(VERBOSE),1)
  REDIRECT = 
  QUIET =
else
  REDIRECT = > /dev/null 2>&1
  QUIET = @
endif

# Default target shows help
help:
	@echo "Documentation Testing Suite"
	@echo ""
	@echo "Usage:"
	@echo "  make docker-build      - Build the Docker image (first time only)"
	@echo "  make docker-test       - Run full test suite"
	@echo "  make docker-test-quick - Run fast tests (skip external link checking)"
	@echo "  make docker-format     - Auto-fix markdown formatting issues"
	@echo "  make clean             - Remove test reports"
	@echo ""
	@echo "Options:"
	@echo "  VERBOSE=1              - Show detailed output"
	@echo ""
	@echo "All tests run in Docker - no local tool installation required."
	@echo ""

# Full test suite (all checks)
test: lint spell check-links check-code check-structure check-secrets report

# Quick test suite (skip slow checks)
test-quick: lint check-code check-structure check-secrets report

# Markdown linting
lint:
	@echo "Running Markdown linting..."
	@mkdir -p test-reports
	-$(QUIET)markdownlint-cli2 "docs/**/*.md" > test-reports/markdownlint.txt 2>&1

# Auto-fix markdown formatting
format:
	@echo "Auto-fixing Markdown formatting..."
	@mkdir -p test-reports
	-$(QUIET)markdownlint-cli2 "docs/**/*.md" --fix
	@echo "✓ Markdown formatting fixes applied. Run 'make test' to verify."

# Spell checking and prose quality
spell:
	@echo "Running Vale spell and style checking..."
	@mkdir -p test-reports
	-$(QUIET)vale sync $(REDIRECT)
	-$(QUIET)vale --output=JSON docs > test-reports/vale.json 2>&1

# Link validation (all links)
check-links: check-links-external

# # Internal links only (fast) - checks relative paths and anchors within docs
# check-links-internal:
# 	@echo "Checking internal documentation links..."
# 	@mkdir -p test-reports
# 	-$(QUIET)lychee --config lychee.toml --offline --include-fragments --format json --no-progress "docs/**/*.md" 2>/dev/null > test-reports/lychee-internal.json
# 	@echo "Note: Internal checking only validates relative file paths. Use check-links-external for HTTP/HTTPS URLs."

# External links (includes all HTTP/HTTPS) - can be slower
check-links-external:
	@echo "Checking all HTTP/HTTPS links..."
	@mkdir -p test-reports
	-$(QUIET)lychee --config lychee.toml --exclude "^file://" --format json --no-progress "docs/**/*.md" 2>/dev/null > test-reports/lychee-external.json

# Code sample syntax validation
check-code:
	@echo "Validating code samples..."
	@mkdir -p test-reports
	-$(QUIET)python3 scripts/validate_code_samples.py --input docs --output test-reports $(REDIRECT)

# GitBook structure validation
check-structure:
	@echo "Validating GitBook structure..."
	@mkdir -p test-reports
	-$(QUIET)python3 scripts/validate_gitbook.py --input docs --output test-reports $(REDIRECT)

# Secrets detection with Gitleaks
check-secrets:
	@echo "Checking for leaked secrets and API keys..."
	@mkdir -p test-reports
	-$(QUIET)gitleaks detect --source=docs/ --config=.gitleaks.toml --report-path=test-reports/gitleaks.json --report-format=json --no-git $(REDIRECT)

# Generate consolidated report
report:
	@echo "Generating consolidated report..."
	-$(QUIET)python3 scripts/generate_report.py $(REDIRECT)
	@echo "Report generated at test-reports/index.html"

# Clean up test artifacts
clean:
	@echo "Cleaning test reports..."
	@rm -rf test-reports/

# Docker commands
docker-build:
	@echo "Building Docker image: $(DOCKER_IMAGE)"
	docker build -t $(DOCKER_IMAGE) .
	@echo "✓ Docker image built successfully"
	@echo ""
	@echo "You can now run tests with:"
	@echo "  make docker-test"

docker-test:
	@echo "Running tests in Docker container..."
	@echo ""
	docker run --rm -v $(CURDIR):/workspace -e GITLAB_TOKEN=${GITLAB_TOKEN} -e CI_JOB_TOKEN=${CI_JOB_TOKEN} -e CM_API_KEY=${CM_API_KEY} $(DOCKER_IMAGE) make test VERBOSE=$(VERBOSE)
	@echo ""
	@echo "✓ Tests complete. View report at: test-reports/index.html"

docker-test-quick:
	@echo "Running quick tests in Docker container..."
	@echo ""
	docker run --rm -v $(CURDIR):/workspace -e GITLAB_TOKEN=${GITLAB_TOKEN} -e CI_JOB_TOKEN=${CI_JOB_TOKEN} -e CM_API_KEY=${CM_API_KEY} $(DOCKER_IMAGE) make test-quick VERBOSE=$(VERBOSE)
	@echo ""
	@echo "✓ Tests complete. View report at: test-reports/index.html"

docker-format:
	@echo "Auto-fixing Markdown formatting in Docker container..."
	@echo ""
	docker run --rm -v $(CURDIR):/workspace $(DOCKER_IMAGE) make format
	@echo ""
	@echo "✓ Formatting complete. Run 'make docker-test' to verify."

# Build the api-client-python GitBook space from the Sphinx + MyST sources
# in submodules/api-client-python/docs/source. Every file under
# spaces/api-client-python/docs is regenerated except .gitbook.yaml so the
# rendered space is fully reproducible from the submodule SHA.
docs-python-client:
	@echo "Building api-client-python GitBook docs..."
	@echo ""
	@echo "First time? Install build dependencies with:"
	@echo "  pip3 install -r scripts/requirements-docs.txt"
	@echo ""
	python3 scripts/build_api_client_python_docs.py
	@echo ""
	@echo "✓ Docs generated at spaces/api-client-python/docs"

# Verify that the committed GitBook space matches what the build pipeline
# would produce against the currently checked-out submodule SHA. Used by
# CI (verify_python_api_client_docs) to block MRs that hand-edit generated
# files or forget to re-run the build.
docs-python-client-check:
	@echo "Verifying api-client-python GitBook docs are in sync with the build..."
	@echo ""
	python3 scripts/build_api_client_python_docs.py --check

# Run the api-client-python docs build inside the exact CI image so the
# rendered output is byte-identical to what verify_python_api_client_docs
# produces. This is the recommended way for contributors to regenerate
# the GitBook space -- using the host Python toolchain risks producing a
# build that drifts from CI (different intersphinx coverage, different
# autodoc rendering, ...) and trips the reproducibility gate on the MR.
docker-docs-python-client:
	@echo "Building api-client-python GitBook docs in $(DOCS_PYTHON_IMAGE)..."
	@echo ""
	docker run --rm -v $(CURDIR):/work -w /work $(DOCS_PYTHON_IMAGE) bash -lc '\
		set -e; \
		apt-get update && apt-get install -y --no-install-recommends git diffutils; \
		pip install --no-cache-dir -r scripts/requirements-docs.txt; \
		pip install --no-cache-dir poetry-core; \
		pip install --no-cache-dir --no-build-isolation -e submodules/api-client-python; \
		python3 scripts/build_api_client_python_docs.py'
	@echo ""
	@echo "✓ Docs generated at spaces/api-client-python/docs"

# Same as docker-docs-python-client but runs the --check reproducibility
# gate instead of writing to spaces/api-client-python/docs. Mirrors the
# CI verify_python_api_client_docs job exactly.
docker-docs-python-client-check:
	@echo "Verifying api-client-python GitBook docs in $(DOCS_PYTHON_IMAGE)..."
	@echo ""
	docker run --rm -v $(CURDIR):/work -w /work $(DOCS_PYTHON_IMAGE) bash -lc '\
		set -e; \
		apt-get update && apt-get install -y --no-install-recommends git diffutils; \
		pip install --no-cache-dir -r scripts/requirements-docs.txt; \
		pip install --no-cache-dir poetry-core; \
		pip install --no-cache-dir --no-build-isolation -e submodules/api-client-python; \
		python3 scripts/build_api_client_python_docs.py --check'

# Remove the generated content while keeping the committed GitBook shell
# (.gitbook.yaml). Also wipes the build staging directory.
docs-python-client-clean:
	@echo "Cleaning generated api-client-python docs..."
	@find spaces/api-client-python/docs -mindepth 1 -maxdepth 1 \
		! -name .gitbook.yaml \
		-exec rm -rf {} +
	@rm -rf .docs-build
	@echo "✓ Generated docs cleared (.gitbook.yaml preserved)"
