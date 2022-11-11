import blockly from 'blockly'
import Latex from './latex'
import '../../staticBlocks'
import { createBlockFromArrayDef } from '../../generatedBlocks/formatGeneratedFunctions'
import { createFunctionGenerator } from './generator'

// TODO create our function blocks

describe('functions', () => {
	let workspace;

	beforeAll(() => {
		workspace = new blockly.Workspace()
		// these aren't "real" generated blocks they are just test blocks
		const blockDefs = [
			['ABS', '', false, '', ['value']],
			['CONCAT', '', false, '', ['value1','value2']],
			['FILTER', '', false, '', ['range', 'condition1'], [['condition'], 2]],
			['COUNTIFS', '', false, '', ['criteria_range1', 'criterion1'], [['criteria_range', 'criterion'], 2]],
			['SWITCH', '', false, '', ['expression', 'case1', 'value1', 'default'], [['case','value'], 2, 3]],
		];
		blockDefs.forEach(b => {
			createBlockFromArrayDef(b);
			createFunctionGenerator(b);
		})
	})
	beforeEach(() => {
		workspace.clear()
	})
	afterAll(() => {
		workspace.dispose()
		workspace = null
	})

	function connect(outBlock, input) {
		const conn = input.connection
		conn.connect(outBlock.outputConnection)
	}
	function addJSONBlock(json) {
		blockly.serialization.blocks.append(json, workspace);
	}

	test('no arguments', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_ABS"
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{ABS}()')
	})
	test('one argument', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_ABS",
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": {
										"NUM": "2"
									}
								}
							}
						}
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{ABS}(2)')
	})
	test('two arguments', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_CONCAT",
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_text",
									"fields": {
										"TEXT": "a"
									}
								}
							},
							"ARG1": {
								"block": {
									"type": "sheets_text",
									"fields": {
										"TEXT": "b"
									}
								}
							}
						}
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{CONCAT}("a", "b")')
	})
	test('two arguments with order reversed', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_CONCAT",
						"inputs": {
							"ARG1": {
								"block": {
									"type": "sheets_text",
									"fields": {
										"TEXT": "b"
									}
								}
							},
							"ARG0": {
								"block": {
									"type": "sheets_text",
									"fields": {
										"TEXT": "a"
									}
								}
							}
						}
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{CONCAT}("a", "b")')
	})

	test('singly variadic arguments', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_FILTER",
						"extraState": { "variadicCount": 2 },
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": {
										"NUM": "1"
									}
								}
							},
							"VARG0": {
								"block": {
									"type": "sheets_number",
									"fields": {
										"NUM": "2"
									}
								}
							},
							"VARG1": {
								"block": {
									"type": "sheets_number",
									"fields": {
										"NUM": "3"
									}
								}
							},
						}
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{FILTER}(1, , 2, 3)')
	});

	test('paired variadic arguments', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_COUNTIFS",
						"extraState": { "variadicCount": 1 },
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": {"NUM": "1"}
								}
							},
							"ARG1": {
								"block": {
									"type": "sheets_number",
									"fields": {"NUM": "2"}
								}
							},
							"VARG0": {
								"block": {
									"type": "sheets_number",
									"fields": {"NUM": "3"}
								}
							},
							"VARG1": {
								"block": {
									"type": "sheets_number",
									"fields": {"NUM": "4"}
								}
							},
						}
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{COUNTIFS}(1, 2, 3, 4)')
	});

	test('variadic arguments with position offset', () => {
		// SWITCH(expression, case1, value1, [default or case2, value2], …)
		addJSONBlock({
				"type": "sheets_formula",
				"inputs": {
					"FORMULA": {
						"block": {
							"type": "sheets_SWITCH",
							"extraState": { "variadicCount": 1 },
							"inputs": {
								"ARG0": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "1"
										}
									}
								},
								"ARG1": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "2"
										}
									}
								},
								"ARG2": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "3"
										}
									}
								},
								// actually end
								"ARG3": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "6"
										}
									}
								},
								"VARG0": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "4"
										}
									}
								},
								"VARG1": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "5"
										}
									}
								},
							}
						}
					}
				}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=\\operatorname{SWITCH}(1, 2, 3, 4, 5, 6)')
	})
})
