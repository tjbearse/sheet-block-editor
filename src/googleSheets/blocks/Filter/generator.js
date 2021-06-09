
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

LANG['sheets_FILTER'] = getBlockFn('FILTER', ["RANGE", "CONDITION1", "CONDITION2"])
LANG['sheets_SORT'] = getBlockFn('SORT', ["RANGE", "SORT_COLUMN", "IS_ASCENDING", "SORT_COLUMN2", "IS_ASCENDING2"])
LANG['sheets_SORTN'] = getBlockFn('SORTN', ["RANGE", "N", "DISPLAY_TIES_MODE"])
LANG['sheets_UNIQUE'] = getBlockFn('UNIQUE', ["RANGE"])