import { Router } from "express";

import authController from "./auth.controller.js";

export const auth = Router();

auth.post("/register", authController.register);
