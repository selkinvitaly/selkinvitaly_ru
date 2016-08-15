"use strict";

/**
 * Этот модуль при каждом require выдаёт новый инстанс логгера
 * То есть модуль не кэшируется
 */
const path = require("path");

const bunyan = require("./libs/bunyan");
const requestSerializer = require("./libs/request-serializer");
const responseSerializer = require("./libs/response-serializer");
const errSerializer = require("./libs/err-serializer");

const streams = require("./libs/streams");

let serializers = exports.serializers = {
  request: requestSerializer,
  response: responseSerializer,
  err: errSerializer
};

// если имя не указано, тогда используется имя родительского модуля (или директории, если это index)
module.exports = function(name) {
  if (!name) {
    name = path.basename(module.parent.filename, ".js");

    if (name == "index") {
      name = path.basename(path.dirname(module.parent.filename)) + "/index";
    }
  }

  let logger = bunyan.createLogger({
    name: name,
    streams: streams,
    serializers: serializers
  });

  return logger;
};

delete require.cache[__filename];
