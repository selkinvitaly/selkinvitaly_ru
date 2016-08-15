"use strict";

const del    = require("del");
const gutil  = require("gulp-util");
const notify = require("gulp-notify");
const config = require("config");

module.exports = function(options) {
  let dest = config.get("gulp.tasks.clean.dest");

  return function() {
    return del(dest).then(paths => {

      if (paths.length) {
        gutil.log(`Deleted the output directory "${gutil.colors.magenta(dest)}"`);
      }

    }, err => {
      notify.onError({ title: "Output directory hasn't deleted!" })
      throw new gutil.PluginError("del", err);
    });
  };

};
