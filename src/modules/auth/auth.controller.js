require("dotenv").config();
const jwt = require("jsonwebtoken");

const { registerUser, signinUser } = require("./auth.service");

function generateToken(payload, expiresIn) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

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
    const { email, password } = req.body;
    const user = await signinUser(email, password);

    const token = generateToken({ id: user.id }, "30d");
    res.cookie("x-access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "developement",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({ status: "success", message: "OK" });
  } catch (e) {
    next(e);
  }
}

async function logout(req, res, next) {
  try {
    res.cookie("x-access-token", "", { httpOnly: true, expires: new Date(0) });

    res.status(200).send({ status: "success", message: "OK" });
  } catch (e) {
    next(e);
  }
}

module.exports = { register, signin, logout };
