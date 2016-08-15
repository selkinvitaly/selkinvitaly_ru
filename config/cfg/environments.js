"use strict";

module.exports = {
  isProd: process.env.NODE_ENV === "production",
  isDeploy: process.env.NODE_ENV === "deployment",
  isWatch: process.env.WATCH === "true"
};
