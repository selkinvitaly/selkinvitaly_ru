"use strict";

const gulp    = require("gulp");
const config  = require("config");

module.exports = function(options) {
  let server  = options && options.sync;

  return function() {
    server.init(config.get("gulp.plugins.browserSync"));
  };

};
