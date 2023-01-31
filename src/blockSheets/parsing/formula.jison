/*
referenced https://stackoverflow.com/questions/48612450/using-jison-to-convert-a-list-of-commands-into-an-array-of-objects
*/
%lex
%option flex

%%

\s+                   /* skip whitespace */
"("                       return '('
")"                       return ')'
"{"                       return '{'
"}"                       return '}'
","                       return ','
"<>"                      return '<>'
"<="                      return '<='
">="                      return '>='
"<"                       return '<'
"="                       return '='
">"                       return '>'
"-"                       return '-'
"+"                       return '+'
"&"                       return '&'
"*"                       return '*'
"^"                       return '^'
"/"                       return '/'
"%"                       return '%'
":"                       return ':'
";"                       return ';'
"$"                       return '$'
"!"                       return '!'
[Tt][Rr][Uu][Ee]          return 'TRUE'
[Ff][Aa][Ll][Ss][Ee]      return 'FALSE'
\"([^"]|\"\")*\"          yytext = yytext.slice(1,-1).replaceAll('""', '"'); return 'STRING'
\'([^']|\'\')*\'          return 'SQ_STRING'
[\w]+\s*(?=\()            return 'FUNC_NAME'
[0-9]*\.[0-9]+            return 'FLOAT'
[0-9]+\.?                 return 'INTEGER'
[a-zA-Z]+[a-zA-Z0-9_]*\!  return 'NAKEDSHEET'
[a-zA-Z]+                 return 'WORD'

/lex

%left '<' '<=' '=' '<>' '>=' '>'
%left '&'
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS UPLUS
%left UNMINUS
%left REF

%%
start:
  formula
  { return $1 }
  ;

formula
  : '=' exp -> $2
  ;

exp 
	: number
	| sheetRef
	| function
	| STRING -> { kind: 'value', value: $1 }
	| '(' exp ')' -> $2
	| arrayExp
	| boolean
	| binop
	| unop
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
	: arrayHorizontalExp ',' exp -> [...$1,$3]
	| exp -> [$1]
	;

function
	: FUNC_NAME '(' arguments ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: $3 };}
	| FUNC_NAME '(' ')'
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: [] };}
	;

arguments
	: arguments ',' exp -> [...$1, $3]
	| arguments ',' -> [...$1, null] /* blank args */
	| exp -> [$1]
	| ',' -> [null, null]
	| ',' exp -> [null, $2] /* mixed blank args */
	;

number
	: FLOAT '%'                  -> { kind: 'value', value: Number($1) / 100 }
	| INTEGER '%'                -> { kind: 'value', value: Number($1) / 100 }
	| INTEGER                    -> { kind: 'value', value: Number($1) }
	| FLOAT                      -> { kind: 'value', value: Number($1) }
	;

/* expanding leading row definitions here b/c of competition with number */
range
	: '$' INTEGER ':' row        -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| '$' INTEGER ':' column row -> { kind: 'range', range: $1 + $2 + $3 + $4 + $5 }
	| INTEGER ':' column row     -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| INTEGER ':' row            -> { kind: 'range', range: $1 + $2 + $3 }
	| column ':' column          -> { kind: 'range', range: $1 + $2 + $3 }
	| column ':' column row      -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| column row                 -> { kind: 'range', range: $1 + $2 }
	| column row ':' column      -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| column row ':' row         -> { kind: 'range', range: $1 + $2 + $3 + $4 }
	| column row ':' column row  -> { kind: 'range', range: $1 + $2 + $3 + $4 + $5 }
	;

sheetRef
	: NAKEDSHEET range { $2.range = $1 + $2.range; $$ = $2 }
	| SQ_STRING '!' range { $3.range = $1 + $2 + $3.range; $$ = $3 }
	| range
	;

column
	: WORD
	| '$' WORD -> $1 + $2
	;

row
	: INTEGER -> $1
	| '$' INTEGER -> $1 + $2
	;

boolean
	: TRUE -> { kind: 'value', value: true }
	| FALSE -> { kind: 'value', value: false }
	;

binop
	: exp '<>' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '<' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '<=' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '=' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '>=' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '>' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '-' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '+' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '&' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '*' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '/' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp '^' exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	;

unop
	: '-' exp %prec UMINUS -> ($2.kind === 'value' ? { kind: 'value', value: -$2.value } : { kind: 'unaryOp', symb: '-', right: $2 })
	| '+' exp %prec UPLUS -> $2
	;