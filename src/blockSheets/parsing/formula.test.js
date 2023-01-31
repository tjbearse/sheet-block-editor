import { parser } from './formula.js'
import './treePrint.js'

const mkValue = (v) => ({
	kind: 'value',
	value: v,
})

const mkRange = (r) => ({
	kind: 'range',
	range: r,
})

const mkArray = (arr) => ({
	kind: 'array',
	// arr[row][column]
	values: arr,
})

const mkFunc = (n, arg) => ({
	kind: 'func',
	name: n,
	args: arg,
})

const mkBinary = (symb, left, right) => ({
	kind: 'binaryOp',
	symb,
	left,
	right,
})
const mkUnary = (symb, right) => ({
	kind: 'unaryOp',
	symb,
	right,
})

describe('values', () => {
	test('parses number values', () => {
		expect(parser.parse('=1')).toTreeEqual(mkValue(1))
		expect(parser.parse('=-1')).toTreeEqual(mkValue(-1))
		expect(parser.parse('=---1')).toTreeEqual(mkValue(-1))
		expect(parser.parse('=+1')).toTreeEqual(mkValue(1))
		expect(parser.parse('=-+-1')).toTreeEqual(mkValue(1))
		expect(parser.parse('=1.2')).toTreeEqual(mkValue(1.2))
		expect(parser.parse('=.2')).toTreeEqual(mkValue(0.2))
		expect(parser.parse('=2.')).toTreeEqual(mkValue(2))
	})

	test('parses percentage values', () => {
		expect(parser.parse('=10%')).toTreeEqual(mkValue(.1))
	})

	test('parses string values', () => {
		expect(parser.parse('="1"')).toTreeEqual(mkValue("1"))
		expect(parser.parse('=""')).toTreeEqual(mkValue(""))
	})
	test('parses string values with inner quotes (github issue #20)', () => {
		expect(parser.parse('=".""."')).toTreeEqual(mkValue('.".'))
		expect(parser.parse('="."".""."')).toTreeEqual(mkValue('.".".'))
	})

	test('parses bool values', () => {
		expect(parser.parse('=TRUE')).toTreeEqual(mkValue(true))
		expect(parser.parse('=true')).toTreeEqual(mkValue(true))
		expect(parser.parse('=FALSE')).toTreeEqual(mkValue(false))
		expect(parser.parse('=false')).toTreeEqual(mkValue(false))
	})

	test('parses cell ranges', () => {
		expect(parser.parse('=A1')).toTreeEqual(mkRange('A1'))
		expect(parser.parse('=AZ123')).toTreeEqual(mkRange('AZ123'))
		expect(parser.parse('=A1:B2')).toTreeEqual(mkRange('A1:B2'))
		expect(parser.parse('=B:B')).toTreeEqual(mkRange('B:B'))
		expect(parser.parse('=B:A1')).toTreeEqual(mkRange('B:A1'))
		expect(parser.parse('=A1:B')).toTreeEqual(mkRange('A1:B'))
	})

	test('parses cell ranges referencing other sheets (github issue #42)', () => {
		expect(parser.parse("='sheet1'!A1")).toTreeEqual(mkRange("'sheet1'!A1"))
		expect(parser.parse("='sheet 1'!A1")).toTreeEqual(mkRange("'sheet 1'!A1"))
		expect(parser.parse("=sheet1!A1")).toTreeEqual(mkRange("sheet1!A1"))
		expect(parser.parse("='sheet_ with @ \" '' symbols'!D33")).toTreeEqual(mkRange("'sheet_ with @ \" '' symbols'!D33"))
	})

	test('parses cell ranges with row only parts (github issue #21)', () => {
		expect(parser.parse('=1:1')).toTreeEqual(mkRange('1:1'))
		expect(parser.parse('=1:A1')).toTreeEqual(mkRange('1:A1'))
		expect(parser.parse('=A1:1')).toTreeEqual(mkRange('A1:1'))
	})
	test('parses cell ranges with columns parts', () => {
		expect(parser.parse('=A:A')).toTreeEqual(mkRange('A:A'))
		expect(parser.parse('=A:A1')).toTreeEqual(mkRange('A:A1'))
		expect(parser.parse('=A1:A')).toTreeEqual(mkRange('A1:A'))
	})

	test('parses cell ranges with fixed parts (github issue #15)', () => {
		expect(parser.parse('=$A1')).toTreeEqual(mkRange('$A1'))
		expect(parser.parse('=A$1')).toTreeEqual(mkRange('A$1'))
		expect(parser.parse('=$A$1')).toTreeEqual(mkRange('$A$1'))
		expect(parser.parse('=$AZ$123')).toTreeEqual(mkRange('$AZ$123'))
		expect(parser.parse('=$A$1:$B$2')).toTreeEqual(mkRange('$A$1:$B$2'))
		expect(parser.parse('=$1:$1')).toTreeEqual(mkRange('$1:$1'))
		expect(parser.parse('=1:$1')).toTreeEqual(mkRange('1:$1'))
		expect(parser.parse('=$1:$A$1')).toTreeEqual(mkRange('$1:$A$1'))
		expect(parser.parse('=$B:$B')).toTreeEqual(mkRange('$B:$B'))
		expect(parser.parse('=B:$B')).toTreeEqual(mkRange('B:$B'))
		expect(parser.parse('=$B:$B$1')).toTreeEqual(mkRange('$B:$B$1'))
	})

	test('parses array literals', () => {
		expect(parser.parse('={1}')).toTreeEqual(mkArray([[mkValue(1)]]))
		expect(parser.parse('={1;2}')).toTreeEqual(mkArray([
			[mkValue(1)],
			[mkValue(2)]
		]))
		expect(parser.parse('={1,2}')).toTreeEqual(mkArray([
			[mkValue(1),mkValue(2)]
		]))
		expect(parser.parse('={1,2;3,4}')).toTreeEqual(mkArray([
			[mkValue(1),mkValue(2)],
			[mkValue(3),mkValue(4)]
		]))
	});
});

