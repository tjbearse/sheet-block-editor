import blockly from 'blockly'
import initWorkspace from '../workspace'
import { parseAndBuild } from '../googleSheets'
import { getFormula, submitFormula } from './googleAPI'

const lang = 'GoogleSheets';

document.addEventListener("DOMContentLoaded", function () {
    const workspace = initWorkspace()

    const submit = document.getElementById('submit');
    const formulaText = document.getElementById('formulaText');

	getFormula()
		.then((formula) => {
			workspace.clear()
			parseAndBuild(formula, workspace)
			workspace.cleanUp()
		})

	workspace.addChangeListener(() => {
		formulaText.value = blockly[lang].workspaceToCode(workspace);
	})


    submit.addEventListener('click', function () {
        const formula = blockly[lang].workspaceToCode(workspace);
		submitFormula(formula)
    })
});
