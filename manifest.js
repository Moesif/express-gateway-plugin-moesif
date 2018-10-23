
var createMiddleware = require('./middlewareCreator');

module.exports = {
  version: '1.3.0',
  init: function(pluginContext) {
    console.log('hello you there');
    console.log(pluginContext);

    var middleWare = createMiddleware(pluginContext);

    pluginContext.registerPolicy({
      name: 'moesif',
      policy: (actionParams) => {
        console.log('got action params');
        console.log(actionParams);

        return middleWare;
      }
    });
    console.log(pluginContext);
  },
  policies: ['moesif'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
  schema: {
    // This is for CLI to ask about params 'eg plugin configure example'
    $id: 'http://www.moesif.com/schemas/policies/moesif.json'
  }
};
