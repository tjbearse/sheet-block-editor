import Blockly from 'blockly'
/**
 * these block definitions are derived from standard blockly blocks
 * math_number, text, logic_boolean
 * available here: https://github.com/google/blockly/tree/master/blocks
 * Those blocks are Copyright 2012 Google LLC and licensed under Apache-2.0
 */
Blockly.defineBlocksWithJsonArray([
	{
		// blockly/math/math_number
		"type": "sheets_number",
		"message0": "%1",
		"args0": [{
			"type": "field_number",
			"name": "NUM",
			"value": 0
		}],
		"output": "Number",
		"style": "Value_style",
	}, {
		// removed the quote image extension
		"type": "sheets_text",
		"message0": "\"%1\"",
		"args0": [{
			"type": "field_input",
			"name": "TEXT",
			"text": ""
		}],
		"output": "String",
		"style": "Value_style",
	}, {
		// blockly/logic/logic_boolean
		"type": "sheets_boolean",
		"message0": "%1",
		"args0": [
			{
				"type": "field_dropdown",
				"name": "BOOL",
				"options": [
					["True", "TRUE"],
					["False", "FALSE"]
				]
			}
		],
		"output": "Boolean",
		"style": "Value_style",
	},
])
