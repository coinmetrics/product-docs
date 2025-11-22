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
    by_file = {}
    for issue in all_issues:
        source = issue.get('source', 'unknown')
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(issue)
        
        # Also group by file for visualization
        file_path = issue.get('file', 'unknown')
        if file_path not in by_file:
            by_file[file_path] = 0
        by_file[file_path] += 1
    
    # Get top 10 problematic files
    top_files = sorted(by_file.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Calculate severity breakdown
    severity_counts = {'error': 0, 'warning': 0, 'suggestion': 0}
    for issue in all_issues:
        severity = issue.get('severity', 'error')
        if severity in severity_counts:
            severity_counts[severity] += 1
        else:
            severity_counts['error'] += 1
    
    # Calculate rule frequency
    by_rule = {}
    for issue in all_issues:
        rule = issue.get('rule', 'unknown')
        source = issue.get('source', 'unknown')
        # Create a compound key with source for clarity
        rule_key = f"{rule} ({source})"
        if rule_key not in by_rule:
            by_rule[rule_key] = {'count': 0, 'source': source, 'rule': rule}
        by_rule[rule_key]['count'] += 1
    
    # Get top 15 most violated rules
    top_rules = sorted(by_rule.items(), key=lambda x: x[1]['count'], reverse=True)[:15]
    
    # Generate HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation Test Report</title>
    <style>
        :root {{
            --primary-color: #1976d2;
            --error-color: #d32f2f;
            --warning-color: #f57c00;
            --success-color: #388e3c;
            --bg-primary: #ffffff;
            --bg-secondary: #f5f7fa;
            --bg-tertiary: #e8eaf0;
            --text-primary: #2c3e50;
            --text-secondary: #5a6c7d;
            --border-color: #dfe3eb;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
            --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 20px rgba(0,0,0,0.12);
        }}
        
        body.dark-mode {{
            --bg-primary: #1e1e1e;
            --bg-secondary: #121212;
            --bg-tertiary: #2d2d2d;
            --text-primary: #e0e0e0;
            --text-secondary: #b0b0b0;
            --border-color: #404040;
        }}
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--bg-secondary);
            color: var(--text-primary);
            line-height: 1.6;
            transition: background 0.3s ease, color 0.3s ease;
        }}
        
        .container {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }}
        
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: var(--shadow-lg);
            color: white;
            position: relative;
            overflow: hidden;
        }}
        
        .header::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }}
        
        .header-content {{
            position: relative;
            z-index: 1;
        }}
        
        .header h1 {{
            margin: 0 0 10px 0;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }}
        
        .header-controls {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }}
        
        .timestamp {{
            font-size: 14px;
            opacity: 0.9;
        }}
        
        .controls {{
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;
        }}
        
        .search-box {{
            padding: 10px 15px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 8px;
            background: rgba(255,255,255,0.2);
            color: white;
            font-size: 14px;
            min-width: 300px;
            transition: all 0.3s ease;
        }}
        
        .search-box::placeholder {{
            color: rgba(255,255,255,0.7);
        }}
        
        .search-box:focus {{
            outline: none;
            background: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.5);
        }}
        
        .filter-btn {{
            padding: 10px 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 8px;
            background: rgba(255,255,255,0.2);
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }}
        
        .filter-btn:hover {{
            background: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.5);
        }}
        
        .filter-btn.active {{
            background: rgba(255,255,255,0.4);
            border-color: white;
        }}
        
        .dark-mode-toggle {{
            padding: 10px 15px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 8px;
            background: rgba(255,255,255,0.2);
            color: white;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
            border: none;
        }}
        
        .dark-mode-toggle:hover {{
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }}
        
        .summary {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        
        .summary-card {{
            background: var(--bg-primary);
            padding: 24px;
            border-radius: 12px;
            box-shadow: var(--shadow-md);
            text-decoration: none;
            display: block;
            cursor: pointer;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }}
        
        .summary-card::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--primary-color);
        }}
        
        .summary-card.error::before {{ background: var(--error-color); }}
        .summary-card.warning::before {{ background: var(--warning-color); }}
        .summary-card.info::before {{ background: var(--primary-color); }}
        
        .summary-card:hover {{
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }}
        
        .summary-card-header {{
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
        }}
        
        .summary-card-icon {{
            font-size: 24px;
        }}
        
        .summary-card h3 {{
            font-size: 13px;
            color: var(--text-secondary);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }}
        
        .summary-card .value {{
            font-size: 40px;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1;
            margin-bottom: 8px;
        }}
        
        .summary-card.error .value {{ color: var(--error-color); }}
        .summary-card.warning .value {{ color: var(--warning-color); }}
        .summary-card.info .value {{ color: var(--primary-color); }}
        
        .summary-card-label {{
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 500;
        }}
        
        .charts-section {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        
        .chart-card {{
            background: var(--bg-primary);
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: var(--shadow-md);
        }}
        
        .chart-card h3 {{
            margin-bottom: 20px;
            color: var(--text-primary);
            font-size: 18px;
            font-weight: 600;
        }}
        
        .severity-chart {{
            display: flex;
            gap: 20px;
            align-items: center;
        }}
        
        .donut-chart {{
            width: 120px;
            height: 120px;
            position: relative;
        }}
        
        .severity-legend {{
            flex: 1;
        }}
        
        .legend-item {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
        }}
        
        .legend-item:last-child {{
            border-bottom: none;
        }}
        
        .legend-label {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        
        .legend-color {{
            width: 16px;
            height: 16px;
            border-radius: 3px;
        }}
        
        .legend-color.error {{ background: var(--error-color); }}
        .legend-color.warning {{ background: var(--warning-color); }}
        .legend-color.suggestion {{ background: var(--primary-color); }}
        
        .legend-count {{
            font-weight: 600;
            color: var(--text-primary);
        }}
        
        .top-files-chart {{
            display: flex;
            flex-direction: column;
            gap: 12px;
        }}
        
        .file-bar {{
            display: flex;
            flex-direction: column;
            gap: 4px;
        }}
        
        .file-bar-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
        }}
        
        .file-name {{
            font-family: 'Monaco', 'Courier New', monospace;
            color: var(--text-primary);
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
        }}
        
        .file-count {{
            font-weight: 600;
            color: var(--text-secondary);
            margin-left: 10px;
        }}
        
        .file-bar-visual {{
            height: 8px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            overflow: hidden;
        }}
        
        .file-bar-fill {{
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--error-color));
            border-radius: 4px;
            transition: width 0.5s ease;
        }}
        
        .section {{
            background: var(--bg-primary);
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: var(--shadow-md);
            overflow: hidden;
        }}
        
        .section-header {{
            padding: 20px 24px;
            border-bottom: 2px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: background 0.2s ease;
            user-select: none;
        }}
        
        .section-header:hover {{
            background: var(--bg-tertiary);
        }}
        
        .section-title {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}
        
        .section-title h2 {{
            margin: 0;
            color: var(--text-primary);
            font-size: 20px;
            font-weight: 600;
        }}
        
        .section-count {{
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }}
        
        .collapse-icon {{
            font-size: 20px;
            color: var(--text-secondary);
            transition: transform 0.3s ease;
        }}
        
        .section.collapsed .collapse-icon {{
            transform: rotate(-90deg);
        }}
        
        .section-content {{
            padding: 20px 24px;
            max-height: 100000px;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
        }}
        
        .section.collapsed .section-content {{
            max-height: 0;
            padding: 0 24px;
        }}
        
        .issue {{
            padding: 16px;
            margin-bottom: 12px;
            border-left: 4px solid var(--border-color);
            background: var(--bg-secondary);
            border-radius: 6px;
            transition: all 0.2s ease;
        }}
        
        .issue:hover {{
            background: var(--bg-tertiary);
            transform: translateX(4px);
        }}
        
        .issue.error {{ border-left-color: var(--error-color); }}
        .issue.warning {{ border-left-color: var(--warning-color); }}
        .issue.suggestion {{ border-left-color: var(--primary-color); }}
        
        .issue-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            flex-wrap: wrap;
            gap: 8px;
        }}
        
        .issue-rule {{
            font-weight: 600;
            color: var(--text-primary);
            font-size: 14px;
        }}
        
        .issue-location {{
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        
        .copy-btn {{
            background: var(--bg-tertiary);
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }}
        
        .copy-btn:hover {{
            background: var(--primary-color);
            color: white;
        }}
        
        .issue-message {{
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.6;
        }}
        
        .badge {{
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        
        .badge.error {{ background: #ffcdd2; color: #b71c1c; }}
        .badge.warning {{ background: #ffe0b2; color: #e65100; }}
        .badge.suggestion {{ background: #bbdefb; color: #0d47a1; }}
        
        .back-to-top {{
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 16px;
            border-radius: 50%;
            text-decoration: none;
            font-size: 24px;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
            opacity: 0;
            pointer-events: none;
            z-index: 1000;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }}
        
        .back-to-top.visible {{
            opacity: 1;
            pointer-events: all;
        }}
        
        .back-to-top:hover {{
            transform: translateY(-4px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }}
        
        .hidden {{
            display: none !important;
        }}
        
        .loading {{
            text-align: center;
            padding: 40px;
            color: var(--text-secondary);
        }}
        
        @media (max-width: 768px) {{
            .container {{
                padding: 15px;
            }}
            
            .header {{
                padding: 24px;
            }}
            
            .header h1 {{
                font-size: 28px;
            }}
            
            .search-box {{
                min-width: 100%;
            }}
            
            .summary {{
                grid-template-columns: 1fr;
            }}
            
            .charts-section {{
                grid-template-columns: 1fr;
            }}
            
            .header-controls {{
                flex-direction: column;
                align-items: stretch;
            }}
            
            .controls {{
                width: 100%;
                flex-direction: column;
            }}
            
            .filter-btn {{
                width: 100%;
            }}
        }}
        
        @media print {{
            .header-controls,
            .back-to-top,
            .copy-btn {{
                display: none;
            }}
            
            .section {{
                page-break-inside: avoid;
            }}
            
            body {{
                background: white;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header" id="top">
            <div class="header-content">
                <h1>📊 Documentation Test Report</h1>
                <div class="header-controls">
                    <p class="timestamp">Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    <div class="controls">
                        <input type="text" id="searchBox" class="search-box" placeholder="🔍 Search files or messages..." />
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="error">Errors</button>
                        <button class="filter-btn" data-filter="warning">Warnings</button>
                        <button class="filter-btn" data-filter="suggestion">Suggestions</button>
                        <button class="dark-mode-toggle" onclick="toggleDarkMode()">🌙</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="summary">
            <div class="summary-card error">
                <div class="summary-card-header">
                    <span class="summary-card-icon">⚠️</span>
                    <h3>Total Issues</h3>
                </div>
                <div class="value">{len(all_issues)}</div>
                <div class="summary-card-label">Across all validators</div>
            </div>
"""
    
    # Icon mapping for each source
    source_icons = {
        'markdownlint': '📝',
        'vale': '✍️',
        'lychee-internal': '🔗',
        'lychee-external': '🌐',
        'code-validation': '💻',
        'gitbook-validation': '📚'
    }
    
    # Add source-specific counts
    for source in ['markdownlint', 'vale', 'lychee-internal', 'lychee-external', 'code-validation', 'gitbook-validation']:
        count = len(by_source.get(source, []))
        icon = source_icons.get(source, '📄')
        html += f"""
            <a href="#{source}" class="summary-card info">
                <div class="summary-card-header">
                    <span class="summary-card-icon">{icon}</span>
                    <h3>{source.replace('-', ' ').title()}</h3>
                </div>
                <div class="value">{count}</div>
                <div class="summary-card-label">Issues found</div>
            </a>
"""
    
    html += """
        </div>
        
        <!-- Severity Distribution Chart -->
        <div class="chart-card">
            <h3>📈 Severity Distribution</h3>
            <div class="severity-chart">
                <div class="donut-chart">
                    <svg viewBox="0 0 120 120" style="transform: rotate(-90deg);">
"""
    
    # Calculate donut chart segments
    total = len(all_issues)
    if total > 0:
        error_pct = (severity_counts['error'] / total) * 100
        warning_pct = (severity_counts['warning'] / total) * 100
        suggestion_pct = (severity_counts['suggestion'] / total) * 100
        
        # SVG circle parameters
        radius = 50
        circumference = 2 * 3.14159 * radius
        
        # Calculate stroke dash arrays for donut segments
        error_dash = (error_pct / 100) * circumference
        warning_dash = (warning_pct / 100) * circumference
        suggestion_dash = (suggestion_pct / 100) * circumference
        
        error_offset = 0
        warning_offset = error_dash
        suggestion_offset = error_dash + warning_dash
        
        html += f"""
                        <circle cx="60" cy="60" r="{radius}" fill="none" stroke="#e0e0e0" stroke-width="20"/>
                        <circle cx="60" cy="60" r="{radius}" fill="none" stroke="#d32f2f" stroke-width="20"
                                stroke-dasharray="{error_dash} {circumference - error_dash}"
                                stroke-dashoffset="{error_offset}" style="transition: all 0.5s ease;"/>
                        <circle cx="60" cy="60" r="{radius}" fill="none" stroke="#f57c00" stroke-width="20"
                                stroke-dasharray="{warning_dash} {circumference - warning_dash}"
                                stroke-dashoffset="-{warning_offset}" style="transition: all 0.5s ease;"/>
                        <circle cx="60" cy="60" r="{radius}" fill="none" stroke="#1976d2" stroke-width="20"
                                stroke-dasharray="{suggestion_dash} {circumference - suggestion_dash}"
                                stroke-dashoffset="-{suggestion_offset}" style="transition: all 0.5s ease;"/>
"""
    
    html += f"""
                    </svg>
                </div>
                <div class="severity-legend">
                    <div class="legend-item">
                        <div class="legend-label">
                            <div class="legend-color error"></div>
                            <span>Errors</span>
                        </div>
                        <span class="legend-count">{severity_counts['error']}</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-label">
                            <div class="legend-color warning"></div>
                            <span>Warnings</span>
                        </div>
                        <span class="legend-count">{severity_counts['warning']}</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-label">
                            <div class="legend-color suggestion"></div>
                            <span>Suggestions</span>
                        </div>
                        <span class="legend-count">{severity_counts['suggestion']}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Top 10 Problematic Files Chart -->
        <div class="chart-card">
            <h3>📁 Top 10 Problematic Files</h3>
            <div class="top-files-chart">
"""
    
    # Add top files bars
    max_count = top_files[0][1] if top_files else 1
    for file_path, count in top_files[:10]:
        width_pct = (count / max_count) * 100
        # Shorten file path if too long
        display_path = file_path if len(file_path) <= 50 else '...' + file_path[-47:]
        html += f"""
                <div class="file-bar">
                    <div class="file-bar-header">
                        <span class="file-name" title="{file_path}">{display_path}</span>
                        <span class="file-count">{count}</span>
                    </div>
                    <div class="file-bar-visual">
                        <div class="file-bar-fill" style="width: {width_pct}%"></div>
                    </div>
                </div>
"""
    
    html += """
            </div>
        </div>
        
        <!-- Most Common Rules Chart -->
        <div class="chart-card">
            <h3>📋 Most Common Rules</h3>
            <div class="top-files-chart">
"""
    
    # Add top rules bars
    max_rule_count = top_rules[0][1]['count'] if top_rules else 1
    for rule_key, rule_data in top_rules[:15]:
        count = rule_data['count']
        width_pct = (count / max_rule_count) * 100
        # Shorten rule name if too long
        display_rule = rule_key if len(rule_key) <= 60 else rule_key[:57] + '...'
        html += f"""
                <div class="file-bar">
                    <div class="file-bar-header">
                        <span class="file-name" title="{rule_key}">{display_rule}</span>
                        <span class="file-count">{count}</span>
                    </div>
                    <div class="file-bar-visual">
                        <div class="file-bar-fill" style="width: {width_pct}%"></div>
                    </div>
                </div>
"""
    
    html += """
            </div>
        </div>
"""
    
    # Add sections for each source
    for source in ['markdownlint', 'vale', 'lychee-internal', 'lychee-external', 'code-validation', 'gitbook-validation']:
        issues = by_source.get(source, [])
        if not issues:
            continue
        
        icon = source_icons.get(source, '📄')
        html += f"""
        <div class="section collapsed" id="{source}">
            <div class="section-header" onclick="toggleSection('{source}')">
                <div class="section-title">
                    <span>{icon}</span>
                    <h2>{source.replace('-', ' ').title()}</h2>
                    <span class="section-count">{len(issues)} issues</span>
                </div>
                <span class="collapse-icon">▼</span>
            </div>
            <div class="section-content">
"""
        
        for issue in issues:
            severity = issue.get('severity', 'error')
            message_html = issue['message'].replace('\n', '<br>\n').replace('<', '&lt;').replace('>', '&gt;')
            file_location = f"{issue['file']}:{issue['line']}:{issue['column']}"
            html += f"""
                <div class="issue {severity}" data-severity="{severity}" data-file="{issue['file']}" data-message="{issue['message'][:100]}">
                    <div class="issue-header">
                        <span class="issue-rule">{issue.get('rule', 'unknown')}</span>
                        <span class="badge {severity}">{severity}</span>
                    </div>
                    <div class="issue-location">
                        <span>{file_location}</span>
                        <button class="copy-btn" onclick="copyToClipboard('{file_location}')">Copy</button>
                    </div>
                    <div class="issue-message">{message_html}</div>
                </div>
"""
        
        html += """
            </div>
        </div>
"""
    
    html += """
        <a href="#top" class="back-to-top" id="backToTop">↑</a>
    </div>
    
    <script>
        // Dark Mode Toggle
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            updateDarkModeIcon();
        }
        
        function updateDarkModeIcon() {
            const btn = document.querySelector('.dark-mode-toggle');
            const isDark = document.body.classList.contains('dark-mode');
            btn.textContent = isDark ? '☀️' : '🌙';
        }
        
        // Load dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            updateDarkModeIcon();
        }
        
        // Section Toggle
        function toggleSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.classList.toggle('collapsed');
        }
        
        // Copy to Clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                // Show brief feedback
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = '#4caf50';
                btn.style.color = 'white';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
        
        // Back to Top Button
        window.addEventListener('scroll', () => {
            const backToTop = document.getElementById('backToTop');
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Filter by Severity
        let currentFilter = 'all';
        let currentSearch = '';
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Apply filter
                currentFilter = btn.getAttribute('data-filter');
                applyFilters();
            });
        });
        
        // Search Functionality
        const searchBox = document.getElementById('searchBox');
        let searchTimeout;
        
        searchBox.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearch = e.target.value.toLowerCase();
                applyFilters();
            }, 300);
        });
        
        // Apply Filters
        function applyFilters() {
            const issues = document.querySelectorAll('.issue');
            let visibleCount = 0;
            
            issues.forEach(issue => {
                const severity = issue.getAttribute('data-severity');
                const file = issue.getAttribute('data-file').toLowerCase();
                const message = issue.getAttribute('data-message').toLowerCase();
                
                // Check severity filter
                const severityMatch = currentFilter === 'all' || severity === currentFilter;
                
                // Check search filter
                const searchMatch = currentSearch === '' || 
                                   file.includes(currentSearch) || 
                                   message.includes(currentSearch);
                
                if (severityMatch && searchMatch) {
                    issue.classList.remove('hidden');
                    visibleCount++;
                } else {
                    issue.classList.add('hidden');
                }
            });
            
            // Update section counts
            document.querySelectorAll('.section').forEach(section => {
                const sectionIssues = section.querySelectorAll('.issue:not(.hidden)');
                const countSpan = section.querySelector('.section-count');
                if (countSpan) {
                    const totalInSection = section.querySelectorAll('.issue').length;
                    if (sectionIssues.length === totalInSection) {
                        countSpan.textContent = `${totalInSection} issues`;
                    } else {
                        countSpan.textContent = `${sectionIssues.length}/${totalInSection} issues`;
                    }
                }
                
                // Auto-collapse empty sections
                if (sectionIssues.length === 0) {
                    section.classList.add('collapsed');
                } else if (currentSearch !== '' || currentFilter !== 'all') {
                    section.classList.remove('collapsed');
                }
            });
        }
        
        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            // Press '/' to focus search
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                searchBox.focus();
            }
            
            // Press 'Escape' to clear search
            if (e.key === 'Escape') {
                searchBox.value = '';
                currentSearch = '';
                applyFilters();
                searchBox.blur();
            }
            
            // Press 'd' to toggle dark mode
            if (e.key === 'd' && !e.ctrlKey && !e.metaKey && document.activeElement !== searchBox) {
                toggleDarkMode();
            }
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Add animation to charts on load
            setTimeout(() => {
                document.querySelectorAll('.file-bar-fill').forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.opacity = '1';
                    }, index * 50);
                });
            }, 100);
            
            // Show help tooltip on first visit
            if (!localStorage.getItem('helpShown')) {
                console.log('Keyboard shortcuts: / = search, d = dark mode, Esc = clear');
                localStorage.setItem('helpShown', 'true');
            }
        });
    </script>
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

