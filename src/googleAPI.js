

export async function getFormula() {
	if (typeof google === 'undefined') {
		return new Promise((resolve, reject) => {
			const formula = window.prompt("pick a formula", "=MAX(1,0)") 
			if (formula === null) {
				reject()
			} else {
				resolve(formula)
			}
		});
	} else {
		return new Promise((resolve,reject) => {
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.getActiveCellFormula();
		});
	}
}

export function submitFormula(formula) {
	if (typeof google === 'undefined') {
		window.alert(`formula changed to ${formula}`)
	} else {
		console.log("saving formula", formula)
		google.script.run
			   .withSuccessHandler(google.script.host.close)
			   .setActiveCellFormula(formula);
	}
}
