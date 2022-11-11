import { formatFunctionName } from '../../generatedBlocks/formatGeneratedFunctions'

import GoogleSheets from './googleSheets'

function generateFormula(name,block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => GoogleSheets.valueToCode(block, i.name, GoogleSheets.ORDER_NONE))
	const code = name + '(' + valueVars.join(', ') + ')'
	return [code, GoogleSheets.ORDER_ATOMIC]
}
const getGenerator = (name) => (block) => generateFormula(name, block);

export const createFunctionGenerator = (blockDef) => {
	const formulaName = blockDef[0];

	GoogleSheets[formatFunctionName(formulaName)] = getGenerator(formulaName)
}
