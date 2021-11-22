import { parser } from './formula.js'
import { buildBlocks } from './builder'


const initSvg = (b) => {
	b.initSvg();
	b.render();
}

export const parseAndBuild = (formula, workspace) =>
	buildBlocks(workspace, parser.parse(formula), initSvg)

export default parseAndBuild
