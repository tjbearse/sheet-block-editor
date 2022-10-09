import Blockly from 'blockly'

export function formatFunctionName(name) {
	return 'sheets_' + name.toUpperCase().replaceAll(/[. ]/g, '_');
}

// def: name, style, inline, tooltip, args
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
		}
	};
}
