/**
 * requestAnimationFrame polyfill by Erik Möller & Paul Irish et. al.
 * https://gist.github.com/1866474
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
**/

"use strict";

let lastTime = 0;
let vendors = "webkit moz ms o".split(" ");

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
  window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
    let currTime = Date.now();
    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
    let id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);

    lastTime = currTime + timeToCall;

    return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    window.clearTimeout(id);
  };
}
