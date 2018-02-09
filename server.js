const express = require("express");
const navMenu = require("./navMenu.js");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/nav", (req, res) => {
  navMenu.default[0].title = new Date().getTime();
  res.send(navMenu.default);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
