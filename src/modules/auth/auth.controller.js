async function register(req, res, next) {
  try {
    const { email, password, username } = req.body;
    res.status(201).json({ body: req.body });
  } catch (e) {
    throw e;
  }
}

async function signin(req, res, next) {}

module.exports = { register, signin };
