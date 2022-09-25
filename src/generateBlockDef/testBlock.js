import Blockly from 'blockly'

Blockly.Blocks['test_block'] = {
	init: function() {
		this.jsonInit({
			"type": "sheets_ceiling",
			"message0": "Ceiling %1 Value %2 [Factor] %3",
			"args0": [
				{
					"type": "input_dummy"
				},
				{
					"type": "input_value",
					"name": "VALUE",
					"check": [ "Number", "Cell" ]
				},
				{
					"type": "input_value",
					"name": "FACTOR"
				}
			],
			"output": "TYPE HERE",
			"colour": 230,
			"tooltip": "Help Text Here",
			"helpUrl": "URL HERE"
		});
	}
};

Blockly.GoogleSheets['test_block'] = function(block) {
	var value_value = Blockly.GoogleSheets.valueToCode(block, 'VALUE', Blockly.GoogleSheets.ORDER_ATOMIC);
	var value_factor = Blockly.GoogleSheets.valueToCode(block, 'FACTOR', Blockly.GoogleSheets.ORDER_ATOMIC);
	var code = `ceiling(${value_value}` + (value_factor? `, ${value_factor})` : ')')
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.GoogleSheets.ORDER_ATOMIC];
};
