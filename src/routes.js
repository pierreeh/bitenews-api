const express = require("express");

const authenticate = require("./modules/auth/auth.route");

const router = express.Router();

module.exports = router;

const routes = [
  {
    path: "/auth",
    route: authenticate,
  },
];

routes.forEach((r) => {
  router.use(r.path, r.route).all("*", (req, res) => {
    res.status(404).send({ status: "error", message: "Not found." });
  });
});
