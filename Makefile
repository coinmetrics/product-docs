.PHONY: help test test-quick lint spell check-links check-links-internal check-links-external check-code check-structure check-secrets report clean format docker-build docker-test docker-test-quick docker-format

# Docker image name
DOCKER_IMAGE ?= docs-test

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
check-links: check-links-internal check-links-external

# Internal links only (fast) - checks relative paths and anchors within docs
check-links-internal:
	@echo "Checking internal documentation links..."
	@mkdir -p test-reports
	-$(QUIET)lychee --config lychee.toml --offline --include-fragments --format json --no-progress "docs/**/*.md" 2>/dev/null > test-reports/lychee-internal.json
	@echo "Note: Internal checking only validates relative file paths. Use check-links-external for HTTP/HTTPS URLs."

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
	docker run --rm -v $(CURDIR):/workspace -e GITLAB_TOKEN=${GITLAB_TOKEN} -e CI_JOB_TOKEN=${CI_JOB_TOKEN} $(DOCKER_IMAGE) make test VERBOSE=$(VERBOSE)
	@echo ""
	@echo "✓ Tests complete. View report at: test-reports/index.html"

docker-test-quick:
	@echo "Running quick tests in Docker container..."
	@echo ""
	docker run --rm -v $(CURDIR):/workspace -e GITLAB_TOKEN=${GITLAB_TOKEN} -e CI_JOB_TOKEN=${CI_JOB_TOKEN} $(DOCKER_IMAGE) make test-quick VERBOSE=$(VERBOSE)
	@echo ""
	@echo "✓ Tests complete. View report at: test-reports/index.html"

docker-format:
	@echo "Auto-fixing Markdown formatting in Docker container..."
	@echo ""
	docker run --rm -v $(CURDIR):/workspace $(DOCKER_IMAGE) make format
	@echo ""
	@echo "✓ Formatting complete. Run 'make docker-test' to verify."

