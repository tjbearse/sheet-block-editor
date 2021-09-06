import Blockly from 'blockly'
import jsonBlocks from './blocks.json'

import './standardBlocks'

// TODO format json nicely & implement TODOs
Blockly.defineBlocksWithJsonArray(jsonBlocks);

Blockly.defineBlocksWithJsonArray([
	{
		"type": "sheets_negate",
		"message0": "-%1",
		"args0": [
			{
				"type": "input_value",
				"name": "A",
			},
		],
		"inputsInline": true,
		"style": "Math_style",
		"output": true
	}
])
