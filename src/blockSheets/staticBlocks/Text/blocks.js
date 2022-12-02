import { defineBlocksWithJsonArray } from 'blockly'

defineBlocksWithJsonArray([
	{
		"type": "sheets_join",
		"message0": "%1 & %2",
		"args0": [
			{
				"type": "input_value",
				"name": "A",
			},
			{
				"type": "input_value",
				"name": "B",
			}
		],
		"inputsInline": true,
		"style": "Text_style",
		"output": true
	}
])
