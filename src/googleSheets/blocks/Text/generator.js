
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

LANG['sheets_ARABIC'] = getBlockFn('ARABIC', ["ROMAN_NUMERAL"])
LANG['sheets_CLEAN'] = getBlockFn('CLEAN', ["TEXT"])
LANG['sheets_CONCATENATE'] = getBlockFn('CONCATENATE', ["STRING1", "STRING2"])
LANG['sheets_DOLLAR'] = getBlockFn('DOLLAR', ["NUMBER", "NUMBER_OF_PLACES"])
LANG['sheets_EXACT'] = getBlockFn('EXACT', ["STRING1", "STRING2"])
LANG['sheets_FIND'] = getBlockFn('FIND', ["SEARCH_FOR", "TEXT_TO_SEARCH", "STARTING_AT"])
LANG['sheets_FIXED'] = getBlockFn('FIXED', ["NUMBER", "NUMBER_OF_PLACES", "SUPPRESS_SEPARATOR"])
LANG['sheets_JOIN'] = getBlockFn('JOIN', ["DELIMITER", "VALUE_OR_ARRAY1", "VALUE_OR_ARRAY2"])
LANG['sheets_LEFT'] = getBlockFn('LEFT', ["STRING", "NUMBER_OF_CHARACTERS"])
LANG['sheets_LEN'] = getBlockFn('LEN', ["TEXT"])
LANG['sheets_LOWER'] = getBlockFn('LOWER', ["TEXT"])
LANG['sheets_MID'] = getBlockFn('MID', ["STRING", "STARTING_AT", "EXTRACT_LENGTH"])
LANG['sheets_PROPER'] = getBlockFn('PROPER', ["TEXT_TO_CAPITALIZE"])
LANG['sheets_REGEXEXTRACT'] = getBlockFn('REGEXEXTRACT', ["TEXT", "REGULAR_EXPRESSION"])
LANG['sheets_REGEXMATCH'] = getBlockFn('REGEXMATCH', ["TEXT", "REGULAR_EXPRESSION"])
LANG['sheets_REGEXREPLACE'] = getBlockFn('REGEXREPLACE', ["TEXT", "REGULAR_EXPRESSION", "REPLACEMENT"])
LANG['sheets_REPLACE'] = getBlockFn('REPLACE', ["TEXT", "POSITION", "LENGTH", "NEW_TEXT"])
LANG['sheets_REPT'] = getBlockFn('REPT', ["TEXT_TO_REPEAT", "NUMBER_OF_REPETITIONS"])
LANG['sheets_RIGHT'] = getBlockFn('RIGHT', ["STRING", "NUMBER_OF_CHARACTERS"])
LANG['sheets_ROMAN'] = getBlockFn('ROMAN', ["NUMBER", "RULE_RELAXATION"])
LANG['sheets_SEARCH'] = getBlockFn('SEARCH', ["SEARCH_FOR", "TEXT_TO_SEARCH", "STARTING_AT"])
LANG['sheets_SPLIT'] = getBlockFn('SPLIT', ["TEXT", "DELIMITER", "SPLIT_BY_EACH", "REMOVE_EMPTY_TEXT"])
LANG['sheets_SUBSTITUTE'] = getBlockFn('SUBSTITUTE', ["TEXT_TO_SEARCH", "SEARCH_FOR", "REPLACE_WITH", "OCCURRENCE_NUMBER"])
LANG['sheets_TEXT'] = getBlockFn('TEXT', ["NUMBER", "FORMAT"])
LANG['sheets_TEXTJOIN'] = getBlockFn('TEXTJOIN', ["DELIMITER", "IGNORE_EMPTY", "TEXT1", "TEXT2"])
LANG['sheets_TRIM'] = getBlockFn('TRIM', ["TEXT"])
LANG['sheets_UPPER'] = getBlockFn('UPPER', ["TEXT"])
LANG['sheets_VALUE'] = getBlockFn('VALUE', ["TEXT"])