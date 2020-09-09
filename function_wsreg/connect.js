exports.main_handler = async (event, context, callback) => {
  console.log(event);
  // check whether request format is correct
  if (!('requestContext' in event)) {
    return {"errNo": 101, "errMsg": "Request context not found"}
  }
  if (!('websocket' in event)) {
    return {"errNo": 102, "errMsg": "Web socket not found"}
  }
  let connectionID = event['websocket']['secConnectionID']
  let retmsg = {}
  retmsg['errNo'] = 0
  retmsg['errMsg'] = "ok"
  retmsg['websocket'] = {
    "action": "connecting",
    "secConnectionID": connectionID
  }
  retmsg['websocket']['secWebSocketProtocol'] = event['websocket']['secWebSocketProtocol']
  return retmsg
}
