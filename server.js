const express = require("express");
const navMenu = require("./navMenu.js");
const WebSocket = require("ws");
const http = require("http");
const url = require("url");

const app = express();
const port = process.env.PORT || 5000;
let wsServer = null;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//send message to all clients including self
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    //only send to active clients
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

//nav menu load
app.get("/api/nav", (req, res) => {
  //add timestamp to first menu item so it is easier to tell when it is cached
  navMenu.default[0].title = new Date().toTimeString();
  res.send(navMenu.default);
});

//fake url to simulate a cache clearing event
app.get("/api/serverClear", (req, res) => {
  //send clear cache to all clients
  broadcast(JSON.stringify({ action: "clearCache" }));
  //send that message ic complete
  res.send({ finished: true });
});

//when a new websocket client is connected
wss.on("connection", function connection(ws, req) {
  //when a message is sent from a client
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  //handle disconnections and errors
  ws.on("error", () => console.log("Disconnected/Error client"));
  console.log("ws client connected");
  wsServer = ws;
});

//open the port for websocket one greater than server port
server.listen(port + 1, function listening() {
  console.log("Websocket Listening on", server.address().port);
});
//start listening on port 500 for api endpoint
app.listen(port, () => console.log(`Listening on port ${port}`));
