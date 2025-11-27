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
        
        # Lychee v0.21.0+ uses error_map, older versions used fail_map
        # Try error_map first (new format), fall back to fail_map (old format)
        error_map = data.get('error_map', data.get('fail_map', {}))
        
        for file_path, failures in error_map.items():
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


def parse_gitleaks(report_path):
    """Parse Gitleaks JSON output."""
    if not report_path.exists():
        return []
    
    try:
        with open(report_path, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            # Check if file is empty
            if not content:
                return []
            data = json.loads(content)
    except:
        return []
    
    issues = []
    # Gitleaks returns a list of findings
    if isinstance(data, list):
        for finding in data:
            # Extract relevant information
            file_path = finding.get('File', 'unknown')
            start_line = finding.get('StartLine', 1)
            end_line = finding.get('EndLine', start_line)
            rule_id = finding.get('RuleID', 'unknown')
            description = finding.get('Description', 'Secret detected')
            secret = finding.get('Secret', '')
            
            # Mask the secret for display (show first/last few chars)
            if len(secret) > 10:
                masked_secret = f"{secret[:4]}...{secret[-4:]}"
            else:
                masked_secret = "***"
            
            message = f"{description}: {masked_secret}"
            
            issues.append({
                'file': file_path,
                'line': str(start_line),
                'column': '1',
                'rule': rule_id,
                'message': message,
                'severity': 'error'
            })
    
    return issues


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
        'gitbook-validation': [],
        'gitleaks': []
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
    
    # Pre-define sources to ensure order and existence even if empty
    sources_list = [
        'markdownlint', 'vale', 'lychee-internal', 
        'lychee-external', 'code-validation', 
        'gitbook-validation', 'gitleaks'
    ]
    
    for source in sources_list:
        by_source[source] = []

    for issue in all_issues:
        source = issue.get('source', 'unknown')
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(issue)
        
        file_path = issue.get('file', 'unknown')
        by_file[file_path] = by_file.get(file_path, 0) + 1
    
    top_files = sorted(by_file.items(), key=lambda x: x[1], reverse=True)[:10]
    
    severity_counts = {'error': 0, 'warning': 0, 'suggestion': 0}
    for issue in all_issues:
        s = issue.get('severity', 'error')
        severity_counts[s] = severity_counts.get(s, 0) + 1
            
    by_rule = {}
    for issue in all_issues:
        rule_key = f"{issue.get('rule', 'unknown')} ({issue.get('source', 'unknown')})"
        if rule_key not in by_rule: 
            by_rule[rule_key] = {'count': 0, 'source': issue.get('source'), 'rule': issue.get('rule')}
        by_rule[rule_key]['count'] += 1
    top_rules = sorted(by_rule.items(), key=lambda x: x[1]['count'], reverse=True)[:15]

    # Icon mapping
    icons = {
        'markdownlint': '📝',
        'vale': '✍️',
        'lychee-internal': '🔗',
        'lychee-external': '🌐',
        'code-validation': '💻',
        'gitbook-validation': '📚',
        'gitleaks': '🔐'
    }

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quality Report</title>
    <style>
        :root {{
            /* Professional Blue Palette */
            --primary: #2563eb;       /* Royal Blue */
            --primary-dark: #1e40af;
            --header-bg: #1e293b;     /* Slate 800 */
            
            --bg-body: #f8fafc;
            --bg-card: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            
            /* Severities */
            --error: #ef4444;
            --error-bg: #fef2f2;
            --error-border: #fecaca;
            --warning: #f59e0b;
            --warning-bg: #fffbeb;
            --warning-border: #fde68a;
            --info: #3b82f6;
            --info-bg: #eff6ff;
            --info-border: #bfdbfe;
            
            --radius: 8px;
            --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }}
        
        body.dark-mode {{
            --header-bg: #0f172a;
            --bg-body: #0f172a;
            --bg-card: #1e293b;
            --text-main: #f1f5f9;
            --text-muted: #94a3b8;
            --border: #334155;
            --error-bg: #450a0a;
            --error-border: #7f1d1d;
            --warning-bg: #451a03;
            --warning-border: #78350f;
            --info-bg: #172554;
            --info-border: #1e40af;
        }}
        
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: var(--bg-body);
            color: var(--text-main);
            line-height: 1.5;
            padding-bottom: 60px;
        }}
        
        /* Header */
        .header {{
            position: sticky;
            top: 0;
            z-index: 100;
            background: var(--header-bg);
            color: white;
            padding: 16px 0;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            margin-bottom: 32px;
        }}
        
        .header-content {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
        }}

        .header h1 {{ font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 10px; }}
        
        .controls {{ display: flex; gap: 10px; flex-wrap: wrap; }}
        
        .search-box {{
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            min-width: 200px;
            font-size: 14px;
        }}
        .search-box::placeholder {{ color: rgba(255,255,255,0.5); }}
        .search-box:focus {{ outline: none; background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); }}

        .btn {{
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: rgba(255,255,255,0.8);
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
        }}
        .btn:hover {{ background: rgba(255,255,255,0.1); color: white; }}
        .btn.active {{ background: var(--primary); border-color: var(--primary); color: white; }}

        .container {{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }}
        
        /* Stats Grid */
        .grid-header {{ font-size: 14px; font-weight: 600; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }}
        
        .card {{
            background: var(--bg-card);
            border-radius: var(--radius);
            padding: 20px;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
            transition: transform 0.2s, border-color 0.2s;
            text-decoration: none;
            display: block;
        }}
        
        a.card:hover {{ transform: translateY(-2px); border-color: var(--primary); }}
        
        .stat-value {{ font-size: 28px; font-weight: 700; line-height: 1.2; margin-bottom: 4px; color: var(--text-main); }}
        .stat-label {{ color: var(--text-muted); font-size: 13px; font-weight: 500; }}
        .stat-icon {{ float: right; font-size: 20px; opacity: 0.8; }}
        
        .text-error {{ color: var(--error); }}
        .text-warning {{ color: var(--warning); }}
        
        /* Tool Breakdown Grid */
        .tools-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }}
        
        .tool-card {{
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
        }}
        .tool-card:hover {{ border-color: var(--primary); box-shadow: var(--shadow); }}
        .tool-card.empty {{ opacity: 0.6; }}
        
        .tool-info h3 {{ font-size: 14px; font-weight: 600; color: var(--text-main); margin-bottom: 2px; }}
        .tool-info span {{ font-size: 12px; color: var(--text-muted); }}
        .tool-count {{ 
            font-size: 16px; font-weight: 700; 
            background: var(--bg-body); padding: 4px 10px; border-radius: 20px; 
            color: var(--text-main);
        }}
        .tool-count.has-issues {{ background: var(--error-bg); color: var(--error); }}

        /* Charts */
        .charts-row {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
        }}
        @media (max-width: 900px) {{ .charts-row {{ grid-template-columns: 1fr; }} }}

        /* Bar Chart */
        .bar-chart {{ display: flex; flex-direction: column; gap: 10px; }}
        .bar-row {{ display: flex; align-items: center; gap: 12px; font-size: 13px; }}
        .bar-label {{ width: 180px; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: monospace; color: var(--text-muted); }}
        .bar-track {{ flex: 1; background: var(--bg-body); border: 1px solid var(--border); height: 8px; border-radius: 4px; overflow: hidden; }}
        .bar-fill {{ height: 100%; background: var(--primary); border-radius: 4px; width: 0; transition: width 1s ease; }}
        .bar-value {{ width: 30px; font-weight: 600; color: var(--text-muted); }}

        /* Sections (Collapsed by default) */
        .section {{ background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; margin-bottom: 16px; }}
        
        .section-header {{
            padding: 14px 20px;
            background: var(--bg-card);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            user-select: none;
            border-bottom: 1px solid transparent;
            transition: background 0.2s;
        }}
        .section-header:hover {{ background: var(--bg-body); }}
        
        .section:not(.collapsed) .section-header {{ border-bottom-color: var(--border); background: var(--bg-body); }}

        .section-title {{ font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 8px; color: var(--text-main); }}
        .arrow {{ transition: transform 0.2s; color: var(--text-muted); }}
        
        .issue-grid {{ display: block; }}
        .collapsed .issue-grid {{ display: none; }}
        .collapsed .arrow {{ transform: rotate(-90deg); }}
        
        /* Issues */
        .issue {{
            padding: 12px 20px;
            border-bottom: 1px solid var(--border);
            border-left: 3px solid transparent;
            display: grid;
            grid-template-columns: 70px 1fr;
            gap: 16px;
            align-items: flex-start;
            font-size: 14px;
        }}
        .issue:last-child {{ border-bottom: none; }}
        .issue:hover {{ background: var(--bg-body); }}
        
        .issue.error {{ border-left-color: var(--error); }}
        .issue.warning {{ border-left-color: var(--warning); }}
        .issue.suggestion {{ border-left-color: var(--info); }}
        
        .sev-badge {{
            font-size: 10px; font-weight: 700; text-transform: uppercase;
            text-align: center; padding: 2px 0; border-radius: 4px;
        }}
        .issue.error .sev-badge {{ color: var(--error); background: var(--error-bg); border: 1px solid var(--error-border); }}
        .issue.warning .sev-badge {{ color: var(--warning); background: var(--warning-bg); border: 1px solid var(--warning-border); }}
        .issue.suggestion .sev-badge {{ color: var(--info); background: var(--info-bg); border: 1px solid var(--info-border); }}
        
        .issue-loc {{ font-family: monospace; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }}
        .issue-msg {{ color: var(--text-main); word-wrap: break-word; }}

        .zero-state {{ text-align: center; padding: 60px; color: var(--text-muted); }}
        .hidden {{ display: none !important; }}
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <h1>🛡️ Quality Report</h1>
            <div class="controls">
                <input type="text" id="search" class="search-box" placeholder="Filter files..." onkeyup="filterIssues()">
                <button class="btn active" onclick="filterSeverity('all', this)">All</button>
                <button class="btn" onclick="filterSeverity('error', this)">Errors</button>
                <button class="btn" onclick="filterSeverity('warning', this)">Warnings</button>
                <button class="btn" onclick="toggleDark()">🌙</button>
            </div>
        </div>
    </div>

    <div class="container">
