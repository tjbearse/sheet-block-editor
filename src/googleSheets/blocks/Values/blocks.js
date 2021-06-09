import Blockly from 'blockly'

import './standardBlocks.js'
// TODO array syntax
// TODO math, paren, and '&' operators (pull into math?)
// TODO value style

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
		"style": "value_blocks",
		"tooltip": "A cell, range of cells, or named range",
		"helpUrl": ""
	},
])
