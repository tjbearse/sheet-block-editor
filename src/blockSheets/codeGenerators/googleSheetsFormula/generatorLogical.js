import GoogleSheets from './googleSheets'

GoogleSheets['sheets_compare'] = function(block) {
	const value_a = GoogleSheets.valueToCode(block, 'A', GoogleSheets.ORDER_RELATIONAL);
	const value_b = GoogleSheets.valueToCode(block, 'B', GoogleSheets.ORDER_RELATIONAL);
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
	
	return [`${value_a} ${op} ${value_b}`, GoogleSheets.ORDER_RELATIONAL]
}
