# Moesif Plugin for Express Gateway

[Express Gateway](https://www.express-gateway.io/) is an open sourced API Gateway/Management service build on the [express](https://expressjs.com/) framework.

[Moesif](https://www.moesif.com) is the most advanced API analytics, monitoring and debugging platform.

This package is a plugin for Express Gateway to easily add Moesif API analytics to your APIs serviced by Express Gateway.

## Setup Instructions

- Follow [instructions for set up Express Gateway](https://www.express-gateway.io/getting-started/)

- Install express-gateway-plugin-moesif:
  Within the folder of the Gateway created by Express Gateway, type in:
  ```bash
  npm install --save express-gateway-plugin-moesif
  ```
- Add moesif plugin to `system.config.yml`

  ```yml
  plugins:
    # express-gateway-plugin-example:
    #   param1: 'param from system.config'
    moesif:
      applicationId: your_moesif_application_id
  ```

  Note, applicationId is obtained from your Moesif account, this is required.
  Other configuration options includes,
  - `debug`: turn on debug mode for moesif.
  - `sessionTokenHeader`: we detect sessionToken in API analytics. If we could not detect it correctly from the header, you can specific which header field you use.

- Add moesif policy to whitelist of your `gateway.config.yml`

  ```yml
  policies:
    - proxy
    # other policies.
    - moesif
  ```

- Add moesif policy to your pipelines.
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

This plugin is just a simple wrapper around [moesif-express](https://www.moesif.com/docs/server-integration/express/) middleware.

Because Express Gateway's configuration is designed to be declarative, so some of the functional driven options for moesif-express isn't ported over. We'll do so at future.

If you need to use addition options, the best way to to fork this repo and just add the additional options you need to `middlewareCreator.js` file.
