import generatedToolbox from './generatedBlocks/generated/toolbox.json'
import values from './staticBlocks/Values/toolboxCategory.json'
import demo from './staticBlocks/demoToolboxCategory.js'

const separator = { kind: 'sep' }

const toolbox = {
	...generatedToolbox,
	contents: [
		...generatedToolbox.contents,
		values,
		separator,
		demo,
	]
}
export default toolbox
