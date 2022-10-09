import './generatorMath.js'
import './generatorValues.js'
import './generatorLogical.js'
import './generatorText.js'
import generatorOverride from './fnGeneratorOverrides'
import blocks from '../../blocks/generated/blocks.json'
import { formatFunctionName } from '../../blocks/formatGeneratedFunctions'

import Latex from './latex'

function generateFormula(name,block) {
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => Latex.valueToCode(block, i.name, Latex.ORDER_NONE))
	name = name.replaceAll('_', '\\_');
	const code = `\\operatorname{${name}}(${valueVars.join(', ')})`
	return [code, Latex.ORDER_ATOMIC]
}

const getGenerator = (name) => (block) => generateFormula(name,block);

const createFunctionGenerators = (blocks) => {
	blocks.forEach(blockDef => {
		let generator;
		const name = blockDef[0]

		if (name in generatorOverride) {
			generator = generatorOverride[name];
		} else {
			generator = getGenerator(name);
		}
		Latex[formatFunctionName(name)] = generator;
	})
}

createFunctionGenerators(blocks)
