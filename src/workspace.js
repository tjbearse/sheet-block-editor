import { toolbox, theme } from './blockSheets';
import blockly, { En } from 'blockly'
blockly.setLocale(En);


export const initWorkspace = async (id = 'blocklyDiv') => {
	const ws = blockly.inject(id,
	    {
	        toolbox: toolbox,
	        media: 'media/',
			theme: theme,
	    })
	const block = ws.newBlock('sheets_formula')
	block.setDeletable(false);
	block.setEditable(false);
	block.initSvg();
	block.render();
	return [ws, block];
}

export default initWorkspace
