const express = require("express");
const { xss } = require("express-xss-sanitizer");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const router = require("./routes");
const { handleHttpError } = require("./middlewares/httpError.middleware");
const requestLogger = require("./middlewares/requestLogger.middleware");
const jwtStrategy = require("./middlewares/passport.middleware");

function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());
  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);
  app.use(cookieParser());

  app.use(requestLogger);

  app.use("/api", router);

  app.use((err, req, res, next) => {
    handleHttpError(err, res);
  });

  return app;
}

module.exports = server;
