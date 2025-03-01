
//      ----------------------------------------------------------
//      -- fredrik olofsson 010614                              --
//      -- ported from max c external 160524                    --
//      -- distributed under GNU GPL license                    --
//      ----------------------------------------------------------

var valOut= 0;

inlets= 1;
outlets= 1;

setinletassist(0, "index >= 0 (int)");
setoutletassist(0, "value (int)");

if(jsarguments.length>1) {
    post("warning: f0.noergaard "+(jsarguments.length-1)+" extra argument(s)");
}

function bang() {
    outlet(0, valOut);
}
function msg_int(val) {
    if(val>=0) {
        valOut= theFunction(val);
        bang();
    } else {
        post("f0.noergaard warning: only possitive indexes");
    }
}
theFunction.local= 1;
function theFunction(index) {
    var len, res= 0;
    len= count_bits(index);
    for(var i= len-1; i>=0; i--) {
        if((index>>i)&1) {
            res= res+1;
        } else {
            if(res>=0) {
                res= 0-res;
            } else {
                res= Math.abs(res);
            }
        }
    }
    return res;
}
count_bits.local= 1;
function count_bits(n) {
    var i= 0;
    while(n!=0) {
        n= n>>1;
        i= i+1;
    }
    return i;
}
