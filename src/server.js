const express = require("express");
const { xss } = require("express-xss-sanitizer");

const router = require("./routes");
const { handleHttpError } = require("./middlewares/httpError.middleware");

function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());

  app.use("/api", router);

  app.use((err, req, res, next) => {
    handleHttpError(err, res);
  });

  return app;
}

module.exports = server;
