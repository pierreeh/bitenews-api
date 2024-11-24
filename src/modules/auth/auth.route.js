const express = require("express");

const { register, signin } = require("./auth.controller");

const authenticate = express.Router();

authenticate.post("/register", register);
authenticate.post("/signin", signin);

module.exports = authenticate;
