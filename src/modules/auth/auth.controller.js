const { registerUser, signinUser } = require("./auth.service");

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

    res.status(200).send({ status: "success", message: user });
  } catch (e) {
    next(e);
  }
}

module.exports = { register, signin };
