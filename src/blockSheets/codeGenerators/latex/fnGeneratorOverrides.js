import Latex from './latex'

const pow = block => {
		const value_a = Latex.valueToCode(block, 'ARG0', Latex.ORDER_EXPONENTIATION);
		const value_b = Latex.valueToCode(block, 'ARG1', Latex.ORDER_NONE);
		return [`{${value_a}}^{${value_b}}`, Latex.ORDER_EXPONENTIATION]
}

// overrides for functions with specific math notation equivalents
export const generatorOverride = {
	SQRT: block => {
		const inner = Latex.valueToCode(block, 'ARG0', Latex.ORDER_NONE)
		const code = `\\sqrt{${inner}}`
		return [code, Latex.ORDER_ATOMIC]
	},
	POW: pow,
	POWER: pow,
}
export default generatorOverride;
