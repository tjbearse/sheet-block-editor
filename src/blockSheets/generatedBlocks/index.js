import { createBlockFromArrayDef } from './formatGeneratedFunctions'

import latexOverrides from './latexGeneratorOverrides'
import { createFunctionGenerator as createLatexFunction } from '../codeGenerators/latex'
import { createFunctionGenerator as createGoogleFunction }  from '../codeGenerators/googleSheetsFormula'

import blocks from './generated/blocks.json'

blocks.forEach(d => {
	createBlockFromArrayDef(d)
	createLatexFunction(d, latexOverrides);
	createGoogleFunction(d);
});
