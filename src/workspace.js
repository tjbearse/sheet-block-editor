import { toolbox, theme } from './blockSheets';
import { setLocale, inject, En } from 'blockly'
setLocale(En);


export const initWorkspace = async (id = 'blocklyDiv') => {
	const ws = inject(id,
	    {
	        toolbox: toolbox,
	        media: 'media/',
			theme: theme,
			zoom: {
				controls: true,
				wheel: true,
				maxScale: 2,
				minScale: 0.5,
			},

	    })
	const block = ws.newBlock('sheets_formula')
	block.setDeletable(false);
	block.setEditable(false);
	block.initSvg();
	block.render();
	return [ws, block];
}

export default initWorkspace
