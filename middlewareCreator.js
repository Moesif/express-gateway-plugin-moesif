var moesifExpress = require('moesif-express');
var safeGet = require('lodash/get');


module.exports = function(pluginContext) {


  var applicationId = safeGet(pluginContext, 'settings.applicationId');

  console.log('got application Id back from pluginContext: ' + applicationId);

  var moesifMiddleware = moesifExpress({
    applicationId: applicationId,
    debug: true
  });

  return moesifMiddleware;
}
