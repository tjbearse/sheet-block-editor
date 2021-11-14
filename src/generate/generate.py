#!/usr/bin/env python3

from collections import defaultdict
from pathlib import Path
import argparse
import csv
import json
import matplotlib
import matplotlib.pyplot as plt
import re
import sys

variadicRegex = r"(\.\.\.|…)"
def isVariadic(signature):
    return bool(re.search(variadicRegex, signature))

multiOptionedRegex = r"\[\w+,.*?\]"
def isMultiOptioned(signature):
    return re.search(multiOptionedRegex, signature)

def parseArg(arg):
    variable = re.sub(r'\[(.*)\]', r'\1', arg).upper()
    return (arg.replace("_", " "), variable)

def parseArgs(signature):
    origSignature = signature # used for todos
    todo = None
    # doing variadic first makes some things not multi optioned variadic
    if isVariadic(signature):
        signature = re.sub(r"(,\s*)?" + variadicRegex, "", signature)
        todo = f"dropped options variadic, {origSignature}"
    if isMultiOptioned(signature):
        signature = re.sub(r"(,\s*)?" + multiOptionedRegex, "", signature)
        todo = f"dropped options multi, {origSignature}"

    m = re.search(r"\((.*)\)", signature)
    if not m:
        print(signature)
        raise ValueError("did not match signature format")
    g = m.group(1)
    if not g:
        return [], todo
    else:
        rawArgs = re.split(",\s*", g)
        # text, variable
        # TODO store variadic or optional status
        return list(map(parseArg, rawArgs)), todo

def formatArgs(name, args):
    if not args:
        return name, []
    # note that placeholders are 1 indexed and we have 1 fake element
    message = name + " %1 " + " ".join([ f"{a[0]} %{i+2}" for i, a in enumerate(args)])

    bArgs = [{
            "type": "input_dummy"
        }]
    bArgs += [
        {
            "type": "input_value",
            "name": a[1]
        } for a in args
    ]

    return message, bArgs
    
def buildConfig(typeName, name, style, args, descr, todoNote=None):
    helpText= descr
    message, args0 = formatArgs(name, args)
    block = {
        "type": typeName,
        "message0": message,
        "args0": args0,
        "output": None, # will fill in post, needs to be null
        "style": style,
        "inputsInline": len(args) < 2,
        "tooltip": helpText,
    }
    if todoNote:
        block["TODO"] = todoNote
        block["message0"] = "*" + block["message0"]
        block["tooltip"] += "\n*Implementation not complete"
    return block

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
    cmap = plt.get_cmap('tab20')
    colors = {
        category: matplotlib.colors.to_hex(cmap(i), keep_alpha=False)
        for i, category in enumerate(categories.keys())
    }
    # TODO set color scheme
    blockStyles= {
        f"{category}_style": {
            # TODO set colors
            "colourPrimary": colors[category], # "#4a148c",
            "colourSecondary":"#AD7BE9",
            "colourTertiary":"#CDB6E9"
        }
        for category in categories.keys()
    }
    categoryStyles= {
            f"{category}_category": {
                # TODO set colors
                "colour": colors[category], # "#4a148c"
            }
            for category in categories.keys()
        }
    return {
        'blockStyles' : blockStyles,
        'categoryStyles' : categoryStyles,
        'componentStyles' : {}
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--all', action='store_true')
    parser.add_argument('--blocks', action='store_true')
    parser.add_argument('--toolbox', action='store_true')
    parser.add_argument('--theme', action='store_true')
    options = parser.parse_args()
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
            if not basic:
                # touch category so it exists
                categories[category]
                continue
            typeName= "sheets_" + name.replace(".", "_")
            style = f"{category}_style"
            total += 1
            args = []
            todoNote = None
            try:
                args, todoNote = parseArgs(signature)
                success += 1
            except ValueError as ve:
                print(f'{typeName} failed val error: {ve}. Adding TODO block')
                todoNote = signature
                args = []

            blocks.append(
                buildConfig(typeName, name, style, args, descr, todoNote)
            )
            categories[category].append(typeName)

        genPath = Path("../googleSheets/blocks/generated")
        if any([
                options.blocks,
                options.toolbox,
                options.theme
        ]):
            genPath.mkdir(parents=True, exist_ok=True)

        if options.blocks:
            fp = genPath / "blocks.json"
            with fp.open(mode='w') as bf:
                json.dump(blocks, bf, indent=4)

        if options.toolbox:
            fp = genPath / "toolbox.json"
            with fp.open(mode='w') as tf:
                json.dump(formatAsToolbox(categories), tf, indent=4)

        if options.theme:
            p = genPath / 'theme.json'
            with p.open(mode='w') as tf:
                json.dump(buildTheme(categories), tf, indent=4)

        print(f"built {success} of {total}. {total-success} errors")

if __name__ == "__main__":
    main()
