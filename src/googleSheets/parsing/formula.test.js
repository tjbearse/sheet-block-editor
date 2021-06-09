import { parser } from './formula.js'

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


// values
test('parses number values', () => {
	expect(parser.parse('=1')).toEqual([mkValue(1)])
	expect(parser.parse('=-1')).toEqual([mkValue(-1)])
	expect(parser.parse('=1.2')).toEqual([mkValue(1.2)])
})

test('parses percentage values', () => {
	expect(parser.parse('=10%')).toEqual([mkValue(.1)])
})

test('parses string values', () => {
	expect(parser.parse('="1"')).toEqual([mkValue("1")])
	expect(parser.parse('=""')).toEqual([mkValue("")])
})

test('parses bool values', () => {
	expect(parser.parse('=TRUE')).toEqual([mkValue(true)])
	expect(parser.parse('=true')).toEqual([mkValue(true)])
	expect(parser.parse('=FALSE')).toEqual([mkValue(false)])
	expect(parser.parse('=false')).toEqual([mkValue(false)])
})

test('parses cell ranges', () => {
	expect(parser.parse('=A1')).toEqual([mkRange('A1')])
	expect(parser.parse('=AZ123')).toEqual([mkRange('AZ123')])
	expect(parser.parse('=A1:B2')).toEqual([mkRange('A1:B2')])
	expect(parser.parse('=B:B')).toEqual([mkRange('B:B')])
	expect(parser.parse('=B:A1')).toEqual([mkRange('B:A1')])
	expect(parser.parse('=A1:B')).toEqual([mkRange('A1:B')])
})

// Single Function
test('it parses a function without arguments', () => {
	expect(parser.parse('=NOW()')).toEqual([mkFunc('NOW', [])])
	expect(parser.parse('=nOw()')).toEqual([mkFunc('NOW', [])])
	expect(parser.parse('=now()')).toEqual([mkFunc('NOW', [])])
	expect(parser.parse('=now(  )')).toEqual([mkFunc('NOW', [])])
	expect(parser.parse('= now() ')).toEqual([mkFunc('NOW', [])])
})


test('parses a function with arguments', () => {
	expect(parser.parse('=ABS(-1)')).toEqual([mkFunc('ABS', [mkValue(-1)])])
	expect(parser.parse('=Max(1, -1)'))
		.toEqual([mkFunc('MAX', [mkValue(1), mkValue(-1)])])

	expect(parser.parse('=Max(1, -1)'))
		.toEqual([mkFunc('MAX', [mkValue(1), mkValue(-1)])])

	expect(parser.parse('=Max(1,    -1   , 2)'))
		.toEqual([mkFunc('MAX', [mkValue(1), mkValue(-1), mkValue(2)])])

	expect(parser.parse('=Max(1,)'))
		.toEqual([mkFunc('MAX', [mkValue(1), null])])

	expect(parser.parse('=Max(1, ,2)'))
		.toEqual([mkFunc('MAX', [mkValue(1), null, mkValue(2)])])

	expect(parser.parse('=Max(1,-1)'))
		.toEqual([mkFunc('MAX', [mkValue(1), mkValue(-1)])])

	expect(parser.parse('=CONCAT(",", "1")'))
		.toEqual([mkFunc('CONCAT', [mkValue(","), mkValue("1")])])

	expect(parser.parse('=MAX(,)'))
		.toEqual([mkFunc('MAX', [null, null])])
})

// composition
test('parses composed functions', () => {
	expect(parser.parse('=ABS(Max(1, 2))'))
		.toEqual([
			mkFunc('ABS', [
			mkFunc('MAX', [mkValue(1), mkValue(2)])
			])
		])
	expect(parser.parse('=MAX(ABS(1), ABS(2))'))
		.toEqual([
			mkFunc('MAX', [
			mkFunc('ABS', [mkValue(1)]),
			mkFunc('ABS', [mkValue(2)]),
			])
		])
})

// binary operators
// TODO flesh out test cases
test.skip('parses binary operators', () => {
	expect(parser.parse('="a" & "b"')).toEqual([/* TODO */])
})

