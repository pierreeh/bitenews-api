require("dotenv").config();
const bcrypt = require("bcrypt");

const { registerUser } = require("./auth.service");

async function register(req, res, next) {
  try {
    const { email, password, username } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await registerUser(email, hash, username);

    res.status(201).send({ status: "success", message: "OK" });
  } catch (e) {
    next(e);
  }
}

async function signin(req, res, next) {}

module.exports = { register, signin };
