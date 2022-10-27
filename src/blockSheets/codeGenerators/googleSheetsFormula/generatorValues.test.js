import blockly from 'blockly'
import GoogleSheets from './googleSheets'
import '../../blocks/Values/blocks'

import './generator'

describe('value code generator', () => {
	let workspace;

	function addJSONBlock(json) {
		return blockly.serialization.blocks.append(json, workspace);
	}

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

	describe('number', () => {
		test('build a positive number', () => {
			const block = workspace.newBlock('sheets_number')
			block.setFieldValue(1, 'NUM')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1')
		})

		test('build a negative number', () => {
			const block = workspace.newBlock('sheets_number')
			block.setFieldValue(-1, 'NUM')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('-1')
		})

		test('build an unset number', () => {
			const block = workspace.newBlock('sheets_number')
			// block.setFieldValue(1, 'NUM')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('0')
		})
	})

	describe('text', () => {
		test('build a string', () => {
			const block = workspace.newBlock('sheets_text')
			block.setFieldValue('test', 'TEXT')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('"test"')
		})

		test('build an empty string', () => {
			const block = workspace.newBlock('sheets_text')
			block.setFieldValue('', 'TEXT')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('""')
		})

		test('build an unset string', () => {
			const block = workspace.newBlock('sheets_text')
			// block.setFieldValue('', 'TEXT')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('""')
		})
	})

	describe('boolean', () => {
		test('build true', () => {
			const block = workspace.newBlock('sheets_boolean')
			block.setFieldValue('TRUE', 'BOOL')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('TRUE')
		})

		test('build false', () => {
			const block = workspace.newBlock('sheets_boolean')
			block.setFieldValue('FALSE', 'BOOL')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('FALSE')
		})

		test('build false when unset', () => {
			const block = workspace.newBlock('sheets_boolean')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('TRUE')
		})
	})

	describe('cell', () => {
		test('build single', () => {
			const block = workspace.newBlock('sheets_cell')
			block.setFieldValue('A1', 'CELL')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('A1')
		})

		test('build range', () => {
			const block = workspace.newBlock('sheets_cell')
			block.setFieldValue('A1:B2', 'CELL')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('A1:B2')
		})

		test('build unset', () => {
			const block = workspace.newBlock('sheets_cell')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('A1')
		})

		test.skip('protect against bad reference', () => {
			const block = workspace.newBlock('sheets_cell')
			block.setFieldValue(')', 'CELL')

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('A1')
		})
	})

	describe('arrayLiterals row', () => {
		test('empty', () => {
			const block = addJSONBlock({
				"type": "sheets_rows",
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{}')
		})
		test('one', () => {
			const block = addJSONBlock({
				"type": "sheets_rows",
				"extraState": { 'count': 1 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					}
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1}')
		})
		test('many', () => {
			const block = addJSONBlock({
				"type": "sheets_rows",
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					},
					"ITEM1": {
						"block": { "type": "sheets_number", "fields": { "NUM": "2" }}
					},
					"ITEM2": {
						"block": { "type": "sheets_number", "fields": { "NUM": "3" }}
					},
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1; 2; 3}')
		})
		test('enclosed gap', () => {
			const block = addJSONBlock({
				"type": "sheets_rows",
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					},
					"ITEM2": {
						"block": { "type": "sheets_number", "fields": { "NUM": "3" }}
					},
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1; ; 3}')
		})
		test('trailing gaps', () => {
			const block = addJSONBlock({
				"type": "sheets_rows",
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					},
					"ITEM1": {
						"block": { "type": "sheets_number", "fields": { "NUM": "2" }}
					},
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1; 2; }')
		})
	})

	describe('arrayLiterals column', () => {
		test('empty', () => {
			const block = addJSONBlock({
				"type": "sheets_columns",
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{}')
		})
		test('one', () => {
			const block = addJSONBlock({
				"type": "sheets_columns",
				"extraState": { 'count': 1 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					}
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1}')
		})
		test('many', () => {
			const block = addJSONBlock({
				"type": "sheets_columns",
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					},
					"ITEM1": {
						"block": { "type": "sheets_number", "fields": { "NUM": "2" }}
					},
					"ITEM2": {
						"block": { "type": "sheets_number", "fields": { "NUM": "3" }}
					},
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1, 2, 3}')
		})
		test('enclosed gap', () => {
			const block = addJSONBlock({
				"type": "sheets_columns",
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					},
					"ITEM2": {
						"block": { "type": "sheets_number", "fields": { "NUM": "3" }}
					},
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1, , 3}')
		})
		test('trailing gaps', () => {
			const block = addJSONBlock({
				"type": "sheets_columns",
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": { "type": "sheets_number", "fields": { "NUM": "1" }}
					},
					"ITEM1": {
						"block": { "type": "sheets_number", "fields": { "NUM": "2" }}
					},
				},
			})

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('{1, 2, }')
		})
	})
})
