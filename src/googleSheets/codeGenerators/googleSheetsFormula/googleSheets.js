/**
 * This code is derived from blockly's javascript generator
 * https://github.com/google/blockly/blob/fc6a1be3d982349292b630d2818b3b5509688d5f/generators/javascript.js
 * That work is Copyright 2012 Google LLC and licenced under Apache-2.0
 * Original author fraser@google.com (Neil Fraser)
 *
 * Modifications have been made to convert to google sheets generator
 */
import Blockly from 'blockly'

export const GoogleSheets = new Blockly.Generator('GoogleSheets');
Blockly.GoogleSheets = GoogleSheets

/**
 * Order of operation ENUMs.
 */
GoogleSheets.ORDER_ATOMIC = 0;            // 0 "" ...
GoogleSheets.ORDER_EXPONENTIATION = 1;    // ^
GoogleSheets.ORDER_UNARY_SIGN = 2;        // + -
GoogleSheets.ORDER_MULTIPLICATIVE = 3;    // * /
GoogleSheets.ORDER_ADDITIVE = 4;          // + -
GoogleSheets.ORDER_CONCAT = 5;            // &
GoogleSheets.ORDER_RELATIONAL = 6;       // <, <=, >, >=, <>, ==
GoogleSheets.ORDER_NONE = 99;             // (...)

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
GoogleSheets.scrubNakedValue = function(line) {
	return `=${line}`;
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
GoogleSheets.scrub_ = function(block, code, opt_thisOnly) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : GoogleSheets.blockToCode(nextBlock);
  return code + nextCode;
};

export default GoogleSheets;
