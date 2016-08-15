"use strict";

const fs = require("fs");
const path = require("path");
const config = require("config");

const Application = require("application.resolved");
const app = new Application();

process.on("uncaughtException", function(err) {

  // отлогируем в bunyan
  app.log.error({
    message: err.message,
    name: err.name,
    errors: err.errors,
    stack: err.stack
  });

  process.exit(255);
});

// сформируем список обработчиков, которые будут подключены
let handlers = [
  "request-id.resolved",
  "request-log.resolved",

  // этот обработчик добавляет метод для рендера шаблонов
  // поэтому он инициализируется до обработчика error-handler
  "templates-render.resolved",

  "error-handler.resolved",
  "http-logger.resolved",
  "check-fresh.resolved",
  "body-parser.resolved",
  "site-pages.resolved",

  // последний, т.к. должен отдавать файлы из public папки
  "static-serve.resolved"
];

// отфильтруем несуществующие обработчики
handlers = handlers.filter(Boolean).filter(handler => {
  try {
    require.resolve(handler);
    return true;
  } catch (e) {
    return false;
  }
});

// подключаем обработчики
handlers.forEach(handler => app.requireHandler(handler));

// должен быть последним
// используется для ручной генерации 404 ошибки
app.requireHandler("not-found.resolved");

module.exports = app;
