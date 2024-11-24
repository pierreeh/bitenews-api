const express = require("express");
const { xss } = require("express-xss-sanitizer");

const router = require("./routes");

function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());

  app.use("/api", router);

  return app;
}

module.exports = server;
