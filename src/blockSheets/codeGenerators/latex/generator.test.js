import blockly from 'blockly'
import Latex from './latex'
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
	function addXML(xml) {
		xml = `<xml xmlns="https://developers.google.com/blockly/xml">${xml}</xml>`
		blockly.Xml.domToWorkspace(blockly.Xml.textToDom(xml), workspace);
	}

	test('build a formula', () => {
		const block = workspace.newBlock('sheets_number')
		block.setFieldValue('1', 'NUM')

		const formula = workspace.newBlock('sheets_formula')
		connect(block, formula.getInput('FORMULA'))

		const code = Latex.workspaceToCode(workspace);
		expect(code).toBe('=1')
	})

	describe('formula', () => {
		test('no arguments', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
						<block type="sheets_ABS" id="root">
						</block>
					</value>
				</block>
			`)
			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=\\operatorname{ABS}()')
		})
		test('one argument', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
						<block type="sheets_ABS" id="root">
							<value name="ARG0">
								<block type="sheets_number" id="2">
									<field name="NUM">2</field>
								</block>
							</value>
						</block>
					</value>
				</block>
			`)
			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=\\operatorname{ABS}(2)')
		})
		test('two arguments', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
						<block type="sheets_CONCAT" id="root">
							<value name="ARG0">
								<block type="sheets_text" id="2">
									<field name="TEXT">a</field>
								</block>
							</value>
							<value name="ARG1">
								<block type="sheets_text" id="2">
									<field name="TEXT">b</field>
								</block>
							</value>
						</block>
					</value>
				</block>
			`)
			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=\\operatorname{CONCAT}("a", "b")')
		})
		test('two arguments with order reversed', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
						<block type="sheets_CONCAT" id="root">
							<value name="ARG1">
								<block type="sheets_text" id="2">
									<field name="TEXT">b</field>
								</block>
							</value>
							<value name="ARG0">
								<block type="sheets_text" id="2">
									<field name="TEXT">a</field>
								</block>
							</value>
						</block>
					</value>
				</block>
			`)
			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=\\operatorname{CONCAT}("a", "b")')
		})
	})

	describe('precedence', () => {
		test('formula with addition', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
					<block type="sheets_arithmetic" id="root">
						<field name="OP">ADD</field>
						<value name="A">
							<block type="sheets_ABS" id="root">
								<value name="ARG0">
									<block type="sheets_number" id="2">
										<field name="NUM">2</field>
									</block>
								</value>
							</block>
						</value>
						<value name="B">
							<block type="sheets_number" id="3">
								<field name="NUM">3</field>
							</block>
						</value>
					</block>
					</value>
				</block>
			`)

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=\\operatorname{ABS}(2) + 3')
		})

		test('multiplication over addition paren', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
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
					</value>
				</block>
			`)

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=(1 + 2) * (3 + 4)')
		})

		test('addition under multiplication no paren', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
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
					</value>
				</block>
			`)

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=1 * 2 + 3 * 4')
		})

		test('addition alongside addition', () => {
			addXML(`
				<block type="sheets_formula" id="root">
					<value name="FORMULA">
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
					</value>
				</block>
			`)

			const code = Latex.workspaceToCode(workspace);
			expect(code).toBe('=1 + 2 + 3 + 4')
		})
	})

})
