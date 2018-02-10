export default function websocketStart(store, callback) {
  //make a connection to the server
  const connection = new WebSocket("ws://localhost:5001");

  //when sent a message
  connection.onmessage = evt => {
    try {
      //parse and dispatch the server event
      const json = JSON.parse(evt.data);
      store.dispatch({ type: "serverEvent", data: json });
    } catch (e) {
      console.log("Parse websocket Json error", e);
    }
  };
}
