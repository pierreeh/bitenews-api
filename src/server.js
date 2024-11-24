const express = require("express");
const { xss } = require("express-xss-sanitizer");

function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  return app;
}

module.exports = server;
