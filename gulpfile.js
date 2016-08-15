"use strict";

const gulp = require("gulp");
const sync = require("browser-sync").create();
const root = require("config").get("root");
const path = require("path");

function lazyRequire(passedPath) {
  let args = Array.prototype.slice.call(arguments, 1);

  return function(done) {
    let taskPath = transformPath(passedPath);
    let taskFunc = require("./" + taskPath).apply(this, args);

    return taskFunc(done);
  };

  function transformPath(relativePath) {
    let absolute = path.resolve(root, relativePath);

    return path.relative(__dirname, absolute);
  }
};

gulp.task("build:clean", lazyRequire("./tasks/build_clean"));
gulp.task("build:bsync", lazyRequire("./tasks/build_bsync", { sync }));
gulp.task("build:css", lazyRequire("./tasks/build_css", { sync }));
gulp.task("build:html", lazyRequire("./tasks/build_html", { sync }));
gulp.task("build:img", lazyRequire("./tasks/build_img"));
gulp.task("build:fonts", lazyRequire("./tasks/build_fonts"));
gulp.task("build:sprite:svg", lazyRequire("./tasks/build_sprite-svg", { sync }));
gulp.task("build:webpack", lazyRequire("./tasks/build_webpack", { sync }));
gulp.task("build:assets", gulp.parallel(
  "build:css",
  "build:fonts",
  "build:sprite:svg",
  "build:img",
  "build:webpack"
));

gulp.task("build:base", gulp.parallel(
  "build:assets",
  "build:html"
));

gulp.task("build", gulp.series("build:clean", "build:base"));
gulp.task("build:watch", lazyRequire("./tasks/build_watch"));

gulp.task("copy:templates", lazyRequire("./tasks/copy_templates"));
gulp.task("copy:static", lazyRequire("./tasks/copy_static"));

gulp.task("deploy:rev", lazyRequire("./tasks/deploy_revision"));
gulp.task("deploy:rename", lazyRequire("./tasks/deploy_rename"));
gulp.task("deploy", gulp.series("build:clean", "build:assets", gulp.parallel(
  "copy:templates",
  "copy:static",
  "deploy:rev"
), "deploy:rename"));
