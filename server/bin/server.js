#!/usr/bin/env node

"use strict";

const config = require("config");
const co = require("co");
const app = require("../app");
const log = require("logger.resolved")();

function start() {
  co(function*() {
    yield* app.waitBootAndListen(config.server.host, config.server.port);
  }).catch(err => {
    log.error(err);
    process.exit(1); // фатальная ошибка
  });
}

function shutdown() {
  co(function*() {
    yield* app.close();
  }).then(() => {
    log.info("Exiting");
    process.exit(0);
  }, err => {
    log.error(err);
  });
}

// let's go, motherfucker
start();

// отслеживаем unhandled промисы
let unhandledRejections = new Map();

process.on("unhandledRejection", function(reason, promise) {
  promise.trackRejectionId = Math.random();

  // 100мс на обработку промиса, проверив после, был ли он обработан или нет
  // если не обработан, то отрепортить
  setTimeout(() => {

    // был обработан
    if (!promise.trackRejectionId) {
      return;
    }

    unhandledRejections.set(promise, reason);

    let report = {
      err: reason,
      trackRejectionId: promise.trackRejectionId,
      length: unhandledRejections.length
    };

    log.error(report, "unhandledRejection");

  }, 100);

});

// если вдруг unhandled промис был всё-таки обработан
process.on("rejectionHandled", function(promise) {
  if (unhandledRejections.has(promise)) {
    unhandledRejections.delete(promise);

    log.error({
      trackRejectionId: promise.trackRejectionId,
      length: unhandledRejections.length
    }, "rejectionHandled");
  } else {
    delete p.trackRejectionId;
  }

});
