# javascripts for maxmsp

JavaScripts to be used with [MaxMSPJitter](https://cycling74.com)

Ported from my collection of C externals (<https://github.com/redFrik/f0ext>)

* **f0.auto_scale.js** - Find minimum and maximum values from a stream of numbers and use them as input scaling range.
* **f0.inc_dec_split.js** - Detect direction of incoming values and split to different outlets.
* **f0.limit_counter.js** - A different counter with floor and ceiling.
* **f0.noergaard.js** - Per Nørgård's infinity series.
* **f0.range.js** - Find minimum, middle and maximum values from a stream of values.
* **f0.range2.js** - Similar to f0.range but with an added smooth factor.
* **f0.smooth.js** - Single exponential smoothing. Good for filtering data from sensors.
* **f0.smooth2.js** - Double exponential smoothing.
* **f0.snap.js** - Smooth by snapping.
* **f0.tune.js** - Frequency quantiser.
* **f0.ultimate_counter.js** - Counter with floating-point direction/rate and loop settings.

See also <https://fredrikolofsson.com/code/max/>

## download & install

Put this folder somewhere on your harddrive, open Max and go to options/filepreferences and add the folder there.

# usage

Create a JavaScript object like this... `[js f0.ultimate_counter.js]`


## version history

-----250301
* inc_dec_split now understands lists
* helpfiles and readme cleanup

-----160518
* initial release
