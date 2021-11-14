import Blockly from 'blockly'

const LANG = Blockly.GoogleSheets

LANG['sheets_join'] = function(block) {
	// FIXME precedence
	const value_a = LANG.valueToCode(block, 'A', LANG.ORDER_CONCAT);
	const value_b = LANG.valueToCode(block, 'B', LANG.ORDER_CONCAT);
	return [`${value_a} & ${value_b}`, LANG.ORDER_CONCAT]
}
