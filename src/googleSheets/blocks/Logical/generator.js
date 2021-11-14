import Blockly from 'blockly'
import blocks from './blocks.json'
import { createRegisteredGenerators } from '../../blockDefToGenerator'

const LANG = Blockly.GoogleSheets

createRegisteredGenerators(blocks)

LANG['sheets_compare'] = function(block) {
	// FIXME precedence
	const value_a = LANG.valueToCode(block, 'A', LANG.ORDER_ATOMIC);
	const value_b = LANG.valueToCode(block, 'B', LANG.ORDER_ATOMIC);
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
	
	return [`${value_a} ${op} ${value_b}`, LANG.ORDER_NONE]
}
