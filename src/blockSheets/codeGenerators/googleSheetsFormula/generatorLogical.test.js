import blockly from 'blockly'
import GoogleSheets from './googleSheets'
import '../../blocks/Logical/blocks'
import '../../blocks/Values/blocks'

import './generator'

describe('text code generator', () => {
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
	function addNumberBlock(v, input) {
		const b = workspace.newBlock('sheets_number')
		b.setFieldValue(v, 'NUM')
		connect(b, input)
	}

	describe('sheets_compare', () => {
		test('build a less than comparison', () => {
			const block = workspace.newBlock('sheets_compare')
			block.setFieldValue('LT', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1 < 2')
		})

		test('build a less than to equal comparison', () => {
			const block = workspace.newBlock('sheets_compare')
			block.setFieldValue('LTE', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1 <= 2')
		})

		test('build a greater than comparison', () => {
			const block = workspace.newBlock('sheets_compare')
			block.setFieldValue('GT', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1 > 2')
		})

		test('build a greater than equal comparison', () => {
			const block = workspace.newBlock('sheets_compare')
			block.setFieldValue('GTE', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1 >= 2')
		})

		test('build a equal comparison', () => {
			const block = workspace.newBlock('sheets_compare')
			block.setFieldValue('EQ', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1 = 2')
		})

		test('build a not equal comparison', () => {
			const block = workspace.newBlock('sheets_compare')
			block.setFieldValue('NEQ', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = GoogleSheets.blockToCode(block);
			expect(code[0]).toBe('1 <> 2')
		})
	})
})
