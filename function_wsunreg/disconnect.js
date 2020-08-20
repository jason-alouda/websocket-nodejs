exports.main_handler = async (event, context, callback) => {
  console.log(event);
  if (!('websocket' in event)) {
    return {"errNo": 102, "errMsg": "not found web socket"};
  }
  return event;
}
