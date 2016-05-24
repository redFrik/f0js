
//		----------------------------------------------------------
//		-- fredrik olofsson 040329								--
//		-- ported from max c external 160524					--
//		-- distributed under GNU GPL license					--
//		----------------------------------------------------------

var setMin= Number.MAX_VALUE;
var setMax= 0-Number.MAX_VALUE;
var min= setMin;
var max= setMax;
var setFlag= 0;

inlets= 1;
outlets= 3;

setinletassist(0, "values to check (int/float)");
setoutletassist(0, "minimum value (float)");
setoutletassist(1, "middle value (float)");
setoutletassist(2, "maximum value (float)");

if(jsarguments.length>3) {
    post("warning: f0.range "+(jsarguments.length-3)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 3)) {
    case 3:
        setFlag= 2;
        setMax= jsarguments[2];
        setMin= jsarguments[1];
        min= setMin;
        max= setMax;
        break;
    case 2:
        setFlag= 1;
        setMin= jsarguments[1];
        min= setMin;
        break;
}

function bang() {
    if(setFlag==0) {
        min= Number.MAX_VALUE;
        max= 0-Number.MAX_VALUE;
    } else if(setFlag==1) {
        min= setMin;
        max= 0-Number.MAX_VALUE;
    } else {
        min= setMin;
        max= setMax;
    }
}
function msg_float(val) {
    theFunction(val);
}
function set(val1, val2) {
    if(val1<val2) {
        min= val1;
        max= val2;
        setMin= val1;
        setMax= val2;
    } else {
        min= val2;
        max= val1;
        setMin= val2;
        setMax= val1;
    }
    setFlag= 2;
}
theFunction.local= 1;
function theFunction(val) {
    if(val>max) {
        max= val;
    }
    if(val<min) {
        min= val;
    }
    outlet(2, max);
    outlet(1, (max-min)/2.0+min);
    outlet(0, min);
}
