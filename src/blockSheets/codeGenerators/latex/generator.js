import './generatorMath.js'
import './generatorValues.js'
import './generatorLogical.js'
import './generatorText.js'
import generatorOverride from './fnGeneratorOverrides'
import blocks from '../../blocks/generated/blocks.json'

import Latex from './latex'
const prefix = 'sheets_'

const getGenerator = (name, args) => (block) => {
	const value_vars = args.map(arg => Latex.valueToCode(block, arg, Latex.ORDER_NONE))
	const code = `\\operatorname{${name}}(${value_vars.join(', ')})`
	return [code, Latex.ORDER_ATOMIC]
}

const createFunctionGenerators = (blocks) => {
	blocks.forEach(blockDef => {
		let generator;
		const name = blockDef.type.substring(prefix.length)

		if (name in generatorOverride) {
			generator = generatorOverride[name];
		} else {
			const args = blockDef.args0
				.filter(arg => arg.type === 'input_value')
				.map(arg => arg.name)

			generator = getGenerator(name, args);
		}
		Latex[blockDef.type] = generator;
	})
}

createFunctionGenerators(blocks)
