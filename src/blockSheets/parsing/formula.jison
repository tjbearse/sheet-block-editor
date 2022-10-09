/*
referenced https://stackoverflow.com/questions/48612450/using-jison-to-convert-a-list-of-commands-into-an-array-of-objects
*/
%lex

%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b	  return 'NUMBER'
"("                       return 'OPEN_PAREN'
")"                       return 'CLOSE_PAREN'
","                       return 'COMMA'
"<>"                      return 'NOTEQUALS'
"<="                      return 'LE'
">="                      return 'GE'
"<"                       return 'LT'
"="                       return 'EQUALS'
">"                       return 'GT'
"-"						  return 'MINUS'
"+"						  return 'PLUS'
"&"						  return 'AMPERSAND'
"*"						  return 'MULT'
"^"						  return 'EXPONENT'
"/"						  return 'DIVIDE'
"%"						  return 'PCT'
":"						  return 'COLON'
[Tt][Rr][Uu][Ee]		  return 'TRUE'
[Ff][Aa][Ll][Ss][Ee]	  return 'FALSE'
\"[^"]*\"         		  yytext = yytext.slice(1,-1); return 'STRING'
[\w]+\s*(?=\()            return 'FUNC_NAME'
[a-zA-Z]+[0-9]+		  	  return 'CELL'
[a-zA-Z]+				  return 'COLUMN'
[0-9]+				  	  return 'ROW'

/lex

%left LT LE EQUALS NOTEQUALS GE GT
%left AMPERSAND
%left PLUS MINUS
%left MULT DIVIDE
%left EXPONENT
%left UMINUS UPLUS
%left UNMINUS

%%
start:
  formula
  { return $1 }
  ;

formula
  : EQUALS exp -> $2
  ;

exp 
	: number
	| function
	| STRING -> { kind: 'value', value: $1 }
	| OPEN_PAREN exp CLOSE_PAREN -> $2
	| boolean
	| range
	| binop
	| unop
	;

function
	: FUNC_NAME OPEN_PAREN arguments CLOSE_PAREN
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: $3 };}
	| FUNC_NAME OPEN_PAREN CLOSE_PAREN
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: [] };}
	;

arguments
	: arguments COMMA exp -> [...$1, $3]
	| arguments COMMA -> [...$1, null] /* blank args */
	| exp -> [$1]
	| COMMA -> [null, null]
	;

number
	: n -> { kind: 'value', value: $1 }
	;

n
	: NUMBER PCT -> Number($1) / 100
	| NUMBER -> Number($1)
	;

boolean
	: TRUE -> { kind: 'value', value: true }
	| FALSE -> { kind: 'value', value: false }
	;

range
	: r -> { kind: 'range', range: $1 }
	;

r
	: COLUMN COLON CELL -> $1 + $2 + $3
	| CELL COLON COLUMN -> $1 + $2 + $3
	| COLUMN COLON COLUMN -> $1 + $2 + $3
	| CELL COLON ROW -> $1 + $2 + $3
	| ROW COLON ROW -> $1 + $2 + $3
	| ROW COLON CELL -> $1 + $2 + $3
	| CELL COLON CELL -> $1 + $2 + $3
	| CELL
	;

binop
	: exp NOTEQUALS exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp LT exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp LE exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp EQUALS exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp GE exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp GT exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp MINUS exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp PLUS exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp AMPERSAND exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp MULT exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp DIVIDE exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	| exp EXPONENT exp -> { kind: 'binaryOp', left: $1, symb: $2, right: $3 }
	;

unop
	: MINUS exp %prec UMINUS -> ($2.kind === 'value' ? { kind: 'value', value: -$2.value } : { kind: 'unaryOp', symb: '-', right: $2 })
	| PLUS exp %prec UPLUS -> $2
	;