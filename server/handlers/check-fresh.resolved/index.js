"use strict";

const fresh  = require("koa-fresh");

exports.init = function(app) {
  app.use(fresh());
};
