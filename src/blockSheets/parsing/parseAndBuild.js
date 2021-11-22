import { parser } from './formula.js'
import { buildBlocks } from './builder'


const initSvg = (b) => {
	b.initSvg();
	b.render();
}

export const parseAndBuild = (formula, workspace) =>
	// TODO we've lost multiple formula input to get '=' for comparison
	// to restore we need a separator or multiple fields
	buildBlocks(workspace, parser.parse(formula), initSvg)

export default parseAndBuild
