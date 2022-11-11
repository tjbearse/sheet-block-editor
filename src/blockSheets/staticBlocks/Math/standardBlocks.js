import Blockly from 'blockly'
/**
 * these block definitions are derived from standard blockly blocks
 * math_arithmetic
 * available here: https://github.com/google/blockly/tree/master/blocks
 * Those blocks are Copyright 2012 Google LLC and licensed under Apache-2.0
 */
Blockly.defineBlocksWithJsonArray([
	{
		"type": "sheets_arithmetic",
		"message0": "%1 %2 %3",
		"args0": [
			{
				"type": "input_value",
				"name": "A",
			},
			{
				"type": "field_dropdown",
				"name": "OP",
				"options": [
					["+", "ADD"],
					["-", "MINUS"],
					["*", "MULTIPLY"],
					["/", "DIVIDE"],
					["^", "POWER"]
				]
			},
			{
				"type": "input_value",
				"name": "B",
			}
		],
		"inputsInline": true,
		"output": "Number",
		"style": "Math_style",
	}
])
