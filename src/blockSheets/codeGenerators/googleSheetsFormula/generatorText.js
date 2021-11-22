import GoogleSheets from './googleSheets'

GoogleSheets['sheets_join'] = function(block) {
	const value_a = GoogleSheets.valueToCode(block, 'A', GoogleSheets.ORDER_CONCAT);
	const value_b = GoogleSheets.valueToCode(block, 'B', GoogleSheets.ORDER_CONCAT);
	return [`${value_a} & ${value_b}`, GoogleSheets.ORDER_CONCAT]
}
