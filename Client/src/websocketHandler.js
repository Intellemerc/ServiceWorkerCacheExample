export default function websocketStart(store, callback) {
  const connection = new WebSocket("ws://localhost:5001");

  connection.onmessage = evt => {
    try {
      const json = JSON.parse(evt.data);
      store.dispatch({ type: "serverEvent", data: json });
    } catch (e) {
      console.log("Parse websocket Json error", e);
    }
  };
}
