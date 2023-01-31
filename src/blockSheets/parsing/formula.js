/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,12],$V2=[1,17],$V3=[1,18],$V4=[1,28],$V5=[1,25],$V6=[1,23],$V7=[1,24],$V8=[1,21],$V9=[1,22],$Va=[1,26],$Vb=[1,31],$Vc=[1,29],$Vd=[1,30],$Ve=[1,5,8,10,11,12,13,30,35,36,38],$Vf=[1,40],$Vg=[1,5,8,10,11,12,13,14,30,35,36,38],$Vh=[1,41],$Vi=[1,42],$Vj=[1,5,8,10,11,12,13,14,16,18,30,35,36,38],$Vk=[1,43],$Vl=[1,44],$Vm=[1,5,8,10,11,12,13,14,16,18,19,21,30,35,36,38],$Vn=[1,45],$Vo=[1,5,8,10,11,12,13,14,16,18,19,21,22,30,35,36,38],$Vp=[1,51],$Vq=[2,69],$Vr=[1,5,8,10,11,12,13,14,16,18,19,21,22,30,35,36,38,50],$Vs=[2,66],$Vt=[1,64],$Vu=[1,63],$Vv=[1,68],$Vw=[1,69],$Vx=[1,88],$Vy=[1,85],$Vz=[1,86],$VA=[1,90],$VB=[1,94],$VC=[35,36],$VD=[1,104],$VE=[35,36,38],$VF=[1,5,8,10,11,12,13,14,16,18,19,21,22,30,35,36,38,45,49,50],$VG=[1,112],$VH=[1,114],$VI=[30,38];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"start":3,"formula":4,"=":5,"expression":6,"comparison":7,"<>":8,"concatenation":9,"<":10,"<=":11,">=":12,">":13,"&":14,"term":15,"-":16,"factor":17,"+":18,"*":19,"exponent":20,"/":21,"^":22,"unary":23,"value":24,"number":25,"sheetRef":26,"function":27,"STRING":28,"(":29,")":30,"arrayExp":31,"boolean":32,"{":33,"arrayVerticalExp":34,"}":35,";":36,"arrayHorizontalExp":37,",":38,"UNDERNAME":39,"arguments":40,"ALPHA_WORD":41,"CELL":42,"FLOAT":43,"%":44,"INTEGER":45,"!":46,"range":47,"SQ_STRING":48,"$":49,":":50,"row":51,"cell":52,"column":53,"TRUE":54,"FALSE":55,"$accept":0,"$end":1},
terminals_: {2:"error",5:"=",8:"<>",10:"<",11:"<=",12:">=",13:">",14:"&",16:"-",18:"+",19:"*",21:"/",22:"^",28:"STRING",29:"(",30:")",33:"{",35:"}",36:";",38:",",39:"UNDERNAME",41:"ALPHA_WORD",42:"CELL",43:"FLOAT",44:"%",45:"INTEGER",46:"!",48:"SQ_STRING",49:"$",50:":",54:"TRUE",55:"FALSE"},
productions_: [0,[3,1],[4,2],[6,1],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,1],[9,3],[9,1],[15,3],[15,3],[15,1],[17,3],[17,3],[17,1],[20,3],[20,1],[23,2],[23,2],[23,1],[24,1],[24,1],[24,1],[24,1],[24,3],[24,1],[24,1],[31,3],[34,3],[34,1],[37,3],[37,1],[27,4],[27,3],[27,4],[27,3],[27,4],[27,3],[40,3],[40,2],[40,1],[40,1],[40,2],[25,2],[25,2],[25,1],[25,1],[26,3],[26,3],[26,3],[26,3],[26,1],[47,4],[47,4],[47,3],[47,3],[47,1],[47,3],[47,3],[47,3],[47,3],[47,3],[52,1],[52,2],[52,2],[53,1],[53,2],[51,1],[51,2],[32,1],[32,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0] 
break;
case 2: case 22: case 71:
this.$ = $$[$0];
break;
case 4: case 5: case 6: case 7: case 8: case 9: case 11: case 13: case 14: case 16: case 17: case 19:
this.$ = { kind: 'binaryOp', left: $$[$0-2], symb: $$[$0-1], right: $$[$0] };
break;
case 21:
this.$ = ($$[$0].kind === 'value' ? { kind: 'value', value: -$$[$0].value } : { kind: 'unaryOp', symb: '-', right: $$[$0] });
break;
case 27:
this.$ = { kind: 'value', value: $$[$0] };
break;
case 28:
this.$ = $$[$0-1];
break;
case 31:
this.$ = { kind: 'array', values: $$[$0-1] };
break;
case 32: case 34:
this.$ = [...$$[$0-2],$$[$0]];
break;
case 33: case 35: case 44:
this.$ = [$$[$0]];
break;
case 36: case 38: case 40:
this.$ = { kind: 'func', name: $$[$0-3].toUpperCase(), args: $$[$0-1] };
break;
case 37: case 39: case 41:
this.$ = { kind: 'func', name: $$[$0-2].toUpperCase(), args: [] };
break;
case 42:
this.$ = [...$$[$0-2], $$[$0]];
break;
case 43:
this.$ = [...$$[$0-1], null] /* blank args */;
break;
case 45:
this.$ = [null, null];
break;
case 46:
this.$ = [null, $$[$0]] /* mixed blank args */;
break;
case 47: case 48:
this.$ = { kind: 'value', value: Number($$[$0-1]) / 100 };
break;
case 49: case 50:
this.$ = { kind: 'value', value: Number($$[$0]) };
break;
case 51: case 52: case 53: case 54:
 $$[$0].range = $$[$0-2] + $$[$0-1] + $$[$0].range; this.$ = $$[$0] 
