#!/usr/bin/env python3
"""
Validate GitBook structure.

Checks:
- No duplicate redirect keys in .gitbook.yaml
- All redirect targets exist
- All files in SUMMARY.md exist
- No orphaned markdown files
- All referenced images exist
- No unused images
- All metrics in metrics.json exist in the documentation
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import unquote
import yaml
from junit_xml import TestSuite, TestCase
import requests


def load_gitbook_yaml(docs_dir):
    """Load and parse .gitbook.yaml file."""
    gitbook_path = docs_dir / '.gitbook.yaml'
    if not gitbook_path.exists():
        return None, f"File not found: {gitbook_path}"
    
    try:
        with open(gitbook_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        return data, None
    except Exception as e:
        return None, f"Failed to parse .gitbook.yaml: {e}"


def check_duplicate_redirects(docs_dir):
    """Check for duplicate redirect keys by analyzing raw YAML text.
    
    Note: This must analyze the raw text because yaml.safe_load() silently
    overwrites duplicate keys before we can detect them.
    """
    gitbook_path = docs_dir / '.gitbook.yaml'
    if not gitbook_path.exists():
        return []
    
    try:
        with open(gitbook_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception:
        return []
    
    # Extract redirect keys from raw YAML
    # Pattern matches indented lines with key: value format
    # ^ - Start of line anchor
    # \s+ - One or more whitespace characters (matches the indentation before each redirect key)
    # ([^:]+) - Capture group 1 (the redirect source key)
    # [^:] - any character except a colon
    # + - one or more times
    # This captures everything before the colon (e.g., market-data/faqs)
    # : - Literal colon character (the separator in YAML)
    # \s* - Zero or more whitespace (spaces after the colon)
    # (.+) - Capture group 2 (the redirect target)
    # . - any character
    # + - one or more times
    # This captures the target path (e.g., resources/faqs.md)
    # $ - End of line anchor
    pattern = re.compile(r'^\s+([^:]+):\s*(.+)$')
    
    key_occurrences = {}  # key -> list of line numbers
    in_redirects_section = False
    
    for line_num, line in enumerate(lines, start=1):
        # Check if we're entering the redirects section
        if line.strip() == 'redirects:':
            in_redirects_section = True
            continue
        
        # Check if we've left the redirects section (new top-level key)
        if in_redirects_section and line and not line[0].isspace():
            in_redirects_section = False
        
        # Only process lines within the redirects section
        if in_redirects_section:
            match = pattern.match(line)
            if match:
                key = match.group(1).strip()
                if key not in key_occurrences:
                    key_occurrences[key] = []
                key_occurrences[key].append(line_num)
    
    # Find duplicates (keys that appear more than once)
    duplicates = []
    for key, line_numbers in key_occurrences.items():
        if len(line_numbers) > 1:
            duplicates.append(f"{key} (lines: {', '.join(map(str, line_numbers))})")
    
    return duplicates


def check_redirect_targets(gitbook_data, docs_dir):
    """Check that all redirect targets exist."""
    if not gitbook_data or 'redirects' not in gitbook_data:
        return []
    
    errors = []
    
    for source, target in gitbook_data['redirects'].items():
        # Target is relative to docs/
        target_path = docs_dir / target
        if not target_path.exists():
            errors.append(f"Redirect '{source}' points to non-existent file: {target}")
    
    return errors


def parse_summary_md(docs_dir):
    """Parse SUMMARY.md and extract all referenced files."""
    summary_path = docs_dir / 'SUMMARY.md'
    if not summary_path.exists():
        return [], "SUMMARY.md not found"
    
    with open(summary_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match markdown links: [text](path)
    pattern = r'\[.*?\]\((.*?\.md)\)'
    matches = re.findall(pattern, content)
    
    # Remove anchors and normalize paths
    files = []
    for match in matches:
        # Remove anchor
        file_path = match.split('#')[0]
        files.append(file_path)
    
    return files, None


def check_summary_files(docs_dir):
    """Check that all files in SUMMARY.md exist."""
    files, error = parse_summary_md(docs_dir)
    if error:
        return [error]
    
    errors = []
    
    for file_path in files:
        full_path = docs_dir / file_path
        if not full_path.exists():
            errors.append(f"File referenced in SUMMARY.md does not exist: {file_path}")
    
    return errors


def find_orphaned_files(docs_dir):
    """Find markdown files not referenced in SUMMARY.md."""
    summary_files, error = parse_summary_md(docs_dir)
    if error:
        return []
    
    # Normalize summary files to set
    summary_set = set(summary_files)
    
    # Find all markdown files
    all_md_files = []
    
    for md_file in docs_dir.rglob('*.md'):
        # Get relative path from docs/
        rel_path = md_file.relative_to(docs_dir)
        all_md_files.append(rel_path.as_posix())
    
    # Find orphans (excluding SUMMARY.md and README.md at root)
    orphans = []
    for md_file in all_md_files:
        if md_file not in summary_set and md_file not in ['SUMMARY.md', 'README.md']:
            orphans.append(md_file)
    
    return orphans


def extract_image_references(docs_dir):
    """Extract all image references, resolving relative paths."""
    images = {}  # resolved_path -> source_file
    
    for md_file in docs_dir.rglob('*.md'):
        md_dir = md_file.parent
        
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fixed regex: handles escaped chars, angle brackets for paths with spaces
        pattern = r'!\[.*?\]\((?:<([^>]+)>|((?:\\.|[^\s)])+))'
        matches = re.findall(pattern, content)
        
        for match in matches:
            # match is a tuple: (group1, group2)
            # Use group1 if matched (angle brackets), otherwise group2 (regular path)
            path = match[0] if match[0] else match[1]
            
            if not path.startswith('http'):
                # Strip anchors and query strings
                path = path.split('#')[0].split('?')[0]
                
                # Unescape markdown characters
                unescaped = path.replace('\\(', '(').replace('\\)', ')').replace('\\_', '_')
                
                # URL-decode (e.g., %20 -> space)
                decoded = unquote(unescaped)
                
                # Resolve relative to source file's directory
                resolved = (md_dir / decoded).resolve()
                
                try:
                    rel_path = resolved.relative_to(docs_dir.resolve())
                    # Use as_posix() for cross-platform consistency
                    images[rel_path.as_posix()] = md_file.relative_to(docs_dir).as_posix()
                except ValueError:
                    # Path outside docs_dir - skip (will be caught as error later)
                    pass
    
    return images


def check_image_references(docs_dir):
    """Check that all referenced images exist."""
    images = extract_image_references(docs_dir)
    errors = []
    
    for image_path, source_file in images.items():
        full_path = docs_dir / image_path
        if not full_path.exists():
            errors.append(f"Referenced image does not exist: {image_path} (referenced in {source_file})")
    
    return errors


def find_unused_images(docs_dir):
    """Find images not referenced in any markdown file."""
    referenced_images = set(extract_image_references(docs_dir).keys())
    
    # Find all images in .gitbook/assets/
    assets_dir = docs_dir / '.gitbook/assets'
    if not assets_dir.exists():
        return []
    
    all_images = set()
    for img in assets_dir.rglob('*'):
        if img.is_file() and img.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.pdf', '.ipynb']:
            # Use as_posix() for consistency
            rel_path = img.relative_to(docs_dir).as_posix()
            all_images.add(rel_path)
    
    unused = sorted(all_images - referenced_images)
    return unused


def fetch_metrics_from_gitlab():
    """Fetch metrics.json from GitLab resources repository.
    
    Returns:
        tuple: (list of metrics, error message)
        - On success: (metrics_list, None)
        - On failure: (None, error_string)
    """
    # Use GitLab API to fetch raw file from private repository
    # URL encode the file path: metrics.json -> metrics.json
    # URL encode the project path: coinmetrics/resources -> coinmetrics%2Fresources
    url = "https://gitlab.com/api/v4/projects/coinmetrics%2Fresources/repository/files/metrics.json/raw?ref=master"
    
    # Try CI_JOB_TOKEN first (GitLab CI), then GITLAB_TOKEN (local dev)
    ci_job_token = os.getenv('CI_JOB_TOKEN')
    gitlab_token = os.getenv('GITLAB_TOKEN')
    
    if not ci_job_token and not gitlab_token:
        return None, "No GitLab token available (set CI_JOB_TOKEN or GITLAB_TOKEN)"
    
    try:
        # Use appropriate header based on token type
        if ci_job_token:
            headers = {'JOB-TOKEN': ci_job_token}
        else:
            headers = {'PRIVATE-TOKEN': gitlab_token}
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        metrics = response.json()
        return metrics, None
    except requests.exceptions.RequestException as e:
        return None, f"Failed to fetch metrics.json: {e}"
    except json.JSONDecodeError as e:
        return None, f"Failed to parse metrics.json: {e}"


def check_metrics_documented(docs_dir):
    """Check which metrics are documented in the knowledge base.
    
    Returns:
        tuple: (found_count, missing_metrics, error_message)
    """
    metrics, error = fetch_metrics_from_gitlab()
    if error:
        return 0, [], error
    
    # Extract short_form from each metric
    metric_names = []
    for metric in metrics:
        if isinstance(metric, dict) and 'short_form' in metric:
            metric_names.append(metric['short_form'])
    
    if not metric_names:
        return 0, [], "No metrics found in metrics.json"
    
    # Read all markdown files and build a searchable content string
    all_content = ""
    for md_file in docs_dir.rglob('*.md'):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                all_content += f.read().lower() + "\n"
        except Exception:
            # Skip files that can't be read
            pass
    
    # Check which metrics are mentioned
    found = []
    missing = []
    for metric_name in metric_names:
        if metric_name.lower() in all_content:
            found.append(metric_name)
        else:
            missing.append(metric_name)
    
    return len(found), missing, None


def main():
    """Main validation function."""
    parser = argparse.ArgumentParser(description="Validate GitBook structure")
    parser.add_argument('--input', '-i', default='docs', help="Input directory")
    parser.add_argument('--output', '-o', default='test-reports', help="Report output directory")
    args = parser.parse_args()

    docs_dir = Path(args.input)
    if not docs_dir.exists():
        print(f"Error: Directory '{docs_dir}' not found")
        sys.exit(1)
    
    test_cases = []
    
    # Test 1: Load .gitbook.yaml
    gitbook_data, error = load_gitbook_yaml(docs_dir)
    tc = TestCase("Load .gitbook.yaml", classname='GitBookValidation')
    if error:
        tc.add_failure_info(message=error)
        print(f"FAIL: {error}")
    else:
        print("PASS: .gitbook.yaml loaded successfully")
    test_cases.append(tc)
    
    # Test 2: Check for duplicate redirects
    tc = TestCase("No duplicate redirect keys", classname='GitBookValidation')
    duplicates = check_duplicate_redirects(docs_dir)
    if duplicates:
        msg = f"Duplicate redirect keys found: {', '.join(duplicates)}"
        tc.add_failure_info(message=msg)
        print(f"FAIL: {msg}")
    else:
        print("PASS: No duplicate redirect keys")
    test_cases.append(tc)
    
    # Test 3: Check redirect targets exist
    tc = TestCase("All redirect targets exist", classname='GitBookValidation')
    if gitbook_data:
        errors = check_redirect_targets(gitbook_data, docs_dir)
        if errors:
            tc.add_failure_info(
                message=f"Found {len(errors)} redirect target errors",
                output="\n".join(errors)
            )
            print(f"FAIL: {len(errors)} redirect target(s) not found")
            for error in errors:
                print(f"  - {error}")
        else:
            print("PASS: All redirect targets exist")
    test_cases.append(tc)
    
    # Test 4: Check SUMMARY.md files exist
    tc = TestCase("All SUMMARY.md files exist", classname='GitBookValidation')
    errors = check_summary_files(docs_dir)
    if errors:
        tc.add_failure_info(
            message=f"Found {len(errors)} missing files in SUMMARY.md",
            output="\n".join(errors)
        )
        print(f"FAIL: {len(errors)} file(s) in SUMMARY.md not found")
        for error in errors:
            print(f"  - {error}")
    else:
        print("PASS: All SUMMARY.md files exist")
    test_cases.append(tc)
    
    # Test 5: Check for orphaned files
    tc = TestCase("No orphaned markdown files", classname='GitBookValidation')
    orphans = find_orphaned_files(docs_dir)
    if orphans:
        tc.add_failure_info(message=f"Found {len(orphans)} orphaned files", output="\n".join(orphans))
        print(f"WARN: {len(orphans)} orphaned markdown file(s) not in SUMMARY.md")
        for orphan in orphans[:10]:  # Show first 10
            print(f"  - {orphan}")
        if len(orphans) > 10:
            print(f"  ... and {len(orphans) - 10} more")
    else:
        print("PASS: No orphaned markdown files")
    test_cases.append(tc)
    
    # Test 6: Check image references
    tc = TestCase("All referenced images exist", classname='GitBookValidation')
    errors = check_image_references(docs_dir)
    if errors:
        tc.add_failure_info(
            message=f"Found {len(errors)} missing image references",
            output="\n".join(errors)
        )
        print(f"FAIL: {len(errors)} referenced image(s) not found")
        for error in errors[:10]:  # Show first 10
            print(f"  - {error}")
        if len(errors) > 10:
            print(f"  ... and {len(errors) - 10} more")
    else:
        print("PASS: All referenced images exist")
    test_cases.append(tc)
    
    # Test 7: Check for unused images
    tc = TestCase("No unused images", classname='GitBookValidation')
    unused = find_unused_images(docs_dir)
    if unused:
        tc.add_failure_info(message=f"Found {len(unused)} unused images", output="\n".join(unused))
        print(f"INFO: {len(unused)} unused image(s) in .gitbook/assets/")
        for img in unused[:10]:  # Show first 10
            print(f"  - {img}")
        if len(unused) > 10:
            print(f"  ... and {len(unused) - 10} more")
    else:
        print("PASS: No unused images")
    test_cases.append(tc)
    
    # Test 8: Check metrics documentation coverage
    tc = TestCase("All metrics documented", classname='GitBookValidation')
    found_count, missing_metrics, error = check_metrics_documented(docs_dir)
    if error:
        # If we can't fetch metrics, skip the test (don't fail)
        print(f"SKIPPED: Metrics check - {error}")
    elif missing_metrics:
        total_count = found_count + len(missing_metrics)
        # Add output to test case for visibility in reports, but don't fail
        tc.add_failure_info(
            message=f"{found_count}/{total_count} metrics found in documentation",
            output="\n".join(missing_metrics)
        )
        print(f"INFO: {found_count}/{total_count} metrics found in documentation")
        print(f"INFO: {len(missing_metrics)} metric(s) not found in documentation")
        for metric in missing_metrics[:10]:  # Show first 10
            print(f"  - {metric}")
        if len(missing_metrics) > 10:
            print(f"  ... and {len(missing_metrics) - 10} more")
    else:
        total_count = found_count
        print(f"PASS: All {total_count} metrics found in documentation")
    test_cases.append(tc)
    
    # Generate JUnit XML report
    ts = TestSuite("GitBook Structure Validation", test_cases)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    with open(output_dir / 'gitbook-validation.xml', 'w') as f:
        f.write(TestSuite.to_xml_string([ts], prettyprint=True))
    
    # Determine exit code based on failures
    failures = sum(1 for tc in test_cases if tc.is_failure())
    print(f"\nGitBook Validation Summary:")
    print(f"  Total checks: {len(test_cases)}")
    print(f"  Failed: {failures}")
    print(f"  Passed: {len(test_cases) - failures}")
    
    sys.exit(1 if failures > 0 else 0)


if __name__ == '__main__':
    main()

