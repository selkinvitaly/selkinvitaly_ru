"use strict";

const gulp   = require("gulp");
const gutil  = require("gulp-util");
const pug    = require("gulp-pug");
const gulpIf = require("gulp-if");
const notify = require("gulp-notify");
const config = require("config");

const isWatch  = config.get("env.isWatch");

module.exports = function(options) {
  let src     = config.get("gulp.tasks.html.src");
  let dest    = config.get("gulp.tasks.html.dest");
  let plugins = config.get("gulp.plugins");
  let bsync   = options && options.sync;

  return function() {
    return gulp.src(src)
      .pipe(pug(plugins.pug))
      .on("error", notify.onError({ title: "html task" }))
      .pipe(gulp.dest(dest))
      .pipe(gulpIf(isWatch, bsync.reload({ stream: true })));
  };

};
