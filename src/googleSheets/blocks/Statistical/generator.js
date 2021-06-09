
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

LANG['sheets_AVERAGE'] = getBlockFn('AVERAGE', ["VALUE1", "VALUE2"])
LANG['sheets_AVERAGE_WEIGHTED'] = getBlockFn('AVERAGE.WEIGHTED', ["VALUES", "WEIGHTS", "ADDITIONAL VALUES", "ADDITIONAL WEIGHTS"])
LANG['sheets_COUNT'] = getBlockFn('COUNT', ["VALUE1", "VALUE2"])
LANG['sheets_COUNTA'] = getBlockFn('COUNTA', ["VALUE1", "VALUE2"])
LANG['sheets_MAX'] = getBlockFn('MAX', ["VALUE1", "VALUE2"])
LANG['sheets_MAXA'] = getBlockFn('MAXA', ["VALUE1", "VALUE2"])
LANG['sheets_MAXIFS'] = getBlockFn('MAXIFS', ["RANGE", "CRITERIA_RANGE1", "CRITERION1"])
LANG['sheets_MEDIAN'] = getBlockFn('MEDIAN', ["VALUE1", "VALUE2"])
LANG['sheets_MIN'] = getBlockFn('MIN', ["VALUE1", "VALUE2"])
LANG['sheets_MINA'] = getBlockFn('MINA', ["VALUE1", "VALUE2"])
LANG['sheets_MINIFS'] = getBlockFn('MINIFS', ["RANGE", "CRITERIA_RANGE1", "CRITERION1"])
LANG['sheets_MODE'] = getBlockFn('MODE', ["VALUE1", "VALUE2"])
LANG['sheets_PERCENTILE'] = getBlockFn('PERCENTILE', ["DATA", "PERCENTILE"])
LANG['sheets_QUARTILE'] = getBlockFn('QUARTILE', ["DATA", "QUARTILE_NUMBER"])
LANG['sheets_RANK'] = getBlockFn('RANK', ["VALUE", "DATA", "IS_ASCENDING"])
LANG['sheets_RANK_AVG'] = getBlockFn('RANK.AVG', ["VALUE", "DATA", "IS_ASCENDING"])
LANG['sheets_STDEV'] = getBlockFn('STDEV', ["VALUE1", "VALUE2"])
LANG['sheets_VAR'] = getBlockFn('VAR', ["VALUE1", "VALUE2"])