import blockly from 'blockly'

import '../staticBlocks'
// FIXME depends on generated blocks too?

export const buildBlocks = (workspace, tree, init=()=>{}) => {
	let block = null;
	if (tree === null) {
		return null
	}
	switch (tree.kind) {
		case 'value':
			block = makeValueBlock(workspace, tree, init);
			break;
		case 'range':
			block = workspace.newBlock('sheets_cell')
			block.setFieldValue(tree.range, 'CELL')
			break;
		case 'array':
			block = makeArrayBlock(workspace, tree, init);
			break;
		case 'func':
			block = makeFuncBlock(workspace, tree, init);
			break;
		case 'binaryOp':
			block = makeBinOpBlock(workspace, tree, init);
			break;
		case 'unaryOp':
			block = makeUnOpBlock(workspace, tree, init);
			break;
		default:
			throw new Error(`unknown block kind, ${tree.kind}`)
	}
	init(block)
	return block;
}

function makeUnOpBlock(workspace, tree, init) {
	let blockName;
	switch (tree.symb) {
		case '-': blockName = 'negate'; break;
		default:
			throw new Error(`unimplemented unary op: ${tree.symb}`)
	}
	const block = workspace.newBlock(`sheets_${blockName}`)
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
	return block;
}

function makeBinOpBlock(workspace, tree, init) {
	let op, blockName;
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
	const block = workspace.newBlock(`sheets_${blockName}`)
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
	return block;
}

// FIXME magic constant input_value
// I think we can reference arg names(by index) directly instead now.
const InputValue = 1
function makeFuncBlock(workspace, tree, init) {
	const block = workspace.newBlock(`sheets_${tree.name}`)
	let inputs = block.inputList.filter(i => i.type === InputValue)
	try {
		if (tree.args.length > inputs.length) {
			if (block.setTotalArgCount) {
				block.setTotalArgCount(tree.args.length);
				inputs = block.inputList.filter(i => i.type === InputValue)
			} else {
				throw new Error(`too many arguments given (${tree.args.length}) for function ${tree.name} (wanted ${inputs.length})`)
			}
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
	return block;
}

function makeValueBlock(workspace, tree, init) {
	let block = null;
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
	return block;
}

function makeArrayBlock(workspace, tree, init) {
	const nRows = tree.values.length;
	const nCols = tree.values[0]?.length ?? 0;
	// TODO use tree.values to inflate array
	// TODO refactor some of the nesting here into functions?

	if (nRows < 2) {
		// single row, takes precedence over rows only
		const block = workspace.newBlock('sheets_columns');
		block.ensureCapacity(nCols);
		if (nRows === 1) {
			const row = tree.values[0];
			for (let i = 0; i < nCols; i++) {
				const node = row[i];
				const vBlock = buildBlocks(workspace, node, init);
				const conn = block.getInput(`ITEM${i}`).connection;
				conn.connect(vBlock.outputConnection);
			}
		}
		return block;
	} else if (nCols < 2) {
		// single column
		const block = workspace.newBlock('sheets_rows');
		block.ensureCapacity(nRows);
		if (nCols === 1) {
			for (let i = 0; i < nRows; i++) {
				const row = tree.values[i];
				const node = row[0];
				const vBlock = buildBlocks(workspace, node, init);
				const conn = block.getInput(`ITEM${i}`).connection;
				conn.connect(vBlock.outputConnection);
			}
		}
		return block;
	} else {
		// 2d array, insert columns into rows
		const root = workspace.newBlock('sheets_rows');
		root.ensureCapacity(nRows);
		for (let r = 0; r < nRows; r++) {
			const col = tree.values[r];
			const columnBlock = workspace.newBlock('sheets_columns');
			columnBlock.ensureCapacity(nCols);
			init(columnBlock);
			for (let c = 0; c < nCols; c++) {
				const node = tree.values[r][c];
				const vBlock = buildBlocks(workspace, node, init);
				columnBlock.getInput(`ITEM${c}`).connection
					.connect(vBlock.outputConnection);
			}
			root.getInput(`ITEM${r}`).connection.connect(columnBlock.outputConnection);
		}
		return root;
	}
}
