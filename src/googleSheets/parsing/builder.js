import blockly from 'blockly'

// FIXME magic constant input_value
const InputValue = 1

export const buildBlocks = (workspace, tree, init=()=>{}) => {
	let block = null;
	if (tree === null) {
		return null
	}
	switch (tree.kind) {
		case 'value':
			switch (typeof tree.value) {
				case 'number':
					block = workspace.newBlock('sheets_number')
					block.setFieldValue(tree.value, 'NUM')
					break;
				case 'string':
					block = workspace.newBlock('sheets_text')
					block.setFieldValue(tree.value, 'TEXT')
					break;
				case 'boolean':
					block = workspace.newBlock('sheets_boolean')
					block.setFieldValue(tree.value? 'TRUE' : 'FALSE', 'BOOL')
					break;
				default:
					throw new Error("unimplemented value type")
			}
			break;
		case 'range':
			block = workspace.newBlock('sheets_cell')
			block.setFieldValue(tree.range, 'CELL')
			break;
		case 'func':
			block = workspace.newBlock(`sheets_${tree.name}`)
			const inputs = block.inputList.filter(i => i.type === InputValue)
			try {
				if (tree.args.length > inputs.length) {
					throw new Error(`too many arguments given (${tree.args.length}) for function ${tree.name} (wanted ${inputs.length})`)
				}
				tree.args.forEach((a, i) => {
					const b2 = buildBlocks(workspace, a, init)
					if (b2 !== null) {
						const conn = inputs[i].connection
						conn.connect(b2.outputConnection)
					}
				})
			} catch(e) {
				block.dispose()
				throw e
			}

			break;
		default:
			throw new Error(`unknown block kind, ${tree.kind}`)
	}
	init(block)
	return block;
}
