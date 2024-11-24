const jwt = require("jsonwebtoken");

const { registerUser, signinUser } = require("./auth.service");
const { HandleHttpError } = require("../../middlewares/httpError.middleware");

async function register(req, res, next) {
  try {
    const { email, password, username } = req.body;
    await registerUser(email, password, username);

    res.status(201).send({ status: "success", message: "OK" });
  } catch (e) {
    next(e);
  }
}

async function signin(req, res, next) {
  try {
    if (req.method !== "POST") {
      throw new HandleHttpError(405, `Method ${req.method} not allowed.`);
    }

    const { email, password } = req.body;
    const user = await signinUser(email, password);

    res.status(200).send({ status: "success", message: "OK" });
  } catch (e) {
    next(e);
  }
}

module.exports = { register, signin };
