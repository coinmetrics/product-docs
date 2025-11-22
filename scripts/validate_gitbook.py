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
"""

import os
import re
import sys
from pathlib import Path
from collections import Counter
import yaml
from junit_xml import TestSuite, TestCase


def load_gitbook_yaml():
    """Load and parse .gitbook.yaml file."""
    gitbook_path = Path('docs/.gitbook.yaml')
    if not gitbook_path.exists():
        return None, "File not found: docs/.gitbook.yaml"
    
    try:
        with open(gitbook_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        return data, None
    except Exception as e:
        return None, f"Failed to parse .gitbook.yaml: {e}"


def check_duplicate_redirects(gitbook_data):
    """Check for duplicate redirect keys."""
    if not gitbook_data or 'redirects' not in gitbook_data:
        return []
    
    redirects = gitbook_data['redirects']
    keys = list(redirects.keys())
    counts = Counter(keys)
    
    duplicates = [key for key, count in counts.items() if count > 1]
    return duplicates


def check_redirect_targets(gitbook_data):
    """Check that all redirect targets exist."""
    if not gitbook_data or 'redirects' not in gitbook_data:
        return []
    
    docs_dir = Path('docs')
    errors = []
    
    for source, target in gitbook_data['redirects'].items():
        # Target is relative to docs/
        target_path = docs_dir / target
        if not target_path.exists():
            errors.append(f"Redirect '{source}' points to non-existent file: {target}")
    
    return errors


def parse_summary_md():
    """Parse SUMMARY.md and extract all referenced files."""
    summary_path = Path('docs/SUMMARY.md')
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


def check_summary_files():
    """Check that all files in SUMMARY.md exist."""
    files, error = parse_summary_md()
    if error:
        return [error]
    
    docs_dir = Path('docs')
    errors = []
    
    for file_path in files:
        full_path = docs_dir / file_path
        if not full_path.exists():
            errors.append(f"File referenced in SUMMARY.md does not exist: {file_path}")
    
    return errors


def find_orphaned_files():
    """Find markdown files not referenced in SUMMARY.md."""
    summary_files, error = parse_summary_md()
    if error:
        return []
    
    # Normalize summary files to set
    summary_set = set(summary_files)
    
    # Find all markdown files
    docs_dir = Path('docs')
    all_md_files = []
    
    for md_file in docs_dir.rglob('*.md'):
        # Get relative path from docs/
        rel_path = md_file.relative_to(docs_dir)
        all_md_files.append(str(rel_path))
    
    # Find orphans (excluding SUMMARY.md and README.md at root)
    orphans = []
    for md_file in all_md_files:
        if md_file not in summary_set and md_file not in ['SUMMARY.md', 'README.md']:
            orphans.append(md_file)
    
    return orphans


def extract_image_references():
    """Extract all image references from markdown files."""
    docs_dir = Path('docs')
    images = set()
    
    for md_file in docs_dir.rglob('*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Match markdown images: ![alt](path)
        pattern = r'!\[.*?\]\((.*?)\)'
        matches = re.findall(pattern, content)
        
        for match in matches:
            # Only track local images (not URLs)
            if not match.startswith('http'):
                images.add(match)
    
    return images


def check_image_references():
    """Check that all referenced images exist."""
    images = extract_image_references()
    docs_dir = Path('docs')
    errors = []
    
    for image in images:
        # Images can be relative to docs/ or absolute from repo root
        image_path = docs_dir / image
        if not image_path.exists():
            # Try from repo root
            image_path = Path(image)
            if not image_path.exists():
                errors.append(f"Referenced image does not exist: {image}")
    
    return errors


def find_unused_images():
    """Find images not referenced in any markdown file."""
    referenced_images = extract_image_references()
    
    # Find all images in .gitbook/assets/
    assets_dir = Path('docs/.gitbook/assets')
    if not assets_dir.exists():
        return []
    
    all_images = []
    for img in assets_dir.rglob('*'):
        if img.is_file() and img.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.pdf', '.ipynb']:
            # Get path relative to docs/
            rel_path = img.relative_to(Path('docs'))
            all_images.append(str(rel_path))
    
    # Find unused
    unused = []
    for img in all_images:
        # Check various path formats
        if img not in referenced_images and f"./{img}" not in referenced_images and f"/{img}" not in referenced_images:
            # Also check without docs/ prefix
            img_name = img.replace('.gitbook/assets/', '')
            if img_name not in referenced_images:
                unused.append(img)
    
    return unused


def main():
    """Main validation function."""
    test_cases = []
    
    # Test 1: Load .gitbook.yaml
    gitbook_data, error = load_gitbook_yaml()
    tc = TestCase("Load .gitbook.yaml", classname='GitBookValidation')
    if error:
        tc.add_failure_info(message=error)
        print(f"FAIL: {error}")
    else:
        print("PASS: .gitbook.yaml loaded successfully")
    test_cases.append(tc)
    
    # Test 2: Check for duplicate redirects
    tc = TestCase("No duplicate redirect keys", classname='GitBookValidation')
    if gitbook_data:
        duplicates = check_duplicate_redirects(gitbook_data)
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
        errors = check_redirect_targets(gitbook_data)
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
    errors = check_summary_files()
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
    orphans = find_orphaned_files()
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
    errors = check_image_references()
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
    unused = find_unused_images()
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
    
    # Generate JUnit XML report
    ts = TestSuite("GitBook Structure Validation", test_cases)
    output_dir = Path('test-reports')
    output_dir.mkdir(exist_ok=True)
    
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

