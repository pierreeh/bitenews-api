const express = require("express");

const auth = require("../../middlewares/auth.middleware");
const schemaValidator = require("../../middlewares/schemaValidator.middleware");
const authSchema = require("./auth.schema");
const { register, signin, logout } = require("./auth.controller");

const authenticate = express.Router();

authenticate.post("/register", schemaValidator(authSchema), register);
authenticate.post("/signin", signin);
authenticate.post("/logout", auth(), logout);
authenticate.all("*", (req, res) => {
  res
    .status(405)
    .send({ status: "error", message: `Method ${req.method} not allowed.` });
});

module.exports = authenticate;
