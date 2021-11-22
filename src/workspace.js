import blockly from 'blockly'
import './blockSheets';
import toolbox from './blockSheets/defaultToolbox'
import theme from './theme'

import * as En from 'blockly/msg/en';
blockly.setLocale(En);


export const initWorkspace = (id = 'blocklyDiv') => {
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
