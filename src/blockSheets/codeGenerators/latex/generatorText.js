import Latex from './latex'

Latex['sheets_join'] = function(block) {
	const value_a = Latex.valueToCode(block, 'A', Latex.ORDER_CONCAT);
	const value_b = Latex.valueToCode(block, 'B', Latex.ORDER_CONCAT);
	return [`${value_a} & ${value_b}`, Latex.ORDER_CONCAT]
}
