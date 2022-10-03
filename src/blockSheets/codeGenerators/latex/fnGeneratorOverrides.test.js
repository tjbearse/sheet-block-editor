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
	function addXML(xml) {
		xml = `<xml xmlns="https://developers.google.com/blockly/xml">${xml}</xml>`
		blockly.Xml.domToWorkspace(blockly.Xml.textToDom(xml), workspace);
	}

	test('pow', () => {
		addXML(`
			<block type="sheets_formula" id="root">
				<value name="FORMULA">
					<block type="sheets_POW">
						<value name="ARG0">
							<block type="sheets_number">
								<field name="NUM">4</field>
							</block>
						</value>
						<value name="ARG1">
							<block type="sheets_number">
								<field name="NUM">5</field>
							</block>
						</value>
					</block>
				</value>
			</block>
		`)
		const code = Latex.workspaceToCode(workspace);
		expect(code).toEqual('={4}^{5}')
	})
	test('sqrt', () => {
		addXML(`
			<block type="sheets_formula" id="root">
				<value name="FORMULA">
					<block type="sheets_SQRT">
						<value name="ARG0">
							<block type="sheets_number">
								<field name="NUM">4</field>
							</block>
						</value>
					</block>
				</value>
			</block>
		`)
		const code = Latex.workspaceToCode(workspace);
		expect(code).toEqual('=\\sqrt{4}')
	})
})
