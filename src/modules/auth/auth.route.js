const express = require("express");

const schemaValidator = require("../../middlewares/schemaValidator.middleware");
const authSchema = require("./auth.schema");
const { register, signin } = require("./auth.controller");

const authenticate = express.Router();

authenticate.post("/register", schemaValidator(authSchema), register);
authenticate.post("/signin", signin);

module.exports = authenticate;
