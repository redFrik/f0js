//		----------------------------------------------------------
//		-- fredrik olofsson 160521								--
//		-- ported from max c external							--
//		-- distributed under GNU GPL license					--
//		----------------------------------------------------------

var valLeft= 0.0;
var valMiddle= 0.0;
var valRight= 1.0;
var xmin= 0.0;
var xmax= 0.0;
var flag= 0;

inlets= 3;
outlets= 2;

setinletassist(0, "values to autoscale (int/float)");
setinletassist(1, "low output value (int/float)");
setinletassist(2, "high output value (int/float)");
setoutletassist(0, "scaled output (float)");
setoutletassist(1, "info (list)");

if(jsarguments.length>3) {
    post("warning: f0.auto_scale "+(jsarguments.length-3)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 3)) {
    case 3:
        valRight= jsarguments[2];
    case 2:
        valMiddle= jsarguments[1];
}

function bang() {
    xmin= 0.0;
    xmax= 0.0;
    flag= 0;
}
function msg_float(val) {
    switch(inlet) {
        case 0:
            valLeft= val;
            theFunction();
            break;
        case 1:
            valMiddle= val;
            break;
        case 2:
            valRight= val;
            break;
    }
}
function factor() {
    var rangeIn, rangeOut;
    rangeIn= Math.abs(xmax-xmin);
    rangeOut= Math.abs(valRight-valMiddle);
    if(rangeIn==0.0) {
        outlet(1, 0, 0.0, rangeOut);
    } else if(rangeOut==0.0) {
        outlet(1, 0, rangeIn, 0.0);
    } else if(rangeIn<=rangeOut) {
        outlet(1, 0, 1.0, 1.0/(rangeIn/rangeOut));
    } else {
        outlet(1, 0, 1.0/(rangeOut/rangeIn), 1.0);
    }
}
function range() {
    if(xmin<=xmax) {
        outlet(1, 1, xmin, xmax);
    } else {
        outlet(1, 1, xmax, xmin);
    }
}
function set(min, max) {
    xmin= min;
    xmax= max;
}
theFunction.local= 1;
function theFunction() {
    var v, o, rangeIn, rangeOut;
    v= valLeft;
    if((flag==0)&&(xmin==xmax)) {
        flag= 1;
        xmin= v;
        xmax= v;
    }
    if(v<xmin) {
        xmin= v;
    }
    if(v>xmax) {
        xmax= v;
    }
    rangeIn= Math.abs(xmax-xmin);
    rangeOut= Math.abs(valRight-valMiddle);
    if(rangeIn==0.0) {
        if(valMiddle<=valRight) {
            o= valMiddle;
        } else {
            o= valRight;
        }
    } else if(valMiddle<=valRight) {
        o= Math.abs((v-xmin)/rangeIn*rangeOut)+valMiddle;
    } else {
        o= Math.abs((v-xmax)/rangeIn*rangeOut)+valRight;
    }
    outlet(0, o);
}
