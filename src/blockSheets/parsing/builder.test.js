import blockly from 'blockly'
import { buildBlocks } from './builder.js'

blockly.defineBlocksWithJsonArray([
	{
		"type": "sheets_NOARG",
		"message0": "NOARG",
		"args0": [],
		"output": null,
	}, {
		"type": "sheets_ONEARG",
		"message0": "ONEARG %1",
		"args0": [
	        {
	            "type": "input_value",
	            "name": "ARG1"
	        }
		],
		"output": null,
	}, {
		"type": "sheets_DUMMYARG",
		"message0": "DUMMYARG %1 %2",
		"args0": [
	        {
	            "type": "input_dummy"
	        },
	        {
	            "type": "input_value",
	            "name": "ARG1"
	        }
		],
		"output": null,
	}, {
		"type": "sheets_TWOARG",
		"message0": "TWOARG %1 %2",
		"args0": [
	        {
	            "type": "input_value",
	            "name": "ARG1"
	        }, {
	            "type": "input_value",
	            "name": "ARG2"
	        }
		],
		"output": null,
	},
]);

export const mkValue = (v) => ({
	kind: 'value',
	value: v,
})

export const mkRange = (r) => ({
	kind: 'range',
	range: r,
})

export const mkFunc = (n, arg) => ({
	kind: 'func',
	name: n,
	args: arg,
})

export const mkBinary = (symb, left, right) => ({
	kind: 'binaryOp',
	symb,
	left,
	right,
})
export const mkUnary = (symb, right) => ({
	kind: 'unaryOp',
	symb,
	right,
})

