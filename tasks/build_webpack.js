"use strict";

const gutil   = require("gulp-util");
const webpack = require("webpack");
const notify  = require("gulp-notify");
const config  = require("config");

let cfgWebpack = config.get("webpack");
let cfgPlugins = config.get("gulp.plugins");
let isWatch    = config.get("env.isWatch");

module.exports = function(options) {
  let bsync = options && options.sync;

  return function(done) {

    webpack(cfgWebpack, function(err, stats) {

      if (!err) {
        err = stats.toJson().errors[0];
      }

      if (err) {
        notify.onError({ title: "JS task" });

        gutil.log(gutil.colors.red("[webpack]"));

        return gutil.log(err);
      }

      gutil.log("[webpack]", stats.toString(cfgPlugins.webpackOutput));

      if (isWatch) {
        bsync.reload("**/*.js")
      }

      done();
    });

  };

};
