"use strict";

const jade   = require("pug");
const config = require("config");
const path   = require("path");

function getDefaultLocals(ctx) {
  let locals = {};

  // отдаёт путь к статике с учётом хэш-версии из манифеста
  locals.bundle = function(staticPath) {
    let manifest = require(config.get("server.manifest"));

    return manifest[staticPath] || staticPath;
  };

  return locals;
}

exports.init = function(app) {

  app.use(function* (next) {
    let ctx = this;

    this.state.render = function(templatePath, locals) {

      locals = locals || {};

      // стандартные locals
      let loc = getDefaultLocals(this);

      // Object.assign не копирует свойства, определённые через defineProperty
      let localsFull = Object.create(loc);

      Object.assign(localsFull, locals);

      let templatePathResolved = path.join(config.get("root"), "./server/", templatePath + ".pug");

      return jade.renderFile(templatePathResolved, localsFull);
    };

    yield* next;
  });

};
