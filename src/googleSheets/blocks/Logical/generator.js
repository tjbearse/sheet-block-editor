
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

LANG['sheets_AND'] = getBlockFn('AND', ["LOGICAL_EXPRESSION1", "LOGICAL_EXPRESSION2"])
LANG['sheets_FALSE'] = getBlockFn('FALSE', [])
LANG['sheets_IF'] = getBlockFn('IF', ["LOGICAL_EXPRESSION", "VALUE_IF_TRUE", "VALUE_IF_FALSE"])
LANG['sheets_IFERROR'] = getBlockFn('IFERROR', ["VALUE", "VALUE_IF_ERROR"])
LANG['sheets_IFNA'] = getBlockFn('IFNA', ["VALUE", "VALUE_IF_NA"])
LANG['sheets_IFS'] = getBlockFn('IFS', ["CONDITION1", "VALUE1"])
LANG['sheets_NOT'] = getBlockFn('NOT', ["LOGICAL_EXPRESSION"])
LANG['sheets_OR'] = getBlockFn('OR', ["LOGICAL_EXPRESSION1", "LOGICAL_EXPRESSION2"])
LANG['sheets_SWITCH'] = getBlockFn('SWITCH', ["EXPRESSION", "CASE1", "VALUE1", "[DEFAULT OR CASE2", "VALUE2]"])
LANG['sheets_TRUE'] = getBlockFn('TRUE', [])