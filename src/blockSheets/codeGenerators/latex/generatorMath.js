import Latex from './latex'

Latex['sheets_arithmetic'] = function(block) {
	let op;
	let precedence = Latex.ORDER_NONE
	const value_op = block.getFieldValue('OP');

	switch(value_op) {
		case 'ADD':
			op = '+';
			precedence = Latex.ORDER_ADD;
			break;
		case 'MINUS':
			op = '-';
			precedence = Latex.ORDER_SUBTRACT;
			break;
		case 'MULTIPLY':
			op = '*';
			precedence = Latex.ORDER_MULTIPLY;
			break;
		case 'DIVIDE':
		{
			const value_a = Latex.valueToCode(block, 'A', Latex.ORDER_NONE);
			const value_b = Latex.valueToCode(block, 'B', Latex.ORDER_NONE);
			return [`\\frac{${value_a}}{${value_b}}`, Latex.ORDER_ATOMIC]
		}
		case 'POWER':
		{
			const value_a = Latex.valueToCode(block, 'A', Latex.ORDER_EXPONENTIATION);
			const value_b = Latex.valueToCode(block, 'B', Latex.ORDER_NONE);
			return [`${value_a}^${value_b}`, Latex.ORDER_EXPONENTIATION]
		}
		default:
			throw new Error(`unknown operator ${value_op}`)
	}
	const value_a = Latex.valueToCode(block, 'A', precedence);
	const value_b = Latex.valueToCode(block, 'B', precedence);
	
	let format = (a,b,op) => `${a} ${op} ${b}`
	return [format(value_a, value_b, op), precedence]
}

Latex['sheets_negate'] = function(block) {
	const value_a = Latex.valueToCode(block, 'A', Latex.ORDER_UNARY_SIGN);
	return [`-${value_a}`, Latex.ORDER_UNARY_SIGN]
}
