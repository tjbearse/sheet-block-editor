import Blockly from 'blockly'

const LANG = Blockly.GoogleSheets
const prefix = 'sheets_'

export const createRegisteredGenerators = (blocks) => {
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
