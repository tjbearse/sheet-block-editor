import blockly from 'blockly'
import initWorkspace from '../workspace'
import { parseAndBuild, GoogleSheets } from '../blockSheets'
import { getFormula, submitFormula } from 'googleAPI'

document.addEventListener("DOMContentLoaded", async function () {
    const [workspace, root] = await initWorkspace()
	getFormula()
		.then((formula) => {
			formulaOnToRoot(formula);
		})

    const submit = document.getElementById('submit');
    const formulaText = document.getElementById('formulaText');

	workspace.addChangeListener(() => {
		formulaText.value = GoogleSheets.workspaceToCode(workspace);
	})


    submit.addEventListener('click', function () {
        const formula = GoogleSheets.workspaceToCode(workspace);
		submitFormula(formula)
    })

	function formulaOnToRoot(formula) {
		const conn = root.getInput('FORMULA').connection;
		const formulaBlocks = parseAndBuild(formula, workspace)
		if (conn.isConnected()) {
			// false -> do not 'healstack', i.e. do recursive dispose
			conn.targetBlock().dispose(false);
		}
		if (formulaBlocks) {
			conn.connect(formulaBlocks.outputConnection)
		}
	}
});
