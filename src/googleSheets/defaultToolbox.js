import generatedToolbox from './blocks/generated/toolbox.json'
import values from './blocks/Values/toolboxCategory.json'
import demo from './blocks/demoToolboxCategory.js'

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
