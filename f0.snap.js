//      ----------------------------------------------------------
//      -- fredrik olofsson 020206                              --
//      -- ported from max c external 160519                    --
//      -- distributed under GNU GPL license                    --
//      ----------------------------------------------------------

var valLeft= 0.0;
var valRight= 50.0;
var valOut= 0.0;

inlets= 2;
outlets= 1;

setinletassist(0, "input values (float)");
setinletassist(1, "resistance (float)");
setoutletassist(0, "output values (float)");

if(jsarguments.length>2) {
    post("warning: f0.snap "+(jsarguments.length-2)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 2)) {
    case 2:
        valRight= jsarguments[1];
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
            valRight= val;
            break;
    }
}
function set(val) {
    valOut= val;
}
theFunction.local= 1;
function theFunction() {
    var stepSize, inputVal, counterVal, diff;
    stepSize= 0.0;
    inputVal= valLeft;
    counterVal= valOut;
    diff= Math.abs(inputVal-counterVal);
    if(diff!=0.0) {
        stepSize= valRight/diff;
    }
    if(inputVal>counterVal) {
        counterVal= counterVal+stepSize;
        if(counterVal>inputVal) {
            counterVal= inputVal;
        }
    } else if(inputVal<counterVal) {
        counterVal= counterVal-stepSize;
        if(counterVal<inputVal) {
            counterVal= inputVal;
        }
    }
    valOut= counterVal;
    outlet(0, valOut);
}
