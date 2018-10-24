'use strict';

var moesifExpress = require('moesif-express');
var safeGet = require('lodash/get');

module.exports = function(pluginContext) {
  var applicationId = safeGet(pluginContext, 'settings.applicationId');
  var debug = safeGet(pluginContext, 'settings.debug');
  var tokenHeader = safeGet(pluginContext, 'settings.sessionTokenHeader');

  if (debug) {
    console.log('debug mode is on');
    console.log('got application Id back from pluginContext: ' + applicationId);
    console.log('tokenHeader ' + tokenHeader);
  }

  if (!applicationId) {
    throw new Error('moesif plugin requires applicationId to be defined');
  }

  function identifyUser(req, res) {
    // Express Gateway will add the eg-consumer-id header to
    // the proxied requests based on the authenticated user. In
    // case there’s none, its value will be anonymous.
    if (debug) {
      console.log('identify user triggered');
    }
    var userId = safeGet(req, 'headers.eg-consumer-id');
    if (debug) {
      console.log(JSON.stringify(req.headers));
      console.log('userid is ' + userId);
    }
    return userId;
  }

  var getSessionToken;

  if (tokenHeader) {
    getSessionToken = function(req, res) {
      if (debug) {
        console.log('getSessionToken is triggered');
      }
      var headers = safeGet(req, 'headers');
      if (!headers) return null;
      var obtainedToken = headers[tokenHeader] || headers[tokenHeader.toLowerCase()] || headers['authorization'] || headers['Authorization'];

      if (debug) {
        console.log('obtained token ' + obtainedToken);
      }
      return obtainedToken;
    }
  }

  var moesifMiddleware = moesifExpress({
    applicationId: applicationId,
    debug: debug,
    identifyUser: identifyUser,
    getSessionToken: getSessionToken
  });

  return moesifMiddleware;
};
