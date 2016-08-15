"use strict";

const stylus  = require("gulp-stylus");
const gulp    = require("gulp");
const postcss = require("gulp-postcss");
const prefix  = require("autoprefixer");
const gulpIf  = require("gulp-if");
const smaps   = require("gulp-sourcemaps");
const csscomb = require("gulp-csscomb");
const notify  = require("gulp-notify");
const base64  = require("gulp-base64");
const config  = require("config");

const isDeploy = config.get("env.isDeploy");
const isWatch  = config.get("env.isWatch");

module.exports = function(options) {
  let src     = config.get("gulp.tasks.css.src");
  let dest    = config.get("gulp.tasks.css.dest");
  let plugins = config.get("gulp.plugins");
  let bsync   = options && options.sync;

  let processors = [
    prefix(plugins.autoprefixer)
  ];

  return function() {
    return gulp.src(src)
      .pipe(gulpIf(isWatch, smaps.init()))
      .pipe(stylus(plugins.stylus))
      .on("error", err => {
        console.error(err);
        notify.onError({ title: "CSS task" });
      })
      .pipe(postcss(processors))
      .pipe(gulpIf(isWatch, smaps.write()))
      .pipe(gulpIf(!isDeploy, csscomb()))
      .pipe(base64(plugins.cssBase64))
      .pipe(gulp.dest(dest))
      .pipe(gulpIf(isWatch, bsync.reload({ stream: true })));
  };

};
