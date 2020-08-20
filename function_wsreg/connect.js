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
  /*
  if "secWebSocketExtensions" in event['websocket'].keys():
      ext = event['websocket']['secWebSocketExtensions']
      retext = []
      exts = ext.split(";")
      print(exts)
      for e in exts:
          e = e.strip(" ")
          if e == "permessage-deflate":
              # retext.append(e)
              pass
          if e == "client_max_window_bits":
              # retext.append(e+"=15")
              pass
      retmsg['websocket']['secWebSocketExtensions'] = ";".join(retext)
  */
  return retmsg
}
