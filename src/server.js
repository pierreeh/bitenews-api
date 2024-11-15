import express from "express";
import mongoose from "mongoose";
import { xss } from "express-xss-sanitizer";
import mongoSanitize from "express-mongo-sanitize";

import { db } from "./utils/db.js";
import { router } from "./routes.js";

mongoose.connect(db);

export async function server() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(xss());
  app.use(mongoSanitize());

  app.use("/api", router);

  return app;
}
