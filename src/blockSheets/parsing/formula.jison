/*
referenced https://stackoverflow.com/questions/48612450/using-jison-to-convert-a-list-of-commands-into-an-array-of-objects
*/
%lex

%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b	  return 'NUMBER'
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
"-"						  return '-'
"+"						  return '+'
"&"						  return '&'
"*"						  return '*'
"^"						  return '^'
"/"						  return '/'
"%"						  return '%'
":"						  return ':'
";"						  return ';'
[Tt][Rr][Uu][Ee]		  return 'TRUE'
[Ff][Aa][Ll][Ss][Ee]	  return 'FALSE'
\"[^"]*\"         		  yytext = yytext.slice(1,-1); return 'STRING'
[\w]+\s*(?=\()            return 'FUNC_NAME'
[a-zA-Z]+[0-9]+		  	  return 'CELL'
[a-zA-Z]+				  return 'COLUMN'
[0-9]+				  	  return 'ROW'

/lex

%left '<' '<=' '=' '<>' '>=' '>'
%left '&'
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS UPLUS
%left UNMINUS

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
	| function
	| STRING -> { kind: 'value', value: $1 }
	| '(' exp ')' -> $2
	| arrayExp
	| boolean
	| range
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
	;

number
	: n -> { kind: 'value', value: $1 }
	;

n
	: NUMBER '%' -> Number($1) / 100
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
	: COLUMN ':' CELL -> $1 + $2 + $3
	| CELL ':' COLUMN -> $1 + $2 + $3
	| COLUMN ':' COLUMN -> $1 + $2 + $3
	| CELL ':' ROW -> $1 + $2 + $3
	| ROW ':' ROW -> $1 + $2 + $3
	| ROW ':' CELL -> $1 + $2 + $3
	| CELL ':' CELL -> $1 + $2 + $3
	| CELL
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