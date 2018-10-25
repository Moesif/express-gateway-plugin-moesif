# Moesif Plugin for Express Gateway

[Express Gateway](https://www.express-gateway.io/) is an open-source API Gateway/API Management application built on the Node.js [express](https://expressjs.com/) framework.

[Moesif](https://www.moesif.com) is the most advanced [API analytics](https://www.moesif.com/features/api-analytics), [monitoring](https://www.moesif.com/features/api-monitoring) and [debugging](https://www.moesif.com/features/api-debugging) platform. Moesif is used by thousands of developers to process billions of APIs calls.

This package is a plugin for Express Gateway to easily add Moesif's API analytics to your APIs served by Express Gateway.

## How to install

- Follow [instructions for setting up Express Gateway](https://www.express-gateway.io/getting-started/)

- Install express-gateway-plugin-moesif:
  Within the folder of the Gateway created by Express Gateway, type in:
  ```bash
  npm install --save express-gateway-plugin-moesif
  ```
- Add the moesif plugin to `system.config.yml`

  ```yml
  plugins:
    # express-gateway-plugin-example:
    #   param1: 'param from system.config'
    moesif:
      applicationId: your_moesif_application_id
  ```

  `your_moesif_application_id` is obtained from your Moesif account and is required.

  Other configuration options includes,
  - `debug`: turn on debug messages
  - `sessionTokenHeader`: Set the HTTP header key that contains your API's Authorization token/API key. Moesif tries to detect sessions automatically. However, if we cannot detect it correctly, you can specify which header field to use.

- Add moesif policy to whitelist of your `gateway.config.yml`

  ```yml
  policies:
    - proxy
    # other policies.
    - moesif
  ```

- Add moesif policy to your pipelines also in the `gateway.config.yml`.
  ```yml

  pipelines:
  - name: getting-started
    apiEndpoints:
      - api
    policies:
      - moesif:
      - key-auth:
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true

  ```

To capture all data for a pipeline, please make sure to put Moesif at the top of the pipeline. If You have multiple pipelines, be sure to add the `moesif` policy to each pipeline you want to capture data for.

## Additional Info:

This plugin is a simple wrapper around the [moesif-express](https://www.moesif.com/docs/server-integration/express/) middleware.

Since Express Gateway's configuration is designed to be declarative, some of the options from moesif-express that require a function are not ported over. We'll do so in the future.

In the mean time, if you need to use additional options, the easiest way is to fork this repo and add your required options to the `middlewareCreator.js` file.
