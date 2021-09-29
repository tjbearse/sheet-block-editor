
import Blockly from 'blockly'

var LANG = Blockly.GoogleSheets

function getListVariables(block, args) {
    return args.map(function(a) {
        return LANG.valueToCode(block, a, LANG.ORDER_NONE);
    })
}
function getBlockFn(name, args) {
    return function(block) {
        var value_vars = getListVariables(block, args)
        var code = name + '(' + value_vars.join(', ') + ')'
        return [code, LANG.ORDER_NONE]
    }
}

LANG['sheets_ABS'] = getBlockFn('ABS', ["VALUE"])
LANG['sheets_CEILING'] = getBlockFn('CEILING', ["VALUE", "FACTOR"])
LANG['sheets_COUNTBLANK'] = getBlockFn('COUNTBLANK', ["RANGE"])
LANG['sheets_COUNTIF'] = getBlockFn('COUNTIF', ["RANGE", "CRITERION"])
LANG['sheets_COUNTIFS'] = getBlockFn('COUNTIFS', ["CRITERIA_RANGE1", "CRITERION1"])
LANG['sheets_COUNTUNIQUE'] = getBlockFn('COUNTUNIQUE', ["VALUE1", "VALUE2"])
LANG['sheets_EVEN'] = getBlockFn('EVEN', ["VALUE"])
LANG['sheets_FACT'] = getBlockFn('FACT', ["VALUE"])
LANG['sheets_FLOOR'] = getBlockFn('FLOOR', ["VALUE", "FACTOR"])
LANG['sheets_INT'] = getBlockFn('INT', ["VALUE"])
LANG['sheets_ISEVEN'] = getBlockFn('ISEVEN', ["VALUE"])
LANG['sheets_ISODD'] = getBlockFn('ISODD', ["VALUE"])
LANG['sheets_MOD'] = getBlockFn('MOD', ["DIVIDEND", "DIVISOR"])
LANG['sheets_ODD'] = getBlockFn('ODD', ["VALUE"])
LANG['sheets_PI'] = getBlockFn('PI', [])
LANG['sheets_POWER'] = getBlockFn('POWER', ["BASE", "EXPONENT"])
LANG['sheets_PRODUCT'] = getBlockFn('PRODUCT', ["FACTOR1", "FACTOR2"])
LANG['sheets_QUOTIENT'] = getBlockFn('QUOTIENT', ["DIVIDEND", "DIVISOR"])
LANG['sheets_RAND'] = getBlockFn('RAND', [])
LANG['sheets_RANDARRAY'] = getBlockFn('RANDARRAY', ["ROWS", "COLUMNS"])
LANG['sheets_RANDBETWEEN'] = getBlockFn('RANDBETWEEN', ["LOW", "HIGH"])
LANG['sheets_ROUND'] = getBlockFn('ROUND', ["VALUE", "PLACES"])
LANG['sheets_ROUNDDOWN'] = getBlockFn('ROUNDDOWN', ["VALUE", "PLACES"])
LANG['sheets_ROUNDUP'] = getBlockFn('ROUNDUP', ["VALUE", "PLACES"])
LANG['sheets_SIGN'] = getBlockFn('SIGN', ["VALUE"])
LANG['sheets_SQRT'] = getBlockFn('SQRT', ["VALUE"])
LANG['sheets_SUM'] = getBlockFn('SUM', ["VALUE1", "VALUE2"])
LANG['sheets_SUMIF'] = getBlockFn('SUMIF', ["RANGE", "CRITERION", "SUM_RANGE"])
LANG['sheets_SUMIFS'] = getBlockFn('SUMIFS', ["SUM_RANGE", "CRITERIA_RANGE1", "CRITERION1"])

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
