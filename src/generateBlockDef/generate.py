#!/usr/bin/env python3

from collections import defaultdict
from pathlib import Path
import argparse
import csv
import json
import re
import sys

colorPalette=[
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5'
]

variadicRegex = r"(\.\.\.|…)"
def isVariadic(signature):
    return bool(re.search(variadicRegex, signature))


def extractEnumeration(items):
    try:
        start = int(items[0][-1])
    except:
        start = 1
    items = [ re.sub(r'[0-9]$', '', e) for e in items ]
    return items, start

ellipsisChar = u"…"
def parseArgs(signature):
    # special cases
    if signature.startswith('SWITCH'):
        return (
            ['expression', 'case1', 'value1', 'default'],
            dict(
                    argNames=['case', 'value'],
                    enumStart=2,
                    positionStart=3,
            )
        )
    elif signature.startswith('GETPIVOTDATA'):
        # TODO js needs to be able to handle this, github issue #36
        """
        return (
            ['value_name', 'any_pivot_table_cell'],
            dict(
                argNames=['original_column', 'pivot_item'],
                enumStart=1,
                positionStart=2,
                series=True,
            )
        )
        """
        return ['value_name', 'any_pivot_table_cell'], None

    m = re.search(r"\((.*)\)", signature)
    if not m:
        print(signature)
        raise ValueError("did not match signature format")
    g = m.group(1)
    if not g:
        return [], None

    argGroups = re.findall(r'(\[.*?\]|\w+|\.{3}|…)(?:,|$)', g)
    variadic = None

    # find variadic
    if argGroups[-1] in ['...', ellipsisChar]:
        argGroups.pop()
        withoutBrace = argGroups.pop()[1:-1]
        vArgNames, enumStart = extractEnumeration(re.split(r',\s*', withoutBrace))
        variadic = dict(
            argNames=vArgNames,
            enumStart=enumStart,
            positionStart=len(argGroups)
        )

    elif isVariadic(argGroups[-1]):
        insideBrace = argGroups.pop()[1:-1]
        vArgNames, enumStart = extractEnumeration(re.split(r',\s*', insideBrace)[:-1])
        variadic = dict(
            argNames=vArgNames,
            enumStart=enumStart,
            positionStart=len(argGroups)
        )

    return argGroups, variadic

def buildBlockSlimJSONConfig(typeName, name, style, args, vargs, descr):
    inline = len(args) < 2 and vargs is None
    bDef = [
        name,
        style,
        1 if inline else 0,
        descr,
        args,
    ]
    if vargs is not None:
        v = [vargs.get('argNames'), vargs.get('enumStart'), vargs.get('positionStart'), vargs.get('series')]
        # trim to last non None
        lastNone = len(v)
        for vi, val in reversed(list(enumerate(v))):
            if val is not None:
                break
            lastNone = vi
        v = v[:lastNone]
        bDef.append(v)
    return bDef

def formatCategory(name, blocks):
    if not blocks:
        return ""
    contents = [{
        "kind": "block",
        "type": b
    } for b in blocks ]
    return {
        "kind": "category",
        "name": name,
        "categoryStyle": f"{name}_category",
        "contents": contents
    }

def formatAsToolbox(categories):
    contents = [
        formatCategory(name, blocks)
        for name, blocks in categories.items()
        if blocks
    ]
    return {
        "kind": "categoryToolbox",
        "contents": contents
    }

def buildTheme(categories):
    # TODO select specific colors for each category
    colors = {
        category: colorPalette[i]
        for i, category in enumerate(categories.keys())
    }
    blockStyles= {
        f"{category}_style": {
            "colourPrimary": colors[category],
            "colourSecondary":"#AD7BE9",
            "colourTertiary":"#CDB6E9"
        }
        for category in categories.keys()
    }
    categoryStyles= {
            f"{category}_category": {
                "colour": colors[category],
            }
            for category in categories.keys()
        }
    return {
        'blockStyles' : blockStyles,
        'categoryStyles' : categoryStyles,
        'componentStyles' : {}
    }

def main(options):
    if options.all:
        options.blocks = True
        options.toolbox = True
        options.theme = True
    elif not any([
            options.blocks,
            options.toolbox,
            options.theme,
        ]):
        parser.print_help(sys.stderr)
        exit(2)

    with open('sheetsData.txt', newline='') as tsvfile:
        reader = csv.reader(tsvfile, delimiter='\t')
        # throw out the header
        next(reader)
        categories = defaultdict(list)
        blocks = list()
        success = 0
        total = 0
        for category, name, basic, signature, descr in reader:
            descr = re.sub(r'\s*learn more$', '', descr, flags=re.I);
            typeName= "sheets_" + name.replace(".", "_")
            style = f"{category}_style"
            total += 1
            args = []
            try:
                args, vargs = parseArgs(signature)
                success += 1
            except ValueError as ve:
                print(f'{typeName} failed val error: {ve}. Adding TODO block')
                args = []
                vargs = None

            blocks.append(
                buildBlockSlimJSONConfig(typeName, name, style, args, vargs, descr)
            )
            categories[category].append(typeName)

        genPath = Path("../blockSheets/generatedBlocks/generated")
        if any([
                options.blocks,
                options.toolbox,
                options.theme
        ]):
            genPath.mkdir(parents=True, exist_ok=True)

        if options.blocks:
            fp = genPath / "blocks.json"
            with fp.open(mode='w') as bf:
                json.dump(blocks, bf)

        if options.toolbox:
            fp = genPath / "toolbox.json"
            with fp.open(mode='w') as tf:
                json.dump(formatAsToolbox(categories), tf)

        if options.theme:
            p = genPath / 'theme.json'
            with p.open(mode='w') as tf:
                json.dump(buildTheme(categories), tf)

        print(f"built {success} of {total}. {total - success} errors")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--all', action='store_true')
    parser.add_argument('--blocks', action='store_true')
    parser.add_argument('--toolbox', action='store_true')
    parser.add_argument('--theme', action='store_true')

    options = parser.parse_args()
    main(options)
