import Blockly from 'blockly'

import './standardBlocks'
import './arrayLiteral'

Blockly.defineBlocksWithJsonArray([
	{
		"type": "sheets_cell",
		"message0": "Cell Range %1",
		"args0": [
			{
				"type": "field_input",
				"name": "CELL",
				"text": "A1"
			}
		],
		"output": "Cell",
		"style": "Value_style",
		"tooltip": "A cell, range of cells, or named range",
		"helpUrl": ""
	},
	{
		"type": "sheets_formula",
		"message0": "= %1",
		"args0": [
			{
				"type": "input_value",
				"name": "FORMULA"
			}
		],
		"style": "Formula_style",
		"tooltip": "formula",
	}
])
