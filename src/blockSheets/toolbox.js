import { formatFunctionName } from './generatedBlocks/formatGeneratedFunctions'
import blocks from './generatedBlocks/generated/blocks.json'
import logical from './staticBlocks/Logical/toolboxCategory.json'
import math from './staticBlocks/Math/toolboxCategory.json'
import text from './staticBlocks/Text/toolboxCategory.json'
import values from './staticBlocks/Values/toolboxCategory.json'
import demo from './staticBlocks/demoToolboxCategory.js'
import { registry } from 'blockly'
import { createSearchCategory } from './searchToolboxCategory.js'

const categories = categorize(blocks, {
	Values: values.contents,
	Math: math.contents,
	Text: text.contents,
	Logical: logical.contents,
});

function *genAllBlocks() {
	for(const cat of categories) {
		for(const b of cat.contents) {
			yield b;
		}
	}
}

const SearchCategory = createSearchCategory(genAllBlocks)
registry.register(
	registry.Type.TOOLBOX_ITEM,
	'toolboxSearch',
	SearchCategory, true);

const separator = { kind: 'sep' }
const toolbox = {
	kind: "categoryToolbox",
	contents: [
		{ kind: 'toolboxSearch', name: 'Search' },
		separator,
		...categories,
		separator,
		demo,
	]
}
export default toolbox


function categorize(blocks, categories={}) {
	for (let [name, style] of blocks) {
		if (!(style in categories)) {
			categories[style]=[];
		}
		const item = {
			kind:"block",
			type:formatFunctionName(name),
			search: name.toLowerCase(),
		}
		categories[style].push(item);
	}
	const categorized = [];
	for (let name of Object.keys(categories).sort()) {
		categorized.push({
			kind: 'category',
			name,
			categoryStyle: name + '_category',
			contents: categories[name]
		});
	}

	return categorized;
}
