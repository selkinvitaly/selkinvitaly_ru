"use strict";

/**
 * koajs по умолчанию при несуществующем middleware после yield* next, ставит 404 статус
 * сделаем вручную throw, чтобы обработать из одного места
 */

exports.init = function(app) {

  app.use(function* (next) {
    yield* next;

    if (this.status === 404) {
      this.throw(404);
    }
  });

};
