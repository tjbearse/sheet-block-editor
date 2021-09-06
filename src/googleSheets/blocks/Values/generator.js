import Blockly from 'blockly'

// generators for built ins
Blockly.GoogleSheets['sheets_number'] = function(block) {
	const code = Number(block.getFieldValue('NUM'));
	return [code, Blockly.GoogleSheets.ORDER_ATOMIC];
};

Blockly.GoogleSheets['sheets_text'] = function(block) {
	const code = Blockly.GoogleSheets.quote_(block.getFieldValue('TEXT'));
	return [code, Blockly.GoogleSheets.ORDER_ATOMIC];
};

Blockly.GoogleSheets['sheets_boolean'] = function(block) {
	const code = block.getFieldValue('BOOL')
	return [code, Blockly.GoogleSheets.ORDER_ATOMIC];
};

Blockly.GoogleSheets['sheets_cell'] = function(block) {
	const text_cell = block.getFieldValue('CELL');
	// FIXME I can inject here with text ") & whaterver I want"
	const code = `${text_cell}`
	return [code, Blockly.GoogleSheets.ORDER_ATOMIC];
};