break;
case 56: case 57:
this.$ = { kind: 'range', range: $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0] };
break;
case 58: case 59: case 61: case 62: case 63: case 64: case 65:
this.$ = { kind: 'range', range: $$[$0-2] + $$[$0-1] + $$[$0] };
break;
case 60:
this.$ = { kind: 'range', range: $$[$0] };
break;
case 67: case 68: case 70: case 72:
this.$ = $$[$0-1] + $$[$0];
break;
case 73:
this.$ = { kind: 'value', value: true };
break;
case 74:
this.$ = { kind: 'value', value: false };
break;
}
},
table: [{3:1,4:2,5:[1,3]},{1:[3]},{1:[2,1]},{6:4,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{1:[2,2]},o([1,30,35,36,38],[2,3],{5:[1,37],8:[1,34],10:[1,35],11:[1,36],12:[1,38],13:[1,39]}),o($Ve,[2,10],{14:$Vf}),o($Vg,[2,12],{16:$Vh,18:$Vi}),o($Vj,[2,15],{19:$Vk,21:$Vl}),o($Vm,[2,18],{22:$Vn}),o($Vo,[2,20]),{16:$V0,18:$V1,23:46,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{16:$V0,18:$V1,23:47,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},o($Vo,[2,23]),o($Vo,[2,24]),o($Vo,[2,25]),o($Vo,[2,26]),o($Vo,[2,27]),{6:48,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},o($Vo,[2,29]),o($Vo,[2,30]),o($Vo,[2,50],{44:[1,49]}),o($Vo,[2,49],{44:[1,50],50:$Vp}),o([45,49,50],$Vq,{29:[1,53],46:[1,52]}),o($Vr,$Vs,{29:[1,55],46:[1,54]}),{29:[1,57],46:[1,56]},{46:[1,58]},o($Vo,[2,55]),{6:61,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,34:59,37:60,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},o($Vo,[2,73]),o($Vo,[2,74]),{41:$Vt,42:$Vu,45:[1,62]},o($Vo,[2,60],{50:[1,65]}),{45:$Vv,49:$Vw,50:[1,66],51:67},{9:70,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{9:71,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{9:72,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{9:73,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{9:74,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{9:75,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{15:76,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{16:$V0,17:77,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{16:$V0,17:78,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{16:$V0,18:$V1,20:79,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{16:$V0,18:$V1,20:80,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{16:$V0,18:$V1,23:81,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},o($Vo,[2,21]),o($Vo,[2,22]),{30:[1,82]},o($Vo,[2,47]),o($Vo,[2,48]),{41:$Vx,42:$Vy,45:$Vv,49:$Vz,51:84,52:83,53:87},{41:$Vx,42:$Vy,45:$VA,47:89,49:$Vb,52:32,53:33},{6:93,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,30:[1,92],31:19,32:20,33:$V4,38:$VB,39:$V5,40:91,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{41:$Vx,42:$Vy,45:$VA,47:95,49:$Vb,52:32,53:33},{6:93,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,30:[1,97],31:19,32:20,33:$V4,38:$VB,39:$V5,40:96,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{41:$Vx,42:$Vy,45:$VA,47:98,49:$Vb,52:32,53:33},{6:93,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,30:[1,100],31:19,32:20,33:$V4,38:$VB,39:$V5,40:99,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{41:$Vx,42:$Vy,45:$VA,47:101,49:$Vb,52:32,53:33},{35:[1,102],36:[1,103]},o($VC,[2,33],{38:$VD}),o($VE,[2,35]),{50:[1,105]},o($Vr,[2,67]),o($VF,[2,70]),{41:$Vx,42:$Vy,45:$Vv,49:$Vz,51:108,52:106,53:107},{41:$Vx,42:$Vy,49:[1,111],52:109,53:110},o($Vr,[2,68]),o($Vr,[2,71]),{45:$VG},o($Ve,[2,4],{14:$Vf}),o($Ve,[2,5],{14:$Vf}),o($Ve,[2,6],{14:$Vf}),o($Ve,[2,7],{14:$Vf}),o($Ve,[2,8],{14:$Vf}),o($Ve,[2,9],{14:$Vf}),o($Vg,[2,11],{16:$Vh,18:$Vi}),o($Vj,[2,13],{19:$Vk,21:$Vl}),o($Vj,[2,14],{19:$Vk,21:$Vl}),o($Vm,[2,16],{22:$Vn}),o($Vm,[2,17],{22:$Vn}),o($Vo,[2,19]),o($Vo,[2,28]),o($Vo,[2,58]),o($Vo,[2,59]),o($Vr,$Vs),{41:$Vt,42:$Vu,45:$VG},{45:$Vv,49:$Vw,51:67},o($VF,$Vq),o($Vo,[2,51]),{50:$Vp},{30:[1,113],38:$VH},o($Vo,[2,39]),o($VI,[2,44]),o($VI,[2,45],{7:5,9:6,15:7,17:8,20:9,23:10,24:13,25:14,26:15,27:16,31:19,32:20,47:27,52:32,53:33,6:115,16:$V0,18:$V1,28:$V2,29:$V3,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,48:$Va,49:$Vb,54:$Vc,55:$Vd}),o($Vo,[2,52]),{30:[1,116],38:$VH},o($Vo,[2,41]),o($Vo,[2,53]),{30:[1,117],38:$VH},o($Vo,[2,37]),o($Vo,[2,54]),o($Vo,[2,31]),{6:61,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,37:118,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{6:119,7:5,9:6,15:7,16:$V0,17:8,18:$V1,20:9,23:10,24:13,25:14,26:15,27:16,28:$V2,29:$V3,31:19,32:20,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,47:27,48:$Va,49:$Vb,52:32,53:33,54:$Vc,55:$Vd},{41:$Vx,42:$Vy,45:$Vv,49:$Vz,51:120,52:121,53:87},o($Vo,[2,61]),o($Vo,[2,62],{51:67,45:$Vv,49:$Vw}),o($Vo,[2,63]),o($Vo,[2,64]),o($Vo,[2,65],{51:67,45:$Vv,49:$Vw}),{41:$Vt,42:$Vu},o($Vr,[2,72]),o($Vo,[2,38]),o($VI,[2,43],{7:5,9:6,15:7,17:8,20:9,23:10,24:13,25:14,26:15,27:16,31:19,32:20,47:27,52:32,53:33,6:122,16:$V0,18:$V1,28:$V2,29:$V3,33:$V4,39:$V5,41:$V6,42:$V7,43:$V8,45:$V9,48:$Va,49:$Vb,54:$Vc,55:$Vd}),o($VI,[2,46]),o($Vo,[2,40]),o($Vo,[2,36]),o($VC,[2,32],{38:$VD}),o($VE,[2,34]),o($Vo,[2,56]),o($Vo,[2,57]),o($VI,[2,42])],
defaultActions: {2:[2,1],4:[2,2]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"flex":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 29
break;
case 2:return 30
break;
case 3:return 33
break;
case 4:return 35
break;
case 5:return 38
break;
case 6:return 8
break;
case 7:return 11
break;
case 8:return 12
break;
case 9:return 10
break;
case 10:return 5
break;
case 11:return 13
break;
case 12:return 16
break;
case 13:return 18
break;
case 14:return 14
break;
case 15:return 19
break;
case 16:return 22
break;
case 17:return 21
break;
case 18:return 44
break;
case 19:return 50
break;
case 20:return 36
break;
case 21:return 49
break;
case 22:return 46
break;
case 23:return 54
break;
case 24:return 55
break;
case 25:yy_.yytext = yy_.yytext.slice(1,-1).replaceAll('""', '"'); return 28
break;
case 26:return 48
break;
case 27:return 43
break;
case 28:return 45
break;
case 29:return 42
break;
case 30:return 41
break;
case 31:return 39
break;
case 32:console.log(yy_.yytext);
break;
}
},
rules: [/^(?:\s+)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:,)/,/^(?:<>)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:=)/,/^(?:>)/,/^(?:-)/,/^(?:\+)/,/^(?:&)/,/^(?:\*)/,/^(?:\^)/,/^(?:\/)/,/^(?:%)/,/^(?::)/,/^(?:;)/,/^(?:\$)/,/^(?:!)/,/^(?:[Tt][Rr][Uu][Ee])/,/^(?:[Ff][Aa][Ll][Ss][Ee])/,/^(?:"([^"]|"")*")/,/^(?:'([^']|'')*')/,/^(?:([0-9]*\.[0-9]+|[0-9]+\.[0-9]*))/,/^(?:[0-9]+)/,/^(?:[a-zA-Z]+[0-9]+)/,/^(?:[a-zA-Z]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
export {parser}