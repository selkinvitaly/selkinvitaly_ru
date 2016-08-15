"use strict";

const bodyParser = require("koa-bodyparser");

exports.init = function(app) {
  app.use(bodyParser());
};
