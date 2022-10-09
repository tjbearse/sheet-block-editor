
// this module is aliased as googleAPI when in dev mode

export async function getFormula() {
	return new Promise((resolve, reject) => {
		const formula = window.prompt("pick a formula", "=MAX(1,0)") 
		if (formula === null) {
			reject()
		} else {
			resolve(formula)
		}
	});
}

export function submitFormula(formula) {
	window.alert(`formula changed to ${formula}`)
	return Promise.resolve();
}
