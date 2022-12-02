import { Blocks, Mutator } from 'blockly'

// depends on mutator blocks
import '../staticBlocks/Values/standardBlocks'

// def: [name, style, inline, tooltip, args, variadic?]
// name: string
// style: string
// inline: boolean
// tooltip: string
// args: string[]
// variadic: [variadicNames, indexStart=1, variadicStart=nonVariadicArgs.length]
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
				this.appendValueInput(`ARG${i}`)
					.setCheck(null)
					.appendField(arg);
			}
			if (variadic) {
				this.setMutator(new Mutator(
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
	Blocks[formatFunctionName(name)] = blockDef;

	return;

}

export function formatFunctionName(name) {
	return 'sheets_' + name.toUpperCase().replaceAll(/[. ]/g, '_');
}

function getVariadicFunctions(nonVariadicArgs, [variadicNames, indexStart=1, variadicStart=nonVariadicArgs.length]) {
	return {
		saveExtraState,
		loadExtraState,
		updateShape_: updateShape,
		decompose,
		compose,
		setVariadicCount,
		setTotalArgCount,
		saveConnections,
	}

	// functions that depend on variadic state are made to order here
	// --

	function updateShape() {
		// one for title dummy input
		let nVariadicArgs = this.inputList.length - 1 - nonVariadicArgs.length;
		if(nVariadicArgs % variadicNames.length !== 0) {
			throw new Error('the number of variadic arguments is not a multiple of group size')
		}
		let nVariadicGroups = nVariadicArgs / variadicNames.length

		let nameOfInputThatVariadicsPrecede = null;
		if (variadicStart < nonVariadicArgs.length) {
			nameOfInputThatVariadicsPrecede = `ARG${variadicStart}`
		}

		while(nVariadicGroups < this.variadicCount_) {
			// add new args
			const varI = nVariadicGroups + indexStart;
			for(let name of variadicNames) {
				const inputName = `VARG${nVariadicArgs}`;
				this.appendValueInput(inputName)
					.appendField(name + varI);
				this.moveInputBefore(inputName, nameOfInputThatVariadicsPrecede);
				nVariadicArgs++;
			}
			nVariadicGroups++;
		}
		while(nVariadicGroups > this.variadicCount_) {
			// remove args, always remove the last
			for(let _ of variadicNames) {
				this.removeInput(`VARG${nVariadicArgs-1}`);
				nVariadicArgs--;
			}
			nVariadicGroups--;
		}
	}

	// configure the mutator
	function decompose(workspace) {
		const topBlock = workspace.newBlock('mutator_variable_container');
		topBlock.getField('NAME').setValue('variadic arguments');
		// coalese initSvg because it is not defined in the test environment
		topBlock.initSvg?.call(topBlock);

		let connection = topBlock.getInput('STACK').connection;
		for (let i = 0; i < this.variadicCount_; i++) {
			let itemBlock = workspace.newBlock('mutator_variable_container_item');
			itemBlock.initSvg?.call(itemBlock);
			connection.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}

		return topBlock;
	}

	// called before modifications to associate mutator blocks with workspace connections
	// via added property valueConnections_
	// this is needed for variadic args only
	function saveConnections(topBlock) {
		let itemBlock = topBlock.getInputTargetBlock('STACK');

		// this is the index of the first variadic arg
		let i = 0;
		while (itemBlock) {
			const connections = [];
			// need to collect all the connections for this variadic group.
			// They are all associated with this itemBlock
			for (let _ of variadicNames) {
				let input = this.getInput(`VARG${i}`);
				connections.push(input && input.connection.targetConnection);
				i++;
			}
			itemBlock.valueConnections_ = connections;
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
			// note valueConnections_ is populated by saveConnections
			if (itemBlock.valueConnections_) {
				connections.push(...itemBlock.valueConnections_);
			} else {
				connections.push(...variadicNames.map(n => undefined));
			}
			itemBlock = itemBlock.getNextBlock();
		}

		const prevNArgs = nonVariadicArgs.length + variadicNames.length * this.variadicCount_;
		const firstVariadicIndex = nonVariadicArgs.length;

		for (let i = 0; i < variadicNames.length * this.variadicCount_; i++) {
			let connection = this.getInput(`VARG${i}`).connection.targetConnection;
			if (connection && connections.indexOf(connection) == -1) {
				connection.disconnect();
			}
		}

		this.variadicCount_ = Math.floor(connections.length / variadicNames.length);
		this.updateShape_();

		for (let i = 0; i < variadicNames.length * this.variadicCount_; i++) {
			const reconnected = Mutator.reconnect(connections[i], this, `VARG${i}`);
		}

	}

	// helper for programatic resize when we don't know all the arg info
	function setTotalArgCount(number) {
		const vargs = number - nonVariadicArgs.length;
		this.setVariadicCount(vargs / variadicNames.length);
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
