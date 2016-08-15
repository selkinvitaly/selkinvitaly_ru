"use strict";

/**
 * Приложение наследует от koa
 * Все обработчики цепляются через requireHandler
 *
 * У обработчика вызываются методы:
 *   - init (sync) - изначально для инициализации
 *   - boot (async) - ожидание готовности. например, mongoose буферизует запросы
 *   - close (async) - закрытие соединий
 */

const Koa = require("koa");
const config = require("config");

const log = require("logger.resolved")();

class Application extends Koa {
  constructor() {
    super();

    this.keys = config.get("server.keys");

    this.handlers = {};
    this.log = log;
  }

  /**
   * Ждём когда все обработчики будут успешно запущенны
   * Например, mongoose буферизует запросы, поэтому есть смысл подождать
   */
  *waitBoot() {
    for (let path in this.handlers) {
      let handler = this.handlers[path];

      if (typeof handler.boot !== "function") continue;

      yield* handler.boot();
    }
  }

  /**
   * Ждём запуска всех обработчиков и после стартуем сервер
   */
  *waitBootAndListen(host, port) {
    yield* this.waitBoot();

    yield new Promise((resolve, reject) => {
      this.server = this.listen(port, err => {
        err && reject(err);
        resolve();
      });
    });

    this.log.info("Server is listening on %d port", port);
  }

  *close() {
    this.log.info("Closing app server...");

    yield new Promise((resolve, reject) => {
      this.server.close(err => {
        err && reject(err);
        resolve();
      });
    });

    this.log.info("App connections are closed");

    for (let path in this.handlers) {
      let handler = this.handlers[path];

      if (typeof handler.close !== "function") continue;

      yield* handler.close();
    }

    this.log.info("App stopped");
  }

  requireHandler(path) {
    let handler = require(path);

    if (typeof handler.init === "function") {
      handler.init(this);
    }

    this.handlers[path] = handler;
  }

}

module.exports = Application;
