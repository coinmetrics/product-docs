#!/usr/bin/env python3
"""
Generate consolidated test reports.

Parses outputs from all test tools and creates:
1. Unified JUnit XML for GitLab CI integration
2. HTML summary report for human review
"""

import json
import re
import sys
from pathlib import Path
from datetime import datetime
import xml.etree.ElementTree as ET


def parse_markdownlint(report_path):
    """Parse markdownlint-cli2 console output."""
    if not report_path.exists():
        return []
    
    with open(report_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    # Pattern: docs/path/file.md:123 error MD013/line-length Line length [Expected: 120; Actual: 145]
    # or: docs/path/file.md:123:45 error MD013/line-length Line length [Expected: 120; Actual: 145]
    pattern = r'(docs/.*?\.md):(\d+)(?::(\d+))?\s+error\s+(MD\d+)/(\S+)\s+(.*)'
    
    for match in re.finditer(pattern, content):
        issues.append({
            'file': match.group(1),
            'line': match.group(2),
            'column': match.group(3) or '1',
            'rule': match.group(4),
            'type': match.group(5),
            'message': match.group(6),
            'severity': 'error'
        })
    
    return issues


def parse_vale(report_path):
    """Parse Vale JSON output."""
    if not report_path.exists():
        return []
    
    try:
        with open(report_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except:
        return []
    
    # Handle Vale error format (e.g., missing styles)
    if 'Code' in data and 'Text' in data:
        # Vale returned an error, not results
        print(f"Vale error: {data.get('Text', 'Unknown error')}")
        return []
    
    issues = []
    for file_path, file_issues in data.items():
        # Skip if file_issues is not a list (could be error message)
        if not isinstance(file_issues, list):
            continue
            
        for issue in file_issues:
            # Skip if issue is not a dict
            if not isinstance(issue, dict):
                continue
                
            issues.append({
                'file': file_path,
                'line': str(issue.get('Line', 1)),
                'column': str(issue.get('Span', [1])[0]),
                'rule': issue.get('Check', 'unknown'),
                'message': issue.get('Message', ''),
                'severity': issue.get('Severity', 'suggestion').lower()
            })
    
    return issues


def parse_lychee(report_path):
    """Parse lychee JSON output."""
    if not report_path.exists():
        return []
    
    try:
        with open(report_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        issues = []
        
        # Lychee outputs a single JSON object with a fail_map containing failed links
        fail_map = data.get('fail_map', {})
        
        for file_path, failures in fail_map.items():
            for failure in failures:
                url = failure.get('url', 'unknown')
                status = failure.get('status', {})
                status_text = status.get('text', 'Unknown error')
                status_code = status.get('code', '')
                
                # Format error message
                if status_code:
                    message = f"Broken link [{status_code}]: {url} - {status_text}"
                else:
                    message = f"Broken link: {url} - {status_text}"
                
                issues.append({
                    'file': file_path,
                    'line': '1',
                    'column': '1',
                    'rule': 'broken-link',
                    'message': message,
                    'severity': 'error'
                })
        
        return issues
    except Exception as e:
        print(f"Error parsing lychee report: {e}")
        return []


def parse_junit_xml(report_path):
    """Parse existing JUnit XML reports."""
    if not report_path.exists():
        return []
    
    try:
        tree = ET.parse(report_path)
        root = tree.getroot()
        
        issues = []
        for testcase in root.iter('testcase'):
            failure = testcase.find('failure')
            if failure is not None:
                test_name = testcase.get('name', '')
                classname = testcase.get('classname', 'validation')
                
                # Check if failure has detailed text content
                failure_text = failure.text
                if failure_text and failure_text.strip():
                    # Split by newlines to get individual errors
                    error_lines = [line.strip() for line in failure_text.strip().split('\n') if line.strip()]
                    
                    # Create an issue for each individual error line
                    for error_line in error_lines:
                        # Try to extract file from error message
                        file_name = 'unknown'
                        
                        # Pattern 1: "some text: path/to/file.md"
                        if ': ' in error_line and ('.md' in error_line or 'file' in error_line.lower()):
                            parts = error_line.split(': ')
                            if len(parts) >= 2:
                                # Check if the last part looks like a file path
                                potential_file = parts[-1].strip()
                                if '/' in potential_file or '.md' in potential_file:
                                    file_name = potential_file
                        
                        # Pattern 2: File name at start (e.g., "docs/path/file.md something")
                        if file_name == 'unknown' and error_line.startswith('docs/'):
                            parts = error_line.split()
                            if parts:
                                file_name = parts[0]
                        
                        issues.append({
                            'file': file_name,
                            'line': '1',
                            'column': '1',
                            'rule': test_name,  # Use test case name instead of classname
                            'message': error_line,
                            'severity': 'error'
                        })
                else:
                    # No detailed text, use summary message
                    parts = test_name.split(':')
                    issues.append({
                        'file': parts[0] if parts else 'unknown',
                        'line': parts[1] if len(parts) > 1 else '1',
                        'column': '1',
                        'rule': test_name,  # Use test case name for consistency
                        'message': failure.get('message', 'Test failed'),
                        'severity': 'error'
                    })
        
        return issues
    except:
        return []


def generate_junit_xml(all_issues):
    """Generate consolidated JUnit XML."""
    # Group issues by type
    groups = {
        'markdownlint': [],
        'vale': [],
        'lychee-internal': [],
        'lychee-external': [],
        'code-validation': [],
        'gitbook-validation': []
    }
    
    for issue in all_issues:
        source = issue.get('source', 'unknown')
        groups[source].append(issue)
    
    # Build XML
    testsuites = ET.Element('testsuites')
    
    for group_name, issues in groups.items():
        testsuite = ET.SubElement(testsuites, 'testsuite', {
            'name': group_name,
            'tests': str(len(issues)),
            'failures': str(len(issues)),
            'time': '0'
        })
        
        for issue in issues:
            testcase = ET.SubElement(testsuite, 'testcase', {
                'name': f"{issue['file']}:{issue['line']}",
                'classname': issue.get('rule', 'unknown'),
                'time': '0'
            })
            
            failure = ET.SubElement(testcase, 'failure', {
                'message': issue['message'],
                'type': issue.get('severity', 'error')
            })
            failure.text = f"{issue['file']}:{issue['line']}:{issue['column']} - {issue['message']}"
    
    tree = ET.ElementTree(testsuites)
    ET.indent(tree, space='  ')
    return tree


def generate_html_report(all_issues):
    """Generate HTML summary report."""
    # Group issues by source
    by_source = {}
    for issue in all_issues:
        source = issue.get('source', 'unknown')
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(issue)
    
    # Generate HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation Test Report</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }}
        .header {{
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .header h1 {{
            margin: 0 0 10px 0;
            color: #333;
        }}
        .summary {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }}
        .summary-card {{
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-decoration: none;
            display: block;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }}
        .summary-card:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }}
        .summary-card h3 {{
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
        }}
        .summary-card .value {{
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }}
        .summary-card.error .value {{ color: #d32f2f; }}
        .summary-card.warning .value {{ color: #f57c00; }}
        .summary-card.info .value {{ color: #1976d2; }}
        .section {{
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .section h2 {{
            margin: 0 0 15px 0;
            color: #333;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }}
        .issue {{
            padding: 10px;
            margin-bottom: 10px;
            border-left: 4px solid #ddd;
            background: #f9f9f9;
        }}
        .issue.error {{ border-left-color: #d32f2f; }}
        .issue.warning {{ border-left-color: #f57c00; }}
        .issue.suggestion {{ border-left-color: #1976d2; }}
        .issue-header {{
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }}
        .issue-location {{
            font-family: monospace;
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }}
        .issue-message {{
            color: #444;
        }}
        .badge {{
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-left: 10px;
        }}
        .badge.error {{ background: #ffcdd2; color: #b71c1c; }}
        .badge.warning {{ background: #ffe0b2; color: #e65100; }}
        .badge.suggestion {{ background: #bbdefb; color: #0d47a1; }}
        .timestamp {{
            color: #999;
            font-size: 14px;
        }}
        .back-to-top {{
            display: inline-block;
            margin-left: 15px;
            padding: 5px 10px;
            background: #f0f0f0;
            color: #666;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            transition: background 0.2s;
        }}
        .back-to-top:hover {{
            background: #e0e0e0;
            color: #333;
        }}
    </style>
</head>
<body>
    <div class="header" id="top">
        <h1>Documentation Test Report</h1>
        <p class="timestamp">Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
    </div>
    
    <div class="summary">
        <div class="summary-card error">
            <h3>Total Issues</h3>
            <div class="value">{len(all_issues)}</div>
        </div>
"""
    
    # Add source-specific counts
    for source in ['markdownlint', 'vale', 'lychee-internal', 'lychee-external', 'code-validation', 'gitbook-validation']:
        count = len(by_source.get(source, []))
        html += f"""
        <a href="#{source}" class="summary-card info">
            <h3>{source.replace('-', ' ').title()}</h3>
            <div class="value">{count}</div>
        </a>
"""
    
    html += """
    </div>
"""
    
    # Add sections for each source
    for source in ['markdownlint', 'vale', 'lychee-internal', 'lychee-external', 'code-validation', 'gitbook-validation']:
        issues = by_source.get(source, [])
        if not issues:
            continue
        
        html += f"""
    <div class="section" id="{source}">
        <h2>{source.replace('-', ' ').title()} ({len(issues)} issues) <a href="#top" class="back-to-top">↑ Back to Top</a></h2>
"""
        
        for issue in issues:
            severity = issue.get('severity', 'error')
            message_html = issue['message'].replace('\n', '<br>\n')
            html += f"""
        <div class="issue {severity}">
            <div class="issue-header">
                {issue.get('rule', 'unknown')}
                <span class="badge {severity}">{severity}</span>
            </div>
            <div class="issue-location">{issue['file']}:{issue['line']}:{issue['column']}</div>
            <div class="issue-message">{message_html}</div>
        </div>
"""
        
        html += """
    </div>
"""
    
    html += """
</body>
</html>
"""
    
    return html


def main():
    """Main report generation function."""
    reports_dir = Path('test-reports')
    
    if not reports_dir.exists():
        print("No test reports directory found")
        sys.exit(0)
    
    # Collect all issues
    all_issues = []
    
    # Parse markdownlint
    issues = parse_markdownlint(reports_dir / 'markdownlint.txt')
    for issue in issues:
        issue['source'] = 'markdownlint'
    all_issues.extend(issues)
    print(f"Found {len(issues)} markdownlint issues")
    
    # Parse Vale
    issues = parse_vale(reports_dir / 'vale.json')
    for issue in issues:
        issue['source'] = 'vale'
    all_issues.extend(issues)
    print(f"Found {len(issues)} Vale issues")
    
    # Parse lychee internal
    issues = parse_lychee(reports_dir / 'lychee-internal.json')
    for issue in issues:
        issue['source'] = 'lychee-internal'
    all_issues.extend(issues)
    print(f"Found {len(issues)} internal link issues")
    
    # Parse lychee external
    issues = parse_lychee(reports_dir / 'lychee-external.json')
    for issue in issues:
        issue['source'] = 'lychee-external'
    all_issues.extend(issues)
    print(f"Found {len(issues)} external link issues")
    
    # Parse code validation
    issues = parse_junit_xml(reports_dir / 'code-validation.xml')
    for issue in issues:
        issue['source'] = 'code-validation'
    all_issues.extend(issues)
    print(f"Found {len(issues)} code validation issues")
    
    # Parse GitBook validation
    issues = parse_junit_xml(reports_dir / 'gitbook-validation.xml')
    for issue in issues:
        issue['source'] = 'gitbook-validation'
    all_issues.extend(issues)
    print(f"Found {len(issues)} GitBook structure issues")
    
    # Generate consolidated JUnit XML
    junit_tree = generate_junit_xml(all_issues)
    junit_path = reports_dir / 'junit.xml'
    junit_tree.write(junit_path, encoding='utf-8', xml_declaration=True)
    print(f"\nGenerated JUnit XML: {junit_path}")
    
    # Generate HTML report
    html = generate_html_report(all_issues)
    html_path = reports_dir / 'index.html'
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated HTML report: {html_path}")
    
    print(f"\nTotal issues found: {len(all_issues)}")


if __name__ == '__main__':
    main()