describe('workspace builder', () => {
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

	describe('values', () => {
		test('creates number value', () => {
			const tree = mkValue(1)
			const root = buildBlocks(workspace, tree)

			expect(root.type).toBe("sheets_number")
			expect(root.getFieldValue("NUM")).toBe(1)
		})

		test('creates string value', () => {
			const tree = mkValue("foo")
			const root = buildBlocks(workspace, tree)

			expect(root.type).toBe("sheets_text")
			expect(root.getFieldValue("TEXT")).toBe("foo")
		})

		test('creates bool value', () => {
			const tree = mkValue(true)
			const root = buildBlocks(workspace, tree)

			expect(root.type).toBe("sheets_boolean")
			expect(root.getFieldValue("BOOL")).toBe("TRUE")
		})

	})

	describe('ranges', () => {
		test('creates cell range', () => {
			const tree = mkRange("ZZ1")
			const root = buildBlocks(workspace, tree)

			expect(root.type).toBe("sheets_cell")
			expect(root.getFieldValue("CELL")).toBe("ZZ1")
		})
	})

	describe('functions', () => {
		test('creates function', () => {
			const tree = mkFunc("NOARG", [])
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_NOARG")
		})

		test('sets function argument', () => {
			const tree = mkFunc("ONEARG", [mkValue(1)])
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_ONEARG")
			const child = root.getInputTargetBlock("ARG1")
			expect(child.type).toBe("sheets_number")
			expect(child.getFieldValue("NUM")).toBe(1)
		})

		test('does not set null function argument', () => {
			const tree = mkFunc("ONEARG", [null])
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_ONEARG")

			const child = root.getInputTargetBlock("ARG1")
			expect(child).toBe(null)
		})

		test('sets function argument in presence of dummy', () => {
			const tree = mkFunc("DUMMYARG", [mkValue(1)])
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_DUMMYARG")
			const child = root.getInputTargetBlock("ARG1")
			expect(child.type).toBe("sheets_number")
			expect(child.getFieldValue("NUM")).toBe(1)
		})

		test('sets multiple function arguments', () => {
			const tree = mkFunc("TWOARG", [mkValue(1), mkValue("foo")])
			const root = buildBlocks(workspace, tree)

			const child = root.getInputTargetBlock("ARG1")
			expect(child.type).toBe("sheets_number")
			expect(child.getFieldValue("NUM")).toBe(1)

			const child2 = root.getInputTargetBlock("ARG2")
			expect(child2.type).toBe("sheets_text")
			expect(child2.getFieldValue("TEXT")).toBe("foo")
		})

		test('inits all blocks for multiple function arguments', () => {
			const init = jest.fn()
			const tree = mkFunc("TWOARG", [null, mkValue("foo")])
			const root = buildBlocks(workspace, tree, init)
			const nullChild = root.getInputTargetBlock("ARG1")
			const child2 = root.getInputTargetBlock("ARG2")

			expect(root).not.toBeNull()
			expect(nullChild).toBeNull()
			expect(child2).not.toBeNull()

			expect(init).toHaveBeenCalledTimes(2)

			expect(init).toHaveBeenCalledWith(root);
			expect(init).not.toHaveBeenCalledWith(nullChild);
			expect(init).toHaveBeenCalledWith(child2);
		})

		test('throws & cleans up when too many arguments are given', () => {
			const tree = mkFunc("ONEARG", [mkValue(1), mkValue(1)])
			expect(() => buildBlocks(workspace, tree)).toThrow()

			expect(workspace.getTopBlocks().length).toBe(0)
		})

		// TODO unknown/custom function behavior here?
		test('throws & cleans up when unknown function is given', () => {
			const tree = mkFunc("ONEARG", [mkFunc("DNE", [])])
			expect(() => buildBlocks(workspace, tree)).toThrow()
			expect(workspace.getTopBlocks().length).toBe(0)
		})
	})

	describe('arithmetic operators', () => {
		test('builds binary arithmetic operator', () => {
			const tree = mkBinary("+", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_arithmetic")

			const child = root.getInputTargetBlock("A")
			expect(child.type).toBe("sheets_number")
			expect(child.getFieldValue("NUM")).toBe(1)


			const child2 = root.getInputTargetBlock("B")
			expect(child2.type).toBe("sheets_number")
			expect(child2.getFieldValue("NUM")).toBe(2)
		})

		test('sets arithmetic + operator field', () => {
			const tree = mkBinary("+", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("ADD")
		})

		test('sets arithmetic - operator field', () => {
			const tree = mkBinary("-", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("MINUS")
		})

		test('sets arithmetic * operator field', () => {
			const tree = mkBinary("*", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("MULTIPLY")
		})

		test('sets arithmetic / operator field', () => {
			const tree = mkBinary("/", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("DIVIDE")
		})

		test('sets arithmetic ^ operator field', () => {
			const tree = mkBinary("^", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("POWER")
		})

		test('builds unary arithmetic operator', () => {
			const tree = mkUnary("-", mkValue(1))
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_negate")

			const child = root.getInputTargetBlock("A")
			expect(child.type).toBe("sheets_number")
			expect(child.getFieldValue("NUM")).toBe(1)
		})
	})

	describe('comparison operators', () => {
		test('builds comparison operator', () => {
			const tree = mkBinary(">", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_compare")

			const child = root.getInputTargetBlock("A")
			expect(child.type).toBe("sheets_number")
			expect(child.getFieldValue("NUM")).toBe(1)


			const child2 = root.getInputTargetBlock("B")
			expect(child2.type).toBe("sheets_number")
			expect(child2.getFieldValue("NUM")).toBe(2)
		})

		test('sets compare > operator field', () => {
			const tree = mkBinary(">", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("GT")
		})

		test('sets compare >= operator field', () => {
			const tree = mkBinary(">=", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("GTE")
		})

		test('sets compare < operator field', () => {
			const tree = mkBinary("<", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("LT")
		})

		test('sets compare <= operator field', () => {
			const tree = mkBinary("<=", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("LTE")
		})

		test('sets compare = operator field', () => {
			const tree = mkBinary("=", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("EQ")
		})

		test('sets compare <> operator field', () => {
			const tree = mkBinary("<>", mkValue(1), mkValue(2))
			const root = buildBlocks(workspace, tree)
			expect(root.getFieldValue("OP")).toBe("NEQ")
		})
	})

	describe('concat operator', () => {
		test('builds concat operator', () => {
			const tree = mkBinary("&", mkValue("1"), mkValue("2"))
			const root = buildBlocks(workspace, tree)
			expect(root.type).toBe("sheets_join")

			const child = root.getInputTargetBlock("A")
			expect(child.type).toBe("sheets_text")
			expect(child.getFieldValue("TEXT")).toBe("1")


			const child2 = root.getInputTargetBlock("B")
			expect(child2.type).toBe("sheets_text")
			expect(child2.getFieldValue("TEXT")).toBe("2")
		})
	})
})
