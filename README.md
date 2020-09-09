# Nodejs WebSocket

This is the template for a Node.js websocket. It is built using API gateway component with WEBSOCKET protocol and 3 SCF (Serverless Cloud Functions) functions, namely a register function, transport function and clean up function. You can test the websocket using the simple chat interface provided

&nbsp;

1. [Prepare](#Prepare)
2. [Download](#Download)
3. [Bootstrap](#Bootstrap)
4. [Deploy](#Deploy)
5. [Remove](#Remove)

&nbsp;

### Prepare

Before all below steps, you should install
[Serverless Framework](https://www.github.com/serverless/serverless) globally:

```bash
$ npm i serverless -g
```

### Download

Severless cli is very convenient, it can download templates in any github
project which should contain `serverless.yml` file.

```bash
$ serverless init -t nodejs-websocket
```

### Bootstrap

Copy `.env.example` file to `.env` in project root:

Add the access keys of a
[Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with
`AdministratorAccess` in the `.env` file, like below:

```dotenv
# .env
TENCENT_SECRET_ID=xxx
TENCENT_SECRET_KEY=xxx

# change to your requirement
REGION=ap-guangzhou
```
### Deploy

```bash
$ sls deploy

serverless ⚡ framework

chat-interface:
  region:        ap-guangzhou
  website:       http://chat-bucket-xxx.cos-website.ap-guangzhou.myqcloud.com
  vendorMessage: null

wsdisconnect:
  functionName:  wsdisconnect-dev
  description:   This is a function in wsAppNode application
  namespace:     default
  runtime:       Nodejs10.15
  handler:       disconnect.main_handler
  memorySize:    128
  lastVersion:   $LATEST
  traffic:       1
  triggers:
  vendorMessage: null

wstrans:
  functionName:  wstrans-dev
  description:   This is a function in wsAppNode application
  namespace:     default
  runtime:       Nodejs10.15
  handler:       transmit.main_handler
  memorySize:    128
  lastVersion:   $LATEST
  traffic:       1
  triggers:
  vendorMessage: null

wsconnect:
  functionName:  wsconnect-dev
  description:   This is a function in wsAppNode application
  namespace:     default
  runtime:       Nodejs10.15
  handler:       connect.main_handler
  memorySize:    128
  lastVersion:   $LATEST
  traffic:       1
  triggers:
  vendorMessage: null

websocketapi:
  protocols:     http&https
  subDomain:     service-xxx-xxx.gz.apigw.tencentcs.com
  environment:   release
  region:        ap-guangzhou
  serviceId:     service-xxx
  apis:
    -
      path:           /pgws
      method:         GET
      apiId:          xxx
      internalDomain: http://set-websocket.cb-common.apigateway.tencentyun.com/xxx
  vendorMessage: null

27s › websocket › Success

```

After deploying, you will need to change line 36 of the chat-interface/client.html file to the subDomain of the websocketapi in order to be able to connect to the websocket that was just created. You will also need to change line 11 of function_wstrans/transmit.js to the internal domain of the websocketapi, which is the reverse push address of API Gateway. Then re-deploy those two instances.

### Remove

```bash
$ sls remove

serverless ⚡ framework

15s › websocket › Success
```
