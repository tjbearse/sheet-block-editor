import './generatorMath.js'
import './generatorValues.js'
import './generatorLogical.js'
import './generatorText.js'
import blocks from '../../blocks/generated/blocks.json'
import { formatFunctionName } from '../../blocks/formatGeneratedFunctions'

import GoogleSheets from './googleSheets'

function generateFormula(name,block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => GoogleSheets.valueToCode(block, i.name, GoogleSheets.ORDER_NONE))
	const code = name + '(' + valueVars.join(', ') + ')'
	return [code, GoogleSheets.ORDER_ATOMIC]
}
const getGenerator = (name) => (block) => generateFormula(name, block);

const createFunctionGenerators = (blocks) => {
	blocks.forEach(blockDef => {
		const formulaName = blockDef[0];

		GoogleSheets[formatFunctionName(formulaName)] = getGenerator(formulaName)
	})
}

createFunctionGenerators(blocks)
