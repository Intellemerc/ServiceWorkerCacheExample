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

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

app.get("/api/nav", (req, res) => {
  navMenu.default[0].title = new Date().toTimeString();
  res.send(navMenu.default);
});

app.get("/api/serverClear", (req, res) => {
  broadcast(JSON.stringify({ action: "reloadNav" }));
  res.send({ finished: true });
});

wss.on("connection", function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  ws.on("error", () => console.log("disconnected client"));
  console.log("ws client connected");
  //ws.send(JSON.stringify({ message: "something" }));
  wsServer = ws;
});

server.listen(port + 1, function listening() {
  console.log("Listening on %d", server.address().port);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
