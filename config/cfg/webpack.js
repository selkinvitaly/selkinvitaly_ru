"use strict";

const path    = require("path");
const webpack = require("webpack");
const envs    = require("./environments");

const isWatch  = envs.isWatch;
const isDeploy = envs.isDeploy;

module.exports = function(root) {

  let options = {
    watch: isWatch,
    context: root,
    entry: {
      app: ["./client/js/index"],
      vendor: [
        "./client/js/polyfills/index",
        "./client/js/vendor/blueimp-gallery",
        "./client/js/vendor/blueimp-helper"
      ]
    },
    output: {
      path: path.resolve(root, "./server/public/assets/js/"),
      filename: "[name].js",
      chunkFilename: "[id].js",
      publicPath: "",
      pathinfo: !isDeploy
    },
    devtool: isWatch ? "module-inline-source-map" : null,
    resolve: {
      modules: [
        root,
        "node_modules"
      ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.join(root, "./client/js")
        ],
        query: {
          presets: ["es2015"]
        }
      }]
    }
  };

  if (isDeploy) {
    options.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          "warnings": false,
          "drop_debugger": true,
          "drop_console" : true,
          "unsafe": true
        }
      })
    );
  }

  return options;
};
