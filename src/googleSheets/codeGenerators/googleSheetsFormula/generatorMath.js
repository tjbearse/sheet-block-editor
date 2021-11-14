import Blockly from 'blockly'

const LANG = Blockly.GoogleSheets

LANG['sheets_arithmetic'] = function(block) {
	let op;
	let precedence = LANG.ORDER_NONE
	const value_op = block.getFieldValue('OP');
	switch(value_op) {
		case 'ADD':
			op = '+';
			precedence = LANG.ORDER_ADDITIVE;
			break;
		case 'MINUS':
			op = '-';
			precedence = LANG.ORDER_ADDITIVE;
			break;
		case 'MULTIPLY':
			op = '*';
			precedence = LANG.ORDER_MULTIPLICATIVE;
			break;
		case 'DIVIDE':
			op = '/';
			precedence = LANG.ORDER_MULTIPLICATIVE;
			break;
		case 'POWER':
			op = '^';
			precedence = LANG.ORDER_EXPONENTIATION;
			break;
		default:
			throw new Error(`unknown operator ${value_op}`)
	}
	const value_a = LANG.valueToCode(block, 'A', precedence);
	const value_b = LANG.valueToCode(block, 'B', precedence);
	
	return [`${value_a} ${op} ${value_b}`, precedence]
}

LANG['sheets_negate'] = function(block) {
	const value_a = LANG.valueToCode(block, 'A', LANG.ORDER_UNARY_SIGN);
	return [`-${value_a}`, LANG.ORDER_UNARY_SIGN]
}
