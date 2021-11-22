import './generatorMath.js'
import './generatorValues.js'
import './generatorLogical.js'
import './generatorText.js'
import blocks from '../../blocks/generated/blocks.json'

import Latex from './latex'
const prefix = 'sheets_'

const getGenerator = (name, args) => (block) => {
	var value_vars = args.map(arg => Latex.valueToCode(block, arg, Latex.ORDER_NONE))
	var code = `\\operatorname{${name}}(${value_vars.join(', ')})`
	return [code, Latex.ORDER_ATOMIC]
}
const createFunctionGenerators = (blocks) => {
	blocks.forEach(blockDef => {
		const args = blockDef.args0
			.filter(arg => arg.type === 'input_value')
			.map(arg => arg.name)

		const name = blockDef.type.substring(prefix.length)

		Latex[blockDef.type] = getGenerator(name, args);
	})
}

createFunctionGenerators(blocks)
