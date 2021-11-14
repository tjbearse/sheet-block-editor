import Blockly from 'blockly'

const LANG = Blockly.GoogleSheets

LANG['sheets_arithmetic'] = function(block) {
	// FIXME precedence
	const value_a = LANG.valueToCode(block, 'A', LANG.ORDER_ATOMIC);
	const value_b = LANG.valueToCode(block, 'B', LANG.ORDER_ATOMIC);
	const value_op = block.getFieldValue('OP');
	let op;
	switch(value_op) {
		case 'ADD': op = '+'; break;
		case 'MINUS': op = '-'; break;
		case 'MULTIPLY': op = '*'; break;
		case 'DIVIDE': op = '/'; break;
		case 'POWER': op = '^'; break;
		default:
			throw new Error(`unknown operator ${value_op}`)
	}
	
	return [`${value_a} ${op} ${value_b}`, LANG.ORDER_NONE]
}

LANG['sheets_negate'] = function(block) {
	// FIXME precedence
	const value_a = LANG.valueToCode(block, 'A', LANG.ORDER_ATOMIC);
	return [`-${value_a}`, LANG.ORDER_NONE]
}
