/*
referenced https://stackoverflow.com/questions/48612450/using-jison-to-convert-a-list-of-commands-into-an-array-of-objects
*/
%lex
%options flex

%%

\s+                   /* skip whitespace */
"("                              return '('
")"                              return ')'
"{"                              return '{'
"}"                              return '}'
","                              return ','
"<>"                             return '<>'
"<="                             return '<='
">="                             return '>='
"<"                              return '<'
"="                              return '='
">"                              return '>'
"-"                              return '-'
"+"                              return '+'
"&"                              return '&'
"*"                              return '*'
"^"                              return '^'
"/"                              return '/'
"%"                              return '%'
":"                              return ':'
";"                              return ';'
"$"                              return '$'
"!"                              return '!'
[Tt][Rr][Uu][Ee]                 return 'TRUE'
[Ff][Aa][Ll][Ss][Ee]             return 'FALSE'
\"([^"]|\"\")*\"                 yytext = yytext.slice(1,-1).replaceAll('""', '"'); return 'STRING'
\'([^']|\'\')*\'                 return 'SQ_STRING'
([0-9]*\.[0-9]+|[0-9]+\.[0-9]*)  return 'FLOAT'
[0-9]+                           return 'INTEGER'
[a-zA-Z]+[0-9]+                  return 'CELL'
[a-zA-Z]+                        return 'ALPHA_WORD'
[a-zA-Z][a-zA-Z0-9_]*            return 'UNDERNAME'

/* are A1 notation limited to 3 characters? */

/lex

%%
start: formula { return $1 };

formula
	: '=' expression -> $2
	;

expression: comparison;

comparison
	: comparison '<>' concatenation -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| comparison '<'  concatenation -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| comparison '<=' concatenation -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| comparison '='  concatenation -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| comparison '>=' concatenation -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| comparison '>'  concatenation -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| concatenation
	;

concatenation
	: concatenation '&' term -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| term
	;

term
	: term '-' factor -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| term '+' factor -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| factor
	;

factor
	: factor '*' exponent -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| factor '/' exponent -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exponent
	;

exponent
	: exponent '^' unary -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| unary
	;

unary
	: '-' unary -> ($2.kind === 'value' ? { kind: 'value', value: -$2.value } : { kind: 'unaryOp', symb: '-', right: $2 })
	| '+' unary -> $2
	| value
	;

value
	: number
	| sheetRef
	| function
	| STRING -> { kind: 'value', value: $1 }
	| '(' expression ')' -> $2
	| arrayExp
	| boolean
	;

arrayExp
	: '{' arrayVerticalExp '}' -> { kind: 'array', values: $2 }
	;

/* delineates rows */
arrayVerticalExp
	: arrayVerticalExp ';' arrayHorizontalExp -> [...$1,$3]
	| arrayHorizontalExp -> [$1]
	;

/* delineates columns */
arrayHorizontalExp
	: arrayHorizontalExp ',' expression -> [...$1,$3]
	| expression -> [$1]
	;

function
	: UNDERNAME '(' arguments ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: $3 };}
	| UNDERNAME '(' ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: [] };}
	| ALPHA_WORD '(' arguments ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: $3 };}
	| ALPHA_WORD '(' ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: [] };}
	| CELL '(' arguments ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: $3 };}
	| CELL '(' ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: [] };}
	;

arguments
	: arguments ',' expression -> [...$1, $3]
	| arguments ',' -> [...$1, null] /* blank args */
	| expression -> [$1]
	| ',' -> [null, null]
	| ',' expression -> [null, $2] /* mixed blank args */
	;

number
	: FLOAT '%'                  -> { kind: 'value', value: Number($1) / 100 }
	| INTEGER '%'                -> { kind: 'value', value: Number($1) / 100 }
	| INTEGER                    -> { kind: 'value', value: Number($1) }
	| FLOAT                      -> { kind: 'value', value: Number($1) }
	;

sheetRef
	: ALPHA_WORD '!' range { $3.range = $1 + $2 + $3.range; $$ = $3 }
	| CELL '!' range { $3.range = $1 + $2 + $3.range; $$ = $3 }
	| UNDERNAME '!' range { $3.range = $1 + $2 + $3.range; $$ = $3 }
	| SQ_STRING '!' range { $3.range = $1 + $2 + $3.range; $$ = $3 }
	| range
	;

/* expanding leading row definitions here b/c of conflicts with number */
range
	: '$' INTEGER ':' row  -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| '$' INTEGER ':' cell -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| INTEGER ':' cell     -> { kind: 'range', range: $1 + $2 + $3 }
	| INTEGER ':' row      -> { kind: 'range', range: $1 + $2 + $3 }
	| cell                 -> { kind: 'range', range: $1 }
	| cell ':' cell        -> { kind: 'range', range: $1 + $2 + $3 }
	| cell ':' column      -> { kind: 'range', range: $1 + $2 + $3 }
	| cell ':' row         -> { kind: 'range', range: $1 + $2 + $3 }
	| column ':' cell      -> { kind: 'range', range: $1 + $2 + $3 }
	| column ':' column    -> { kind: 'range', range: $1 + $2 + $3 }
	;

cell
	: CELL
	| '$' CELL -> $1 + $2
	| column row -> $1 + $2
	;
column
	: ALPHA_WORD
	| '$' ALPHA_WORD -> $1 + $2
	;

row
	: INTEGER -> $1
	| '$' INTEGER -> $1 + $2
	;

boolean
	: TRUE -> { kind: 'value', value: true }
	| FALSE -> { kind: 'value', value: false }
	;