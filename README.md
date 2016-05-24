javascript for maxmsp
====================

these are javascripts to be used with [MaxMSPJitter](http://cycling74.com)

ported from my collection of c externals (<http://github.com/redFrik/f0ext>)

* **f0.auto_scale.js** - finds min and max values of a stream of numbers and uses them as input scaling range
* **f0.inc_dec_split.js** - detect direction of incoming values and split to different outlets
* **f0.limit_counter.js** - a different counter with floor and ceiling
* **f0.noergaard.js** - per nørgård's infinity series
* **f0.range.js** - finds minimum, middle and maximum values from a stream of values
* **f0.range2.js** - similar to f0.range.js but with an added smooth factor
* **f0.smooth.js** - single exponential smoothing (ses)
* **f0.smooth2.js** - double exponential smoothing (des)
* **f0.snap.js** - smooth by snapping
* **f0.tune.js** - "quantise" frequencies
* **f0.ultimate_counter.js** - counter with float direction/rate and loop settings

see also <http://www.fredrikolofsson.com/pages/code-max.html>

download&install
-------------------------
download and put this folder somewhere on your harddrive, open max and go to options/filepreferences and add the folder there.

usage
-------------------------
create a javascript object like this... `[js f0.ultimate_counter.js]`
