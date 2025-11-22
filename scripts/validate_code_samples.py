#!/usr/bin/env python3
"""
Validate code samples in markdown files.

Checks syntax for Python, JavaScript, Shell, R, and SQL code blocks.
"""

import ast
import os
import re
import sys
from pathlib import Path
from junit_xml import TestSuite, TestCase

try:
    import esprima
except ImportError:
    esprima = None
    print("Warning: esprima not installed. JavaScript validation disabled.")


def extract_code_blocks(filepath):
    """Extract fenced code blocks from a markdown file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match fenced code blocks with language tags
    pattern = r'```(\w+)\n(.*?)```'
    matches = re.finditer(pattern, content, re.DOTALL)
    
    blocks = []
    for match in matches:
        lang = match.group(1).lower()
        code = match.group(2)
        line_num = content[:match.start()].count('\n') + 1
        blocks.append({
            'language': lang,
            'code': code,
            'line': line_num,
            'file': filepath
        })
    
    return blocks


def validate_python(code):
    """Validate Python code syntax."""
    try:
        ast.parse(code)
        return True, None
    except SyntaxError as e:
        return False, f"Line {e.lineno}: {e.msg}"
    except Exception as e:
        return False, str(e)


def validate_javascript(code):
    """Validate JavaScript code syntax."""
    if esprima is None:
        return True, "JavaScript validation skipped (esprima not installed)"
    
    try:
        esprima.parseScript(code)
        return True, None
    except Exception as e:
        return False, str(e)


def validate_shell(code):
    """Basic shell script validation."""
    # Check for common shell syntax errors
    errors = []
    
    lines = code.split('\n')
    for i, line in enumerate(lines, 1):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        
        # Check for unmatched quotes
        single_quotes = line.count("'") - line.count("\\'")
        double_quotes = line.count('"') - line.count('\\"')
        
        if single_quotes % 2 != 0:
            errors.append(f"Line {i}: Unmatched single quote")
        if double_quotes % 2 != 0:
            errors.append(f"Line {i}: Unmatched double quote")
    
    if errors:
        return False, "; ".join(errors)
    return True, None


def validate_r(code):
    """Basic R code validation."""
    # Basic checks for R syntax
    errors = []
    
    lines = code.split('\n')
    for i, line in enumerate(lines, 1):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        
        # Check for unmatched parentheses
        if line.count('(') != line.count(')'):
            errors.append(f"Line {i}: Unmatched parentheses")
        if line.count('[') != line.count(']'):
            errors.append(f"Line {i}: Unmatched brackets")
        if line.count('{') != line.count('}'):
            errors.append(f"Line {i}: Unmatched braces")
    
    if errors:
        return False, "; ".join(errors)
    return True, None


def validate_sql(code):
    """Basic SQL validation."""
    # Basic checks for SQL syntax
    errors = []
    
    # Check for common SQL keywords to ensure it's at least SQL-like
    sql_keywords = ['select', 'from', 'where', 'insert', 'update', 'delete', 'create', 'drop', 'alter']
    code_lower = code.lower()
    
    has_sql_keyword = any(keyword in code_lower for keyword in sql_keywords)
    if not has_sql_keyword and len(code.strip()) > 0:
        errors.append("No SQL keywords found")
    
    if errors:
        return False, "; ".join(errors)
    return True, None


def validate_code_block(block):
    """Validate a code block based on its language."""
    lang = block['language']
    code = block['code']
    
    validators = {
        'python': validate_python,
        'py': validate_python,
        'javascript': validate_javascript,
        'js': validate_javascript,
        'shell': validate_shell,
        'bash': validate_shell,
        'sh': validate_shell,
        'r': validate_r,
        'sql': validate_sql,
    }
    
    validator = validators.get(lang)
    if validator is None:
        # Skip validation for unsupported languages
        return True, f"Validation not implemented for '{lang}'"
    
    return validator(code)


def main():
    """Main validation function."""
    docs_dir = Path('docs')
    if not docs_dir.exists():
        print(f"Error: docs directory not found")
        sys.exit(1)
    
    # Find all markdown files
    md_files = list(docs_dir.rglob('*.md'))
    
    test_cases = []
    total_blocks = 0
    failed_blocks = 0
    
    for md_file in md_files:
        blocks = extract_code_blocks(md_file)
        total_blocks += len(blocks)
        
        for block in blocks:
            test_name = f"{block['file']}:{block['line']}:{block['language']}"
            tc = TestCase(test_name, classname='CodeValidation')
            
            is_valid, error = validate_code_block(block)
            
            if not is_valid:
                failed_blocks += 1
                tc.add_failure_info(
                    message=f"Syntax error in {block['language']} code block",
                    output=error
                )
                print(f"FAIL: {test_name}")
                print(f"  Error: {error}")
            else:
                if error:  # Warning message
                    print(f"SKIP: {test_name} - {error}")
            
            test_cases.append(tc)
    
    # Generate JUnit XML report
    ts = TestSuite("Code Sample Validation", test_cases)
    output_dir = Path('test-reports')
    output_dir.mkdir(exist_ok=True)
    
    with open(output_dir / 'code-validation.xml', 'w') as f:
        TestSuite.to_xml_string([ts], prettyprint=True, encoding='utf-8')
        f.write(TestSuite.to_xml_string([ts], prettyprint=True))
    
    # Summary
    print(f"\nCode Validation Summary:")
    print(f"  Total code blocks: {total_blocks}")
    print(f"  Failed: {failed_blocks}")
    print(f"  Passed: {total_blocks - failed_blocks}")
    
    # Exit with error code if there were failures
    sys.exit(1 if failed_blocks > 0 else 0)


if __name__ == '__main__':
    main()

