"use strict";

const fs = require("fs");
const path = require("path");
const config = require("config");

// все 50х отдаются одним шаблоном, а 40х - разными
// если шаблона нет, то возвращается null
function getTemplateName(err) {
  let status = err.status || 500;
  let typeStatus = status / 100 | 0; // 400 -> 4; 500 -> 5
  let templateName = null;

  if (typeStatus === 5) {
    templateName = 500;
  } else if (typeStatus === 4) {
    templateName = status;
  } else {
    return null;
  }

  // проверим шаблон на существование
  try {
    let fstat = fs.statSync(path.join(config.get("root"), "./server/handlers/site-pages.resolved/templates/", templateName + ".pug"));
  } catch (err) {
    return null;
  }

  return templateName;
}

// важно: this должен являться контекстом koa
function renderError(err) {
  let templateName = getTemplateName(err);
  let status = err.status || 500;

  // логируем нужные ошибки
  if (err.name === "MailError") {
    this.state.log.error({ mailerr: err.error }, "ошибка отправки письма на почту");
  } else if ((status / 100 | 0) === 5) {
    this.state.log.error(err);
  }

  // если шаблон есть, то рендерим его,
  // иначе просто рендерим текст
  this.status = status;
  this.body = templateName
    ? this.state.render(`handlers/site-pages.resolved/templates/${templateName}`, {
        status: status
      })
    : this.body || err.message;
}

exports.init = function(app) {

  app.use(function*(next) {
    try {
      yield* next;
    } catch (err) {

      if (typeof err === "string") {
        err = new Error(err);
      }

      try {
        renderError.call(this, err);
      } catch(renderErr) {
        this.status = 500;
        this.body = "Server render error";
        this.state.log.error(renderErr);
      }

    }
  });

};
