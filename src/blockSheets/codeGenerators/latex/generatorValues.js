import quote from './quote'
import Latex from './latex'

Latex['sheets_number'] = function(block) {
	const code = ''+Number(block.getFieldValue('NUM'));
	return [code, Latex.ORDER_ATOMIC];
};

Latex['sheets_text'] = function(block) {
	const code = quote(block.getFieldValue('TEXT'));
	return [code, Latex.ORDER_ATOMIC];
};

Latex['sheets_boolean'] = function(block) {
	const code = block.getFieldValue('BOOL')
	return [code, Latex.ORDER_ATOMIC];
};

Latex['sheets_cell'] = function(block) {
	const text_cell = block.getFieldValue('CELL');
	// FIXME I can inject here with text ") & whaterver I want"
	const code = `\\operatorname{${text_cell}}`
	return [code, Latex.ORDER_ATOMIC];
};


Latex['sheets_formula'] = function(block) {
	const text_cell = Latex.valueToCode(block, 'FORMULA', Latex.ORDER_NONE);
	const code = `=${text_cell}`
	return code;
};

Latex['sheets_columns'] = function(block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => Latex.valueToCode(block, i.name, Latex.ORDER_NONE))
	const code = `$\\{${valueVars.join(', ')}\\}$`
	return [code, Latex.ORDER_ATOMIC]
};

Latex['sheets_rows'] = function(block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => Latex.valueToCode(block, i.name, Latex.ORDER_NONE))
	const code = `$\\{${valueVars.join('; ')}\\}$`
	return [code, Latex.ORDER_ATOMIC]
};
