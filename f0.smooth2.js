//      ----------------------------------------------------------
//      -- fredrik olofsson 020115                              --
//      -- ported from max c external 160518                    --
//      -- distributed under GNU GPL license                    --
//      ----------------------------------------------------------

var valLeft= 0.0;
var valOutLeft= 0.0;
var valOutRight= 0.0;
var valMiddle= 0.15;
var valRight= 0.3;

inlets= 3;
outlets= 2;

setinletassist(0, "values to smooth (int/float)");
setinletassist(1, "smoothing constant alpha (float)");
setinletassist(2, "smoothing constant gamma (float)");
setoutletassist(0, "smoothed output (float)");
setoutletassist(1, "trend (float)");

if(jsarguments.length>3) {
    post("warning: f0.smooth2 "+(jsarguments.length-3)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 3)) {
    case 3:
        valRight= Math.min(1.0, Math.max(0.0, jsarguments[2]));
    case 2:
        valMiddle= Math.min(1.0, Math.max(0.0, jsarguments[1]));
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
            valMiddle= Math.min(1.0, Math.max(0.0, val));
            break;
        case 2:
            valRight= Math.min(1.0, Math.max(0.0, val));
            break;
    }
}
function set(val) {
    valOutLeft= val;
}
theFunction.local= 1;
function theFunction() {
    var St0, St1, Bt0, Bt1, a, g, Yt0;
    a= valMiddle;
    g= valRight;
    Yt0= valLeft;
    St1= valOutLeft;
    Bt1= valOutRight;
    St0= a*Yt0+(1.0-a)*(St1+Bt1);   //DES - Double Exponential Smoothing
    Bt0= g*(St0-St1)+(1.0-g)*Bt1;
    valOutLeft= St0;
    valOutRight= Bt0;
    outlet(1, valOutRight);
    outlet(0, valOutLeft);
}
