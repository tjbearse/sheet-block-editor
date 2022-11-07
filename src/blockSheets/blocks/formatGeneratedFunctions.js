import Blockly from 'blockly'

import './values/standardBlocks'

// def: [name, style, inline, tooltip, args, variadic?]
// name: string
// style: string
// inline: boolean
// tooltip: string
// args: string[]
// variadic: [nameRoot, indexStart=1]
export function createBlockFromArrayDef(def) {
	const [name, style, inline, tooltip, args, variadic=null] = def;
	const blockDef = {
		init: function() {
			this.setStyle(style);
			this.setTooltip(tooltip);
			this.setOutput(true, null);
			this.setInputsInline(inline);

			this.appendDummyInput()
				.appendField(name);

			for (let i=0; i < args.length; i++) {
				const arg = args[i];
				// TODO handle variadic / optional args
				this.appendValueInput(`ARG${i}`)
					.setCheck(null)
					.appendField(arg);
			}
			if (variadic) {
				this.setMutator(new Blockly.Mutator(
					['mutator_variable_container_item'],
					this
				));

				this.updateShape_();
			}
		},
	};
	if (variadic) {
		Object.assign(blockDef, getVariadicFunctions(args, variadic))
	}
	Blockly.Blocks[formatFunctionName(name)] = blockDef;

	return;

}

export function formatFunctionName(name) {
	return 'sheets_' + name.toUpperCase().replaceAll(/[. ]/g, '_');
}

/*
	// TODO variadicStyle argStartIndex=length
	mapping variadic counts to args (single w/ name, paired, dual variadic) (serialize as a function style)
		compose (mutator to block) expand mutator to variadic
		decompose (block to mutator) collapse variadics to mutator
	how to slot args into arg list (number)
*/

function getVariadicFunctions(nonVariadicArgs, [variadicName, indexStart=1]) {
	return {
		saveExtraState,
		loadExtraState,
		updateShape_: updateShape,
		decompose,
		compose,
		setVariadicCount,
		saveConnections,
	}

	// functions that depend on variadic state are made to order here
	// --

	function updateShape() {
		// TODO arg numbers will need to change when we put variadics in the middle of the nonVariadicArgs
		// may need to rebuild non-variadic args if we can only append
		// TODO mapping variadic count to argument count happens here

		// one for title dummy
		const targetInputCount = 1 + nonVariadicArgs.length + this.variadicCount_;

		while(this.inputList.length < targetInputCount) {
			// add new args
			const argI = this.inputList.length - 1;
			const varI = this.inputList.length - 1 - nonVariadicArgs.length + indexStart;
			this.appendValueInput(`ARG${argI}`)
				.appendField(variadicName + varI); // TODO number variadics
		}
		while(this.inputList.length > targetInputCount) {
			// remove args
			const i = this.inputList.length - 2;
			this.removeInput(`ARG${i}`);
		}
	}

	// configure the mutator
	function decompose(workspace) {
		const topBlock = workspace.newBlock('mutator_variable_container');
		topBlock.getField('NAME').setValue('variadic arguments');
		// coalese initSvg because it is not defined in the test environment
		topBlock.initSvg?.call(topBlock);

		let connection = topBlock.getInput('STACK').connection;
		for (var i = 0; i < this.variadicCount_; i++) {
			var itemBlock = workspace.newBlock('mutator_variable_container_item');
			topBlock.initSvg?.call(topBlock);
			connection.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}

		return topBlock;
	}

	// called before modifications to associate mutator blocks with workspace connections
	// via added property valueConnection_
	function saveConnections(topBlock) {
		var itemBlock = topBlock.getInputTargetBlock('STACK');

		var i = 0;
		while (itemBlock) {
			var input = this.getInput(`ARG${i}`);
			itemBlock.valueConnection_ = input && input.connection.targetConnection;
			i++;
			itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
		}
	}

	// configure the block from mutator
	function compose(topBlock) {
		var itemBlock = topBlock.getInputTargetBlock('STACK');

		var connections = [];
		while (itemBlock) {
			if (itemBlock.IsInsertionMarker) {
				itemBlock = itemBlock.getNextBlock();
				continue;
			}
			// note valueConnection_ is populated by saveConnections
			connections.push(itemBlock.valueConnection_);
			itemBlock = itemBlock.getNextBlock();
		}

		// FIXME variadic count != argument count
		for (var i = 0; i < nonVariadicArgs.length + this.variadicCount_; i++) {
			var connection = this.getInput(`ARG${i}`).connection.targetConnection;
			if (connection && connections.indexOf(connection) == -1) {
				connection.disconnect();
			}
		}

		this.variadicCount_ = connections.length;
		this.updateShape_();

		for (var i = 0; i < this.variadicCount_; i++) {
			const reconnected = Blockly.Mutator.reconnect(connections[i], this, `ARG${i}`);
		}

	}
}

function saveExtraState() {
	return {
		'variadicCount': this.variadicCount_ || 0,
	};
}

function loadExtraState(state) {
	this.variadicCount_ = state['variadicCount'] || 0;
	this.updateShape_();
}

// helper for programatic resize
function setVariadicCount(number) {
	this.variadicCount_ = Math.max(this.variadicCount_ || 0, number);
	this.updateShape_();
}
