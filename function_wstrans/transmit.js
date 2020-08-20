const axios = require('axios');

exports.main_handler = async (event, context, callback) => {
  console.log(event);
  if (!('websocket' in event)) {
      return {"errNo": 102, "errMsg": "not found web socket"};
  }
  let data = event['websocket']['data'];
  let connectionID = event['websocket']['secConnectionID'];
  //send(connectionID, data);
  let sendbackHost = "http://set-websocket.cb-common.apigateway.tencentyun.com/api-pgrw7a14";
  let retmsg = {}
  retmsg['websocket'] = {}
  retmsg['websocket']['action'] = "data send"
  retmsg['websocket']['secConnectionID'] = connectionID
  retmsg['websocket']['dataType'] = 'text'
  retmsg['websocket']['data'] = JSON.stringify(data)
  try {
    const res = await axios.post(sendbackHost, retmsg);
    return res.status
    console.log(`Status: ${res.status}`);
    console.log('Body: ', res.data);
  } catch (err) {
    console.error(err);
    return err
  }
  return event;
};
