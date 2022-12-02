import { Workspace, serialization } from 'blockly'
import Latex from './latex'
import { createBlockFromArrayDef } from '../../generatedBlocks/formatGeneratedFunctions'
import { createFunctionGenerator } from './generator'
import '../../staticBlocks'

describe('math code generator', () => {
	let workspace;

	beforeAll(() => {
		workspace = new Workspace()

		const abs = ['ABS', '', false, '', ['value']];
		createBlockFromArrayDef(abs);
		createFunctionGenerator(abs);

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
		serialization.blocks.append(json, workspace);
	}

	test('build a formula', () => {
		const block = workspace.newBlock('sheets_number')
		block.setFieldValue('1', 'NUM')

		const formula = workspace.newBlock('sheets_formula')
		connect(block, formula.getInput('FORMULA'))

		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=1')
	})


	describe('precedence', () => {
		test('formula with addition', () => {
			addJSONBlock({
				"type": "sheets_formula",
				"inputs": {
					"FORMULA": {
						"block": {
							"type": "sheets_arithmetic",
							"fields": {
								"OP": "ADD"
							},
							"inputs": {
								"A": {
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
								},
								"B": {
									"block": {
										"type": "sheets_number",
										"fields": {
											"NUM": "3"
										}
									}
								}
							}
						}
					}
				}
			})

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=\\operatorname{ABS}(2) + 3')
		})

		test('multiplication over addition paren', () => {
			addJSONBlock({
				"type": "sheets_formula",
				"inputs": {
					"FORMULA": {
						"block": {
							"type": "sheets_arithmetic",
							"fields": {
								"OP": "MULTIPLY"
							},
							"inputs": {
								"A": {
									"block": {
										"type": "sheets_arithmetic",
										"fields": {"OP": "ADD"},
										"inputs": {
											"A": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "1"}
												}
											},
											"B": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "2"}
												}
											}
										}
									}
								},
								"B": {
									"block": {
										"type": "sheets_arithmetic",
										"fields": {"OP": "ADD"},
										"inputs": {
											"A": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "3"}
												}
											},
											"B": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "4"}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			})

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=(1 + 2) * (3 + 4)')
		})

		test('addition under multiplication no paren', () => {
			addJSONBlock({
				"type": "sheets_formula",
				"inputs": {
					"FORMULA": {
						"block": {
							"type": "sheets_arithmetic",
							"fields": {
								"OP": "ADD"
							},
							"inputs": {
								"A": {
									"block": {
										"type": "sheets_arithmetic",
										"fields": {
											"OP": "MULTIPLY"
										},
										"inputs": {
											"A": {
												"block": {
													"type": "sheets_number",
													"fields": {
														"NUM": "1"
													}
												}
											},
											"B": {
												"block": {
													"type": "sheets_number",
													"fields": {
														"NUM": "2"
													}
												}
											}
										}
									}
								},
								"B": {
									"block": {
										"type": "sheets_arithmetic",
										"fields": {
											"OP": "MULTIPLY"
										},
										"inputs": {
											"A": {
												"block": {
													"type": "sheets_number",
													"fields": {
														"NUM": "3"
													}
												}
											},
											"B": {
												"block": {
													"type": "sheets_number",
													"fields": {
														"NUM": "4"
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			})

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=1 * 2 + 3 * 4')
		})

		test('addition alongside addition', () => {
			addJSONBlock({
				"type": "sheets_formula",
				"inputs": {
					"FORMULA": {
						"block": {
							"type": "sheets_arithmetic",
							"fields": {"OP": "ADD"},
							"inputs": {
								"A": {
									"block": {
										"type": "sheets_arithmetic",
										"fields": {"OP": "ADD"},
										"inputs": {
											"A": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "1"}
												}
											},
											"B": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "2"}
												}
											}
										}
									}
								},
								"B": {
									"block": {
										"type": "sheets_arithmetic",
										"fields": {"OP": "ADD"},
										"inputs": {
											"A": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "3"}
												}
											},
											"B": {
												"block": {
													"type": "sheets_number",
													"fields": {"NUM": "4"}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			})

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=1 + 2 + 3 + 4')
		})
	})

})
