
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

LANG['sheets_CHOOSE'] = getBlockFn('CHOOSE', ["INDEX", "CHOICE1", "CHOICE2"])
LANG['sheets_COLUMN'] = getBlockFn('COLUMN', ["CELL_REFERENCE"])
LANG['sheets_COLUMNS'] = getBlockFn('COLUMNS', ["RANGE"])
LANG['sheets_GETPIVOTDATA'] = getBlockFn('GETPIVOTDATA', ["VALUE_NAME", "ANY_PIVOT_TABLE_CELL", "ORIGINAL_COLUMN", "PIVOT_ITEM"])
LANG['sheets_HLOOKUP'] = getBlockFn('HLOOKUP', ["SEARCH_KEY", "RANGE", "INDEX", "IS_SORTED"])
LANG['sheets_INDEX'] = getBlockFn('INDEX', ["REFERENCE", "ROW", "COLUMN"])
LANG['sheets_INDIRECT'] = getBlockFn('INDIRECT', ["CELL_REFERENCE_AS_STRING", "IS_A1_NOTATION"])
LANG['sheets_LOOKUP'] = getBlockFn('LOOKUP', ["SEARCH_KEY", "SEARCH_RANGE|SEARCH_RESULT_ARRAY", "RESULT_RANGE"])
LANG['sheets_MATCH'] = getBlockFn('MATCH', ["SEARCH_KEY", "RANGE", "SEARCH_TYPE"])
LANG['sheets_OFFSET'] = getBlockFn('OFFSET', ["CELL_REFERENCE", "OFFSET_ROWS", "OFFSET_COLUMNS", "HEIGHT", "WIDTH"])
LANG['sheets_ROW'] = getBlockFn('ROW', ["CELL_REFERENCE"])
LANG['sheets_ROWS'] = getBlockFn('ROWS', ["RANGE"])
LANG['sheets_VLOOKUP'] = getBlockFn('VLOOKUP', ["SEARCH_KEY", "RANGE", "INDEX", "IS_SORTED"])