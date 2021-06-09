import blockly from 'blockly'
import initWorkspace from './workspace'
import { parseAndBuild } from './googleSheets'

document.addEventListener("DOMContentLoaded", function () {
    const workspace = initWorkspace()

    const lang = 'GoogleSheets';
    const toCode = document.getElementById('toCode');
    const toBlocks = document.getElementById('toBlocks');
    const formulaText = document.getElementById('formulaText');

    toCode.addEventListener('click', function () {
        const code = blockly[lang].workspaceToCode(workspace);
		formulaText.value = code;
    })
    toBlocks.addEventListener('click', function () {
		const formula = formulaText.value;
		workspace.clear()
		parseAndBuild(formula, workspace)
		workspace.cleanUp()
    })
});
