import blockly from 'blockly'
import './googleSheets'
import './blocks'
import './googleSheetsGenerator'

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

	function addXML(xml) {
		xml = `<xml xmlns="https://developers.google.com/blockly/xml">${xml}</xml>`
		blockly.Xml.domToWorkspace(blockly.Xml.textToDom(xml), workspace);
	}

	test('build a formula', () => {
		const block = workspace.newBlock('sheets_number')
		block.setFieldValue('1', 'NUM')

		const code = blockly.GoogleSheets.workspaceToCode(workspace);
		expect(code).toBe('=1')
	})

	describe('formula', () => {
		test('no arguments', () => {
			addXML(`
				<block type="sheets_ABS" id="root">
				</block>
			`)
			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=ABS()')
		})
		test('one argument', () => {
			addXML(`
				<block type="sheets_ABS" id="root">
					<value name="VALUE">
						<block type="sheets_number" id="2">
							<field name="NUM">2</field>
						</block>
					</value>
				</block>
			`)
			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=ABS(2)')
		})
		test('two arguments', () => {
			addXML(`
				<block type="sheets_CONCAT" id="root">
					<value name="VALUE1">
						<block type="sheets_text" id="2">
							<field name="TEXT">a</field>
						</block>
					</value>
					<value name="VALUE2">
						<block type="sheets_text" id="2">
							<field name="TEXT">b</field>
						</block>
					</value>
				</block>
			`)
			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT("a", "b")')
		})
		test('two arguments with order reversed', () => {
			addXML(`
				<block type="sheets_CONCAT" id="root">
					<value name="VALUE2">
						<block type="sheets_text" id="2">
							<field name="TEXT">b</field>
						</block>
					</value>
					<value name="VALUE1">
						<block type="sheets_text" id="2">
							<field name="TEXT">a</field>
						</block>
					</value>
				</block>
			`)
			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=CONCAT("a", "b")')
		})
	})

	// TODO precedence
	describe.skip('precedence', () => {
		test('multiplication over addition paren', () => {
			addXML(`
			<block type="sheets_arithmetic" id="root">
				<field name="OP">MULTIPLY</field>
				<value name="A">
					<block type="sheets_arithmetic" id="left">
						<field name="OP">ADD</field>
						<value name="A">
							<block type="sheets_number" id="1">
								<field name="NUM">1</field>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="2">
								<field name="NUM">2</field>
							</block>
						</value>
					</block>
				</value>
				<value name="B">
					<block type="sheets_arithmetic" id="right">
						<field name="OP">ADD</field>
						<value name="A">
							<block type="sheets_number" id="3">
								<field name="NUM">3</field>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="4">
								<field name="NUM">4</field>
							</block>
						</value>
					</block>
				</value>
			</block>
			`)

			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=(1 + 2) * (3 + 4)')
		})

		test('addition under multiplication no paren', () => {
			addXML(`
			<block type="sheets_arithmetic" id="root">
				<field name="OP">ADD</field>
				<value name="A">
					<block type="sheets_arithmetic" id="left">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="sheets_number" id="1">
								<field name="NUM">1</field>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="2">
								<field name="NUM">2</field>
							</block>
						</value>
					</block>
				</value>
				<value name="B">
					<block type="sheets_arithmetic" id="right">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="sheets_number" id="3">
								<field name="NUM">3</field>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="4">
								<field name="NUM">4</field>
							</block>
						</value>
					</block>
				</value>
			</block>
			`)

			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=1 * 2 + 3 * 4')
		})

		test('addition alongside addition', () => {
			addXML(`
			<block type="sheets_arithmetic" id="root">
				<field name="OP">ADD</field>
				<value name="A">
					<block type="sheets_arithmetic" id="left">
						<field name="OP">ADD</field>
						<value name="A">
							<block type="sheets_number" id="1">
								<field name="NUM">1</field>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="2">
								<field name="NUM">2</field>
							</block>
						</value>
					</block>
				</value>
				<value name="B">
					<block type="sheets_arithmetic" id="right">
						<field name="OP">ADD</field>
						<value name="A">
							<block type="sheets_number" id="3">
								<field name="NUM">3</field>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="4">
								<field name="NUM">4</field>
							</block>
						</value>
					</block>
				</value>
			</block>
			`)

			const code = blockly.GoogleSheets.workspaceToCode(workspace);
			expect(code).toBe('=1 + 2 + 3 + 4')
		})
	})

})
