"use strict";

const RequestCaptureStream = require("./request-capture-stream");

let streams;

if (process.env.LOG_LEVEL) {
  streams = [{
    level:  process.env.LOG_LEVEL,
    stream: process.stdout
  }];
} else {

  switch (process.env.NODE_ENV) {

    case "test":
      // в тестах не нужно логгирование
      streams = [];
      break;

    case "production":
      streams = [{
        level: "info",
        stream: process.stdout
      }, {
        level: "debug",
        type: "raw",
        stream: new RequestCaptureStream({
          level: "error",
          maxRecords: 100,
          maxRequestIds: 1000,
          stream: process.stderr
        })
      }];
      break;

    default:
      streams = [{
        level: "debug",
        stream: process.stdout
      }];
  }

}

module.exports = streams;
