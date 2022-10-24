import quote from './quote'
import GoogleSheets from './googleSheets'

// generators for built ins
GoogleSheets['sheets_number'] = function(block) {
	const code = Number(block.getFieldValue('NUM'));
	return [code, GoogleSheets.ORDER_ATOMIC];
};

GoogleSheets['sheets_text'] = function(block) {
	const code = quote(block.getFieldValue('TEXT'));
	return [code, GoogleSheets.ORDER_ATOMIC];
};

GoogleSheets['sheets_boolean'] = function(block) {
	const code = block.getFieldValue('BOOL')
	return [code, GoogleSheets.ORDER_ATOMIC];
};

GoogleSheets['sheets_cell'] = function(block) {
	const text_cell = block.getFieldValue('CELL');
	// FIXME I can inject here with text ") & whaterver I want"
	const code = `${text_cell}`
	return [code, GoogleSheets.ORDER_ATOMIC];
};

GoogleSheets['sheets_formula'] = function(block) {
	const formula = GoogleSheets.valueToCode(block, 'FORMULA', GoogleSheets.ORDER_NONE);
	const defaultFormula = '""'
	const code = `=${formula||defaultFormula}`
	return code;
};

GoogleSheets['sheets_column'] = function(block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => GoogleSheets.valueToCode(block, i.name, GoogleSheets.ORDER_NONE))
	const code = `{${valueVars.join(', ')}}`
	return [code, GoogleSheets.ORDER_ATOMIC]
};

GoogleSheets['sheets_row'] = function(block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => GoogleSheets.valueToCode(block, i.name, GoogleSheets.ORDER_NONE))
	const code = `{${valueVars.join('; ')}}`
	return [code, GoogleSheets.ORDER_ATOMIC]
};