describe('functions', () => {
	test('parses a function without arguments', () => {
		expect(parser.parse('=NOW()')).toTreeEqual(mkFunc('NOW', []))
		expect(parser.parse('=nOw()')).toTreeEqual(mkFunc('NOW', []))
		expect(parser.parse('=now()')).toTreeEqual(mkFunc('NOW', []))
		expect(parser.parse('=now(  )')).toTreeEqual(mkFunc('NOW', []))
		expect(parser.parse('= now() ')).toTreeEqual(mkFunc('NOW', []))
	})


	test('parses a function with arguments', () => {
		expect(parser.parse('=ABS(-1)')).toTreeEqual(mkFunc('ABS', [mkValue(-1)]))
		expect(parser.parse('=Max(1, -1)'))
			.toTreeEqual(mkFunc('MAX', [mkValue(1), mkValue(-1)]))

		expect(parser.parse('=Max(1, -1)'))
			.toTreeEqual(mkFunc('MAX', [mkValue(1), mkValue(-1)]))

		expect(parser.parse('=Max(1,    -1   , 2)'))
			.toTreeEqual(mkFunc('MAX', [mkValue(1), mkValue(-1), mkValue(2)]))

		expect(parser.parse('=Max(1,)'))
			.toTreeEqual(mkFunc('MAX', [mkValue(1), null]))

		expect(parser.parse('=Max(1, ,2)'))
			.toTreeEqual(mkFunc('MAX', [mkValue(1), null, mkValue(2)]))

		expect(parser.parse('=Max(1,-1)'))
			.toTreeEqual(mkFunc('MAX', [mkValue(1), mkValue(-1)]))

		expect(parser.parse('=CONCAT(",", "1")'))
			.toTreeEqual(mkFunc('CONCAT', [mkValue(","), mkValue("1")]))

		expect(parser.parse('=MAX(,)'))
			.toTreeEqual(mkFunc('MAX', [null, null]))
	})

	test('parses composed functions', () => {
		expect(parser.parse('=ABS(Max(1, 2))'))
			.toTreeEqual(
				mkFunc('ABS', [
					mkFunc('MAX', [mkValue(1), mkValue(2)])
				])
			)
		expect(parser.parse('=MAX(ABS(1), ABS(2))'))
			.toTreeEqual(
				mkFunc('MAX', [
					mkFunc('ABS', [mkValue(1)]),
					mkFunc('ABS', [mkValue(2)]),
				])
			)
	})

	test('parses functions that skip arguments, github issue #37', () => {
		expect(parser.parse('=Max(,)'))
			.toTreeEqual(
				mkFunc('MAX', [null, null])
			)
		expect(parser.parse('=Max(, 2)'))
			.toTreeEqual(
				mkFunc('MAX', [null, mkValue(2)])
			)
		expect(parser.parse('=MAX(1, , 3)'))
			.toTreeEqual(
				mkFunc('MAX', [
					mkValue(1),
					null,
					mkValue(3),
				])
			)
	})
})

