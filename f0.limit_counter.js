//      ----------------------------------------------------------
//      -- fredrik olofsson 040226                              --
//      -- ported from max c external 160524                    --
//      -- bugfix 240319 set minimum                            --
//      ----------------------------------------------------------

var valCount= 0;
var valMin= 0-Number.MAX_VALUE;
var valMax= Number.MAX_VALUE;

inlets= 4;
outlets= 3;

setinletassist(0, "increase (bang), set value (int)");
setinletassist(1, "decrease (bang)");
setinletassist(2, "floor value (int)");
setinletassist(3, "ceil value (int)");
setoutletassist(0, "counter (int)");
setoutletassist(1, "counter hits floor (bang)");
setoutletassist(2, "counter hits ceil (bang)");

if(jsarguments.length>3) {
    post("warning: f0.limit_counter "+(jsarguments.length-3)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 5)) {
    case 3:
        valMin= jsarguments[1];
        valMax= jsarguments[2];
        break;
    case 2:
        valMin= 0;
        valMax= jsarguments[1];
        break;
}

function bang() {
    valCount= Math.min(Math.max(valCount, valMin), valMax);
    switch(inlet) {
        case 0:
            if(valCount<valMax) {
                valCount= valCount+1;
            }
            if(valCount==valMax) {
                outlet(2, "bang");
            }
            break;
        case 1:
            if(valCount>valMin) {
                valCount= valCount-1;
            }
            if(valCount==valMin) {
                outlet(1, "bang");
            }
            break;
    }
    outlet(0, valCount);
}
function msg_int(val) {
    switch(inlet) {
        case 0:
            if(val<valMin) {
                val= valMin;
            } else if(val>valMax) {
                val= valMax;
            }
            valCount= val;
            break;
        case 2:
            valMin= val;
            if(valCount<val) {
                valCount= val;
            }
            break;
        case 3:
            valMax= val;
            if(valCount>val) {
                valCount= val;
            }
            break;
    }
}
