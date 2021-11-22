import blockly from 'blockly'
import initWorkspace from './workspace'
import { parseAndBuild } from './blockSheets'
import GoogleSheets from './blockSheets/codeGenerators/googleSheetsFormula'
import Latex from './blockSheets/codeGenerators/latex'

document.addEventListener("DOMContentLoaded", function () {
    const [workspace, root] = initWorkspace()

    const toCode = document.getElementById('toCode');
    const toBlocks = document.getElementById('toBlocks');
    const formulaText = document.getElementById('formulaText');
    const textAsMath = document.getElementById('latex');

    toCode.addEventListener('click', function () {
		// debug
		// var xml = blockly.Xml.workspaceToDom(workspace);
		// console.log(blockly.Xml.domToPrettyText(xml))

		try {
			const code = GoogleSheets.workspaceToCode(workspace);
			formulaText.value = code;

		} catch(e) {
			alert(e)
		}
		updateMath()
    })
    toBlocks.addEventListener('click', function () {
		// replace only the root formula block's output connection
		const formula = formulaText.value || formulaText.placeholder;
		try {
			const conn = root.getInput('FORMULA').connection;
			const formulaBlocks = parseAndBuild(formula, workspace)
			if (conn.isConnected()) {
				conn.targetBlock().dispose(true);
			}
			if (formulaBlocks) {
				conn.connect(formulaBlocks.outputConnection)
			}
		} catch(e) {
			alert(e)
		}
		updateMath()
    })

	function updateMath() {
		try {
			const math = Latex.workspaceToCode(workspace);

			textAsMath.innerHTML = '';

			math.split('\n').forEach(m => {
				const html = window.MathJax.tex2chtml(m, {em: 12, ex: 6});
				textAsMath.appendChild(html);
			})
		} catch (e) {
			console.error(e);
		}
	}


	function onUpdate(event) {
		if (!event.isUIEvent) {
			updateMath()
		}
	}

	workspace.addChangeListener(onUpdate);

});
