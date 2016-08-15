"use strict";

exports.init = function(app) {
  const router = require("./router");

  app.use(router.routes());
};
