import blockly from 'blockly'
import GoogleSheets from './googleSheets'
import './generator'
import '../../blocks'

describe('math code generator', () => {
	let workspace;

	beforeAll(() => {
		workspace = new blockly.Workspace()
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

	test('build a formula', () => {
		const block = workspace.newBlock('sheets_number')
		block.setFieldValue('1', 'NUM')

		const formula = workspace.newBlock('sheets_formula')
		connect(block, formula.getInput('FORMULA'))

		const code = GoogleSheets.workspaceToCode(workspace);
		expect(code).toBe('=1')
	})

	describe('formula', () => {
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
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=ABS()')
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
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=ABS(2)')
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
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT("a", "b")')
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
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT("a", "b")')
		})
		test('collapse when no arguments / all empty', () => {
			addJSONBlock({
				"type": "sheets_formula",
				"inputs": {
					"FORMULA": {
						"block": {
							"type": "sheets_CONCAT"
						}
					}
				}
			})
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT(, )')
		})

		test('add spacer for leading empty arguments', () => {
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
								}
							}
						}
					}
				}
			})
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT(, "b")')
		})
		test.skip('collapse trailing empty arguments (github issue #7)', () => {
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
								}
							}
						}
					}
				}
			})
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT("a")')
		})
		test('add spacer for empty arguments in the middle', () => {
			addJSONBlock({
					"type": "sheets_formula",
					"inputs": {
						"FORMULA": {
							"block": {
								"type": "sheets_BASE",
								"inputs": {
									"ARG0": {
										"block": {
											"type": "sheets_number",
											"fields": {
												"NUM": "1"
											}
										}
									},
									"ARG2": {
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
			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=BASE(1, , 2)')
		})
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

			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=ABS(2) + 3')
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
										"fields": {
											"OP": "ADD"
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
											"OP": "ADD"
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

			const code = GoogleSheets.workspaceToCode(workspace);
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

			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=1 * 2 + 3 * 4')
		})

		test('multiplication alongside multiplication', () => {
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

			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=1 * 2 * 3 * 4')
		})

		test('addition alongside addition', () => {
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
											"OP": "ADD"
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
											"OP": "ADD"
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

			const code = GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=1 + 2 + 3 + 4')
		})
	})

})
