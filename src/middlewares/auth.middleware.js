const passport = require("passport");

const { HandleHttpError } = require("./httpError.middleware");

const verify = (req, res, resolve, reject) => async (e, user) => {
  if (e || !user) {
    return reject(new HandleHttpError(401, "Authorization required."));
  }
  req.user = user;
  resolve();
};

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verify(req, res, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((e) => next(e));
};

module.exports = auth;
