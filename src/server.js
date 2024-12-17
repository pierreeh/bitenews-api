require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { xss } = require("express-xss-sanitizer");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const router = require("./routes");
const { handleHttpError } = require("./middlewares/httpError.middleware");
const requestLogger = require("./middlewares/requestLogger.middleware");
const jwtStrategy = require("./middlewares/passport.middleware");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
};

function server() {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());
  app.use(cookieParser());

  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);

  app.use(requestLogger);

  app.use("/api", router);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleHttpError(err, res);
  });

  return app;
}

module.exports = server;
