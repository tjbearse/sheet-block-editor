import GoogleSheets from './googleSheets'

GoogleSheets['sheets_arithmetic'] = function(block) {
	let op;
	let precedence = GoogleSheets.ORDER_NONE
	const value_op = block.getFieldValue('OP');
	switch(value_op) {
		case 'ADD':
			op = '+';
			precedence = GoogleSheets.ORDER_ADDITIVE;
			break;
		case 'MINUS':
			op = '-';
			precedence = GoogleSheets.ORDER_ADDITIVE;
			break;
		case 'MULTIPLY':
			op = '*';
			precedence = GoogleSheets.ORDER_MULTIPLICATIVE;
			break;
		case 'DIVIDE':
			op = '/';
			precedence = GoogleSheets.ORDER_MULTIPLICATIVE;
			break;
		case 'POWER':
			op = '^';
			precedence = GoogleSheets.ORDER_EXPONENTIATION;
			break;
		default:
			throw new Error(`unknown operator ${value_op}`)
	}
	const value_a = GoogleSheets.valueToCode(block, 'A', precedence);
	const value_b = GoogleSheets.valueToCode(block, 'B', precedence);
	
	return [`${value_a} ${op} ${value_b}`, precedence]
}

GoogleSheets['sheets_negate'] = function(block) {
	const value_a = GoogleSheets.valueToCode(block, 'A', GoogleSheets.ORDER_UNARY_SIGN);
	return [`-${value_a}`, GoogleSheets.ORDER_UNARY_SIGN]
}
