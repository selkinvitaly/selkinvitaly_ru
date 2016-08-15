"use strict";

exports.getIndexPage = function*(next) {
  this.body = this.state.render("handlers/site-pages.resolved/templates/index");
};
