import { serialization, Workspace } from 'blockly'
import './arrayLiteral'
import './standardBlocks'
import each from 'jest-each'

each([
	['sheets_columns', 'Columns'],
	['sheets_rows', 'Rows'],
]).describe('arrayLiterals %s', (blockName, name) => {
	let workspace;
	let rootEl;

	beforeAll(() => {
		workspace = new Workspace()
	})
	beforeEach(() => {
		workspace.clear();
	})
	afterAll(() => {
		workspace.dispose();
	})

	function addJSONBlock(json) {
		return serialization.blocks.append(json, workspace);
	}

	function getJSON(block) {
		return serialization.blocks.save(block, { addCoordinates: false })
	}

	describe('load', () => {
		test('loaded literal has name', () => {
			const block = addJSONBlock({
				"type": blockName,
			})
			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList[0].fieldRow[0].getText()).toBe(name);
		});

		test('loaded empty literal has no value inputs', () => {
			const block = addJSONBlock({
				"type": blockName,
			})
			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList.length).toBe(1);
		})

		test('loaded literal with value inputs, no values', () => {
			const block = addJSONBlock({
				"type": blockName,
				"extraState": { 'count': 2 },
			})
			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList.length).toBe(3);
			expect(block.inputList[1].connection).not.toBe(null);
			expect(block.inputList[2].connection).not.toBe(null);
		})

		test('loaded literal with value inputs, values', () => {
			const block = addJSONBlock({
				"type": blockName,
				"extraState": { 'count': 2 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": "2" }
						}
					}
				}
			})
			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList.length).toBe(3);
			expect(block.getInputTargetBlock('ITEM0')).not.toBe(null);
			expect(block.getInputTargetBlock('ITEM1')).toBe(null);
		})
	});

	describe('save', () => {
		test('saved empty literal', () => {
			const jsonIn ={
				"type": blockName
			}
			const block = addJSONBlock(jsonIn);
			const jsonOut = getJSON(block);
			expect(jsonOut).toMatchObject(jsonIn);
		})

		test('saved literal with value inputs, no values', () => {
			const jsonIn ={
				"type": blockName,
				"extraState": { 'count': 2 },
			} 
			const block = addJSONBlock(jsonIn);
			const jsonOut = getJSON(block);
			expect(jsonOut).toMatchObject(jsonIn);
		})

		test('saved literal with value inputs, values', () => {
			const jsonIn = {
				"type": blockName,
				"extraState": { 'count': 2 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					}
				}
			}
			const block = addJSONBlock(jsonIn)
			const jsonOut = getJSON(block);
			expect(jsonOut).toMatchObject(jsonIn);
		})
	});

	describe('mutate', () => {
		/*
		   flow:
				decompose
				saveConnections
				*mutate*
				compose
		*/
		test('adding to mutator adds an input', () => {
			const jsonIn ={
				"type": blockName
			}
			const block = addJSONBlock(jsonIn);
			const mutatorBlock = block.decompose(workspace);
			block.saveConnections(mutatorBlock);
			// simulate adding a block to decomposed
			let connection = mutatorBlock.getInput('STACK').connection;
			const itemBlock = workspace.newBlock('mutator_variable_container_item');
			itemBlock.initSvg?.call(itemBlock);
			connection.connect(itemBlock.previousConnection);

			block.compose(mutatorBlock);

			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList.length).toBe(2);
			expect(block.inputList[1].connection).not.toBe(null);
		});

		test('removing from mutator removes an input', () => {
			const jsonIn ={
				"type": blockName,
				"extraState": { 'count': 2 },
			}
			const block = addJSONBlock(jsonIn);
			const mutatorBlock = block.decompose(workspace);
			block.saveConnections(mutatorBlock);
			let itemBlock = mutatorBlock.getInputTargetBlock('STACK');

			// advance to last
			while (itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()) {
				itemBlock = itemBlock.nextConnection.targetBlock();
			}
			itemBlock.previousConnection.targetBlock().nextConnection.disconnect();
			itemBlock.dispose(false);

			block.compose(mutatorBlock);

			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList.length).toBe(2);
			expect(block.inputList[1].connection).not.toBe(null);
		})

		test('existing blocks stay connected after removing from the end', () => {
			const jsonIn ={
				"type": blockName,
				"extraState": { 'count': 2 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					}
				}
			}
			const block = addJSONBlock(jsonIn);
			const mutatorBlock = block.decompose(workspace);
			block.saveConnections(mutatorBlock);
			let itemBlock = mutatorBlock.getInputTargetBlock('STACK');

			// advance to last
			while (itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()) {
				itemBlock = itemBlock.nextConnection.targetBlock();
			}
			itemBlock.unplug(true);
			itemBlock.dispose(false);

			block.compose(mutatorBlock);

			const expectedJSON = {
				"type": blockName,
				"extraState": { 'count': 1 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					}
				}
			}

			const jsonOut = getJSON(block);
			expect(jsonOut).toMatchObject(expectedJSON);
		})

		test('existing blocks stay connected after removing from the middle', () => {
			const jsonIn ={
				"type": blockName,
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					},
					"ITEM2": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 10 }
						}
					}
				}
			}
			const block = addJSONBlock(jsonIn);
			const mutatorBlock = block.decompose(workspace);
			block.saveConnections(mutatorBlock);
			let itemBlock = mutatorBlock.getInputTargetBlock('STACK');

			// advance to middle
			itemBlock = itemBlock.nextConnection.targetBlock();
			itemBlock.unplug(true);
			itemBlock.dispose(false);

			block.compose(mutatorBlock);

			const expectedJSON = {
				"type": blockName,
				"extraState": { 'count': 2 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					},
					"ITEM1": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 10 }
						}
					}
				}
			}

			const jsonOut = getJSON(block);
			expect(jsonOut).toMatchObject(expectedJSON);
		})

		test('existing blocks stay connected after adding to the middle', () => {
			const jsonIn ={
				"type": blockName,
				"extraState": { 'count': 2 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					},
					"ITEM1": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 10 }
						}
					}
				}
			}
			const block = addJSONBlock(jsonIn);
			const mutatorBlock = block.decompose(workspace);
			block.saveConnections(mutatorBlock);
			const itemBlock0 = mutatorBlock.getInputTargetBlock('STACK');
			const itemBlock1 = itemBlock0.nextConnection.targetBlock();


			const newBlock = workspace.newBlock('mutator_variable_container_item');
			newBlock.initSvg?.call(newBlock);

			itemBlock0.nextConnection.disconnect();
			itemBlock0.nextConnection.connect(newBlock.previousConnection);

			itemBlock1.previousConnection.connect(newBlock.nextConnection);

			block.compose(mutatorBlock);

			const expectedJSON = {
				"type": blockName,
				"extraState": { 'count': 3 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					},
					"ITEM2": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 10 }
						}
					}
				}
			}

			const jsonOut = getJSON(block);
			expect(jsonOut).toMatchObject(expectedJSON);
		})

		test('programatic resize bigger', () => {
			const jsonIn ={
				"type": blockName,
				"extraState": { 'count': 2 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					},
					"ITEM1": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 10 }
						}
					}
				}
			}
			const block = addJSONBlock(jsonIn);
			block.ensureCapacity(4);
			const expectedJSON = {
				"type": blockName,
				"extraState": { 'count': 4 },
				"inputs": {
					"ITEM0": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 2 }
						}
					},
					"ITEM1": {
						"block": {
							"type": "sheets_number",
							"fields": { "NUM": 10 }
						}
					}
				}
			}
			expect(getJSON(block)).toMatchObject(expectedJSON);
		});
	});
})
