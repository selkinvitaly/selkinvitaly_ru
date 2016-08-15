"use strict";

const gulp   = require("gulp");
const config = require("config");

module.exports = function() {
  let src  = config.get("gulp.tasks.static.src");
  let dest = config.get("gulp.tasks.static.dest");

  return function() {
    return gulp.src(src)
      .pipe(gulp.dest(dest));
  };

};
