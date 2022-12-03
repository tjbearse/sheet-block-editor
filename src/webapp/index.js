import * as blockly from 'blockly'
import initWorkspace from '../workspace'

import { parseAndBuild, toolbox, theme, GoogleSheets, Latex } from '../blockSheets'

document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
	const [workspace, root] = await initWorkspace()

	const form = document.getElementById('codeForm');
	const formulaText = document.getElementById('formulaText');
	const textAsMath = document.getElementById('latex');
	const errorModal = document.getElementById('errorModal');
	const errorText = document.getElementById('errorText');
	window.workspace = workspace;
	window.Blockly = blockly;

	form.onsubmit = (e) => { codeToBlocks(); e.preventDefault(); }
	workspace.addChangeListener(onUpdate);

	return

	// --

	function onUpdate(event) {
		if (!event.isUIEvent) {
			blocksToCode();
			updateMath()
		}
	}

	function blocksToCode() {
		try {
			const code = GoogleSheets.workspaceToCode(workspace);
			formulaText.value = code;

		} catch(e) {
			console.error(e);
			displayError(e)
			throw e;
		}
	}

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
			throw e;
		}
	}

	function codeToBlocks() {
		// replace only the root formula block's output connection
		const formula = formulaText.value || formulaText.placeholder;
		try {
			const conn = root.getInput('FORMULA').connection;
			const formulaBlocks = parseAndBuild(formula, workspace)
			if (conn.isConnected()) {
				// false -> do not 'healstack', i.e. do recursive dispose
				conn.targetBlock().dispose(false);
			}
			if (formulaBlocks) {
				conn.connect(formulaBlocks.outputConnection)
			}
		} catch(e) {
			console.error(e);
			displayError(e.message)
			throw e
		}
		updateMath()
	}

	function displayError(e) {
		errorText.innerText = e;
		errorModal.showModal();
	}

}
