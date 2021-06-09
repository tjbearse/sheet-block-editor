/*
regenerate formula.js with
node --experimental-modules --no-warnings ./buildFormula.mjs
*/
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
"="                       return 'EQUALS'
"-"						  return 'MINUS'
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

%left UMINUS

%%
start:
  expressions
  { return $1 }
  ;

expressions
  : expressions expression -> $1.concat($2)
  | expression $
  ;

expression
  : EQUALS e -> [$2]
  ;

e 
	: function
	| number -> { kind: 'value', value: $1 }
	| STRING -> { kind: 'value', value: $1 }
	| boolean
	| range -> { kind: 'range', range: $1 }
	;

function
	: FUNC_NAME OPEN_PAREN arguments CLOSE_PAREN
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: $3 };}
	| FUNC_NAME OPEN_PAREN CLOSE_PAREN
		{$$ = { kind: 'func', name: $1.toUpperCase(), args: [] };}
	;

arguments
	: arguments COMMA e -> [...$1, $3]
	| arguments COMMA -> [...$1, null] /* blank args */
	| e -> [$1]
	| COMMA -> [null, null]
	;

number
	: MINUS number %prec UMINUS -> -$2
	| NUMBER PCT -> Number($1) / 100
	| NUMBER -> Number($1)
	;

boolean
	: TRUE -> { kind: 'value', value: true }
	| FALSE -> { kind: 'value', value: false }
	;

range
	/* TOOD arrow rule is kinda ugly, fix? */
	: COLUMN COLON CELL -> $1 + $2 + $3
	| CELL COLON COLUMN -> $1 + $2 + $3
	| COLUMN COLON COLUMN -> $1 + $2 + $3
	| CELL COLON ROW -> $1 + $2 + $3
	| ROW COLON ROW -> $1 + $2 + $3
	| ROW COLON CELL -> $1 + $2 + $3
	| CELL COLON CELL -> $1 + $2 + $3
	| CELL
	;