/**
 * This code is derived from blockly's javascript generator
 * https://github.com/google/blockly/blob/fc6a1be3d982349292b630d2818b3b5509688d5f/generators/javascript.js
 * That work is Copyright 2012 Google LLC and licenced under Apache-2.0
 * Original author fraser@google.com (Neil Fraser)
 *
 * Modifications have been made to convert to google sheets generator
 */
import Blockly from 'blockly'

// TODO clean up unused code

Blockly.GoogleSheets = new Blockly.Generator('GoogleSheets');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.GoogleSheets.addReservedWords();

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
// TODO order of operations has not been updated/validated for google sheets
Blockly.GoogleSheets.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.GoogleSheets.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.GoogleSheets.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.GoogleSheets.ORDER_MEMBER = 2.1;          // . []
Blockly.GoogleSheets.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.GoogleSheets.ORDER_EXPONENTIATION = 3;    // **
Blockly.GoogleSheets.ORDER_UNARY_SIGN = 4;        // + -
Blockly.GoogleSheets.ORDER_BITWISE_NOT = 4;       // ~
Blockly.GoogleSheets.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.GoogleSheets.ORDER_ADDITIVE = 6;          // + -
Blockly.GoogleSheets.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.GoogleSheets.ORDER_BITWISE_AND = 8;       // &
Blockly.GoogleSheets.ORDER_BITWISE_XOR = 9;       // ^
Blockly.GoogleSheets.ORDER_BITWISE_OR = 10;       // |
Blockly.GoogleSheets.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.GoogleSheets.ORDER_LOGICAL_NOT = 12;      // not
Blockly.GoogleSheets.ORDER_LOGICAL_AND = 13;      // and
Blockly.GoogleSheets.ORDER_LOGICAL_OR = 14;       // or
Blockly.GoogleSheets.ORDER_CONDITIONAL = 15;      // if else
Blockly.GoogleSheets.ORDER_LAMBDA = 16;           // lambda
Blockly.GoogleSheets.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
/*
Blockly.GoogleSheets.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.GoogleSheets.ORDER_FUNCTION_CALL, Blockly.GoogleSheets.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.GoogleSheets.ORDER_FUNCTION_CALL, Blockly.GoogleSheets.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.GoogleSheets.ORDER_MEMBER, Blockly.GoogleSheets.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.GoogleSheets.ORDER_MEMBER, Blockly.GoogleSheets.ORDER_FUNCTION_CALL],

  // not (not foo) -> not not foo
  [Blockly.GoogleSheets.ORDER_LOGICAL_NOT, Blockly.GoogleSheets.ORDER_LOGICAL_NOT],
  // a and (b and c) -> a and b and c
  [Blockly.GoogleSheets.ORDER_LOGICAL_AND, Blockly.GoogleSheets.ORDER_LOGICAL_AND],
  // a or (b or c) -> a or b or c
  [Blockly.GoogleSheets.ORDER_LOGICAL_OR, Blockly.GoogleSheets.ORDER_LOGICAL_OR]
];
*/

/**
 * Whether the init method has been called.
 * @type {?boolean}
 */
Blockly.GoogleSheets.isInitialized = false;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 * @this {Blockly.Generator}
 */
Blockly.GoogleSheets.init = function(workspace) {
  /**
   * Empty loops or conditionals are not allowed in GoogleSheets.
   */

  /*
  Blockly.GoogleSheets.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.GoogleSheets.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.GoogleSheets.functionNames_ = Object.create(null);

  if (!Blockly.GoogleSheets.variableDB_) {
    Blockly.GoogleSheets.variableDB_ =
        new Blockly.Names(Blockly.GoogleSheets.RESERVED_WORDS_);
  } else {
    Blockly.GoogleSheets.variableDB_.reset();
  }

  Blockly.GoogleSheets.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.GoogleSheets.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.GoogleSheets.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME) + ' = None');
  }

  Blockly.GoogleSheets.definitions_['variables'] = defvars.join('\n');
  */
  this.isInitialized = true;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.GoogleSheets.finish = function(code) {
	return code
/*
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.GoogleSheets.definitions_) {
    var def = Blockly.GoogleSheets.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  // Clean up temporary data.
  delete Blockly.GoogleSheets.definitions_;
  delete Blockly.GoogleSheets.functionNames_;
  Blockly.GoogleSheets.variableDB_.reset();
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
*/
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.GoogleSheets.scrubNakedValue = function(line) {
	return `=${line}`;
};

/**
 * Encode a string as a properly escaped GoogleSheets string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} GoogleSheets string.
 * @protected
 */
Blockly.GoogleSheets.quote_ = function(string) {
	// Can't use goog.string.quote since % must also be escaped.
	string = string.replace(/\\/g, '\\\\')
				   .replace(/\n/g, '\\\n');

	var quote = '\"';
	if (string.indexOf('"') !== -1) {
		string = string.replace(/"/g, '\\"');
	}
	return quote + string + quote;
};

/**
 * Encode a string as a properly escaped multiline GoogleSheets string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} GoogleSheets string.
 * @protected
 */
Blockly.GoogleSheets.multiline_quote_ = function(string) {
  var lines = string.split(/\n/g).map(Blockly.GoogleSheets.quote_);
  // Join with the following, plus a newline:
  // + '\n' +
  return lines.join(' + \'\\n\' + \n');
};

/**
 * Common tasks for generating GoogleSheets from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The GoogleSheets code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} GoogleSheets code with comments and subsequent blocks added.
 * @protected
 */
Blockly.GoogleSheets.scrub_ = function(block, code, opt_thisOnly) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.GoogleSheets.blockToCode(nextBlock);
  return code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.GoogleSheets.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
  var delta = opt_delta || 0;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  var atOrder = delta ? Blockly.GoogleSheets.ORDER_ADDITIVE :
      Blockly.GoogleSheets.ORDER_NONE;
  var at = Blockly.GoogleSheets.valueToCode(block, atId, atOrder) || defaultAtIndex;

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = 'int(' + at + ' + ' + delta + ')';
    } else if (delta < 0) {
      at = 'int(' + at + ' - ' + -delta + ')';
    } else {
      at = 'int(' + at + ')';
    }
    if (opt_negate) {
      at = '-' + at;
    }
  }
  return at;
};
