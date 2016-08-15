"use strict";

function getLogLevel(err) {
  if (!err) {
    return "info";
  }

  switch ((err.status / 100 | 0) || 5) {
    case 4: return "warn";
    case 5: return "error";
    default: return "info";
  }
}

function logger(ctx, start, err) {
  let status = err ? (err.status || 500) : ctx.status;
  let finish = Date.now() - start;
  let res = ctx.response;
  let req = ctx.request;
  let isProd = process.env.NODE_ENV === "production";

  // логгируем запрос
  let requestReport = isProd
    ? { event: "request-start", request: req }
    : {};

  ctx.state.log.info(
    requestReport,
    "--> %s %s",
    req.method,
    req.originalUrl || req.url
  );

  // логгируем ответ
  let responseReport = isProd
    ? { event: "request-end", response: res, method: req.method, url: req.originalUrl, timeDuration: finish }
    : {};

  // упределим уровень логгирования в зависимости от статуса ошибки
  let logLevel = getLogLevel(err);

  ctx.state.log[logLevel](
    responseReport,
    "<-- %s %s %d %dms",
    req.method,
    req.originalUrl,
    status,
    finish
  );
}

exports.init = function(app) {
  app.use(function*(next) {
    let start = Date.now();

    try {
      yield* next;
    } catch (err) {
      logger(this, start, err);
      throw err; // прокинуть далее в основной обработчик ошибок
    }

    logger(this, start, null);
  });
};
