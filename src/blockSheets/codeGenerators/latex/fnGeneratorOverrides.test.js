import blockly from 'blockly'
import Latex from './latex'
import './generator'
import '../../blocks'

describe('generator overrides', () => {
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
	test('pow', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_POW",
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": {
										"NUM": "4"
									}
								}
							},
							"ARG1": {
								"block": {
									"type": "sheets_number",
									"fields": {
										"NUM": "5"
									}
								}
							}
						}
					}
				}
			}
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toEqual('={4}^{5}')
	})
	test('sqrt', () => {
		addJSONBlock({
			"type": "sheets_formula",
			"inputs": {
				"FORMULA": {
					"block": {
						"type": "sheets_SQRT",
						"inputs": {
							"ARG0": {
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
		})
		const code = Latex.workspaceToCode(workspace);
		expect(code).toEqual('=\\sqrt{4}')
	})
})