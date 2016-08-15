// https://gist.github.com/paulirish/5438650
// @license http://opensource.org/licenses/MIT
// copyright Paul Irish 2015

"use strict";

if ("performance" in window == false) {
  window.performance = {};
}

if ("now" in window.performance == false) {
  let nowOffset = Date.now();

  if (performance.timing && performance.timing.navigationStart) {
    nowOffset = performance.timing.navigationStart;
  }

  window.performance.now = function() {
    return Date.now() - nowOffset;
  };
}