describe('Operators', () => {
	test('parses binary operators', () => {
		expect(parser.parse('="a" & "b"')).toTreeEqual( mkBinary('&', mkValue('a'), mkValue('b')) )
		expect(parser.parse('=1 + 2')).toTreeEqual( mkBinary('+', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 - 2')).toTreeEqual( mkBinary('-', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 * 2')).toTreeEqual( mkBinary('*', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 / 2')).toTreeEqual( mkBinary('/', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 ^ 2')).toTreeEqual( mkBinary('^', mkValue(1), mkValue(2)) )

		expect(parser.parse('=1 > 2')).toTreeEqual( mkBinary('>', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 >= 2')).toTreeEqual( mkBinary('>=', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 = 2')).toTreeEqual( mkBinary('=', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 <> 2')).toTreeEqual( mkBinary('<>', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 <= 2')).toTreeEqual( mkBinary('<=', mkValue(1), mkValue(2)) )
		expect(parser.parse('=1 < 2')).toTreeEqual( mkBinary('<', mkValue(1), mkValue(2)) )
	})

	test('parses unary operators', () => {
		expect(parser.parse('=-(1+2)')).toTreeEqual(
			mkUnary('-',
					mkBinary('+',
							 mkValue(1),
							 mkValue(2),
					)
			)
		)
		// + operator is elided because I assume it never does anything meaningful
		expect(parser.parse('=+(1)')).toTreeEqual( mkValue(1) )
	})

	test('parses operator precedence', () => {
		expect(parser.parse('=1 + 2 * 3')).toTreeEqual(
			mkBinary('+',
					 mkValue(1),
					 mkBinary('*', mkValue(2), mkValue(3))
			)
		)
		expect(parser.parse('=1 * 2 + 3')).toTreeEqual(
			mkBinary('+',
					 mkBinary('*', mkValue(1), mkValue(2)),
					 mkValue(3),
			)
		)
		expect(parser.parse('=1 * 2 * 3')).toTreeEqual(
			mkBinary('*',
					 mkBinary('*', mkValue(1), mkValue(2)),
					 mkValue(3),
			)
		)
		expect(parser.parse('=-1 * -2 ^ -3')).toTreeEqual(
			mkBinary('*',
					 mkValue(-1),
					 mkBinary('^', mkValue(-2), mkValue(-3)),
			)
		)
		expect(parser.parse('=1 * 2 / 3 * 4')).toTreeEqual(
			mkBinary('*',
					 mkBinary('/',
							  mkBinary('*', mkValue(1), mkValue(2)),
							  mkValue(3),
					 ),
					 mkValue(4)
			)
		)

		expect(parser.parse('=1 ^ 2 / 3')).toTreeEqual(
			mkBinary('/',
					 mkBinary('^', mkValue(1), mkValue(2)),
					 mkValue(3),
			)
		)

		expect(parser.parse('=1 + 2 ^ 3 + 4')).toTreeEqual(
			mkBinary('+',
					 mkBinary('+',
							  mkValue(1),
							  mkBinary('^', mkValue(2), mkValue(3)),
					 ),
					 mkValue(4),
			)
		)

		expect(parser.parse('=1 * 2 ^ 3 * 4')).toTreeEqual(
			mkBinary('*',
					 mkBinary('*',
							  mkValue(1),
							  mkBinary('^', mkValue(2), mkValue(3)),
					 ),
					 mkValue(4),
			)
		)

		expect(parser.parse('= 1 * 2 > 3 * 4')).toTreeEqual(
			mkBinary('>',
					 mkBinary('*',
							  mkValue(1),
							  mkValue(2)
					 ),
					 mkBinary('*',
							  mkValue(3),
							  mkValue(4)
					 ),
			)
		)

		expect(parser.parse('= 1 > 2 = 3 < 4')).toTreeEqual(
			mkBinary('<',
					 mkBinary('=',
							  mkBinary('>',
									   mkValue(1),
									   mkValue(2)
							  ),
							  mkValue(3),
					 ),
					 mkValue(4),
			),
		)

		expect(parser.parse('=1 * (2 + 3)')).toTreeEqual(
			mkBinary('*',
					 mkValue(1),
					 mkBinary('+', mkValue(2), mkValue(3)),
			)
		)
	})

})
