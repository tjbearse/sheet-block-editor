
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

LANG['sheets_ERROR_TYPE'] = getBlockFn('ERROR.TYPE', ["REFERENCE"])
LANG['sheets_ISBLANK'] = getBlockFn('ISBLANK', ["VALUE"])
LANG['sheets_ISDATE'] = getBlockFn('ISDATE', ["VALUE"])
LANG['sheets_ISEMAIL'] = getBlockFn('ISEMAIL', ["VALUE"])
LANG['sheets_ISERR'] = getBlockFn('ISERR', ["VALUE"])
LANG['sheets_ISERROR'] = getBlockFn('ISERROR', ["VALUE"])
LANG['sheets_ISFORMULA'] = getBlockFn('ISFORMULA', ["CELL"])
LANG['sheets_ISLOGICAL'] = getBlockFn('ISLOGICAL', ["VALUE"])
LANG['sheets_ISNA'] = getBlockFn('ISNA', ["VALUE"])
LANG['sheets_ISNONTEXT'] = getBlockFn('ISNONTEXT', ["VALUE"])
LANG['sheets_ISNUMBER'] = getBlockFn('ISNUMBER', ["VALUE"])
LANG['sheets_ISREF'] = getBlockFn('ISREF', ["VALUE"])
LANG['sheets_ISTEXT'] = getBlockFn('ISTEXT', ["VALUE"])
LANG['sheets_N'] = getBlockFn('N', ["VALUE"])
LANG['sheets_NA'] = getBlockFn('NA', [])
LANG['sheets_TYPE'] = getBlockFn('TYPE', ["VALUE"])
LANG['sheets_CELL'] = getBlockFn('CELL', ["INFO_TYPE", "REFERENCE"])