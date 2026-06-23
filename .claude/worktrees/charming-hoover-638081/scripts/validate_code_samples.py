#!/usr/bin/env python3
"""
Validate code samples in markdown files.
Improved validation logic and command line arguments.
"""

import ast
import argparse
import re
import sys
import shlex
import shutil
import subprocess
from pathlib import Path
from junit_xml import TestSuite, TestCase

# -------------------------------------------------------------------------
# Validators
# -------------------------------------------------------------------------

def validate_python(code):
    """Validate Python using the built-in AST module."""
    try:
        ast.parse(code)
        return True, None
    except SyntaxError as e:
        return False, f"Line {e.lineno}: {e.msg}"
    except Exception as e:
        return False, str(e)

def validate_shell(code):
    """
    Validate Shell using 'bash -n' if available, otherwise fall back to shlex.
    'bash -n' checks syntax without executing.
    """
    # Method A: Try using the system's bash validator (Much more accurate)
    if shutil.which('bash'):
        try:
            subprocess.run(
                ['bash', '-n', '-c', code], 
                check=True, 
                capture_output=True, 
                text=True
            )
            return True, None
        except subprocess.CalledProcessError as e:
            return False, e.stderr.strip()

    # Method B: Fallback to shlex (Basic tokenization check)
    try:
        shlex.split(code, comments=True)
        return True, None
    except ValueError as e:
        return False, f"Tokenization error: {str(e)}"

# -------------------------------------------------------------------------
# Core Logic
# -------------------------------------------------------------------------

def extract_code_blocks(filepath):
    """
    Extract fenced code blocks.
    Improved Regex handles attributes like ```python {linenos=true}
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex Explanation:
    # ^\s*```          : Start of line, optional indentation, triple backticks
    # ([\w+-]+)        : Group 1 - Language identifier (allow hyphens/plus)
    # (?:[ \t]+.*)?    : Non-capturing - Optional attributes after lang
    # \n               : Newline
    # (.*?)            : Group 2 - The code content (non-greedy)
    # ^\s*```          : End of block
    pattern = r'^\s*```([\w+-]+)(?:[ \t]+.*)?\n(.*?)\n\s*```'
    
    matches = re.finditer(pattern, content, re.MULTILINE | re.DOTALL)
    
    blocks = []
    for match in matches:
        lang = match.group(1).lower()
        code = match.group(2)
        
        # Check for "skip-validate" in the code or preceding comments
        # (Simple check inside the code block for this example)
        if "skip-validate" in code:
            continue

        line_num = content[:match.start()].count('\n') + 1
        blocks.append({
            'language': lang,
            'code': code,
            'line': line_num,
            'file': filepath
        })
    
    return blocks

def validate_code_block(block):
    lang = block['language']
    
    # Normalize language tags
    mapping = {
        'py': 'python', 'python': 'python',
        'sh': 'shell', 'bash': 'shell', 'shell': 'shell', 'zsh': 'shell'
    }
    
    target_lang = mapping.get(lang)
    
    validators = {
        'python': validate_python,
        'shell': validate_shell
    }
    
    validator = validators.get(target_lang)
    
    if not validator:
        # Do not fail on unknown languages (like 'yaml' or 'json')
        # just silently skip or mark as skipped
        return True, f"SKIPPED: No validator for '{lang}'"
    
    return validator(block['code'])

def main():
    parser = argparse.ArgumentParser(description="Validate markdown code samples")
    parser.add_argument('--input', '-i', default='docs', help="Input directory")
    parser.add_argument('--output', '-o', default='test-reports', help="Report output directory")
    args = parser.parse_args()

    docs_dir = Path(args.input)
    if not docs_dir.exists():
        print(f"Error: Directory '{docs_dir}' not found")
        sys.exit(1)
    
    md_files = list(docs_dir.rglob('*.md'))
    test_cases = []
    failed_count = 0
    total_count = 0
    
    print(f"Scanning {len(md_files)} files in '{docs_dir}'...")

    for md_file in md_files:
        blocks = extract_code_blocks(md_file)
        total_count += len(blocks)
        
        for block in blocks:
            test_name = f"{block['file'].name}:{block['line']} ({block['language']})"
            tc = TestCase(test_name, file=str(block['file']), line=block['line'], classname=block['language'])
            
            is_valid, msg = validate_code_block(block)
            
            if not is_valid:
                failed_count += 1
                tc.add_failure_info(message=msg)
                print(f"❌ FAIL: {test_name} -> {msg}")
            elif msg and "SKIPPED" in msg:
                tc.add_skipped_info(message=msg)
                # print(f"⚠️  SKIP: {test_name}") # Optional: reduce noise
            else:
                pass # Passed
            
            test_cases.append(tc)

    # Generate Report
    ts = TestSuite("Markdown Code Validation", test_cases)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    xml_out = output_dir / 'code-validation.xml'
    with open(xml_out, 'w', encoding='utf-8') as f:
        f.write(TestSuite.to_xml_string([ts], prettyprint=True))
    
    print(f"\nSummary:")
    print(f"  Total Blocks: {total_count}")
    print(f"  Passed: {total_count - failed_count}")
    print(f"  Failed: {failed_count}")
    print(f"  Report: {xml_out}")
    
    sys.exit(1 if failed_count > 0 else 0)

if __name__ == '__main__':
    main()