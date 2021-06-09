
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

LANG['sheets_ARRAYFORMULA'] = getBlockFn('ARRAYFORMULA', ["ARRAY_FORMULA"])
LANG['sheets_QUERY'] = getBlockFn('QUERY', ["DATA", "QUERY", "HEADERS"])
LANG['sheets_SPARKLINE'] = getBlockFn('SPARKLINE', ["DATA", "OPTIONS"])