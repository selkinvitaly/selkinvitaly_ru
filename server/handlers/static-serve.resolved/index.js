"use strict";

const serve  = require("koa-static");
const config = require("config");

exports.init = function(app) {
  app.use(serve(config.get("root") + "/server/public", {
    defer: false,
    maxage: 12960000000 // 5 month
  }));
};
