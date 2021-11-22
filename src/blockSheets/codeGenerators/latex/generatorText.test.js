import blockly from 'blockly'
import Latex from './latex'
import '../../blocks/Text/blocks'
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
	function addTextBlock(n, input) {
		const b = workspace.newBlock('sheets_text')
		b.setFieldValue(n, 'TEXT')
		connect(b, input)
	}

	test('build a join', () => {
		const block = workspace.newBlock('sheets_join')

		const left = addTextBlock("One", block.getInput('A'))
		const right = addTextBlock("Two", block.getInput('B'))

		const code = Latex.blockToCode(block);
		expect(code[0]).toBe('"One" & "Two"')
	})
})
