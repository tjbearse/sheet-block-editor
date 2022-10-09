import blockly from 'blockly'
import Latex from './latex'
import '../../blocks/Values/blocks'

import './generator'

describe('value code generator', () => {
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

	describe('number', () => {
		test('build a positive number', () => {
			const block = workspace.newBlock('sheets_number')
			block.setFieldValue(1, 'NUM')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('1')
		})

		test('build a negative number', () => {
			const block = workspace.newBlock('sheets_number')
			block.setFieldValue(-1, 'NUM')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('-1')
		})

		test('build an unset number', () => {
			const block = workspace.newBlock('sheets_number')
			// block.setFieldValue(1, 'NUM')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('0')
		})
	})

	describe('text', () => {
		test('build a string', () => {
			const block = workspace.newBlock('sheets_text')
			block.setFieldValue('test', 'TEXT')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('"test"')
		})

		test('build an empty string', () => {
			const block = workspace.newBlock('sheets_text')
			block.setFieldValue('', 'TEXT')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('""')
		})

		test('build an unset string', () => {
			const block = workspace.newBlock('sheets_text')
			// block.setFieldValue('', 'TEXT')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('""')
		})
	})

	describe('boolean', () => {
		test('build true', () => {
			const block = workspace.newBlock('sheets_boolean')
			block.setFieldValue('TRUE', 'BOOL')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('TRUE')
		})

		test('build false', () => {
			const block = workspace.newBlock('sheets_boolean')
			block.setFieldValue('FALSE', 'BOOL')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('FALSE')
		})

		test('build false when unset', () => {
			const block = workspace.newBlock('sheets_boolean')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('TRUE')
		})
	})

	describe('cell', () => {
		test('build single', () => {
			const block = workspace.newBlock('sheets_cell')
			block.setFieldValue('A1', 'CELL')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('\\operatorname{A1}')
		})

		test('build range', () => {
			const block = workspace.newBlock('sheets_cell')
			block.setFieldValue('A1:B2', 'CELL')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('\\operatorname{A1:B2}')
		})

		test('build unset', () => {
			const block = workspace.newBlock('sheets_cell')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('\\operatorname{A1}')
		})

		test.skip('protect against bad reference (github issue #13)', () => {
			const block = workspace.newBlock('sheets_cell')
			block.setFieldValue(')', 'CELL')

			const code = Latex.blockToCode(block);
			expect(code[0]).toBe('\\operatorname{A1}')
		})
	})

})
