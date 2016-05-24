//		----------------------------------------------------------
//		-- fredrik olofsson 091221								--
//		-- ported from max c external 160518					--
//		-- distributed under GNU GPL license					--
//		----------------------------------------------------------

var xstep= 1.0;
var xloop= 0;
var xmin= 0-Number.MAX_VALUE;
var xmax= Number.MAX_VALUE;
var xval= 0.0;

inlets= 7;
outlets= 3;

setinletassist(0, "inc/dec (bang), set value (float)");
setinletassist(1, "set step (float)");
setinletassist(2, "0= limit, 1= loop, 2= palindrome");
setinletassist(3, "resets counter to number on next clock");
setinletassist(4, "resets counter to number immediately");
setinletassist(5, "floor value (float)");
setinletassist(6, "ceil value (float)");
setoutletassist(0, "counter (float)");
setoutletassist(1, "counter hits floor (bang)");
setoutletassist(2, "counter hits ceil (bang)");

if(jsarguments.length>5) {
    post("warning: f0.ultimate_counter "+(jsarguments.length-5)+" extra argument(s)");
}
switch(Math.min(jsarguments.length, 5)) {
    case 5:
        xmax= jsarguments[4];
    case 4:
        xmin= jsarguments[3];
        xval= xmin;
    case 3:
        xloop= jsarguments[2];
    case 2:
        xstep= jsarguments[1];
}

function bang() {
    switch(xloop) {
        case 1:
            xval= wrapFunction(xval, xmin, xmax);
            break;
        case 2:
            xval= foldFunction(xval, xmin, xmax);
            break;
        default:
            xval= clipFunction(xval, xmin, xmax);
            break;
    }
    outlet(0, xval);
    xval= xval+xstep;
}
function msg_float(val) {
    switch(inlet) {
        case 0:
            if(xmin<xmax) {
                xval= Math.max(Math.min(val, xmax), xmin);
            } else {
                xval= Math.max(Math.min(val, xmin), xmax);
            }
            break;
        case 1:
            step(val);
            break;
        case 2:
            loop(val);
            break;
        case 3:
            reset_next(val);
            break;
        case 4:
            reset_now(val);
            break;
        case 5:
            min(val);
            break;
        case 6:
            max(val);
            break;
    }
}
function step(val) {
    xstep= val;
}
function loop(val) {
    xloop= Math.floor(val);
}
function reset_next(val) {
    xval= val;
}
function reset_now(val) {
    xval= clipFunction(val, xmin, xmax);
    outlet(0, xval);
}
function min(val) {
    xmin= val;
}
function max(val) {
    xmax= val;
}

clipFunction.local= 1;
function clipFunction(val, min, max) {
    var a;
    if(min>max) {
        a= min;
        min= max;
        max= a;
    }
    if(val>max) {
        outlet(2, "bang");
        a= max;
    } else if(val<min) {
        outlet(1, "bang");
        a= min;
    } else {
        a= val;
    }
    return a;
}
wrapFunction.local= 1;
function wrapFunction(val, min, max) {
    var a, b;
    if(min>max) {
        a= min;
        min= max;
        max= a;
    }
    if(((val>=min)&&(val<=max))||(min==max)) {
        a= val;
    } else {
        b= Math.abs(max-min);
        if(val<min) {
            outlet(1, "bang");
            a= max-Math.abs((val-min)%b);
        } else {
            outlet(2, "bang");
            a= min+Math.abs((val-max)%b);
        }
    }
    return a;
}
foldFunction.local= 1;
function foldFunction(val, min, max) {
    var a, b, c;
    if(min>max) {
        a= min;
        min= max;
        max= a;
    }
    if(((val>=min)&&(val<=max))||(min==max)) {
        b= val;
    } else {
        xstep= 0.0-xstep;
        c= Math.abs(max-min)*2.0;
        if(val<min) {
            outlet(1, "bang");
            a= min-((val-min)%c);
            if((a>=min)&&(a<=max)) {
                b= a;
            } else {
                b= max+(max-a);
            }
        } else {
            outlet(2, "bang");
            a= max-((val-max)%c);
            if((a>(min-c/2.0))&&(a<=min)) {
                b= min+(min-a);
            } else {
                b= a;
            }
        }
    }
    return b;
}
