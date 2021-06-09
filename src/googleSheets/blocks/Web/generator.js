
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

LANG['sheets_ENCODEURL'] = getBlockFn('ENCODEURL', ["TEXT"])
LANG['sheets_HYPERLINK'] = getBlockFn('HYPERLINK', ["URL", "LINK_LABEL"])
LANG['sheets_IMPORTDATA'] = getBlockFn('IMPORTDATA', ["URL"])
LANG['sheets_IMPORTFEED'] = getBlockFn('IMPORTFEED', ["URL", "QUERY", "HEADERS", "NUM_ITEMS"])
LANG['sheets_IMPORTHTML'] = getBlockFn('IMPORTHTML', ["URL", "QUERY", "INDEX"])
LANG['sheets_IMPORTRANGE'] = getBlockFn('IMPORTRANGE', ["SPREADSHEET_URL", "RANGE_STRING"])
LANG['sheets_IMPORTXML'] = getBlockFn('IMPORTXML', ["URL", "XPATH_QUERY"])
LANG['sheets_ISURL'] = getBlockFn('ISURL', ["VALUE"])