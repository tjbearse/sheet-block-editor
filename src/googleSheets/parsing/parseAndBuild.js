import { parser } from './formula.js'
import { buildBlocks } from './builder'


const initSvg = (b) => {
	b.initSvg();
	b.render();
}

export const parseAndBuild = (formula, workspace) =>
	parser.parse(formula)
		.map(t => buildBlocks(workspace, t, initSvg))

export default parseAndBuild
