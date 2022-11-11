import { formatFunctionName } from '../../generatedBlocks/formatGeneratedFunctions'

import Latex from './latex'

function generateFormula(name,block) {
	// note that variadic args are inserted into args in the right order (including position offset)
	// so we just need to read the args in order, skipping the first
	const realInputs = block.inputList.filter(i => i.connection)
	const valueVars = realInputs.map(i => Latex.valueToCode(block, i.name, Latex.ORDER_NONE))
	name = name.replaceAll('_', '\\_');
	const code = `\\operatorname{${name}}(${valueVars.join(', ')})`
	return [code, Latex.ORDER_ATOMIC]
}

const getGenerator = (name) => (block) => generateFormula(name,block);

export const createFunctionGenerator = (blockDef, generatorOverrides={}) => {
	let generator;
	const name = blockDef[0]

	if (name in generatorOverrides) {
		generator = generatorOverrides[name];
	} else {
		generator = getGenerator(name);
	}
	Latex[formatFunctionName(name)] = generator;
}
