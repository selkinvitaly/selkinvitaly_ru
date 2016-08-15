"use strict";

const del    = require("del");
const ncp    = require("ncp").ncp;
const gutil  = require("gulp-util");
const notify = require("gulp-notify");
const config = require("config");

module.exports = function(options) {
  let assetsDir = config.get("gulp.tasks.clean.assets");
  let withoutHash = config.get("gulp.tasks.clean.withoutHash");
  let revisionsDir = config.get("gulp.tasks.clean.revisions");
  let moveDir = config.get("gulp.tasks.clean.move");

  return function() {

    return del(withoutHash)
      .then(paths => new Promise((resolve, reject) => {
        ncp(moveDir, assetsDir, { clobber: true }, function(err) {
          if (err) reject(err);

          resolve();
        })
      })
      .then(() => del(revisionsDir)));
  };

};
