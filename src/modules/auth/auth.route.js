const express = require("express");

const auth = require("../../middlewares/auth.middleware");
const schemaValidator = require("../../middlewares/schemaValidator.middleware");
const authSchema = require("./auth.schema");
const { register, signin, logout } = require("./auth.controller");

const authenticate = express.Router();

authenticate.post("/register", schemaValidator(authSchema), register);
authenticate.post("/signin", signin);
authenticate.post("/logout", auth(), logout);

module.exports = authenticate;
