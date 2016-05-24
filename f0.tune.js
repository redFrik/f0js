
//		----------------------------------------------------------
//		-- fredrik olofsson 010522								--
//		-- ported from max c external 160522					--
//		-- distributed under GNU GPL license					--
//		----------------------------------------------------------

var valLeft= 0.0;
var valRight= 440.0;
var tones= 12.0;
var valOut= 0.0;

inlets= 2;
outlets= 1;

setinletassist(0, "frequency (int/float)");
setinletassist(1, "base frequency (float)");
setoutletassist(0, "quantised frequency (float)");

if(jsarguments.length>2) {
    post("warning: f0.tune "+(jsarguments.length-2)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 2)) {
    case 2:
        valRight= jsarguments[1];
}

function bang() {
    outlet(0, valOut);
}
function msg_float(val) {
    switch(inlet) {
        case 0:
            valLeft= val;
            theFunction();
            break;
        case 1:
            valRight= val;
            break;
    }
}
function tonesPerOctave(val) {
    tones= val;
}
theFunction.local= 1;
function theFunction() {
    var a, b, c= 0.0, v;
    if((valRight!=0.0)&&(tones!=0.0)) {
        v= Math.pow(2.0, (1.0/tones));
        a= (Math.log(Math.abs(valLeft))-Math.log(Math.abs(valRight)))/Math.log(v);
        b= Math.round(69.0+a)-69.0;
        c= Math.abs(valRight)*Math.pow(v, b);
    }
    valOut= c;
    bang();
}
