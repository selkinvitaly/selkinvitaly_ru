"use strict";

const gulp   = require("gulp");
const gulpIf = require("gulp-if");
const sprite = require("gulp-svg-sprite");
const notify = require("gulp-notify");
const config = require("config");

const isWatch = config.get("env.isWatch");

module.exports = function(options) {
  let src     = config.get("gulp.tasks.svgSprite.src");
  let dest    = config.get("gulp.tasks.svgSprite.dest");
  let plugins = config.get("gulp.plugins");
  let bsync   = options && options.sync;

  return function() {
    return gulp.src(src)
      .pipe(sprite(plugins.spriteSvg))
      .on("error", err => {
        console.error(err);
        notify.onError({ title: "SVG Sprite task" });
      })
      .pipe(gulp.dest(dest))
      .pipe(gulpIf(isWatch, bsync.reload({ stream: true })));;
  };

};
