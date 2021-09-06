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
		// debug
		// var xml = blockly.Xml.workspaceToDom(workspace);
		// console.log(blockly.Xml.domToPrettyText(xml))

		try {
			const code = blockly[lang].workspaceToCode(workspace);
			formulaText.value = code;
		} catch(e) {
			alert(e)
		}
    })
    toBlocks.addEventListener('click', function () {
		const formula = formulaText.value;
		workspace.clear()
		try {
			parseAndBuild(formula, workspace)
			workspace.cleanUp()
		} catch(e) {
			alert(e)
		}
    })
});
