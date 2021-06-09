
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

LANG['sheets_ADD'] = getBlockFn('ADD', ["VALUE1", "VALUE2"])
LANG['sheets_CONCAT'] = getBlockFn('CONCAT', ["VALUE1", "VALUE2"])
LANG['sheets_DIVIDE'] = getBlockFn('DIVIDE', ["DIVIDEND", "DIVISOR"])
LANG['sheets_EQ'] = getBlockFn('EQ', ["VALUE1", "VALUE2"])
LANG['sheets_GT'] = getBlockFn('GT', ["VALUE1", "VALUE2"])
LANG['sheets_GTE'] = getBlockFn('GTE', ["VALUE1", "VALUE2"])
LANG['sheets_LT'] = getBlockFn('LT', ["VALUE1", "VALUE2"])
LANG['sheets_LTE'] = getBlockFn('LTE', ["VALUE1", "VALUE2"])
LANG['sheets_MINUS'] = getBlockFn('MINUS', ["VALUE1", "VALUE2"])
LANG['sheets_MULTIPLY'] = getBlockFn('MULTIPLY', ["FACTOR1", "FACTOR2"])
LANG['sheets_NE'] = getBlockFn('NE', ["VALUE1", "VALUE2"])
LANG['sheets_POW'] = getBlockFn('POW', ["BASE", "EXPONENT"])
LANG['sheets_UMINUS'] = getBlockFn('UMINUS', ["VALUE"])
LANG['sheets_UNARY_PERCENT'] = getBlockFn('UNARY_PERCENT', ["PERCENTAGE"])