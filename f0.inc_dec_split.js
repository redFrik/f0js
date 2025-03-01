//      ----------------------------------------------------------
//      -- fredrik olofsson 040226                              --
//      -- ported from max c external 160522                    --
//      -- distributed under GNU GPL license                    --
//      ----------------------------------------------------------

var valLeft= 0.0;
var valLast= 0.0;
var valDefault= 0.0;
var flag= 0;

inlets= 2;
outlets= 2;

setinletassist(0, "values (float)");
setinletassist(1, "start value (float)");
setoutletassist(0, "increasing values (float)");
setoutletassist(1, "decreasing values (float)");

if(jsarguments.length>2) {
    post("warning: f0.inc_dec_split "+(jsarguments.length-2)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 2)) {
    case 2:
        valLast= jsarguments[1];
        valDefault= valLast;
}

function bang() {
    theFunction();
}
function msg_float(val) {
    switch(inlet) {
        case 0:
            valLeft= val;
            theFunction();
            break;
        case 1:
            valLast= val;
            break;
    }
}
function list(a, b) {
   valLast= b;
   valLeft= a;
   theFunction();
}
function reset() {
    valLast= valDefault;
}
theFunction.local= 1;
function theFunction() {
    if(valLeft>valLast) {
        outlet(0, valLeft);
        flag= 0;
        valLast= valLeft;
    } else if(valLeft<valLast) {
        outlet(1, valLeft);
        flag= 1;
        valLast= valLeft;
    } else {
        if(flag==0) {
            outlet(0, valLeft);
        } else {
            outlet(1, valLeft);
        }
    }
}
