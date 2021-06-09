import blockly from 'blockly'
import './googleSheets';
import toolbox from './googleSheets/defaultToolbox'
import theme from './theme'

import * as En from 'blockly/msg/en';
blockly.setLocale(En);


export const initWorkspace = (id = 'blocklyDiv') =>
    blockly.inject(id,
        {
            toolbox: toolbox,
            media: 'media/',
			theme: theme,
        })

export default initWorkspace
