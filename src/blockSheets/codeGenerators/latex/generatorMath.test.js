import blockly from 'blockly'
import Latex from './latex'
import '../../staticBlocks/Values/blocks'
import '../../staticBlocks/Math/blocks'

import './generator'

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
	function addNumberBlock(n, input) {
		const b = workspace.newBlock('sheets_number')
		b.setFieldValue(n, 'NUM')
		connect(b, input)
	}

	describe('arithmetic', () => {
		test('build an addition', () => {
			const block = workspace.newBlock('sheets_arithmetic')
			block.setFieldValue('ADD', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('1 + 2')
		})

		test('build a subtraction', () => {
			const block = workspace.newBlock('sheets_arithmetic')
			block.setFieldValue('MINUS', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('1 - 2')
		})

		test('build a multiplication', () => {
			const block = workspace.newBlock('sheets_arithmetic')
			block.setFieldValue('MULTIPLY', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('1 * 2')
		})

		test('build a division', () => {
			const block = workspace.newBlock('sheets_arithmetic')
			block.setFieldValue('DIVIDE', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('\\frac{1}{2}')
		})

		test('build an exponent', () => {
			const block = workspace.newBlock('sheets_arithmetic')
			block.setFieldValue('POWER', 'OP')

			const left = addNumberBlock(1, block.getInput('A'))
			const right = addNumberBlock(2, block.getInput('B'))

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('1^2')
		})
	})

	test('build a negation', () => {
		const block = workspace.newBlock('sheets_negate')

		const right = addNumberBlock(2, block.getInput('A'))

		const code = Latex.blockToCode(block);
		expect(code[0]).toBe('-2')
	})
})
