import blockly from 'blockly'

import '../blocks/Values/blocks'
import '../blocks/Math/blocks'
import '../blocks/Logical/standardBlocks'
import '../blocks/Text/blocks'

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
		case 'binaryOp':
			{ // code block scopes variables to this case
				let  op, blockName;
				switch (tree.symb) {
					// arithmetic
					case '+': blockName = 'arithmetic'; op = 'ADD'; break;
					case '-': blockName = 'arithmetic'; op = 'MINUS'; break;
					case '*': blockName = 'arithmetic'; op = 'MULTIPLY'; break;
					case '/': blockName = 'arithmetic'; op = 'DIVIDE'; break;
					case '^': blockName = 'arithmetic'; op = 'POWER'; break;
					// compare
					case '<': blockName = 'compare'; op = 'LT'; break;
					case '<=': blockName = 'compare'; op = 'LTE'; break;
					case '=': blockName = 'compare'; op = 'EQ'; break;
					case '<>': blockName = 'compare'; op = 'NEQ'; break;
					case '>': blockName = 'compare'; op = 'GT'; break;
					case '>=': blockName = 'compare'; op = 'GTE'; break;
					// concat TODO
					case '&': blockName = 'join'; break;
					default:
						throw new Error(`unimplemented binary op: ${tree.symb}`)
				}
				block = workspace.newBlock(`sheets_${blockName}`)
				if (op) {
					block.setFieldValue(op, 'OP')
				}
				try {
					const left = buildBlocks(workspace, tree.left, init)
					const right = buildBlocks(workspace, tree.right, init)
					if (left !== null) {
						const conn = block.getInput('A').connection
						conn.connect(left.outputConnection)
					}
					if (right !== null) {
						const conn = block.getInput('B').connection
						conn.connect(right.outputConnection)
					}
				} catch(e) {
					block.dispose()
					throw e
				}
			}
			break;
		case 'unaryOp':
			{ // code block scopes variables to this case
				let blockName;
				switch (tree.symb) {
					case '-': blockName = 'negate'; break;
					default:
						throw new Error(`unimplemented unary op: ${tree.symb}`)
				}
				block = workspace.newBlock(`sheets_${blockName}`)
				try {
					const right = buildBlocks(workspace, tree.right, init)
					if (right !== null) {
						const conn = block.getInput('A').connection
						conn.connect(right.outputConnection)
					}
				} catch(e) {
					block.dispose()
					throw e
				}
			}
			break;
		default:
			throw new Error(`unknown block kind, ${tree.kind}`)
	}
	init(block)
	return block;
}
