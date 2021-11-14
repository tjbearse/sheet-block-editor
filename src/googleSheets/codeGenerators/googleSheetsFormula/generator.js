import './generatorMath.js'
import './generatorValues.js'
import './generatorLogical.js'
import './generatorText.js'
import blocks from '../../blocks/generated/blocks.json'

import GoogleSheets from './googleSheets'
const prefix = 'sheets_'

const createFunctionGenerators = (blocks) => {
	blocks.forEach(blockDef => {
		const args = blockDef.args0
			.filter(arg => arg.type === 'input_value')
			.map(arg => arg.name)

		const formulaName = blockDef.type.substring(prefix.length)

		const formulaGenerator = (block) => {
			var value_vars = args.map(arg => GoogleSheets.valueToCode(block, arg, GoogleSheets.ORDER_NONE))
			var code = formulaName + '(' + value_vars.join(', ') + ')'
			return [code, GoogleSheets.ORDER_ATOMIC]
		}
		GoogleSheets[blockDef.type] = formulaGenerator
	})
}

createFunctionGenerators(blocks)