"""
    
    if len(all_issues) == 0:
        html += """
        <div class="zero-state">
            <div style="font-size: 48px; margin-bottom: 16px">✨</div>
            <h2>No issues found</h2>
            <p>Your documentation passed all checks.</p>
        </div>
        """
    else:
        # 1. Global Stats
        html += f"""
        <div class="grid-header">Overview</div>
        <div class="stats-grid">
            <div class="card">
                <div class="stat-value text-error">{len(all_issues)}</div>
                <div class="stat-label">Total Issues</div>
            </div>
            <div class="card">
                <div class="stat-value">{len(by_file)}</div>
                <div class="stat-label">Files Affected</div>
            </div>
             <div class="card">
                <div class="stat-value text-error">{severity_counts['error']}</div>
                <div class="stat-label">Errors</div>
            </div>
             <div class="card">
                <div class="stat-value text-warning">{severity_counts['warning']}</div>
                <div class="stat-label">Warnings</div>
            </div>
        </div>

        <div class="grid-header">Tool Breakdown</div>
        <div class="tools-grid">
        """
        
        for source in sources_list:
            count = len(by_source.get(source, []))
            if count == 0:
                html += f"""
                <div class="tool-card empty">
                    <div class="tool-info">
                        <h3>{icons.get(source, '')} {source.title().replace('-', ' ')}</h3>
                        <span>Pass</span>
                    </div>
                    <span class="tool-count">0</span>
                </div>
                """
            else:
                html += f"""
                <a href="#sec-{source}" class="tool-card" onclick="expandSection('sec-{source}')">
                    <div class="tool-info">
                        <h3>{icons.get(source, '')} {source.title().replace('-', ' ')}</h3>
                        <span>{count} issues</span>
                    </div>
                    <span class="tool-count has-issues">{count}</span>
                </a>
                """
        
        html += """
        </div>

        <div class="charts-row">
            <div class="card">
                <div class="grid-header" style="margin-bottom:16px">Top Problematic Files</div>
                <div class="bar-chart">
        """
        
        max_f = top_files[0][1] if top_files else 1
        for fpath, count in top_files:
            pct = (count / max_f) * 100
            html += f"""
                    <div class="bar-row">
                        <div class="bar-label" title="{fpath}">{fpath.split('/')[-1]}</div>
                        <div class="bar-track"><div class="bar-fill" style="width: {pct}%"></div></div>
                        <div class="bar-value">{count}</div>
                    </div>
            """
            
        html += """
                </div>
            </div>
            <div class="card">
                <div class="grid-header" style="margin-bottom:16px">Top Violations</div>
                <div class="bar-chart">
        """
        
        max_r = top_rules[0][1]['count'] if top_rules else 1
        for rkey, rdata in top_rules:
            count = rdata['count']
            pct = (count / max_r) * 100
            clean_rule = rkey.split('(')[0].strip()
            html += f"""
                    <div class="bar-row">
                        <div class="bar-label" title="{rkey}">{clean_rule}</div>
                        <div class="bar-track"><div class="bar-fill" style="width: {pct}%"></div></div>
                        <div class="bar-value">{count}</div>
                    </div>
            """

        html += """
                </div>
            </div>
        </div>
        """

        # 4. Detailed Sections (Collapsed by default)
        for source in sources_list:
            issues = by_source.get(source, [])
            if not issues: continue
            
            html += f"""
            <div class="section collapsed" id="sec-{source}">
                <div class="section-header" onclick="toggleSection('sec-{source}')">
                    <div class="section-title">
                        <span class="arrow">▼</span>
                        {icons.get(source, '')} {source.title().replace('-', ' ')}
                    </div>
                    <span class="tool-count { 'has-issues' if len(issues) > 0 else '' }">{len(issues)}</span>
                </div>
                <div class="issue-grid">
            """
            
            for issue in issues:
                sev = issue.get('severity', 'error')
                msg = issue.get('message', '').replace('<', '&lt;').replace('>', '&gt;')
                loc = f"{issue['file']}:{issue['line']}"
                
                html += f"""
                    <div class="issue {sev}" data-sev="{sev}" data-text="{issue['file']} {msg}">
                        <div class="sev-col">
                            <div class="sev-badge">{sev}</div>
                        </div>
                        <div class="issue-content">
                            <div class="issue-loc">{loc} &middot; {issue.get('rule', '')}</div>
                            <div class="issue-msg">{msg}</div>
                        </div>
                    </div>
                """
            html += "</div></div>"

    html += """
    </div>
    <script>
        // Dark Mode
        if(localStorage.getItem('dark')==='1') document.body.classList.add('dark-mode');
        function toggleDark() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('dark', document.body.classList.contains('dark-mode') ? '1' : '0');
        }
        
        // Toggles
        function toggleSection(id) {
            document.getElementById(id).classList.toggle('collapsed');
        }
        
        function expandSection(id) {
            document.getElementById(id).classList.remove('collapsed');
            // Small delay to allow expansion before scroll
            setTimeout(() => {
                document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 100);
        }
        
        // Filters
        let activeSev = 'all';
        function filterSeverity(sev, btn) {
            activeSev = sev;
            document.querySelectorAll('.controls .btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        }
        
        function filterIssues() {
            applyFilters();
        }
        
        function applyFilters() {
            const query = document.getElementById('search').value.toLowerCase();
            const sections = document.querySelectorAll('.section');
            
            sections.forEach(sec => {
                let visibleCount = 0;
                const rows = sec.querySelectorAll('.issue');
                
                rows.forEach(row => {
                    const matchesSev = activeSev === 'all' || row.dataset.sev === activeSev;
                    const matchesText = row.dataset.text.toLowerCase().includes(query);
                    
                    if (matchesSev && matchesText) {
                        row.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        row.classList.add('hidden');
                    }
                });
                
                if (visibleCount === 0) {
                    sec.classList.add('hidden');
                } else {
                    sec.classList.remove('hidden');
                    // If searching, auto-expand relevant sections
                    if (query !== '' || activeSev !== 'all') {
                        sec.classList.remove('collapsed');
                    }
                }
            });
        }
        
        // Init animations
        setTimeout(() => {
            document.querySelectorAll('.bar-fill').forEach(el => el.style.width = el.style.width);
        }, 100);
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
    
    # Parse Gitleaks secrets detection
    issues = parse_gitleaks(reports_dir / 'gitleaks.json')
    for issue in issues:
        issue['source'] = 'gitleaks'
    all_issues.extend(issues)
    print(f"Found {len(issues)} secret/API key issues")
    
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
    
    # Exit with non-zero if issues found
    if len(all_issues) > 0:
        sys.exit(1)


if __name__ == '__main__':
    main()

