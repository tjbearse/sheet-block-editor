
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

LANG['sheets_DATE'] = getBlockFn('DATE', ["YEAR", "MONTH", "DAY"])
LANG['sheets_DATEDIF'] = getBlockFn('DATEDIF', ["START_DATE", "END_DATE", "UNIT"])
LANG['sheets_DATEVALUE'] = getBlockFn('DATEVALUE', ["DATE_STRING"])
LANG['sheets_DAY'] = getBlockFn('DAY', ["DATE"])
LANG['sheets_DAYS'] = getBlockFn('DAYS', ["END_DATE", "START_DATE"])
LANG['sheets_DAYS360'] = getBlockFn('DAYS360', ["START_DATE", "END_DATE", "METHOD"])
LANG['sheets_EDATE'] = getBlockFn('EDATE', ["START_DATE", "MONTHS"])
LANG['sheets_EOMONTH'] = getBlockFn('EOMONTH', ["START_DATE", "MONTHS"])
LANG['sheets_HOUR'] = getBlockFn('HOUR', ["TIME"])
LANG['sheets_ISOWEEKNUM'] = getBlockFn('ISOWEEKNUM', ["DATE"])
LANG['sheets_MINUTE'] = getBlockFn('MINUTE', ["TIME"])
LANG['sheets_MONTH'] = getBlockFn('MONTH', ["DATE"])
LANG['sheets_NETWORKDAYS'] = getBlockFn('NETWORKDAYS', ["START_DATE", "END_DATE", "HOLIDAYS"])
LANG['sheets_NETWORKDAYS_INTL'] = getBlockFn('NETWORKDAYS.INTL', ["START_DATE", "END_DATE", "WEEKEND", "HOLIDAYS"])
LANG['sheets_NOW'] = getBlockFn('NOW', [])
LANG['sheets_SECOND'] = getBlockFn('SECOND', ["TIME"])
LANG['sheets_TIME'] = getBlockFn('TIME', ["HOUR", "MINUTE", "SECOND"])
LANG['sheets_TIMEVALUE'] = getBlockFn('TIMEVALUE', ["TIME_STRING"])
LANG['sheets_TODAY'] = getBlockFn('TODAY', [])
LANG['sheets_WEEKDAY'] = getBlockFn('WEEKDAY', ["DATE", "TYPE"])
LANG['sheets_WEEKNUM'] = getBlockFn('WEEKNUM', ["DATE", "TYPE"])
LANG['sheets_WORKDAY'] = getBlockFn('WORKDAY', ["START_DATE", "NUM_DAYS", "HOLIDAYS"])
LANG['sheets_WORKDAY_INTL'] = getBlockFn('WORKDAY.INTL', ["START_DATE", "NUM_DAYS", "WEEKEND", "HOLIDAYS"])
LANG['sheets_YEAR'] = getBlockFn('YEAR', ["DATE"])
LANG['sheets_YEARFRAC'] = getBlockFn('YEARFRAC', ["START_DATE", "END_DATE", "DAY_COUNT_CONVENTION"])