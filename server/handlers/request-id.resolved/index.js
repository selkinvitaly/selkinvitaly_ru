"use strict";

/**
 * Обработчик использует для идентификации запроса
 * Это используется при логгировании запросов через bunyan
 */

const uuid = require("node-uuid").v4;

exports.init = function(app) {
  app.use(function*(next) {
    this.state.requestId = this.get("X-Request-Id") || uuid();

    yield* next;
  });
};
