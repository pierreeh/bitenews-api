import { Router } from "express";

import { users } from "./modules/users/users.route.js";
import { auth } from "./modules/auth/auth.route.js";

export const router = Router();

const routes = [
  {
    path: "/auth",
    route: auth,
  },
  {
    path: "/users",
    route: users,
  },
];

routes.forEach((r) => {
  router.use(r.path, r.route);
});
