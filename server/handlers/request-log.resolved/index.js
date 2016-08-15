"use strict";

exports.init = function(app) {
  app.use(function*(next) {

    this.state.log = app.log.child({
      requestId: this.state.requestId
    });

    yield* next;
  });

};
