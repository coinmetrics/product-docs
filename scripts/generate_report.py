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
    
    if 'Code' in data and 'Text' in data:
        print(f"Vale error: {data.get('Text', 'Unknown error')}")
        return []
    
    issues = []
    for file_path, file_issues in data.items():
        if not isinstance(file_issues, list):
            continue
            
        for issue in file_issues:
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
        error_map = data.get('error_map', data.get('fail_map', {}))
        
        for file_path, failures in error_map.items():
            for failure in failures:
                url = failure.get('url', 'unknown')
                status = failure.get('status', {})
                status_text = status.get('text', 'Unknown error')
                status_code = status.get('code', '')
                
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
            if not content:
                return []
            data = json.loads(content)
    except:
        return []
    
    issues = []
    if isinstance(data, list):
        for finding in data:
            file_path = finding.get('File', 'unknown')
            start_line = finding.get('StartLine', 1)
            rule_id = finding.get('RuleID', 'unknown')
            description = finding.get('Description', 'Secret detected')
            secret = finding.get('Secret', '')
            
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
                failure_text = failure.text
                
                if failure_text and failure_text.strip():
                    error_lines = [line.strip() for line in failure_text.strip().split('\n') if line.strip()]
                    
                    for error_line in error_lines:
                        file_name = 'unknown'
                        
                        if ': ' in error_line and ('.md' in error_line or 'file' in error_line.lower()):
                            parts = error_line.split(': ')
                            if len(parts) >= 2:
                                potential_file = parts[-1].strip()
                                if '/' in potential_file or '.md' in potential_file:
                                    file_name = potential_file
                        
                        if file_name == 'unknown' and error_line.startswith('docs/'):
                            parts = error_line.split()
                            if parts:
                                file_name = parts[0]
                        
                        issues.append({
                            'file': file_name,
                            'line': '1',
                            'column': '1',
                            'rule': test_name,
                            'message': error_line,
                            'severity': 'error'
                        })
                else:
                    parts = test_name.split(':')
                    issues.append({
                        'file': parts[0] if parts else 'unknown',
                        'line': parts[1] if len(parts) > 1 else '1',
                        'column': '1',
                        'rule': test_name,
                        'message': failure.get('message', 'Test failed'),
                        'severity': 'error'
                    })
        
        return issues
    except:
        return []


