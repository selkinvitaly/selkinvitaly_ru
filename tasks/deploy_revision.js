"use strict";

const gulp   = require("gulp");
const RevAll = require("gulp-rev-all");
const gzip   = require("gulp-gzip");
const config = require("config");

const isWatch  = config.get("env.isWatch");

module.exports = function(options) {
  let src      = config.get("gulp.tasks.revisions.src");
  let dest     = config.get("gulp.tasks.revisions.dest");
  let manifest = config.get("gulp.tasks.revisions.manifest");
  let plugins  = config.get("gulp.plugins");

  const revAll = new RevAll(plugins.revAll);

  return function() {
    return gulp.src(src)
      .pipe(revAll.revision())
      .pipe(gzip())
      .pipe(gulp.dest(dest))
      .pipe(revAll.manifestFile())
      .pipe(gulp.dest(manifest));
  };

};
