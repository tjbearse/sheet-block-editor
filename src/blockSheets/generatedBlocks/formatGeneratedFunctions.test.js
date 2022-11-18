import blockly from 'blockly'
import { createBlockFromArrayDef } from './formatGeneratedFunctions'
import '../staticBlocks/Values/blocks'

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
		test.skip('sequential variadic groups, github issue #36', () => {
			// TODO this is an alternate variadic pattern used by GETPIVOTDATA
			createBlockFromArrayDef([
				'TESTFN', '', true, '', ['foo'],
				[['a','b'], undefined, undefined, true]
			]);
			const block = addJSONBlock({
				"type": "sheets_TESTFN",
				"extraState": { 'variadicCount': 2 },
			})
			expect(block.inputList[1].fieldRow[0].getText()).toBe('foo');
			expect(block.inputList[2].fieldRow[0].getText()).toBe('a1');
			expect(block.inputList[3].fieldRow[0].getText()).toBe('a2');
			expect(block.inputList[2].fieldRow[0].getText()).toBe('b1');
			expect(block.inputList[3].fieldRow[0].getText()).toBe('b2');
			expect(block.inputList.length).toBe(6);
		});

		describe('argument naming', () => {
			describe('single variadic', () => {

				test('start numbering', () => {
					createBlockFromArrayDef(['TESTFN', '', true, '', ['foo'], [['range']]]);
					const block = addJSONBlock({
						"type": "sheets_TESTFN",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList[1].fieldRow[0].getText()).toBe('foo');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('range1');
					expect(block.inputList[3].fieldRow[0].getText()).toBe('range2');
					expect(block.inputList.length).toBe(4);
				});

				test('offset numbering', () => {
					createBlockFromArrayDef(['TESTFN', '', true, '', ['range1'], [['range'], 2]]);
					const block = addJSONBlock({
						"type": "sheets_TESTFN",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList[1].fieldRow[0].getText()).toBe('range1');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('range2');
					expect(block.inputList[3].fieldRow[0].getText()).toBe('range3');
					expect(block.inputList.length).toBe(4);
				});

				test('offset position', () => {
					createBlockFromArrayDef(['TESTFN', '', true, '', ['a', 'b'], [['range'], 1, 1]]);
					const block = addJSONBlock({
						"type": "sheets_TESTFN",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList[1].fieldRow[0].getText()).toBe('a');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('range1');
					expect(block.inputList[3].fieldRow[0].getText()).toBe('range2');
					expect(block.inputList[4].fieldRow[0].getText()).toBe('b');
					expect(block.inputList.length).toBe(5);
				});
			})

			describe('pair variadic', () => {
				test('start numbering', () => {
					createBlockFromArrayDef(['TESTFN', '', true, '', ['foo'], [['p','q']]]);
					const block = addJSONBlock({
						"type": "sheets_TESTFN",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList[1].fieldRow[0].getText()).toBe('foo');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('p1');
					expect(block.inputList[3].fieldRow[0].getText()).toBe('q1');
					expect(block.inputList[4].fieldRow[0].getText()).toBe('p2');
					expect(block.inputList[5].fieldRow[0].getText()).toBe('q2');
					expect(block.inputList.length).toBe(6);
				});

				test('offset numbering', () => {
					createBlockFromArrayDef(['TESTFN', '', true, '', ['foo'], [['p','q'], 2]]);
					const block = addJSONBlock({
						"type": "sheets_TESTFN",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList[1].fieldRow[0].getText()).toBe('foo');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('p2');
					expect(block.inputList[3].fieldRow[0].getText()).toBe('q2');
					expect(block.inputList[4].fieldRow[0].getText()).toBe('p3');
					expect(block.inputList[5].fieldRow[0].getText()).toBe('q3');
					expect(block.inputList.length).toBe(6);
				});

				test('offset position', () => {
					createBlockFromArrayDef(['TESTFN', '', true, '', ['a', 'b'], [['c','d'], 1, 1]]);
					const block = addJSONBlock({
						"type": "sheets_TESTFN",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList[1].fieldRow[0].getText()).toBe('a');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('c1');
					expect(block.inputList[3].fieldRow[0].getText()).toBe('d1');
					expect(block.inputList[4].fieldRow[0].getText()).toBe('c2');
					expect(block.inputList[5].fieldRow[0].getText()).toBe('d2');
					expect(block.inputList[6].fieldRow[0].getText()).toBe('b');
					expect(block.inputList.length).toBe(7);
				});
			})
		});

		describe('load', () => {
			describe('single variadic', () => {
				beforeAll(() => {
					createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], [['range'], 2]]);
				})

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

			describe('paired variadic', () => {
				beforeAll(() => {
					// TODO specify pairwise variadic
					createBlockFromArrayDef(['COUNTIFS', '', true, '', ['criteria_range1','criterion1'], [['criteria_range','criterion'], 2]]);
					// COUNTIFS(criteria_range1, criterion1, [criteria_range2, criterion2, ...])
				})

				test('has function name', () => {
					const block = addJSONBlock({
						"type": "sheets_COUNTIFS",
					})
					expect(block.inputList[0].fieldRow[0].getText()).toBe('COUNTIFS');
				});
				test('intantiated with no variadic arguments', () => {
					const block = addJSONBlock({
						"type": "sheets_COUNTIFS",
					})
					expect(block.inputList.length).toBe(3);
					expect(block.inputList[1].fieldRow[0].getText()).toBe('criteria_range1');
					expect(block.inputList[2].fieldRow[0].getText()).toBe('criterion1');
				});
				test('has paired variadic arguments when one supplied', () => {
					const block = addJSONBlock({
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 1 },
					})
					expect(block.inputList.length).toBe(5);
				});
				test('multiple variadic arguments when multiple supplied', () => {
					const block = addJSONBlock({
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 2 },
					})
					expect(block.inputList.length).toBe(7);
				});
			});
		});


		describe('save', () => {
			// TODO describe blocks in this section are nearly identical so far combine or simplify checks?
			describe('single variadic', () => {
				beforeAll(() => {
					createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], [['range'], 2]]);
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
							"VARG0": {
								"block": {"type": "sheets_number", "fields": { "NUM": 3 }}
							},
							"VARG1": {
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
							"VARG0": {
								"block": {"type": "sheets_number", "fields": { "NUM": 3 }}
							},
							"VARG1": {
								"block": {"type": "sheets_number", "fields": { "NUM": 4 }}
							},
						}
					}
					const block = addJSONBlock(jsonIn)
					expect(getJSON(block)).toMatchObject(expected);
				})
			});

			describe('paired variadic', () => {
				beforeAll(() => {
					createBlockFromArrayDef(['COUNTIFS', '', true, '', ['criteria_range1','criterion1'], [['criteria_range','criterion'], 2]]);
				})

				test('saved empty', () => {
					const jsonIn ={
						"type": "sheets_COUNTIFS"
					}
					const block = addJSONBlock(jsonIn);
					expect(getJSON(block)).toMatchObject(jsonIn);
				})

				test('with variadic, no values', () => {
					const jsonIn ={
						"type": "sheets_COUNTIFS",
						"extraState": { "variadicCount": 2 },
					} 
					const block = addJSONBlock(jsonIn);
					expect(getJSON(block)).toMatchObject(jsonIn);
				})

				test('with variadic and values', () => {
					const jsonIn = {
						"type": "sheets_COUNTIFS",
						"extraState": { "variadicCount": 2 },
						"inputs": {
							"ARG0": {
								"block": {"type": "sheets_number", "fields": { "NUM": 2 }}
							},
							"VARG0": {
								"block": {"type": "sheets_number", "fields": { "NUM": 3 }}
							},
							"VARG1": {
								"block": {"type": "sheets_number", "fields": { "NUM": 4 }}
							},
						}
					}
					const block = addJSONBlock(jsonIn)
					expect(getJSON(block)).toMatchObject(jsonIn);
				})
			});
		});

		describe('mutate', () => {
			describe('single variadic', () => {
				beforeAll(() => {
					createBlockFromArrayDef(['FLATTEN', '', true, '', ['range1'], [['range'], 2]]);
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
							"VARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 10 }
								}
							},
							"VARG2": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 11 }
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
							"VARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 10 }
								}
							},
							"VARG1": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 11 }
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
							"VARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 10 }
								}
							},
							"VARG1": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 11 }
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
							"VARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 10 }
								}
							},
							"VARG2": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 11 }
								}
							}
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
							"VARG0": {
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
							"VARG0": {
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

			describe('paired variadic', () => {
				beforeAll(() => {
					createBlockFromArrayDef(['COUNTIFS', '', true, '', ['criteria_range1','criterion1'], [['criteria_range','criterion'], 2]]);
				})

				test('adding to mutator adds two inputs', () => {
					const jsonIn ={
						"type": "sheets_COUNTIFS"
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
					expect(block.inputList.length).toBe(5);
					expect(block.inputList[3].connection).not.toBe(null);
					expect(block.inputList[4].connection).not.toBe(null);
				});

				test('removing from mutator removes an input', () => {
					const jsonIn ={
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 2 }, // count = 2+2*2 = 6
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
					expect(block.inputList.length).toBe(5); // 1 (dummy) + 2 + 2*1
					expect(block.inputList[1].connection).not.toBe(null);
					expect(block.inputList[2].connection).not.toBe(null);
				})

				test('existing blocks stay connected after removing from the end', () => {
					const jsonIn ={
						"type": "sheets_COUNTIFS",
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
						"type": "sheets_COUNTIFS",
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
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 3 },
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 2 }
								}
							},
							// Arg1
							// vpair 1 [VARG0, VARG1]
							// vpair 2 [VARG2, VARG3]
							"VARG4": {
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

					// advance to middle, vpair 2
					itemBlock = itemBlock.nextConnection.targetBlock();
					itemBlock.unplug(true);
					itemBlock.dispose(false);

					block.compose(mutatorBlock);

					const expectedJSON = {
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 2 },
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 2 }
								}
							},
							"VARG2": {
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
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 2 },
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 2 }
								}
							},
							// A1
							// V0,V1
							"VARG2": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 10 }
								}
							},
							"VARG3": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 11 }
								}
							},
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
						"type": "sheets_COUNTIFS",
						"extraState": { 'variadicCount': 3 },
						"inputs": {
							"ARG0": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 2 }
								}
							},
							// A1
							// V0, V1
							// V2, V3
							"VARG4": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 10 }
								}
							},
							"VARG5": {
								"block": {
									"type": "sheets_number",
									"fields": { "NUM": 11 }
								}
							}
						}
					}

					const jsonOut = getJSON(block);
					expect(jsonOut).toMatchObject(expectedJSON);
				})

				test('programatic resize bigger', () => {
					const jsonIn ={
						"type": "sheets_COUNTIFS",
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
						"type": "sheets_COUNTIFS",
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
	});
})
