import Blockly from 'blockly'

export function formatFunctionName(name) {
	return 'sheets_' + name.toUpperCase().replaceAll(/[. ]/g, '_');
}

// FIXME ALL WIP here
// def: [name, style, inline, tooltip, args]
// args: string | arg_obj
// arg_obj: { name, opt, variadic }

// opt
// variadic
// variadic pair
function updateShape() {
	// v, i
	// vi
	// i, v

	while(variadicInputs < this.variadicCount_) {
		// add new variadic args
	}
	while(variadicInputs > this.variadicCount_) {
		// remove variadic args
	}
}

function saveExtraState() {
	return {
		'variadicCount': this.variadicCount_,
	};
}

function loadExtraState(state) {
	this.variadicCount_ = state['variadicCount'];
	this.updateShape_();
}


function getInit(def) {
	
}

export function createBlockFromArrayDef(def) {
	const [name, style, inline, tooltip, args] = def;
	Blockly.Blocks[formatFunctionName(name)] = {
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
		},
	};
}
