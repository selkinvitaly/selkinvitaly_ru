"use strict";

const root = process.cwd();

const webpackConfig = require("./cfg/webpack")(root);
const tasksConfig   = require("./cfg/gulp-paths");
const pluginsConfig = require("./cfg/gulp-plugins")(root);

let config = module.exports = {};

config.webpack = webpackConfig;

config.gulp = {
  plugins: pluginsConfig,
  tasks: tasksConfig
};
