import Blockly from 'blockly'
/**
 * these block definitions are derived from standard blockly blocks
 * logic_compare
 * available here: https://github.com/google/blockly/tree/master/blocks
 * Those blocks are Copyright 2012 Google LLC and licensed under Apache-2.0
 */
Blockly.defineBlocksWithJsonArray([
	{
		"type": "sheets_compare",
		"message0": "%1 %2 %3",
		"args0": [
			{
				"type": "input_value",
				"name": "A"
			},
			{
				"type": "field_dropdown",
				"name": "OP",
				"options": [
					["=", "EQ"],
					["<>", "NEQ"],
					["<", "LT"],
					["<=", "LTE"],
					[">", "GT"],
					[">=", "GTE"]
				]
			},
			{
				"type": "input_value",
				"name": "B"
			}
		],
		"inputsInline": true,
		"output": "Boolean",
		"style": "Logical_style",
		"helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
	}
])
