"use strict";

const gulp    = require("gulp");
const changed = require("gulp-changed");
const config  = require("config");

module.exports = function() {
  let src  = config.get("gulp.tasks.fonts.src");
  let dest = config.get("gulp.tasks.fonts.dest");

  return function() {
    return gulp.src(src, { since: gulp.lastRun("build:fonts") })
      .pipe(changed(dest))
      .pipe(gulp.dest(dest));
  };

};
