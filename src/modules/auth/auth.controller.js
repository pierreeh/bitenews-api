import httpStatus from "http-status";

import { createUser, genAuthToken } from "./auth.service.js";

const authController = {
  async register(req, res) {
    try {
      const { email, password, username } = req.body;
      const user = await createUser(email, password, username);
      const token = await genAuthToken(user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .send({ user, token });
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send(e.message);
    }
  },
};

export default authController;
