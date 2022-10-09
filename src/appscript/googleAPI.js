
// this module is aliased as googleAPI when not in dev config

export async function getFormula() {
	return new Promise((resolve,reject) => {
		google.script.run
			.withSuccessHandler(resolve)
			.withFailureHandler(reject)
			.getActiveCellFormula();
	});
}

export function submitFormula(formula) {
	console.log("saving formula", formula)
	google.script.run
			.withSuccessHandler(google.script.host.close)
			.setActiveCellFormula(formula);
}