def generate_junit_xml(all_issues):
    """Generate consolidated JUnit XML."""
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
        if source in groups:
            groups[source].append(issue)
        else:
            # Handle unexpected sources gracefully
            if 'other' not in groups:
                groups['other'] = []
            groups['other'].append(issue)
    
    testsuites = ET.Element('testsuites')
    
    for group_name, issues in groups.items():
        if not issues:
            continue
            
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
    by_source = {}
    by_file = {}
    
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
    
    # Calculate global severity counts
    severity_counts = {'error': 0, 'warning': 0, 'suggestion': 0}
    for issue in all_issues:
        s = issue.get('severity', 'error').lower()
        # map any non-standard severities to 'error' or 'suggestion' as needed
        if s not in severity_counts:
            s = 'error' 
        severity_counts[s] = severity_counts.get(s, 0) + 1
            
    by_rule = {}
    for issue in all_issues:
        rule_key = f"{issue.get('rule', 'unknown')} ({issue.get('source', 'unknown')})"
        if rule_key not in by_rule: 
            by_rule[rule_key] = {'count': 0, 'source': issue.get('source'), 'rule': issue.get('rule')}
        by_rule[rule_key]['count'] += 1
    top_rules = sorted(by_rule.items(), key=lambda x: x[1]['count'], reverse=True)[:10]

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
    <title>Product Docs Test Summary Results</title>
    <style>
        :root {{
            --primary: #2563eb;
            --primary-dark: #1e40af;
            --header-bg: #1e293b;
            
            --bg-body: #f8fafc;
            --bg-card: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            
            --error: #ef4444;
            --error-bg: #fef2f2;
            --error-border: #fecaca;
            --warning: #f59e0b;
            --warning-bg: #fffbeb;
            --warning-border: #fde68a;
            --info: #3b82f6;
            --info-bg: #eff6ff;
            --info-border: #bfdbfe;
            --success: #10b981;
            --success-bg: rgba(16, 185, 129, 0.1);
            --success-border: rgba(16, 185, 129, 0.3);
            
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
            --success: #10b981;
            --success-bg: #064e3b;
            --success-border: #065f46;
        }}
        
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: var(--bg-body);
            color: var(--text-main);
            line-height: 1.5;
            padding-bottom: 60px;
        }}
        
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
        .header-title {{ display: flex; flex-direction: column; gap: 4px; }}
        .timestamp {{ font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 400; }}
        
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
        
        .stat-value {{ font-size: 28px; font-weight: 700; line-height: 1.2; margin-bottom: 4px; color: var(--text-main); }}
        .stat-label {{ color: var(--text-muted); font-size: 13px; font-weight: 500; }}
        
        .text-error {{ color: var(--error); }}
        .text-warning {{ color: var(--warning); }}
        .text-info {{ color: var(--info); }}
        
        .tools-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-auto-rows: 1fr;
            gap: 16px;
            margin-bottom: 32px;
        }}
        
        .tool-card {{
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 16px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
        }}
        .tool-card:hover {{ border-color: var(--primary); box-shadow: var(--shadow); }}
        .tool-card.empty {{ 
            cursor: default; 
            border-color: var(--success);
            background: linear-gradient(135deg, var(--bg-card) 0%, var(--success-bg) 100%);
        }}
        
        .tool-info h3 {{ font-size: 14px; font-weight: 600; color: var(--text-main); margin-bottom: 4px; }}
        
        .tool-breakdown {{ display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }}
        
        .breakdown-badge {{ 
            font-size: 11px; font-weight: 600; 
            padding: 2px 6px; border-radius: 4px;
            display: inline-flex; align-items: center;
        }}
        .bd-error {{ background: var(--error-bg); color: var(--error); border: 1px solid var(--error-border); }}
        .bd-warning {{ background: var(--warning-bg); color: var(--warning); border: 1px solid var(--warning-border); }}
        .bd-suggestion {{ background: var(--info-bg); color: var(--info); border: 1px solid var(--info-border); }}
        .bd-total {{ background: var(--bg-body); color: var(--text-main); border: 1px solid var(--border); }}
        
        .tool-count {{ 
            font-size: 18px; font-weight: 700; 
            margin-left: 12px;
            color: var(--text-muted);
        }}
        .tool-count.has-issues {{ color: var(--text-main); }}
        .tool-count.pass {{ color: var(--success); }}
        
        .pass-badge {{
            font-size: 12px; font-weight: 600;
            color: var(--success);
            background: var(--success-bg);
            border: 1px solid var(--success-border);
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }}

        /* Charts & Lists */
        .charts-row {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
        }}
        @media (max-width: 900px) {{ .charts-row {{ grid-template-columns: 1fr; }} }}

        .ranked-list {{ display: flex; flex-direction: column; gap: 8px; }}
        .rank-item {{ 
            display: flex; align-items: center; gap: 12px; 
            padding: 10px 12px; 
            background: var(--bg-body); 
            border: 1px solid var(--border); 
            border-radius: 6px;
            font-size: 13px;
            transition: all 0.2s;
        }}
        .rank-item:hover {{ border-color: var(--primary); background: var(--bg-card); }}
        .rank-number {{ 
            font-weight: 700; 
            color: var(--text-muted); 
            min-width: 24px; 
            text-align: center;
            font-size: 12px;
        }}
        .rank-label {{ 
            flex: 1; 
            font-family: monospace; 
            color: var(--text-main); 
            overflow: hidden; 
            text-overflow: ellipsis; 
            white-space: nowrap; 
        }}
        .rank-count {{ 
            font-weight: 700; 
            color: var(--primary); 
            min-width: 32px; 
            text-align: right;
            font-size: 15px;
        }}

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

        .section-title {{ font-weight: 600; font-size: 15px; display: flex; flex-direction: column; gap: 4px; color: var(--text-main); }}
        .section-title-main {{ display: flex; align-items: center; gap: 8px; }}
        .section-subtitle {{ font-size: 11px; font-weight: 400; color: var(--text-muted); }}
        .section:not(.collapsed) .section-subtitle {{ display: none; }}
        .arrow {{ transition: transform 0.2s; color: var(--text-muted); }}
        
        .issue-grid {{ display: block; }}
        .collapsed .issue-grid {{ display: none; }}
        .collapsed .arrow {{ transform: rotate(-90deg); }}
        
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
            <div class="header-title">
                <h1>🛡️ Product Docs Test Summary Results</h1>
                <div class="timestamp">Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
            </div>
            <div class="controls">
                <input type="text" id="search" class="search-box" placeholder="Search by file or message..." onkeyup="filterIssues()">
                <button class="btn active" onclick="filterSeverity('all', this)">All</button>
                <button class="btn" onclick="filterSeverity('error', this)">Errors</button>
                <button class="btn" onclick="filterSeverity('warning', this)">Warnings</button>
                <button class="btn" onclick="filterSeverity('suggestion', this)">Suggestions</button>
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
        # Overview Stats
        html += f"""
        <div class="grid-header">Overview</div>
        <div class="stats-grid">
            <div class="card">
                <div class="stat-value">{len(all_issues)}</div>
                <div class="stat-label">📊 Total Issues</div>
            </div>
            <div class="card">
                <div class="stat-value">{len(by_file)}</div>
                <div class="stat-label">📄 Files Affected</div>
            </div>
             <div class="card">
                <div class="stat-value text-error">{severity_counts['error']}</div>
                <div class="stat-label">🔴 Errors</div>
            </div>
             <div class="card">
                <div class="stat-value text-warning">{severity_counts['warning']}</div>
                <div class="stat-label">🟡 Warnings</div>
            </div>
             <div class="card">
                <div class="stat-value text-info">{severity_counts['suggestion']}</div>
                <div class="stat-label">🔵 Suggestions</div>
            </div>
        </div>

        <div class="grid-header">Tool Breakdown</div>
        <div class="tools-grid">
        """
        
        for source in sources_list:
            source_issues = by_source.get(source, [])
            count = len(source_issues)
            
            # Calculate breakdown per tool
            counts = {'error': 0, 'warning': 0, 'suggestion': 0}
            for i in source_issues:
                s = i.get('severity', 'error').lower()
                if s not in counts: s = 'error'
                counts[s] += 1
            
            if count == 0:
                html += f"""
                <div class="tool-card empty">
                    <div class="tool-info">
                        <h3>{icons.get(source, '')} {source.title().replace('-', ' ')}</h3>
                        <div class="tool-breakdown">
                            <span class="pass-badge">✓ All Clear</span>
                        </div>
                    </div>
                    <span class="tool-count pass">0</span>
                </div>
                """
            else:
                # Generate breakdown badges
                badges_html = ""
                if counts['error'] > 0:
                    badges_html += f'<span class="breakdown-badge bd-error">{counts["error"]} Errors</span>'
                if counts['warning'] > 0:
                    badges_html += f'<span class="breakdown-badge bd-warning">{counts["warning"]} Warnings</span>'
                if counts['suggestion'] > 0:
                    badges_html += f'<span class="breakdown-badge bd-suggestion">{counts["suggestion"]} Suggestions</span>'

                html += f"""
                <a href="#sec-{source}" class="tool-card" onclick="expandSection('sec-{source}')">
                    <div class="tool-info">
                        <h3>{icons.get(source, '')} {source.title().replace('-', ' ')}</h3>
                        <div class="tool-breakdown">
                            {badges_html}
                        </div>
                    </div>
                </a>
                """
        
        html += """
        </div>

        <div class="charts-row">
            <div class="card">
                <div class="grid-header" style="margin-bottom:16px">📁 Top Problematic Files</div>
                <div class="ranked-list">
        """
        
        for idx, (fpath, count) in enumerate(top_files, 1):
            filename = fpath.split('/')[-1]
            html += f"""
                    <div class="rank-item" title="{fpath}">
                        <span class="rank-number">#{idx}</span>
                        <span class="rank-label">{filename}</span>
                        <span class="rank-count">{count}</span>
                    </div>
            """
            
        html += """
                </div>
            </div>
            <div class="card">
                <div class="grid-header" style="margin-bottom:16px">⚠️ Top Violations</div>
                <div class="ranked-list">
        """
        
        for idx, (rkey, rdata) in enumerate(top_rules, 1):
            count = rdata['count']
            clean_rule = rkey.split('(')[0].strip()
            html += f"""
                    <div class="rank-item" title="{rkey}">
                        <span class="rank-number">#{idx}</span>
                        <span class="rank-label">{clean_rule}</span>
                        <span class="rank-count">{count}</span>
                    </div>
            """

        html += """
                </div>
            </div>
        </div>
        """

        # Detailed Sections
        for source in sources_list:
            issues = by_source.get(source, [])
            if not issues: continue
            
            # Calculate severity breakdown for this section
            section_counts = {'error': 0, 'warning': 0, 'suggestion': 0}
            for issue in issues:
                sev = issue.get('severity', 'error').lower()
                if sev not in section_counts:
                    sev = 'error'
                section_counts[sev] += 1
            
            # Build subtitle text
            subtitle_parts = []
            if section_counts['error'] > 0:
                subtitle_parts.append(f"{section_counts['error']:,} errors")
            if section_counts['warning'] > 0:
                subtitle_parts.append(f"{section_counts['warning']:,} warnings")
            if section_counts['suggestion'] > 0:
                subtitle_parts.append(f"{section_counts['suggestion']:,} suggestions")
            subtitle = ", ".join(subtitle_parts) if subtitle_parts else "No issues"
            
            html += f"""
            <div class="section collapsed" id="sec-{source}">
                <div class="section-header" onclick="toggleSection('sec-{source}')">
                    <div class="section-title">
                        <div class="section-title-main">
                            <span class="arrow">▼</span>
                            {icons.get(source, '')} {source.title().replace('-', ' ')}
                        </div>
                        <div class="section-subtitle">{subtitle}</div>
                    </div>
                    <span class="tool-count { 'has-issues' if len(issues) > 0 else '' }">{len(issues)}</span>
                </div>
                <div class="issue-grid">
            """
            
            for issue in issues:
                sev = issue.get('severity', 'error').lower()
                msg = issue.get('message', '').replace('<', '&lt;').replace('>', '&gt;')
                loc = f"{issue['file']}:{issue['line']}"
                
                html += f"""
                    <div class="issue {sev}" data-sev="{sev}" data-text="{issue['file']} {msg}">
                        <div class="sev-col">
                            <div class="sev-badge">{sev.capitalize()}</div>
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
        if(localStorage.getItem('dark')==='1') document.body.classList.add('dark-mode');
        function toggleDark() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('dark', document.body.classList.contains('dark-mode') ? '1' : '0');
        }
        
        function toggleSection(id) {
            document.getElementById(id).classList.toggle('collapsed');
        }
        
        function expandSection(id) {
            document.getElementById(id).classList.remove('collapsed');
            setTimeout(() => {
                document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'start'});
            }, 100);
        }
        
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
                    if (query !== '' || activeSev !== 'all') {
                        sec.classList.remove('collapsed');
                    }
                }
            });
        }
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
    
    all_issues = []
    
    issues = parse_markdownlint(reports_dir / 'markdownlint.txt')
    for issue in issues: issue['source'] = 'markdownlint'
    all_issues.extend(issues)
    print(f"Found {len(issues)} markdownlint issues")
    
    issues = parse_vale(reports_dir / 'vale.json')
    for issue in issues: issue['source'] = 'vale'
    all_issues.extend(issues)
    print(f"Found {len(issues)} Vale issues")
    
    issues = parse_lychee(reports_dir / 'lychee-internal.json')
    for issue in issues: issue['source'] = 'lychee-internal'
    all_issues.extend(issues)
    print(f"Found {len(issues)} internal link issues")
    
    issues = parse_lychee(reports_dir / 'lychee-external.json')
    for issue in issues: issue['source'] = 'lychee-external'
    all_issues.extend(issues)
    print(f"Found {len(issues)} external link issues")
    
    issues = parse_junit_xml(reports_dir / 'code-validation.xml')
    for issue in issues: issue['source'] = 'code-validation'
    all_issues.extend(issues)
    print(f"Found {len(issues)} code validation issues")
    
    issues = parse_junit_xml(reports_dir / 'gitbook-validation.xml')
    for issue in issues: issue['source'] = 'gitbook-validation'
    all_issues.extend(issues)
    print(f"Found {len(issues)} GitBook structure issues")
    
    issues = parse_gitleaks(reports_dir / 'gitleaks.json')
    for issue in issues: issue['source'] = 'gitleaks'
    all_issues.extend(issues)
    print(f"Found {len(issues)} secret/API key issues")
    
    junit_tree = generate_junit_xml(all_issues)
    junit_path = reports_dir / 'junit.xml'
    junit_tree.write(junit_path, encoding='utf-8', xml_declaration=True)
    print(f"\nGenerated JUnit XML: {junit_path}")
    
    html = generate_html_report(all_issues)
    html_path = reports_dir / 'index.html'
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated HTML report: {html_path}")
    
    print(f"\nTotal issues found: {len(all_issues)}")
    
    if len(all_issues) > 0:
        sys.exit(1)


if __name__ == '__main__':
    main()