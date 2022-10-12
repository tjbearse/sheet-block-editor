import blockly from 'blockly'
import { createBlockFromArrayDef } from './formatGeneratedFunctions'
import './Values/blocks'

describe('function blocks', () => {
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

	function addJSONBlock(json) {
		blockly.serialization.blocks.append(json, workspace);
	}

	describe('single argument function', () => {
		beforeEach(() => {
			createBlockFromArrayDef(['ABS', '', true, '', ['value']]);
		})

		test('has dummy input and one value input', () => {
			addJSONBlock({
				"type": "sheets_ABS"
			})
			const block = workspace.getAllBlocks()[0];
			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList[1].connection).not.toBe(null);
		})
		test('has function name', () => {
			addJSONBlock({
				"type": "sheets_ABS"
			})
			const block = workspace.getAllBlocks()[0];
			expect(block.inputList[0].fieldRow[0].getText()).toBe('ABS');
		})
		test('has argument name', () => {
			addJSONBlock({
				"type": "sheets_ABS"
			})
			const block = workspace.getAllBlocks()[0];
			expect(block.inputList[1].fieldRow[0].getText()).toBe('value');
		})
	});
})
