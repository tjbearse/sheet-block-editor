import Latex from './latex'

Latex['sheets_compare'] = function(block) {
	const value_a = Latex.valueToCode(block, 'A', Latex.ORDER_RELATIONAL);
	const value_b = Latex.valueToCode(block, 'B', Latex.ORDER_RELATIONAL);
	const value_op = block.getFieldValue('OP');
	let op;
	switch(value_op) {
		case 'EQ': op = '='; break;
		case 'NEQ': op = '<>'; break;
		case 'LT': op = '<'; break;
		case 'LTE': op = '<='; break;
		case 'GT': op = '>'; break;
		case 'GTE': op = '>='; break;
		default:
			throw new Error(`unknown operator ${value_op}`)
	}
	
	return [`${value_a} ${op} ${value_b}`, Latex.ORDER_RELATIONAL]
}
