const axios = require('axios');
const fetch = require("node-fetch");

exports.main_handler = async (event, context, callback) => {
  console.log(event);
  if (!('websocket' in event)) {
      return {"errNo": 102, "errMsg": "not found web socket"};
  }
  let data = event['websocket']['data'];
  let connectionID = event['websocket']['secConnectionID'];
  let sendbackHost = "http://set-websocket.cb-common.apigateway.tencentyun.com/api-pgrw7a14";
  //let sendbackHost = "http://set-websocket.cb-common.apigateway.tencentyun.com/api-5aek8mmc";
  let retmsg = {}
  retmsg['websocket'] = {}
  retmsg['websocket']['action'] = "data send"
  retmsg['websocket']['secConnectionID'] = connectionID
  retmsg['websocket']['dataType'] = 'text'
  //retmsg['websocket']['data'] = JSON.stringify(data)
  retmsg['websocket']['data'] = data

  let data1;
  let res;

  let opts = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(retmsg)
  };

  try {
    res = await fetch(sendbackHost, opts);
    data1 = await res.json();
  } catch (e) {
    console.log(e)
  }
  console.log(data1)
};
