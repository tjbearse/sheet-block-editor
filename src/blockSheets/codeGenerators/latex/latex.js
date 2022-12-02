import { Generator } from 'blockly'

export const Latex = new Generator('Latex')

Latex.ORDER_ATOMIC = 0;
Latex.ORDER_EXPONENTIATION = 1;
Latex.ORDER_UNARY_SIGN = 2;
Latex.ORDER_MULTIPLY = 3.1;
Latex.ORDER_DIVIDE = 3.2;
Latex.ORDER_ADD = 4.1;
Latex.ORDER_SUBTRACT = 4.2;
Latex.ORDER_CONCAT = 5;
Latex.ORDER_RELATIONAL = 6;
Latex.ORDER_NONE = 99;

// outer, inner pairings
Latex.ORDER_OVERRIDES = [
	[Latex.ORDER_MULTIPLY, Latex.ORDER_MULTIPLY],
	[Latex.ORDER_ADD, Latex.ORDER_ADD],
];

Latex.scrubNakedValue = (line) => line + '\n';

// TODO I'd like to use \left( and \right( for parens around some things
// e.g. division because they resize nicely
// options:
// - post process substitution,
// - update blockly to configure parens

export default Latex;
