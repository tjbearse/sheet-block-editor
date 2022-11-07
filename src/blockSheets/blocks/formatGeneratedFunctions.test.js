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
		return blockly.serialization.blocks.append(json, workspace);
	}
	function getJSON(block) {
		return blockly.serialization.blocks.save(block, { addCoordinates: false })
	}


	describe('single argument function', () => {
		beforeAll(() => {
			createBlockFromArrayDef(['ABS', '', true, '', ['value']]);
		})

		test('has dummy input and one value input', () => {
			const block = addJSONBlock({
				"type": "sheets_ABS"
			})
			expect(block.inputList[0].connection).toBe(null);
			expect(block.inputList[1].connection).not.toBe(null);
		})
		test('has function name', () => {
			const block = addJSONBlock({
				"type": "sheets_ABS"
			})
			expect(block.inputList[0].fieldRow[0].getText()).toBe('ABS');
		})
		test('has argument name', () => {
			const block = addJSONBlock({
				"type": "sheets_ABS"
			})
			expect(block.inputList[1].fieldRow[0].getText()).toBe('value');
		})
	});


	/*
	   interesting examples
	   SORTN, pair variadic
	   SWITCH, pair variadic with optional trailing arg
	   GETPIVOTDATA twice variadic
	 */
	describe('variadic function', () => {
		// TODO alternate variadic patterns
		describe.skip('paired variadic', () => {
			test('paried variadic arguments appear in pairs', () => {
				expect(true).toBe(false);
			});
		});
		test.skip('variadic argument terminal argument', () => {
			expect(true).toBe(false);
		});

		describe('argument naming', () => {
			test.skip('no numbering', () => {
				// TODO how to specify no numbering?
				createBlockFromArrayDef(['FLATTEN', '', true, '', ['foo'], ['range']]);
				const block = addJSONBlock({
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
				})
				expect(block.inputList[1].fieldRow[0].getText()).toBe('foo');
				expect(block.inputList[2].fieldRow[0].getText()).toBe('range');
				expect(block.inputList[3].fieldRow[0].getText()).toBe('range');
				expect(block.inputList.length).toBe(4);
			});

			test('start numbering', () => {
				createBlockFromArrayDef(['FLATTEN', '', true, '', ['foo'], ['range']]);
				const block = addJSONBlock({
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
				})
				expect(block.inputList[1].fieldRow[0].getText()).toBe('foo');
				expect(block.inputList[2].fieldRow[0].getText()).toBe('range1');
				expect(block.inputList[3].fieldRow[0].getText()).toBe('range2');
				expect(block.inputList.length).toBe(4);
			});

			test('offset numbering', () => {
				createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], ['range', 2]]);
				const block = addJSONBlock({
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
				})
				expect(block.inputList[1].fieldRow[0].getText()).toBe('range1');
				expect(block.inputList[2].fieldRow[0].getText()).toBe('range2');
				expect(block.inputList[3].fieldRow[0].getText()).toBe('range3');
				expect(block.inputList.length).toBe(4);
			});
		});

		describe('load', () => {
			beforeAll(() => {
				createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], ['range', 2]]);
			})

			describe('single variadic', () => {
				test('has function name', () => {
					const block = addJSONBlock({
						"type": "sheets_FLATTEN",
					})
					expect(block.inputList[0].fieldRow[0].getText()).toBe('FLATTEN');
				});
				test('intantiated with no variadic arguments', () => {
					const block = addJSONBlock({
						"type": "sheets_FLATTEN",
					})
					expect(block.inputList.length).toBe(2);
					expect(block.inputList[1].fieldRow[0].getText()).toBe('range1');
				});
				test('has variadic arguments when one supplied', () => {
					const block = addJSONBlock({
						"type": "sheets_FLATTEN",
						"extraState": { 'variadicCount': 1 },
					})
					expect(block.inputList.length).toBe(3);
				});
				test('multiple variadic arguments when multiple supplied', () => {
					const block = addJSONBlock({
						"type": "sheets_FLATTEN",
						"extraState": { 'variadicCount': 4 },
					})
					expect(block.inputList.length).toBe(6);
				});
			});
		});


		describe('save', () => {
			beforeAll(() => {
				createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], ['range', 2]]);
			})

			test('saved empty', () => {
				const jsonIn ={
					"type": "sheets_FLATTEN"
				}
				const block = addJSONBlock(jsonIn);
				expect(getJSON(block)).toMatchObject(jsonIn);
			})

			test('with variadic, no values', () => {
				const jsonIn ={
					"type": "sheets_FLATTEN",
					"extraState": { "variadicCount": 2 },
				} 
				const block = addJSONBlock(jsonIn);
				expect(getJSON(block)).toMatchObject(jsonIn);
			})

			test('with variadic and values', () => {
				const jsonIn = {
					"type": "sheets_FLATTEN",
					"extraState": { "variadicCount": 2 },
					"inputs": {
						"ARG0": {
							"block": {"type": "sheets_number", "fields": { "NUM": 2 }}
						},
						"ARG1": {
							"block": {"type": "sheets_number", "fields": { "NUM": 3 }}
						},
						"ARG2": {
							"block": {"type": "sheets_number", "fields": { "NUM": 4 }}
						},
					}
				}
				const expected = {
					"type": "sheets_FLATTEN",
					"extraState": { "variadicCount": 2 },
					"inputs": {
						"ARG0": {
							"block": {"type": "sheets_number", "fields": { "NUM": 2 }}
						},
						"ARG1": {
							"block": {"type": "sheets_number", "fields": { "NUM": 3 }}
						},
						"ARG2": {
							"block": {"type": "sheets_number", "fields": { "NUM": 4 }}
						},
					}
				}
				const block = addJSONBlock(jsonIn)
				expect(getJSON(block)).toMatchObject(expected);
			})
		});

		describe('mutate', () => {
			beforeAll(() => {
				createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], ['range', 2]]);
			})

			test('adding to mutator adds an input', () => {
				const jsonIn ={
					"type": "sheets_FLATTEN"
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
				expect(block.inputList.length).toBe(3);
				expect(block.inputList[1].connection).not.toBe(null);
				expect(block.inputList[2].connection).not.toBe(null);
			});

			test('removing from mutator removes an input', () => {
				const jsonIn ={
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
				}
				const block = addJSONBlock(jsonIn);
				const mutatorBlock = block.decompose(workspace);
				block.saveConnections(mutatorBlock);
				let itemBlock = mutatorBlock.getInputTargetBlock('STACK');

				// advance to last & remove
				while (itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()) {
					itemBlock = itemBlock.nextConnection.targetBlock();
				}
				itemBlock.previousConnection.targetBlock().nextConnection.disconnect();
				itemBlock.dispose(false);

				block.compose(mutatorBlock);

				expect(block.inputList[0].connection).toBe(null);
				expect(block.inputList.length).toBe(3);
				expect(block.inputList[1].connection).not.toBe(null);
				expect(block.inputList[2].connection).not.toBe(null);
			})

			test('existing blocks stay connected after removing from the end', () => {
				const jsonIn ={
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
					"inputs": {
						"ARG0": {
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
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 1 },
					"inputs": {
						"ARG0": {
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
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 3 },
					"inputs": {
						"ARG0": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 2 }
							}
						},
						"ARG2": {
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
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
					"inputs": {
						"ARG0": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 2 }
							}
						},
						"ARG1": {
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
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
					"inputs": {
						"ARG0": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 2 }
							}
						},
						"ARG1": {
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
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 3 },
					"inputs": {
						"ARG0": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 2 }
							}
						},
						/*
						// FIXME right now extra args cause a weird circular json issue
						"ARG2": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 10 }
							}
						}
						*/
					}
				}

				const jsonOut = getJSON(block);
				expect(jsonOut).toMatchObject(expectedJSON);
			})

			test('programatic resize bigger', () => {
				const jsonIn ={
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 2 },
					"inputs": {
						"ARG0": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 2 }
							}
						},
						"ARG1": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 10 }
							}
						}
					}
				}
				const block = addJSONBlock(jsonIn);
				block.setVariadicCount(4);
				const expectedJSON = {
					"type": "sheets_FLATTEN",
					"extraState": { 'variadicCount': 4 },
					"inputs": {
						"ARG0": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 2 }
							}
						},
						"ARG1": {
							"block": {
								"type": "sheets_number",
								"fields": { "NUM": 10 }
							}
						}
					}
				}
				expect(getJSON(block)).toMatchObject(expectedJSON);
			});
		})
	});
})
