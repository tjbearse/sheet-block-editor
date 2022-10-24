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


	/*
	   interesting examples
	   SORTN, pair variadic
	   SWITCH, pair variadic with optional trailing arg
	   GETPIVOTDATA twice variadic
	 */
	describe.skip('variadic function', () => {
		test('has function name', () => {
			createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1', { variadic:true, name: `range%i` }]]);
			createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], { variadic:true, name: `range%i` }]);
		});
		test('has non-variadic argument names', () => {
			expect(true).toBe(false);
		});
		test('does not have variadic arguments when none supplied', () => {
			expect(true).toBe(false);
		});
		test('has variadic arguments when one supplied', () => {
			expect(true).toBe(false);
		});
		test('multiple variadic arguments when multiple supplied', () => {
			expect(true).toBe(false);
		});

		test('multiple variadic arguments names enumerated', () => {
			expect(true).toBe(false);
		});

		test('paried variadic arguments appear in pairs', () => {
			expect(true).toBe(false);
		});
		test('variadic argument terminal argument', () => {
			expect(true).toBe(false);
		});
	});
})
