"use strict";

const gulp   = require("gulp");
const config = require("config");

module.exports = function() {
  let src  = config.get("gulp.tasks.templates.src");
  let dest = config.get("gulp.tasks.templates.dest");

  return function() {
    return gulp.src(src)
      .pipe(gulp.dest(dest));
  };

};
