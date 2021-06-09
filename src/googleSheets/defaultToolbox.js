import array from './blocks/Array/toolboxCategory.json'
import database from './blocks/Database/toolboxCategory.json'
import date from './blocks/Date/toolboxCategory.json'
import engineering from './blocks/Engineering/toolboxCategory.json'
import filter from './blocks/Filter/toolboxCategory.json'
import financial from './blocks/Financial/toolboxCategory.json'
import google from './blocks/Google/toolboxCategory.json'
import info from './blocks/Info/toolboxCategory.json'
import logical from './blocks/Logical/toolboxCategory.json'
import lookup from './blocks/Lookup/toolboxCategory.json'
import math from './blocks/Math/toolboxCategory.json'
import operator from './blocks/Operator/toolboxCategory.json'
import parser from './blocks/Parser/toolboxCategory.json'
import statistical from './blocks/Statistical/toolboxCategory.json'
import text from './blocks/Text/toolboxCategory.json'
import values from './blocks/Values/toolboxCategory.json'
import web from './blocks/Web/toolboxCategory.json'

const toolbox = {
	"kind": "categoryToolbox",
	"contents": [
		array,
		database,
		date,
		engineering,
		filter,
		financial,
		google,
		info,
		logical,
		lookup,
		math,
		operator,
		parser,
		statistical,
		text,
		web,
		values
	].filter(x => x) // some of these might be empty if we are filtering
}
export default toolbox
