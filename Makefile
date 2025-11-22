.PHONY: help test test-quick lint spell check-links check-links-internal check-links-external check-code check-structure report clean docker-build docker-test docker-test-quick

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
	@echo "  make clean             - Remove test reports"
	@echo ""
	@echo "Options:"
	@echo "  VERBOSE=1              - Show detailed output"
	@echo ""
	@echo "All tests run in Docker - no local tool installation required."
	@echo ""

# Full test suite (all checks)
test: lint spell check-links check-code check-structure report

# Quick test suite (skip slow checks)
test-quick: lint check-code check-structure report

# Markdown linting
lint:
	@echo "Running Markdown linting..."
	@mkdir -p test-reports
	$(QUIET)markdownlint-cli2 "docs/**/*.md" > test-reports/markdownlint.txt 2>&1; \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ] && [ $(VERBOSE) -eq 1 ]; then \
		echo "Markdown linting found issues (exit code: $$EXIT_CODE)"; \
		cat test-reports/markdownlint.txt; \
	fi; \
	exit 0

# Spell checking and prose quality
spell:
	@echo "Running Vale spell and style checking..."
	@mkdir -p test-reports
	$(QUIET)vale --output=JSON docs > test-reports/vale.json 2>&1; \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ] && [ $(VERBOSE) -eq 1 ]; then \
		echo "Vale found issues (exit code: $$EXIT_CODE)"; \
		cat test-reports/vale.json; \
	fi; \
	exit 0

# Link validation (all links)
check-links: check-links-internal check-links-external

# Internal links only (fast) - checks relative paths and anchors within docs
check-links-internal:
	@echo "Checking internal documentation links..."
	@mkdir -p test-reports
	$(QUIET)lychee --offline --exclude "localhost" --exclude "127.0.0.1" --format json --no-progress "docs/**/*.md" 2>/dev/null > test-reports/lychee-internal.json; \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ] && [ $(VERBOSE) -eq 1 ]; then \
		echo "Internal link checking found issues (exit code: $$EXIT_CODE)"; \
		cat test-reports/lychee-internal.json; \
	fi; \
	echo "Note: Internal checking only validates relative file paths. Use check-links-external for HTTP/HTTPS URLs."; \
	exit 0

# External links (includes all HTTP/HTTPS) - can be slower
check-links-external:
	@echo "Checking all HTTP/HTTPS links..."
	@mkdir -p test-reports
	$(QUIET)lychee --config lychee.toml --format json --no-progress "docs/**/*.md" 2>/dev/null > test-reports/lychee-external.json; \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ] && [ $(VERBOSE) -eq 1 ]; then \
		echo "External link checking found issues (exit code: $$EXIT_CODE)"; \
		cat test-reports/lychee-external.json; \
	fi; \
	exit 0

# Code sample syntax validation
check-code:
	@echo "Validating code samples..."
	@mkdir -p test-reports
	$(QUIET)python3 scripts/validate_code_samples.py $(REDIRECT); \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ]; then \
		echo "Code validation found issues (exit code: $$EXIT_CODE)"; \
		if [ $(VERBOSE) -eq 1 ] && [ -f test-reports/code-validation.xml ]; then \
			cat test-reports/code-validation.xml; \
		fi; \
	fi; \
	exit 0

# GitBook structure validation
check-structure:
	@echo "Validating GitBook structure..."
	@mkdir -p test-reports
	$(QUIET)python3 scripts/validate_gitbook.py $(REDIRECT); \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ]; then \
		echo "GitBook structure validation found issues (exit code: $$EXIT_CODE)"; \
		if [ $(VERBOSE) -eq 1 ] && [ -f test-reports/gitbook-validation.xml ]; then \
			cat test-reports/gitbook-validation.xml; \
		fi; \
	fi; \
	exit 0

# Generate consolidated report
report:
	@echo "Generating consolidated report..."
	$(QUIET)python3 scripts/generate_report.py $(REDIRECT); \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -ne 0 ]; then \
		echo "Report generation encountered issues (exit code: $$EXIT_CODE)"; \
	else \
		echo "Report generated at test-reports/index.html"; \
	fi; \
	exit 0

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
	docker run --rm -v $(CURDIR):/workspace $(DOCKER_IMAGE) make test VERBOSE=$(VERBOSE)
	@echo ""
	@echo "✓ Tests complete. View report at: test-reports/index.html"

docker-test-quick:
	@echo "Running quick tests in Docker container..."
	@echo ""
	docker run --rm -v $(CURDIR):/workspace $(DOCKER_IMAGE) make test-quick VERBOSE=$(VERBOSE)
	@echo ""
	@echo "✓ Tests complete. View report at: test-reports/index.html"

