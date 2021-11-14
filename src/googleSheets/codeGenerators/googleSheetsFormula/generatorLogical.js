import Blockly from 'blockly'

const LANG = Blockly.GoogleSheets

LANG['sheets_compare'] = function(block) {
	const value_a = LANG.valueToCode(block, 'A', LANG.ORDER_RELATIONAL);
	const value_b = LANG.valueToCode(block, 'B', LANG.ORDER_RELATIONAL);
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
	
	return [`${value_a} ${op} ${value_b}`, LANG.ORDER_RELATIONAL]
}
