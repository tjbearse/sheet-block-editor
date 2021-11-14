import Blockly from 'blockly'

import './generatorMath.js'
import './generatorValues.js'
import './generatorLogical.js'
import './generatorText.js'
import blocks from '../../blocks/generated/blocks.json'

const LANG = Blockly.GoogleSheets
const prefix = 'sheets_'

const createFunctionGenerators = (blocks) => {
	blocks.forEach(blockDef => {
		const args = blockDef.args0
			.filter(arg => arg.type === 'input_value')
			.map(arg => arg.name)

		const formulaName = blockDef.type.substring(prefix.length)

		const formulaGenerator = (block) => {
			var value_vars = args.map(arg => LANG.valueToCode(block, arg, LANG.ORDER_NONE))
			var code = formulaName + '(' + value_vars.join(', ') + ')'
			return [code, LANG.ORDER_NONE]
		}
		LANG[blockDef.type] = formulaGenerator
	})
}

createFunctionGenerators(blocks)
