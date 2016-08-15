"use strict";

module.exports = function(response) {
  if (!response || !response.status) {
    return response;
  }

  return {
    status: response.status,
    headers: response.headers
  };
};
