'use strict';
var createMiddleware = require('./middlewareCreator');

module.exports = {
  version: '1.3.0',
  init: function(pluginContext) {
    var middleWare = createMiddleware(pluginContext);

    pluginContext.registerPolicy({
      name: 'moesif',
      policy: (actionParams) => {
        return middleWare;
      }
    });
    // console.log(pluginContext);
  },
  policies: ['moesif'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
  schema: {
    // This is for CLI to ask about params 'eg plugin configure example'
    "$id": 'http://www.moesif.com/schemas/policies/moesif.json',
    "type": 'object',
    "properties": {
      applicationId: {
        type: 'string',
        description: 'application id obtained from your moesif account.'
      },
      sessionTokenHeader: {
        type: 'string',
        description: 'the header used for session tokens.'
      },
      debug: {
        type: 'boolean'
      }
    },
    required: [ 'applicationId' ]
  }
};
