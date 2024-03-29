import { Blocks, Mutator } from 'blockly'

import './standardBlocks'

Blocks['sheets_columns'] = {
	init: getInit('Columns', 'a 1-dimensional array literal in the horizontal direction'),
	saveExtraState,
	loadExtraState,
	updateShape_: updateShape,
	decompose: getDecompose('Columns'),
	ensureCapacity,
	compose,
	saveConnections,
};
Blocks['sheets_rows'] = {
	init: getInit('Rows', 'a 1-dimensional array literal in the vertical direction'),
	saveExtraState,
	loadExtraState,
	updateShape_: updateShape,
	decompose: getDecompose('Rows'),
	ensureCapacity,
	compose,
	saveConnections,
};

const style = 'Value_style';
const inline = false;

function getInit(name, tooltip) {
	return init
	function init() {
		this.setStyle(style);
		this.setTooltip(tooltip);
		this.setOutput(true, null);
		this.setInputsInline(inline);

		this.appendDummyInput()
			.appendField(name);

		this.setMutator(new Mutator(
			['mutator_variable_container_item'],
			this
		));

		this.updateShape_();
	}
}

function updateShape() {
	// length-1 accounts for dummy input

	while(this.inputList.length - 1 < this.count_) {
		// add new args
		const i = this.inputList.length - 1;
		this.appendValueInput(`ITEM${i}`);
	}
	while(this.inputList.length - 1 > this.count_) {
		// remove args
		const i = this.inputList.length - 2;
		this.removeInput(`ITEM${i}`)
	}
}

function saveExtraState() {
	return {
		'count': this.count_ || 0,
	};
}

function loadExtraState(state) {
	this.count_ = state['count'] || 0;
	this.updateShape_();
}

// helper for programatic resize
function ensureCapacity(number) {
	this.count_ = Math.max(this.count_ || 0, number);
	this.updateShape_();
}

function getDecompose(name) {
	return decompose;

	// configure the mutator
	function decompose(workspace) {
		const topBlock = workspace.newBlock('mutator_variable_container');
		topBlock.getField('NAME').setValue(name);
		// coalese initSvg because it is not defined in the test environment
		topBlock.initSvg?.call(topBlock);

		let connection = topBlock.getInput('STACK').connection;
		for (let i = 0; i < this.count_; i++) {
			let itemBlock = workspace.newBlock('mutator_variable_container_item');
			itemBlock.initSvg?.call(itemBlock);
			connection.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}

		return topBlock;
	}
}

// called before modifications to associate mutator blocks with workspace connections
// via added property valueConnection_
function saveConnections(topBlock) {
	let itemBlock = topBlock.getInputTargetBlock('STACK');

	let i = 0;
	while (itemBlock) {
		let input = this.getInput(`ITEM${i}`);
		itemBlock.valueConnection_ = input && input.connection.targetConnection;
		i++;
		itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
	}
}

// configure the block from mutator
function compose(topBlock) {
	let itemBlock = topBlock.getInputTargetBlock('STACK');

	let connections = [];
	while (itemBlock) {
		if (itemBlock.IsInsertionMarker) {
			itemBlock = itemBlock.getNextBlock();
			continue;
		}
		// note valueConnection_ is populated by saveConnections
		connections.push(itemBlock.valueConnection_);
		itemBlock = itemBlock.getNextBlock();
	}

	for (let i = 0; i < this.count_; i++) {
		let connection = this.getInput(`ITEM${i}`).connection.targetConnection;
		if (connection && connections.indexOf(connection) == -1) {
			connection.disconnect();
		}
	}

	this.count_ = connections.length;
	this.updateShape_();

	for (let i = 0; i < this.count_; i++) {
		const reconnected = Mutator.reconnect(connections[i], this, `ITEM${i}`);
	}

}
