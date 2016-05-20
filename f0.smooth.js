
//		----------------------------------------------------------
//		-- fredrik olofsson 160519								--
//		-- ported from max c external							--
//		-- distributed under GNU GPL license					--
//		----------------------------------------------------------

var valLeft= 0.0;
var valRight= 0.15;
var valOut= 0.0;
var temp= 0.0;

inlets= 2;
outlets= 1;

setinletassist(0, "values to smooth (int/float)");
setinletassist(1, "smoothing constant alpha (float)");
setoutletassist(0, "smoothed output (float)");

if(jsarguments.length>2) {
    post("warning: f0.smooth "+(jsarguments.length-2)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 2)) {
    case 2:
        valRight= Math.min(1.0, Math.max(0.0, jsarguments[1]));
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
            valRight= Math.min(1.0, Math.max(0.0, val));
            break;
    }
}
function set(val) {
    valOut= val;
}
theFunction.local= 1;
function theFunction() {
    var St0, St1, a, Yt1;
    a= valRight;
    St1= valOut;
    Yt1= temp;
    St0= a*Yt1+(1.0-a)*St1;   //SES - Single Exponential Smoothing, Hunter (1986)
    valOut= St0;
    temp= valLeft;
    outlet(0, valOut);
}
